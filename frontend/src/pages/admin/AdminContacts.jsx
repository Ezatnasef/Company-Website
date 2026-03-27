import React, { useEffect, useState, useCallback } from 'react';
import API from '../../utils/api';
import './AdminDashboard.css';

const STATUS_OPTIONS = [
  { key: 'all', label: 'الكل' },
  { key: 'new', label: 'جديد' },
  { key: 'in_progress', label: 'قيد المعالجة' },
  { key: 'done', label: 'مكتمل' },
  { key: 'rejected', label: 'مرفوض' },
];

const STATUS_COLORS = {
  new: '#6C3BFF',
  in_progress: '#f59e0b',
  done: '#10b981',
  rejected: '#ef4444',
};

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchContacts = useCallback(() => {
    setLoading(true);
    const params = { page, limit: 15 };
    if (status !== 'all') params.status = status;
    API.get('/contacts', { params })
      .then(({ data }) => {
        setContacts(data.data);
        setTotal(data.total);
        setPages(data.pages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, status]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const openModal = (c) => {
    setSelected(c);
    setEditStatus(c.status);
    setEditNotes(c.notes || '');
  };

  const saveContact = async () => {
    setSaving(true);
    try {
      await API.patch(`/contacts/${selected._id}`, { status: editStatus, notes: editNotes });
      fetchContacts();
      setSelected(null);
    } catch {}
    setSaving(false);
  };

  const deleteContact = async (id) => {
    if (!window.confirm('هل تريد حذف هذا الطلب؟')) return;
    await API.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>الطلبات</h1>
        <p>إجمالي {total} طلب</p>
      </div>

      <div className="page-toolbar">
        <div className="toolbar-filters">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s.key}
              className={`filter-btn ${status === s.key ? 'active' : ''}`}
              onClick={() => { setStatus(s.key); setPage(1); }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-section">
        <div className="table-wrap">
          {loading ? (
            <div className="spinner" />
          ) : contacts.length === 0 ? (
            <div className="empty-state"><div className="empty-icon">📭</div><p>لا توجد طلبات</p></div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الهاتف</th>
                  <th>البريد</th>
                  <th>الخدمة</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th>إجراء</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td dir="ltr">{c.phone}</td>
                    <td dir="ltr">{c.email}</td>
                    <td>{c.service}</td>
                    <td>
                      <span className="status-badge" style={{
                        background: `${STATUS_COLORS[c.status]}22`,
                        color: STATUS_COLORS[c.status],
                        border: `1px solid ${STATUS_COLORS[c.status]}44`,
                      }}>
                        {STATUS_OPTIONS.find(s => s.key === c.status)?.label}
                      </span>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString('ar-SA')}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="action-btn view" onClick={() => openModal(c)}>عرض</button>
                        <button className="action-btn delete" onClick={() => deleteContact(c._id)}>حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 && (
          <div className="pagination">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={`page-btn ${page === i+1 ? 'active' : ''}`} onClick={() => setPage(i+1)}>
                {i+1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelected(null)}>✕</button>
            <h3>تفاصيل الطلب</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {[['الاسم', selected.name], ['الهاتف', selected.phone], ['البريد', selected.email],
                ['الخدمة', selected.service]].map(([l, v]) => (
                <div key={l}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem', fontWeight: 700 }}>{l}: </span>
                  <span style={{ color: 'var(--text-light)' }}>{v}</span>
                </div>
              ))}
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.83rem', fontWeight: 700 }}>وصف المشروع:</span>
                <p style={{ color: 'var(--text-light)', marginTop: 6, lineHeight: 1.7, fontSize: '0.9rem' }}>{selected.description}</p>
              </div>
            </div>

            <div className="admin-form">
              <div className="form-group">
                <label>الحالة</label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                  {STATUS_OPTIONS.filter(s => s.key !== 'all').map(s => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>ملاحظات</label>
                <textarea rows={3} value={editNotes} onChange={e => setEditNotes(e.target.value)} placeholder="ملاحظات داخلية..." />
              </div>
            </div>

            <div className="modal-actions">
              <button className="action-btn edit" style={{ padding: '10px 24px' }} onClick={saveContact} disabled={saving}>
                {saving ? 'حفظ...' : 'حفظ التغييرات'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
