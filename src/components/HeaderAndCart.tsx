"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSession, signOut } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';

export default function HeaderAndCart() {
  const { cart, isCartOpen, toggleCart, totalItems, totalPrice, updateQty, removeItem } = useCart();
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

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
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></> : <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
          </svg>
        </button>
        <Link href="/" className="nav-logo">VŌGE</Link>
        
        <div className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link href="/shop?cat=man" className="nav-link" onClick={() => setIsMenuOpen(false)}>Man</Link>
          <Link href="/shop?cat=woman" className="nav-link" onClick={() => setIsMenuOpen(false)}>Woman</Link>
          <Link href="/shop?cat=shoes" className="nav-link" onClick={() => setIsMenuOpen(false)}>Shoes</Link>
          <Link href="/shop?cat=brands" className="nav-link" onClick={() => setIsMenuOpen(false)}>Brands</Link>
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
          
          <div className="user-menu-wrap" ref={userMenuRef} style={{ position: 'relative' }}>
            <button 
              className="user-profile-trigger" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {session && <span style={{ fontSize: '14px', fontWeight: 600 }}>{session.user?.name?.split(' ')[0]}</span>}
              <img src="/profile.svg" alt="Profile" style={{ width: '24px', height: '24px', border: session ? '2px solid #000' : 'none', borderRadius: '50%', padding: session ? '2px' : '0' }} />
            </button>
            
            {isUserMenuOpen && (
              <div className="user-dropdown" style={{ 
                position: 'absolute', 
                top: '100%', 
                right: 0, 
                background: '#fff', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
                borderRadius: '12px', 
                padding: '8px', 
                minWidth: '180px',
                zIndex: 1000,
                marginTop: '10px',
                border: '1px solid #eee'
              }}>
                {session ? (
                  <>
                    <div style={{ padding: '10px', fontSize: '12px', borderBottom: '1px solid #eee', marginBottom: '5px' }}>
                      <strong>{session.user?.name}</strong><br/>
                      <span style={{ color: '#666' }}>{session.user?.email}</span>
                    </div>
                    <button 
                      onClick={() => { 
                        setIsUserMenuOpen(false); 
                        signOut({ redirect: false }).then(() => router.refresh());
                      }}
                      style={{ 
                        width: '100%', 
                        textAlign: 'left', 
                        padding: '10px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        color: '#FF3333',
                        fontWeight: 600,
                        fontSize: '14px'
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <div style={{ padding: '10px', fontSize: '12px', borderBottom: '1px solid #eee', marginBottom: '5px' }}>
                      <strong>Welcome!</strong><br/>
                      <span style={{ color: '#666' }}>Please sign in to your account</span>
                    </div>
                    <Link 
                      href={`/auth/signin?callbackUrl=${pathname}`}
                      onClick={() => setIsUserMenuOpen(false)}
                      style={{ 
                        display: 'block',
                        width: '100%', 
                        textAlign: 'center', 
                        padding: '10px', 
                        background: '#000', 
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '14px',
                        marginTop: '5px'
                      }}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>

      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <div className="cart-head-title">Your Cart ({totalItems})</div>
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
                    <span className="cart-item-price">${(item.price * item.qty).toLocaleString()}</span>
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
            <span className="cart-subtotal-val">${totalPrice.toLocaleString()}</span>
          </div>
          <button className="checkout-btn" onClick={() => {
            if (isCartOpen) toggleCart();
            router.push('/cart');
          }}>
            Go to Checkout
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
