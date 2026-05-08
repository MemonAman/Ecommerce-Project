"use client";

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  img: string;
  selectedSize: string;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size: string) => void;
  updateQty: (id: number, size: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

function cartReducer(state: CartItem[], action: any) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.find(i => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize);
      if (exists) return state.map(i => i.id === exists.id && i.selectedSize === exists.selectedSize
        ? { ...i, qty: i.qty + action.payload.qty } : i);
      return [...state, action.payload];
    }
    case 'REMOVE_ITEM':
      return state.filter(i => !(i.id === action.payload.id && i.selectedSize === action.payload.selectedSize));
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize
        ? { ...i, qty: action.payload.qty } : i);
    case 'CLEAR_CART':
      return [];
    case 'SYNC_CART':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();

  // 1. Initial load from LocalStorage OR Database
  useEffect(() => {
    const syncWithBackend = async () => {
      if (status === 'authenticated') {
        try {
          // 1. Fetch the existing cart from DB
          const res = await fetch('/api/cart');
          const data = await res.json();
          const dbItems = data.items || [];

          // 2. Merge with current local cart (guest items)
          let finalItems = [...dbItems];
          cart.forEach(guestItem => {
            const existingIdx = finalItems.findIndex(i => i.id === guestItem.id && i.selectedSize === guestItem.selectedSize);
            if (existingIdx > -1) {
              finalItems[existingIdx].qty += guestItem.qty;
            } else {
              finalItems.push(guestItem);
            }
          });

          // 3. Update the client state
          dispatch({ type: 'SYNC_CART', payload: finalItems });

          // 4. Save the merged cart back to the DB immediately
          if (cart.length > 0) {
            await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ items: finalItems }),
            });
            // 5. Clear the guest cart from localStorage so it doesn't merge again on refresh
            localStorage.removeItem('cart');
          }
        } catch (err) {
          console.error('Failed to sync with backend', err);
        }
      } else if (status === 'unauthenticated') {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]');
        if (saved.length > 0) {
          dispatch({ type: 'SYNC_CART', payload: saved });
        }
      }
      setMounted(true);
    };
    
    syncWithBackend();
  }, [status]);

  // 2. Save to Database OR LocalStorage on changes
  useEffect(() => {
    // Safety: Don't save if we haven't mounted yet or if the session is still loading
    if (!mounted || status === 'loading') return;

    const saveCart = async () => {
      if (status === 'authenticated') {
        // Save to MongoDB
        try {
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: cart }),
          });
        } catch (err) {
          console.error('Failed to save to database', err);
        }
      } else {
        // Save to LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    };

    // Small delay to ensure we don't save an empty state during a fast transition
    const timeoutId = setTimeout(saveCart, 500);
    return () => clearTimeout(timeoutId);
  }, [cart, status, mounted]);

  // 3. Handle User Switching (Reset)
  useEffect(() => {
    if (mounted && status !== 'loading') {
      const lastUser = localStorage.getItem('last_user');
      const currentUser = session?.user?.email || 'guest';

      // ONLY clear the cart if we are switching between two DIFFERENT registered users
      // (e.g. switching from Raj to Kisha). 
      // If we go from 'guest' to 'user@email.com', we should KEEP the items!
      if (lastUser && lastUser !== 'guest' && currentUser !== 'guest' && lastUser !== currentUser) {
        dispatch({ type: 'CLEAR_CART' });
      }
      localStorage.setItem('last_user', currentUser);
    }
  }, [session, mounted, status]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`✓ ${item.name} added to cart`);
    setIsCartOpen(true);
  };
  const removeItem = (id: number, size: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id, selectedSize: size } });
  const updateQty = (id: number, size: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id, size);
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { id, selectedSize: size, qty } });
    }
  };
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // 4. SELF-HEALING: If the cart is clearly corrupted (huge quantity), clear it once automatically.
  useEffect(() => {
    if (mounted && totalItems > 10000) {
      console.warn("Corrupted cart detected, self-healing...");
      clearCart();
    }
  }, [totalItems, mounted]);

  return (
    <CartContext.Provider value={{ cart, isCartOpen, toggleCart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
