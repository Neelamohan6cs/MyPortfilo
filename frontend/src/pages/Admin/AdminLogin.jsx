import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username.trim(), password.trim());
      navigate('/dashboard');
    } catch (err) {
      setError('Wrong username or password');
    }
    setLoading(false);
  };

  return (
    <div className="login-page grid-bg">
      <div className="login-box">
        <div className="login-icon">NR</div>
        <h2 className="login-title">Admin Panel</h2>
        <p className="login-sub">Sign in to manage portfolio content</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              placeholder="Neelamohan"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="1234"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="login-hint">Username: Neelamohan &nbsp;|&nbsp; Password: 1234</p>
      </div>
    </div>
  );
}
