"use client";

import React, { useState, useEffect } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-orders-page">
      <div className="admin-table-container">
        <div style={{ padding: '24px', borderBottom: '1px solid #F0F0F0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Orders Management</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
            <p>No orders found yet. When customers buy products, they will appear here.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ fontWeight: 600, fontSize: '12px' }}>#{order._id.slice(-6).toUpperCase()}</td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600 }}>{(order.userId as any)?.name || 'Guest'}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{(order.userId as any)?.email}</div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>${order.totalAmount}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      background: getStatusColor(order.status).bg, 
                      color: getStatusColor(order.status).text, 
                      fontSize: '12px', 
                      fontWeight: 600 
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-action-btn">Details</button>
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

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered': return { bg: '#ecfdf5', text: '#059669' };
    case 'Shipped': return { bg: '#eff6ff', text: '#2563eb' };
    case 'Processing': return { bg: '#fffbeb', text: '#d97706' };
    case 'Pending': return { bg: '#fef2f2', text: '#dc2626' };
    default: return { bg: '#f3f4f6', text: '#6b7280' };
  }
}
