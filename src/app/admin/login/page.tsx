"use client";

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid admin credentials');
        setLoading(false);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          background-color: #000;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }
        .admin-login-bg {
          display: none;
          flex: 1;
          background-image: url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .admin-login-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,1) 100%);
        }
        .admin-login-panel {
          width: 100%;
          max-width: 100%;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 768px) {
          .admin-login-bg { display: block; }
          .admin-login-panel { max-width: 500px; padding: 60px; }
        }
        .admin-input {
          width: 100%;
          padding: 16px 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid #333;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .admin-input:focus {
          border-bottom-color: #fff;
        }
        .admin-btn {
          width: 100%;
          padding: 18px;
          background: #fff;
          color: #000;
          border: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 40px;
        }
        .admin-btn:hover {
          background: #ccc;
          transform: translateY(-2px);
        }
        .admin-btn:disabled {
          background: #333;
          color: #666;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
      
      <div className="admin-login-container">
        <div className="admin-login-bg">
          <div style={{ position: 'absolute', bottom: '40px', left: '40px', zIndex: 2, mixBlendMode: 'difference' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 300, margin: 0, letterSpacing: '4px' }}>VŌGE</h2>
            <p style={{ margin: 0, letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase', fontSize: '12px' }}>System Architecture</p>
          </div>
        </div>

        <div className="admin-login-panel">
          <div style={{ maxWidth: '380px', width: '100%', margin: '0 auto' }}>
            <div style={{ marginBottom: '60px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 400, letterSpacing: '1px', margin: '0 0 8px 0' }}>Admin Portal</h1>
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Enter your security credentials to access the command center.</p>
            </div>

            {error && (
              <div style={{ padding: '16px', background: 'rgba(255,0,0,0.1)', borderLeft: '2px solid #ff4444', color: '#ff4444', marginBottom: '32px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>System Email</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@voge.com" 
                  className="admin-input"
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Security Key</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="admin-input"
                />
              </div>

              <button type="submit" disabled={loading} className="admin-btn">
                {loading ? 'Authenticating...' : 'Initialize Session'}
              </button>
            </form>
            
            <div style={{ marginTop: '60px', borderTop: '1px solid #222', paddingTop: '20px' }}>
              <Link href="/" style={{ color: '#666', fontSize: '12px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                &larr; Return to Storefront
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000' }} />}>
      <AdminLoginForm />
    </Suspense>
  );
}
