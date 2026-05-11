
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingShipments: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats({
          totalRevenue: data.totalRevenue || 0,
          totalOrders: data.totalOrders || 0,
          totalCustomers: data.totalCustomers || 0,
          pendingShipments: data.pendingShipments || 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Stats fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>Real-time data</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{stats.totalOrders}</div>
          <div style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>Live updates</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Customers</div>
          <div className="stat-value">{stats.totalCustomers}</div>
          <div style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>Active since launch</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Shipments</div>
          <div className="stat-value">{stats.pendingShipments}</div>
          <div style={{ color: stats.pendingShipments > 0 ? '#f59e0b' : '#666', fontSize: '12px', marginTop: '8px' }}>
            {stats.pendingShipments > 0 ? 'Needs attention' : 'All clear'}
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <div style={{ padding: '24px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Recent Activity</h2>
          <Link href="/" style={{ color: '#000', fontSize: '14px', fontWeight: 600 }}>View Storefront →</Link>
        </div>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <p>Activity log and detailed analytics charts will appear here.</p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link href="/admin/products"><button className="admin-btn-primary">Manage Products</button></Link>
            <Link href="/admin/orders"><button className="admin-action-btn">View Orders</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
