"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, updateQty, removeItem, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const discount = totalPrice * 0.2; // 20% discount example
  const delivery = 15;
  const finalTotal = totalPrice - discount + delivery;

  return (
    <main className="shopco-cart-page">
      <div className="shopco-breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Cart</span>
      </div>

      <h1 className="shopco-cart-title">YOUR CART</h1>

      {cart.length === 0 ? (
        <div className="shopco-cart-empty">
          <h2>Your cart is empty</h2>
          <Link href="/shop" className="shopco-btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="shopco-cart-content">
          <div className="shopco-cart-items-wrap">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${idx}`} className="shopco-cart-page-item">
                <img src={item.img} alt={item.name} className="shopco-cart-page-img" />
                
                <div className="shopco-cart-page-info">
                  <div className="shopco-cart-page-top">
                    <div>
                      <h3 className="shopco-cart-page-name">{item.name}</h3>
                      <p className="shopco-cart-page-meta">Size: <span>{item.selectedSize}</span></p>
                      <p className="shopco-cart-page-meta">Color: <span>{item.name.includes("Shirt") ? "White" : "Blue"}</span></p>
                    </div>
                    <button 
                      className="shopco-cart-page-remove" 
                      onClick={() => removeItem(item.id, item.selectedSize)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                    </button>
                  </div>
                  
                  <div className="shopco-cart-page-bottom">
                    <span className="shopco-cart-page-price">${item.price}</span>
                    <div className="shopco-cart-page-qty">
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="shopco-order-summary">
            <h2>Order Summary</h2>
            <div className="shopco-summary-row">
              <span>Subtotal</span>
              <span className="shopco-summary-val">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="shopco-summary-row">
              <span>Discount (-20%)</span>
              <span className="shopco-summary-val discount">-${discount.toFixed(2)}</span>
            </div>
            <div className="shopco-summary-row">
              <span>Delivery Fee</span>
              <span className="shopco-summary-val">${delivery.toFixed(2)}</span>
            </div>
            
            <div className="shopco-summary-total">
              <span>Total</span>
              <span className="shopco-summary-val-big">${finalTotal.toFixed(2)}</span>
            </div>

            <div className="shopco-promo-wrap">
              <div className="shopco-promo-input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                <input type="text" placeholder="Add promo code" />
              </div>
              <button className="shopco-promo-btn">Apply</button>
            </div>

            <button 
              className="shopco-checkout-btn-big" 
              onClick={() => alert('Proceeding to checkout stripe/paypal...')}
            >
              Go to Checkout
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
