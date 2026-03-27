import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import './AdminDashboard.css';

const STATUS_LABELS = {
  new: { label: 'جديد', color: '#6C3BFF' },
  in_progress: { label: 'قيد المعالجة', color: '#f59e0b' },
  done: { label: 'مكتمل', color: '#10b981' },
  rejected: { label: 'مرفوض', color: '#ef4444' },
};

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/stats/dashboard')
      .then(({ data: res }) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  const cards = [
    { label: 'إجمالي الطلبات', value: data?.totalContacts ?? 0, icon: '📩', color: '#6C3BFF', link: '/admin/contacts' },
    { label: 'طلبات جديدة', value: data?.newContacts ?? 0, icon: '🔔', color: '#f59e0b', link: '/admin/contacts?status=new' },
    { label: 'المشاريع النشطة', value: data?.totalProjects ?? 0, icon: '📁', color: '#10b981', link: '/admin/projects' },
    { label: 'مشاريع منفّذة', value: data?.siteStats?.projects ?? 0, icon: '🏆', color: '#00E5C3', link: '/admin/stats' },
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>لوحة التحكم</h1>
        <p>مرحباً، هذا ملخص نشاط الموقع</p>
      </div>

      {/* Stats cards */}
      <div className="dash-cards">
        {cards.map((c, i) => (
          <Link to={c.link} key={i} className="dash-card">
            <div className="dash-card-icon" style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}>
              {c.icon}
            </div>
            <div className="dash-card-val" style={{ color: c.color }}>{c.value}</div>
            <div className="dash-card-label">{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent contacts */}
      <div className="dash-section">
        <div className="dash-section-header">
          <h2>آخر الطلبات</h2>
          <Link to="/admin/contacts" className="see-all">عرض الكل ←</Link>
        </div>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الهاتف</th>
                <th>الخدمة</th>
                <th>الحالة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentContacts?.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>لا توجد طلبات بعد</td></tr>
              )}
              {data?.recentContacts?.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td dir="ltr">{c.phone}</td>
                  <td>{c.service}</td>
                  <td>
                    <span className="status-badge" style={{
                      background: `${STATUS_LABELS[c.status]?.color}22`,
                      color: STATUS_LABELS[c.status]?.color,
                      border: `1px solid ${STATUS_LABELS[c.status]?.color}44`,
                    }}>
                      {STATUS_LABELS[c.status]?.label}
                    </span>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString('ar-SA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
