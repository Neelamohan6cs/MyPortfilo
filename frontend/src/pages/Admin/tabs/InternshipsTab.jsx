import React, { useState } from 'react';
import API from '../../../utils/api';

const EMPTY = { role: '', company: '', duration: '', description: '' };

export default function InternshipsTab({ data, reload, flash }) {
  const [form,    setForm]    = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const cancel   = () => { setEditing(null); setForm(EMPTY); };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/admin/internships/${editing}/`, form);
      flash('Updated!');
    } else {
      await API.post('/admin/internships/', form);
      flash('Added!');
    }
    cancel();
    reload();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/internships/${id}/`);
    flash('Deleted');
    reload();
  };

  return (
    <div>
      <h2 className="tab-heading">{editing ? 'Edit Internship' : 'Add Internship'}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="row-2">
          <div className="field"><label>Role</label><input name="role" value={form.role} required onChange={onChange} /></div>
          <div className="field"><label>Company</label><input name="company" value={form.company} onChange={onChange} /></div>
        </div>
        <div className="field"><label>Duration</label><input name="duration" value={form.duration} placeholder="JAN – MAR 2024" onChange={onChange} /></div>
        <div className="field"><label>Description</label><textarea name="description" rows={4} value={form.description} onChange={onChange} /></div>
        <div className="btn-row">
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-outline" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      <div className="items-list">
        {(data || []).map((item) => (
          <div key={item.id} className="list-row">
            <span className="list-name">{item.role}</span>
            <span className="list-meta">{item.company}</span>
            <div className="list-actions">
              <button className="btn-edit" onClick={() => { setEditing(item.id); setForm({ role: item.role, company: item.company, duration: item.duration, description: item.description }); }}>Edit</button>
              <button className="btn-del"  onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
