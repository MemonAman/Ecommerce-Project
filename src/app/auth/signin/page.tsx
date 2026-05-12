"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg) setMessage(msg);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      loginSource: 'website',
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      const callbackUrl = searchParams.get('callbackUrl') || '/';
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0EEED', padding: '20px' }}>
      <div className="auth-card" style={{ background: '#fff', padding: '48px', borderRadius: '32px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '32px' }}>Sign in to continue to VŌGE.</p>

        {message && <div style={{ background: '#E0F0FF', color: '#0066CC', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{message}</div>}
        {error && <div style={{ background: '#FFF0F0', color: '#D00', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com" 
              style={{ width: '100%', padding: '14px 20px', borderRadius: '64px', border: '1px solid #ddd', outline: 'none', fontSize: '16px' }} 
            />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%', padding: '14px 20px', borderRadius: '64px', border: '1px solid #ddd', outline: 'none', fontSize: '16px' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: '#000', 
              color: '#fff', 
              padding: '16px', 
              borderRadius: '64px', 
              border: 'none', 
              fontSize: '16px', 
              fontWeight: 600, 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Don't have an account? <Link href={`/auth/signup${searchParams.get('callbackUrl') ? `?callbackUrl=${searchParams.get('callbackUrl')}` : ''}`} style={{ color: '#000', fontWeight: 700 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
