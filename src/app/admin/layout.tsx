"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Heartbeat Session: Keep the 10-second cookie alive as long as this tab is open
  React.useEffect(() => {
    // Ping immediately on mount to be safe
    fetch('/api/admin/ping', { method: 'POST' }).catch(() => {});
    
    // Ping every 5 seconds
    const interval = setInterval(() => {
      fetch('/api/admin/ping', { method: 'POST' }).catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '🛍️' },
    { name: 'Orders', path: '/admin/orders', icon: '📦' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-logo" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          VŌGE ADMIN
        </Link>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`admin-nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '10px' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: '#fff', 
              padding: '12px', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-title">
            {navItems.find(i => i.path === pathname)?.name || 'Admin'}
          </div>
          
          <div className="admin-user-pill">
            <span style={{ fontSize: '14px', fontWeight: 600 }}>System Admin</span>
            <div style={{ width: '32px', height: '32px', background: '#000', borderRadius: '50%', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
              A
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
