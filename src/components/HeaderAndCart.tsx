"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function HeaderAndCart() {
  const { cart, isCartOpen, toggleCart, totalItems, totalPrice, updateQty, removeItem } = useCart();
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#fff',
          color: '#000',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '64px',
          fontSize: '14px',
          fontWeight: 500,
          padding: '12px 24px'
        },
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      }} />

    <header className="site-header">
      <nav className="main-nav">
        <Link href="/" className="nav-logo">VŌGE</Link>
        
        <div className="nav-links">
          <Link href="/shop?cat=man" className="nav-link">Man</Link>
          <Link href="/shop?cat=woman" className="nav-link">Woman</Link>
          <Link href="/shop?cat=shoes" className="nav-link">Shoes</Link>
          <Link href="/shop?cat=brands" className="nav-link">Brands</Link>
        </div>

        <div className="nav-search-container">
          <img src="/search.svg" className="search-icon" alt="Search" />
          <input className="nav-search-input" type="text" placeholder="Search for products..." />
        </div>

        <div className="nav-right-icons">
          <button className="icon-btn" onClick={toggleCart}>
            <img src="/cart.svg" alt="Cart" />
            <div className="cart-count-badge">{totalItems}</div>
          </button>
          <button className="icon-btn">
            <img src="/profile.svg" alt="Profile" />
          </button>
        </div>
      </nav>
    </header>

      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <div className="cart-head-title">Your Cart</div>
          <button className="close-btn" onClick={toggleCart}>✕</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛍</div>
              <div>Your cart is empty</div>
              <div style={{fontSize: '12px'}}>Add some items to get started</div>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={`${item.id}-${item.selectedSize}`}>
                <img className="cart-item-img" src={item.img} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">Size: {item.selectedSize}</div>
                  <div className="cart-item-bottom">
                    <span className="cart-item-price">${item.price * item.qty}</span>
                    <div className="cart-qty">
                      <button className="cq-btn" onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)}>−</button>
                      <span className="cq-val">{item.qty}</span>
                      <button className="cq-btn" onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}>+</button>
                      <button className="rm-btn" onClick={() => removeItem(item.id, item.selectedSize)}>✕</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-subtotal">
            <span className="cart-subtotal-label">Subtotal</span>
            <span className="cart-subtotal-val">${totalPrice}</span>
          </div>
          <button className="checkout-btn" onClick={() => {
            if (isCartOpen) toggleCart();
            window.location.href = '/cart';
          }}>
            Go to Checkout
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
