"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import DressStyleSection from '@/components/DressStyleSection';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const heroContent = [
    { type: 'image', src: '/hero.png' },
    { type: 'video', src: '/mp_.mp4' },
    { type: 'video', src: '/basketball.mp4' },
    { type: 'video', src: '/shoes.mp4' },
    { type: 'video', src: '/nike_air.mp4' },
    { type: 'video', src: '/ac_fashion.mp4' },
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (heroContent[heroIndex].type === 'image') {
      const timer = setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroContent.length);
      }, 4000); // Stay on image for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [heroIndex]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched products:', data);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Data is not an array:', data);
          setProducts([]);
        }
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
            <motion.h1 
              className="new-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </motion.h1>
            <motion.p 
              className="new-hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Link href="/shop"><button className="new-btn-dark">Shop Now</button></Link>
            </motion.div>

            <motion.div 
              className="new-hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
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
            </motion.div>
          </div>
          <div className="new-hero-right">
            {heroIndex === 0 && (
              <>
                <svg className="star-small" viewBox="0 0 100 100" fill="black"><path d="M50 0 C50 50 0 50 0 50 C50 50 50 100 50 100 C50 50 100 50 100 50 C50 50 50 0 50 0 Z" /></svg>
                <svg className="star-large" viewBox="0 0 100 100" fill="black"><path d="M50 0 C50 50 0 50 0 50 C50 50 50 100 50 100 C50 50 100 50 100 50 C50 50 50 0 50 0 Z" /></svg>
              </>
            )}
            

            <AnimatePresence mode="wait">
              {heroContent[heroIndex].type === 'image' ? (
                <motion.img 
                  key="hero-image"
                  className="new-hero-img" 
                  src={heroContent[heroIndex].src}
                  alt="Fashion Hero"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                />
              ) : (
                <motion.div
                  key={`hero-video-${heroIndex}`}
                  className="new-hero-img"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => setHeroIndex((prev) => (prev + 1) % heroContent.length)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
                  >
                    <source src={heroContent[heroIndex].src} type="video/mp4" />
                  </video>
                </motion.div>
              )}
            </AnimatePresence>
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
          {products.length > 0 ? (
            products.slice(0, 4).map((p, i) => (
              <Link 
                href={`/product/${p.id || p._id || i}`} 
                key={p._id || p.id || i} 
                className="shopco-prod-card" 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="shopco-prod-img-wrap hover-swap-wrap">
                  <img src={p.img || '/placeholder.png'} alt={p.name} className="main-img" loading="lazy" />
                  <img src={(p.gallery && p.gallery.length > 1) ? p.gallery[1] : (p.img || '/placeholder.png')} alt={`${p.name} alt`} className="hover-img" loading="lazy" />
                </div>
                <div className="shopco-prod-title">{p.name || 'Unnamed Product'}</div>
                <div className="shopco-prod-rating">
                  <span className="stars">{'★'.repeat(Math.round(p.rating || 0))}</span>
                  <span className="score">{p.rating || 0}/5</span>
                </div>
                <div className="shopco-prod-price-row">
                  <span className="shopco-prod-price">${p.price || 0}</span>
                  {p.orig && <span className="shopco-prod-orig">${p.orig}</span>}
                  {p.orig && p.price && <span className="shopco-prod-discount">-{Math.round((1 - p.price / p.orig) * 100)}%</span>}
                </div>
              </Link>
            ))
          ) : (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666'}}>No products found. Please seed the database.</div>
          )}
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
          {products.length > 4 ? (
            products.slice(4, 8).map((p, i) => (
              <Link 
                href={`/product/${p.id || p._id || i}`} 
                key={p._id || p.id || i} 
                className="shopco-prod-card" 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="shopco-prod-img-wrap hover-swap-wrap">
                  <img src={p.img || '/placeholder.png'} alt={p.name} className="main-img" loading="lazy" />
                  <img src={(p.gallery && p.gallery.length > 1) ? p.gallery[1] : (p.img || '/placeholder.png')} alt={`${p.name} alt`} className="hover-img" loading="lazy" />
                </div>
                <div className="shopco-prod-title">{p.name || 'Unnamed Product'}</div>
                <div className="shopco-prod-rating">
                  <span className="stars">{'★'.repeat(Math.round(p.rating || 0))}</span>
                  <span className="score">{p.rating || 0}/5</span>
                </div>
                <div className="shopco-prod-price-row">
                  <span className="shopco-prod-price">${p.price || 0}</span>
                  {p.orig && <span className="shopco-prod-orig">${p.orig}</span>}
                  {p.orig && p.price && <span className="shopco-prod-discount">-{Math.round((1 - p.price / p.orig) * 100)}%</span>}
                </div>
              </Link>
            ))
          ) : (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666'}}>More products coming soon...</div>
          )}
        </div>
        <Link href="/shop" style={{ textDecoration: 'none' }}>
          <button className="shopco-view-all">View All</button>
        </Link>
      </div>

      {/* BROWSE BY DRESS STYLE */}
      <DressStyleSection />

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
