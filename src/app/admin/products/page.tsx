"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-products-page">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/admin/products/new">
          <button className="admin-btn-primary">+ Add New Product</button>
        </Link>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>Loading products...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id || p.id}>
                  <td>
                    <div className="admin-prod-cell">
                      <img src={p.img} alt={p.name} className="admin-prod-img" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>ID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ textTransform: 'capitalize' }}>{p.cat}</td>
                  <td>${p.price}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      background: '#ecfdf5', 
                      color: '#059669', 
                      fontSize: '12px', 
                      fontWeight: 600 
                    }}>
                      In Stock
                    </span>
                  </td>
                  <td>
                    <button className="admin-action-btn">Edit</button>
                    <button className="admin-action-btn" style={{ color: '#FF3333' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
