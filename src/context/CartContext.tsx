"use client";

import { createContext, useContext, useReducer, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

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
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    if (saved.length > 0) {
      saved.forEach((item: any) => dispatch({ type: 'ADD_ITEM', payload: item }));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, mounted]);

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
