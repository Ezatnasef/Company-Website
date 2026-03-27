import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brand } from '../../content/brand';
import { useAuth } from '../../hooks/useAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(form.email, form.password);
    if (res.success) navigate('/admin/dashboard');
    else setError(res.message);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card">
        <div className="login-logo">{brand.name}</div>
        <h2>تسجيل الدخول</h2>
        <p>لوحة تحكم المسؤول</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder={brand.adminEmail}
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'جارٍ الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
