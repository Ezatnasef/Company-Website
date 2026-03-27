import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { brand } from '../../content/brand';
import { useAuth } from '../../hooks/useAuth';
import './AdminLayout.css';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: '📊', label: 'الرئيسية' },
  { to: '/admin/contacts', icon: '📩', label: 'الطلبات' },
  { to: '/admin/projects', icon: '📁', label: 'المشاريع' },
  { to: '/admin/services', icon: '⚙️', label: 'الخدمات' },
  { to: '/admin/testimonials', icon: '💬', label: 'آراء العملاء' },
  { to: '/admin/clients', icon: '🏢', label: 'العملاء' },
  { to: '/admin/stats', icon: '📈', label: 'الإحصائيات' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">{brand.shortName}</div>
        <div className="sidebar-label">لوحة التحكم</div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">{user?.name?.[0] || 'A'}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role === 'admin' ? 'مسؤول' : 'محرر'}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>خروج</button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="admin-main">
        <header className="admin-header">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="header-right">
            <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-btn">
              عرض الموقع ↗
            </a>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
