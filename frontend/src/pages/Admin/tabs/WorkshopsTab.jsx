import React, { useState } from 'react';
import API from '../../../utils/api';

const EMPTY = { title: '', organizer: '', date: '', description: '' };

export default function WorkshopsTab({ data, reload, flash }) {
  const [form,    setForm]    = useState(EMPTY);
  const [image,   setImage]   = useState(null);
  const [editing, setEditing] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const cancel   = () => { setEditing(null); setForm(EMPTY); setImage(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (image) fd.append('image', image);
    if (editing) {
      await API.put(`/admin/workshops/${editing}/`, fd);
      flash('Updated!');
    } else {
      await API.post('/admin/workshops/', fd);
      flash('Added!');
    }
    cancel();
    reload();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/workshops/${id}/`);
    flash('Deleted');
    reload();
  };

  return (
    <div>
      <h2 className="tab-heading">{editing ? 'Edit Workshop' : 'Add Workshop'}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="field"><label>Workshop Title</label><input name="title" value={form.title} required onChange={onChange} /></div>
        <div className="row-2">
          <div className="field"><label>Organizer</label><input name="organizer" value={form.organizer} onChange={onChange} /></div>
          <div className="field"><label>Date</label><input name="date" value={form.date} placeholder="March 29–30, 2025" onChange={onChange} /></div>
        </div>
        <div className="field"><label>Description</label><textarea name="description" rows={3} value={form.description} onChange={onChange} /></div>
        <div className="field"><label>Workshop Image</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /></div>
        <div className="btn-row">
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'}</button>
          {editing && <button type="button" className="btn-outline" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      <div className="items-list">
        {(data || []).map((ws) => (
          <div key={ws.id} className="list-row">
            <span className="list-name">{ws.title}</span>
            <span className="list-meta">{ws.organizer}</span>
            <div className="list-actions">
              <button className="btn-edit" onClick={() => { setEditing(ws.id); setForm({ title: ws.title, organizer: ws.organizer, date: ws.date, description: ws.description }); }}>Edit</button>
              <button className="btn-del"  onClick={() => handleDelete(ws.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
