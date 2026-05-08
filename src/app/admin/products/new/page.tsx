"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cat: 't-shirts',
    price: 0,
    orig: 0,
    desc: '',
    img: '',
    gender: 'unisex',
    style: 'casual',
    colors: ['#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a random numeric ID for now (simple approach)
      const numericId = Math.floor(Math.random() * 10000) + 100;
      
      const productData = {
        ...formData,
        id: numericId,
        rating: 4.5, // Default rating
        reviews: 0,
        price: Number(formData.price),
        orig: formData.orig ? Number(formData.orig) : undefined,
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        alert('Product created successfully!');
        router.push('/admin/products');
      } else {
        const err = await res.json();
        alert('Error: ' + err.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-new-product">
      <div style={{ marginBottom: '20px' }}>
        <Link href="/admin/products" style={{ color: '#666', textDecoration: 'none' }}>← Back to Products</Link>
      </div>

      <div className="admin-table-container" style={{ padding: '40px', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '30px' }}>Add New Product</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Product Name</label>
            <input 
              type="text" 
              required 
              style={inputStyle} 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Classic Silk Shirt"
            />
          </div>

          <div>
            <label style={labelStyle}>Price ($)</label>
            <input 
              type="number" 
              required 
              style={inputStyle} 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>

          <div>
            <label style={labelStyle}>Original Price (Optional)</label>
            <input 
              type="number" 
              style={inputStyle} 
              value={formData.orig}
              onChange={(e) => setFormData({...formData, orig: Number(e.target.value)})}
            />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select 
              style={inputStyle} 
              value={formData.cat}
              onChange={(e) => setFormData({...formData, cat: e.target.value})}
            >
              <option value="t-shirts">T-Shirts</option>
              <option value="shirts">Shirts</option>
              <option value="jeans">Jeans</option>
              <option value="shorts">Shorts</option>
              <option value="hoodies">Hoodies</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Gender</label>
            <select 
              style={inputStyle} 
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="man">Man</option>
              <option value="woman">Woman</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Style</label>
            <select 
              style={inputStyle} 
              value={formData.style}
              onChange={(e) => setFormData({...formData, style: e.target.value})}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
              <option value="gym">Gym</option>
            </select>
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Image URL</label>
            <input 
              type="text" 
              required 
              style={inputStyle} 
              value={formData.img}
              onChange={(e) => setFormData({...formData, img: e.target.value})}
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Description</label>
            <textarea 
              required 
              style={{...inputStyle, height: '100px', resize: 'vertical'}} 
              value={formData.desc}
              onChange={(e) => setFormData({...formData, desc: e.target.value})}
            />
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '20px' }}>
            <button 
              type="submit" 
              disabled={loading}
              className="admin-btn-primary" 
              style={{ width: '100%' }}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 600,
  marginBottom: '8px',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  fontSize: '14px',
  outline: 'none',
};
