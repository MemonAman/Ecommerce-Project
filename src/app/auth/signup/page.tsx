"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // Automatically sign in the user
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError('Account created, but could not log in automatically. Please try signing in.');
        } else {
          const callbackUrl = searchParams.get('callbackUrl') || '/';
          window.location.href = callbackUrl;
        }
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0EEED', padding: '20px' }}>
      <div className="auth-card" style={{ background: '#fff', padding: '48px', borderRadius: '32px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px', textAlign: 'center' }}>Create Account</h1>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '32px' }}>Join the VŌGE community today.</p>

        {error && <div style={{ background: '#FFF0F0', color: '#D00', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="input-group">
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Full Name</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              style={{ width: '100%', padding: '14px 20px', borderRadius: '64px', border: '1px solid #ddd', outline: 'none', fontSize: '16px' }} 
            />
          </div>
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
              marginTop: '10px',
              transition: 'opacity 0.2s'
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Already have an account? <Link href={`/auth/signin${searchParams.get('callbackUrl') ? `?callbackUrl=${searchParams.get('callbackUrl')}` : ''}`} style={{ color: '#000', fontWeight: 700 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
