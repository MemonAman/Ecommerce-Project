"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ShopContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');

  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState(catParam || 'all');
  const [filterSize, setFilterSize] = useState('');
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setDbProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (catParam) {
      setFilterCat(catParam);
    } else {
      setFilterCat('all');
    }
  }, [catParam]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', fontSize: '20px' }}>Loading Collection...</div>;
  }

  let filtered = dbProducts.filter(p => {
    // Handle special tags
    if (filterCat === 'sale') {
      if (p.tag.toLowerCase() !== 'sale') return false;
    } else if (filterCat === 'new') {
      if (p.tag.toLowerCase() !== 'new') return false;
    } else if (filterCat === 'brands') {
      // Show all products when 'Brands' is clicked
      return true;
    } else if (filterCat !== 'all') {
      if (['man', 'woman'].includes(filterCat.toLowerCase())) {
        if (p.gender !== filterCat.toLowerCase() && p.gender !== 'unisex') return false;
      } else if (filterCat === 'shoes') {
        if (p.cat.toLowerCase() !== 'sneakers' && p.cat.toLowerCase() !== 'shoes') return false;
      } else if (['casual', 'formal', 'party', 'gym'].includes(filterCat.toLowerCase())) {
        if (p.style?.toLowerCase() !== filterCat.toLowerCase()) return false;
      } else if (p.cat.toLowerCase() !== filterCat.toLowerCase()) {
        return false;
      }
    }

    if (filterSize && !p.sizes.includes(filterSize)) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === 'new') filtered.sort((a, b) => b.id - a.id); 

  return (
    <div className="page active" id="page-shop">
      <div className="shopco-shop-layout">
        
        {/* FILTERS SIDEBAR */}
        <aside className="shopco-filter-panel">
          <div className="shopco-filter-header">
            <span>Filters</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>
          </div>
          <div className="shopco-divider" style={{margin: '0'}}></div>
          
          <div className="shopco-filter-list">
            {['All', 'Shirts', 'Jeans', 'Shorts', 'Hoodie', 'Jackets', 'Sneakers'].map(c => (
              <div key={c} className={`shopco-filter-item ${filterCat === c.toLowerCase() ? 'active' : ''}`} onClick={() => setFilterCat(c.toLowerCase())}>
                {c}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            ))}
          </div>

          <div className="shopco-divider" style={{margin: '0'}}></div>

          <div className="shopco-filter-section">
            <div className="shopco-filter-title">
              Price
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </div>
            <input type="range" className="price-range" min="50" max="500" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
            <div style={{fontSize: '14px', fontWeight: 500, marginTop: '8px'}}>${50} - ${maxPrice}</div>
          </div>

          <div className="shopco-divider" style={{margin: '0'}}></div>

          <div className="shopco-filter-section">
            <div className="shopco-filter-title">
              Colors
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </div>
            <div className="shopco-color-grid">
              {['#00C12B', '#F50606', '#F5DD06', '#F57906', '#06CAF5', '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'].map((color, i) => (
                <div key={color} className={`shopco-color-circle ${i===0 ? 'active' : ''}`} style={{backgroundColor: color}}></div>
              ))}
            </div>
          </div>

          <div className="shopco-divider" style={{margin: '0'}}></div>

          <div className="shopco-filter-section">
            <div className="shopco-filter-title">
              Size
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </div>
            <div className="shopco-size-chips">
              {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map(s => (
                <span 
                  key={s}
                  className={`shopco-size-chip ${filterSize === s ? 'active' : ''}`} 
                  onClick={() => setFilterSize(filterSize === s ? '' : s)}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="shopco-divider" style={{margin: '0'}}></div>

          <div className="shopco-filter-section">
            <div className="shopco-filter-title">
              Dress Style
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
            </div>
            <div className="shopco-filter-list" style={{marginTop: '0'}}>
              {['Casual', 'Formal', 'Party', 'Gym'].map(c => (
                <div key={c} className={`shopco-filter-item ${filterCat === c.toLowerCase() ? 'active' : ''}`} onClick={() => setFilterCat(c.toLowerCase())}>
                  {c}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              ))}
            </div>
          </div>

          <button className="shopco-apply-btn">Apply Filter</button>
        </aside>
        
        {/* MAIN PRODUCT GRID */}
        <div className="shop-main">
          <div className="shopco-breadcrumbs">
            Home <span>&gt;</span> {filterCat !== 'all' ? filterCat.charAt(0).toUpperCase() + filterCat.slice(1) : 'All'}
          </div>

          <div className="shopco-shop-top">
            <h1 className="shopco-shop-title">{filterCat !== 'all' ? filterCat : 'All Products'}</h1>
            <div className="shopco-shop-meta">
              <span>Showing 1-10 of {filtered.length} Products</span>
              <span>Sort by: </span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="new">Newest</option>
              </select>
            </div>
          </div>
          
          <div className="shopco-grid-3">
            {filtered.map(p => (
              <Link href={`/product/${p.id}`} key={p.id} className="shopco-prod-card" style={{textDecoration: 'none', color: 'inherit'}}>
                <div className="shopco-prod-img-wrap">
                  <img src={p.img} alt={p.name} loading="lazy" />
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

          <div className="shopco-divider" style={{margin: '0 0 20px 0'}}></div>

          <div className="shopco-pagination">
            <button className="shopco-page-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Previous
            </button>
            <div className="shopco-page-nums">
              <span className="shopco-page-num active">1</span>
              <span className="shopco-page-num">2</span>
              <span className="shopco-page-num">3</span>
              <span className="shopco-page-num">...</span>
              <span className="shopco-page-num">8</span>
              <span className="shopco-page-num">9</span>
              <span className="shopco-page-num">10</span>
            </div>
            <button className="shopco-page-btn">
              Next
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="page active" id="page-shop"><div style={{padding: '100px', textAlign: 'center'}}>Loading shop...</div></div>}>
      <ShopContent />
    </Suspense>
  );
}
