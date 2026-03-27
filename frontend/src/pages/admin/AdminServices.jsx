import React, { useEffect, useState, useCallback } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

const EMPTY = { title: '', description: '', icon: '🌐', category: 'web', order: 0 };

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetch = useCallback(() => {
    setLoading(true);
    API.get('/services').then(({ data }) => setServices(data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const openCreate = () => { setForm(EMPTY); setModal('create'); };
  const openEdit = (s) => {
    setForm({ title: s.title, description: s.description, icon: s.icon, category: s.category, order: s.order });
    setModal({ type: 'edit', id: s._id });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (modal === 'create') await API.post('/services', form);
      else await API.put(`/services/${modal.id}`, form);
      fetch(); setModal(null);
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('حذف هذه الخدمة؟')) return;
    await API.delete(`/services/${id}`); fetch();
  };

  const f = (field, val) => setForm(p => ({ ...p, [field]: val }));

  return (
    <div className="dashboard">
      <div className="page-header"><h1>الخدمات</h1><p>إدارة خدمات الشركة</p></div>
      <div className="page-toolbar">
        <button className="btn-primary" onClick={openCreate}>+ إضافة خدمة</button>
      </div>

      <div className="dash-section">
        <div className="table-wrap">
          {loading ? <div className="spinner" /> : services.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">⚙️</div><p>لا توجد خدمات</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>الأيقونة</th><th>الاسم</th><th>الفئة</th><th>الترتيب</th><th>إجراء</th></tr></thead>
              <tbody>
                {services.map(s => (
                  <tr key={s._id}>
                    <td style={{ fontSize: '1.4rem' }}>{s.icon}</td>
                    <td>{s.title}</td>
                    <td><span className="status-badge" style={{ background: 'rgba(0,229,195,0.1)', color: 'var(--accent)', border: '1px solid rgba(0,229,195,0.2)' }}>{s.category}</span></td>
                    <td>{s.order}</td>
                    <td><div style={{ display: 'flex', gap: 8 }}>
                      <button className="action-btn edit" onClick={() => openEdit(s)}>تعديل</button>
                      <button className="action-btn delete" onClick={() => handleDelete(s._id)}>حذف</button>
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
            <h3>{modal === 'create' ? 'إضافة خدمة' : 'تعديل الخدمة'}</h3>
            <div className="admin-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}>
                <div className="form-group"><label>اسم الخدمة</label>
                  <input value={form.title} onChange={e => f('title', e.target.value)} /></div>
                <div className="form-group"><label>الأيقونة</label>
                  <input value={form.icon} onChange={e => f('icon', e.target.value)} style={{ width: 70 }} /></div>
              </div>
              <div className="form-group"><label>الوصف</label>
                <textarea rows={3} value={form.description} onChange={e => f('description', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label>الفئة</label>
                  <select value={form.category} onChange={e => f('category', e.target.value)}>
                    <option value="web">تطوير مواقع</option>
                    <option value="app">تطبيقات</option>
                    <option value="marketing">تسويق</option>
                    <option value="ai">ذكاء اصطناعي</option>
                    <option value="support">دعم فني</option>
                  </select></div>
                <div className="form-group"><label>الترتيب</label>
                  <input type="number" value={form.order} onChange={e => f('order', e.target.value)} /></div>
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

export default AdminServices;
