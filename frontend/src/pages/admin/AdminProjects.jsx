import React, { useEffect, useState, useCallback } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

const EMPTY = { title: '', description: '', category: 'web', emoji: '🌐', imageUrl: '', link: '', featured: false };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | 'edit'
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(() => {
    setLoading(true);
    API.get('/projects')
      .then(({ data }) => setProjects(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  const openEdit = (p) => {
    setForm({ title: p.title, description: p.description, category: p.category,
      emoji: p.emoji, imageUrl: p.imageUrl, link: p.link, featured: p.featured });
    setModal({ type: 'edit', id: p._id });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') await API.post('/projects', form);
      else await API.put(`/projects/${modal.id}`, form);
      fetchProjects();
      setModal(null);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل تريد حذف هذا المشروع؟')) return;
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  const f = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>المشاريع</h1>
        <p>إدارة مشاريع الشركة</p>
      </div>

      <div className="page-toolbar">
        <button className="btn-primary" onClick={openCreate}>+ إضافة مشروع</button>
      </div>

      <div className="dash-section">
        <div className="table-wrap">
          {loading ? <div className="spinner" /> : projects.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📁</div><p>لا توجد مشاريع بعد</p></div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>الاسم</th><th>النوع</th><th>مميز</th><th>إجراء</th></tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p._id}>
                    <td><span style={{ marginLeft: 8 }}>{p.emoji}</span>{p.title}</td>
                    <td><span className="status-badge" style={{ background: 'rgba(108,59,255,0.12)', color: 'var(--primary-light)', border: '1px solid rgba(108,59,255,0.25)' }}>
                      {p.category === 'app' ? 'تطبيق' : 'موقع'}
                    </span></td>
                    <td>{p.featured ? '⭐' : '—'}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <button className="action-btn edit" onClick={() => openEdit(p)}>تعديل</button>
                      <button className="action-btn delete" onClick={() => handleDelete(p._id)}>حذف</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModal(null)}>✕</button>
            <h3>{modal === 'create' ? 'إضافة مشروع' : 'تعديل المشروع'}</h3>
            <div className="admin-form">
              <div className="form-group"><label>اسم المشروع</label>
                <input value={form.title} onChange={e => f('title', e.target.value)} placeholder="اسم المشروع" /></div>
              <div className="form-group"><label>الوصف</label>
                <textarea rows={3} value={form.description} onChange={e => f('description', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group"><label>النوع</label>
                  <select value={form.category} onChange={e => f('category', e.target.value)}>
                    <option value="web">موقع ويب</option>
                    <option value="app">تطبيق جوال</option>
                  </select></div>
                <div className="form-group"><label>الأيقونة (Emoji)</label>
                  <input value={form.emoji} onChange={e => f('emoji', e.target.value)} /></div>
              </div>
              <div className="form-group"><label>رابط الصورة (اختياري)</label>
                <input value={form.imageUrl} onChange={e => f('imageUrl', e.target.value)} placeholder="https://..." /></div>
              <div className="form-group"><label>رابط المشروع (اختياري)</label>
                <input value={form.link} onChange={e => f('link', e.target.value)} placeholder="https://..." /></div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => f('featured', e.target.checked)} style={{ width: 'auto' }} />
                <label htmlFor="featured" style={{ margin: 0 }}>مشروع مميز</label>
              </div>
            </div>
            <div className="modal-actions">
              <button className="action-btn edit" style={{ padding: '10px 24px' }} onClick={handleSave} disabled={saving}>
                {saving ? 'حفظ...' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
