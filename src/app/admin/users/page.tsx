"use client";

import React, { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-users-page">
      <div className="admin-table-container">
        <div style={{ padding: '24px', borderBottom: '1px solid #F0F0F0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Users Management</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>Loading users...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        background: '#f3f4f6', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#6b7280'
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      background: user.role === 'admin' ? '#eff6ff' : '#f3f4f6', 
                      color: user.role === 'admin' ? '#2563eb' : '#6b7280', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-action-btn">Edit</button>
                    {user.email !== 'aman123@gmail.com' && (
                      <button className="admin-action-btn" style={{ color: '#FF3333' }}>Remove</button>
                    )}
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
