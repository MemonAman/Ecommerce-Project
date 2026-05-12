"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-layout">
      {/* MOBILE HEADER */}
      <div className="admin-mobile-header">
        <Link href="/admin" className="admin-logo" style={{ marginBottom: 0, paddingLeft: 0, fontSize: '18px', textDecoration: 'none', color: '#fff' }}>
          VŌGE ADMIN
        </Link>
        <button 
          onClick={toggleSidebar}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          )}
        </button>
      </div>


      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Link href="/" className="admin-logo" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          VŌGE ADMIN
        </Link>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`admin-nav-item ${pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
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

      {/* MAIN CONTENT */}
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

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.5)', 
            zIndex: 9998 
          }}
        />
      )}
    </div>
  );
}
