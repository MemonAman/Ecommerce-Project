"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetail() {
  const { addItem } = useCart();
  const params = useParams();
  const id = parseInt(params.id as string);
  const currentProduct = products.find(p => p.id === id);

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(currentProduct?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(currentProduct?.colors[0] || '');

  if (!currentProduct) return <div style={{padding: '100px', textAlign: 'center'}}>Product not found</div>;

  return (
    <div className="page active" id="page-detail">
      <div className="shopco-detail-breadcrumbs">
        Home <span>&gt;</span> Shop <span>&gt;</span> {currentProduct.cat.charAt(0).toUpperCase() + currentProduct.cat.slice(1)} <span>&gt;</span> {currentProduct.name}
      </div>

      <div className="shopco-detail-layout">
        <div className="shopco-detail-gallery">
          <div className="shopco-gallery-thumbs">
            {(currentProduct.gallery || [currentProduct.img]).map((g, i) => (
              <div key={i} className={`shopco-gallery-thumb ${i === 0 ? 'active' : ''}`}>
                <img src={g} alt={`Thumb ${i + 1}`} />
              </div>
            ))}
            {/* Fill up to 3 thumbnails if gallery is short */}
            {(!currentProduct.gallery || currentProduct.gallery.length < 2) && (
              <>
                <div className="shopco-gallery-thumb"><img src={currentProduct.img} alt="Thumb 2" /></div>
                <div className="shopco-gallery-thumb"><img src={currentProduct.img} alt="Thumb 3" /></div>
              </>
            )}
          </div>
          <div className="shopco-gallery-main">
            <img src={currentProduct.img} alt={currentProduct.name} />
          </div>
        </div>

        <div className="shopco-detail-info">
          <h1 className="shopco-detail-title">{currentProduct.name}</h1>
          
          <div className="shopco-detail-rating-row">
            <span className="stars">{'★'.repeat(Math.round(currentProduct.rating))}</span>
            <span className="score" style={{color: 'rgba(0,0,0,0.6)'}}>{currentProduct.rating}/5</span>
          </div>
          
          <div className="shopco-detail-price-row">
            <span className="shopco-detail-price">${currentProduct.price}</span>
            {currentProduct.orig && <span className="shopco-detail-orig">${currentProduct.orig}</span>}
            {currentProduct.orig && <span className="shopco-prod-discount">-{Math.round((1 - currentProduct.price / currentProduct.orig) * 100)}%</span>}
          </div>
          
          <p className="shopco-detail-desc">{currentProduct.desc}</p>
          
          <div className="shopco-divider" style={{margin: '0 0 24px 0'}}></div>

          <div className="shopco-detail-option-title">Select Colors</div>
          <div className="shopco-color-grid" style={{marginBottom: '24px'}}>
            {currentProduct.colors.map((c) => (
              <div 
                key={c}
                className={`shopco-color-circle ${selectedColor === c ? 'active' : ''}`}
                style={{ background: c }}
                onClick={() => setSelectedColor(c)}
                title={c}
              />
            ))}
          </div>
          
          <div className="shopco-divider" style={{margin: '0 0 24px 0'}}></div>

          <div className="shopco-detail-option-title">Choose Size</div>
          <div className="shopco-size-chips" style={{marginBottom: '24px'}}>
            {currentProduct.sizes.map((s) => (
              <span 
                key={s} 
                className={`shopco-size-chip ${selectedSize === s ? 'active' : ''}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </span>
            ))}
          </div>
          
          <div className="shopco-divider" style={{margin: '0 0 24px 0'}}></div>

          <div className="shopco-detail-actions">
            <div className="shopco-qty-selector">
              <button className="shopco-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="shopco-qty-val">{qty}</span>
              <button className="shopco-qty-btn" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
            </div>
            <button 
              className="shopco-add-cart" 
              onClick={() => addItem({ 
                id: currentProduct.id, 
                name: currentProduct.name, 
                price: currentProduct.price, 
                img: currentProduct.img, 
                selectedSize, 
                qty 
              })}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="shopco-detail-tabs">
        <div className="shopco-detail-tab">Product Details</div>
        <div className="shopco-detail-tab active">Rating & Reviews</div>
        <div className="shopco-detail-tab">FAQs</div>
      </div>
    </div>
  );
}
