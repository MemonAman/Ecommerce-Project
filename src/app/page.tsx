"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>Loading VŌGE...</div>;
  }

  const trending = products.filter(p => p.tag).slice(0, 4);

  return (
    <div className="page active" id="page-home">
      {/* NEW HERO */}
      <div className="new-hero">
        <div className="new-hero-container">
          <div className="new-hero-left">
            <h1 className="new-hero-title">FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE</h1>
            <p className="new-hero-sub">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
            <Link href="/shop"><button className="new-btn-dark">Shop Now</button></Link>

            <div className="new-hero-stats">
              <div className="new-stat">
                <span className="new-stat-num">200+</span>
                <span className="new-stat-label">International Brands</span>
              </div>
              <div className="new-stat divider"></div>
              <div className="new-stat">
                <span className="new-stat-num">2,000+</span>
                <span className="new-stat-label">High-Quality Products</span>
              </div>
              <div className="new-stat divider"></div>
              <div className="new-stat">
                <span className="new-stat-num">30,000+</span>
                <span className="new-stat-label">Happy Customers</span>
              </div>
            </div>
          </div>
          <div className="new-hero-right">
            <svg className="star-small" viewBox="0 0 100 100" fill="black"><path d="M50 0 C50 50 0 50 0 50 C50 50 50 100 50 100 C50 50 100 50 100 50 C50 50 50 0 50 0 Z" /></svg>
            <svg className="star-large" viewBox="0 0 100 100" fill="black"><path d="M50 0 C50 50 0 50 0 50 C50 50 50 100 50 100 C50 50 100 50 100 50 C50 50 50 0 50 0 Z" /></svg>
            <img className="new-hero-img" src="/hero.png" alt="Fashion Hero" />
          </div>
        </div>

        {/* BRAND BANNER INTEGRATED - HORIZONTAL SCROLLING */}
        <div className="hero-brand-banner">
          <div className="brand-track">
            {/* First Set */}
            <div className="brand-item"><img src="/versace new logo.svg" alt="Versace" className="versace-logo" /></div>
            <div className="brand-item"><img src="/Louis_Vuitton-Logo.wine.svg" alt="Louis Vuitton" className="louis-vuitton-logo" /></div>
            <div className="brand-item"><img src="/gucci.svg" alt="Gucci" className="gucci-logo" /></div>
            <div className="brand-item"><img src="/u-s-polo-assn-seeklogo.svg" alt="US Polo" className="us-polo-logo" /></div>
            <div className="brand-item"><img src="/Nike,_Inc.-Logo.wine.svg" alt="Nike" className="nike-logo" /></div>
            <div className="brand-item"><img src="/hm.svg" alt="H&M" className="hm-logo" /></div>
            <div className="brand-item"><img src="/Puma_(brand)-Logo.wine.svg" alt="Puma" className="puma-logo" /></div>
            <div className="brand-item"><img src="/Under_Armour-Logo.wine.svg" alt="Under Armour" className="under-armour-logo" /></div>
            <div className="brand-item"><img src="/Adidas-Logo.wine.svg" alt="Adidas" className="adidas-logo" /></div>
            <div className="brand-item"><img src="/Chanel-Logo.wine.svg" alt="Chanel" className="chanel-logo" /></div>

            {/* Duplicate Set for Seamless Scrolling */}
            <div className="brand-item"><img src="/versace new logo.svg" alt="Versace" className="versace-logo" /></div>
            <div className="brand-item"><img src="/Louis_Vuitton-Logo.wine.svg" alt="Louis Vuitton" className="louis-vuitton-logo" /></div>
            <div className="brand-item"><img src="/gucci.svg" alt="Gucci" className="gucci-logo" /></div>
            <div className="brand-item"><img src="/u-s-polo-assn-seeklogo.svg" alt="US Polo" className="us-polo-logo" /></div>
            <div className="brand-item"><img src="/Nike,_Inc.-Logo.wine.svg" alt="Nike" className="nike-logo" /></div>
            <div className="brand-item"><img src="/hm.svg" alt="H&M" className="hm-logo" /></div>
            <div className="brand-item"><img src="/Puma_(brand)-Logo.wine.svg" alt="Puma" className="puma-logo" /></div>
            <div className="brand-item"><img src="/Under_Armour-Logo.wine.svg" alt="Under Armour" className="under-armour-logo" /></div>
            <div className="brand-item"><img src="/Adidas-Logo.wine.svg" alt="Adidas" className="adidas-logo" /></div>
            <div className="brand-item"><img src="/Chanel-Logo.wine.svg" alt="Chanel" className="chanel-logo" /></div>
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="shopco-section">
        <h2 className="shopco-section-title">NEW ARRIVALS</h2>
        <div className="shopco-prod-grid">
          {products.slice(0, 4).map(p => (
            <Link href={`/product/${p.id}`} key={p.id} className="shopco-prod-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="shopco-prod-img-wrap hover-swap-wrap">
                <img src={p.img} alt={p.name} className="main-img" loading="lazy" />
                <img src={p.gallery && p.gallery.length > 1 ? p.gallery[1] : p.img} alt={`${p.name} alt`} className="hover-img" loading="lazy" />
              </div>
              <div className="shopco-prod-title">{p.name}</div>
              <div className="shopco-prod-rating">
                <span className="stars">{'★'.repeat(Math.round(p.rating))}</span>
                <span className="score">{p.rating}/5</span>
              </div>
              <div className="shopco-prod-price-row">
                <span className="shopco-prod-price">${p.price}</span>
                {p.orig && <span className="shopco-prod-orig">${p.orig}</span>}
                {p.orig && <span className="shopco-prod-discount">-{Math.round((1 - p.price / p.orig) * 100)}%</span>}
              </div>
            </Link>
          ))}
        </div>
        <Link href="/shop" style={{ textDecoration: 'none' }}>
          <button className="shopco-view-all">View All</button>
        </Link>
      </div>

      <div className="shopco-divider"></div>

      {/* TOP SELLING */}
      <div className="shopco-section">
        <h2 className="shopco-section-title">TOP SELLING</h2>
        <div className="shopco-prod-grid">
          {products.slice(4, 8).map(p => (
            <Link href={`/product/${p.id}`} key={p.id} className="shopco-prod-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="shopco-prod-img-wrap hover-swap-wrap">
                <img src={p.img} alt={p.name} className="main-img" loading="lazy" />
                <img src={p.gallery && p.gallery.length > 1 ? p.gallery[1] : p.img} alt={`${p.name} alt`} className="hover-img" loading="lazy" />
              </div>
              <div className="shopco-prod-title">{p.name}</div>
              <div className="shopco-prod-rating">
                <span className="stars">{'★'.repeat(Math.round(p.rating))}</span>
                <span className="score">{p.rating}/5</span>
              </div>
              <div className="shopco-prod-price-row">
                <span className="shopco-prod-price">${p.price}</span>
                {p.orig && <span className="shopco-prod-orig">${p.orig}</span>}
                {p.orig && <span className="shopco-prod-discount">-{Math.round((1 - p.price / p.orig) * 100)}%</span>}
              </div>
            </Link>
          ))}
        </div>
        <Link href="/shop" style={{ textDecoration: 'none' }}>
          <button className="shopco-view-all">View All</button>
        </Link>
      </div>

      {/* BROWSE BY DRESS STYLE */}
      <div className="shopco-dress-style">
        <h2 className="shopco-dress-title">BROWSE BY DRESS STYLE</h2>
        <div className="shopco-dress-grid">
          <Link href="/shop?cat=casual" className="shopco-dress-card">
            <span className="shopco-dress-label">Casual</span>
            <img src="/casual.jpg" alt="Casual" />
          </Link>
          <Link href="/shop?cat=formal" className="shopco-dress-card">
            <span className="shopco-dress-label">Formal</span>
            <img src="/formal.jpg" alt="Formal" />
          </Link>
          <Link href="/shop?cat=party" className="shopco-dress-card">
            <span className="shopco-dress-label">Party</span>
            <img src="/party.jpg" alt="Party" />
          </Link>
          <Link href="/shop?cat=gym" className="shopco-dress-card">
            <span className="shopco-dress-label">Gym</span>
            <img src="/gym.jpg" alt="Gym" />
          </Link>
        </div>
      </div>

      {/* OUR HAPPY CUSTOMERS */}
      <div className="shopco-reviews">
        <div className="shopco-reviews-header">
          <h2 className="shopco-reviews-title">OUR HAPPY CUSTOMERS</h2>
          <div className="shopco-reviews-arrows">
            <svg className="shopco-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            <svg className="shopco-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </div>
        </div>
        <div className="shopco-reviews-grid">
          <div className="shopco-review-card">
            <div className="shopco-review-stars">★★★★★</div>
            <div className="shopco-review-name">
              <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah M." style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
              Sarah M.
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            </div>
            <div className="shopco-review-text">"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."</div>
          </div>
          <div className="shopco-review-card">
            <div className="shopco-review-stars">★★★★★</div>
            <div className="shopco-review-name">
              <img src="https://i.pravatar.cc/150?u=alex" alt="Alex K." style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
              Alex K.
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            </div>
            <div className="shopco-review-text">"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes."</div>
          </div>
          <div className="shopco-review-card">
            <div className="shopco-review-stars">★★★★★</div>
            <div className="shopco-review-name">
              <img src="https://i.pravatar.cc/150?u=james" alt="James L." style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
              James L.
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            </div>
            <div className="shopco-review-text">"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."</div>
          </div>
          <div className="shopco-review-card">
            <div className="shopco-review-stars">★★★★★</div>
            <div className="shopco-review-name">
              <img src="https://i.pravatar.cc/150?u=emma" alt="Emma W." style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
              Emma W.
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            </div>
            <div className="shopco-review-text">"The dress I bought for a friend's wedding was a showstopper! The fit was perfect and the fabric felt so luxurious. Will definitely be shopping here again for my next event."</div>
          </div>
        </div>
      </div>
    </div>
  );
}
