
"use client";

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">$124,590.00</div>
          <div style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>↑ 12% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">1,240</div>
          <div style={{ color: '#10b981', fontSize: '12px', marginTop: '8px' }}>↑ 5.4% from last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Customers</div>
          <div className="stat-value">845</div>
          <div style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>Active since launch</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Shipments</div>
          <div className="stat-value">18</div>
          <div style={{ color: '#f59e0b', fontSize: '12px', marginTop: '8px' }}>Needs attention</div>
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
            <button className="admin-action-btn">View Orders</button>
          </div>
        </div>
      </div>
    </div>
  );
}
