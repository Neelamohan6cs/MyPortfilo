import React, { useState } from 'react';
import API from '../../../utils/api';

const EMPTY = { title: '', description: '', tech_stack: '', github_url: '', live_url: '', video_url: '' };

export default function ProjectsTab({ data, reload, flash }) {
  const [form,    setForm]    = useState(EMPTY);
  const [image,   setImage]   = useState(null);
  const [editing, setEditing] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ title: p.title, description: p.description, tech_stack: p.tech_stack, github_url: p.github_url, live_url: p.live_url, video_url: p.video_url });
  };

  const cancel = () => { setEditing(null); setForm(EMPTY); setImage(null); };

  const handleSave = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    if (image) fd.append('image', image);
    if (editing) {
      await API.put(`/admin/projects/${editing}/`, fd);
      flash('Project updated!');
    } else {
      await API.post('/admin/projects/', fd);
      flash('Project added!');
    }
    cancel();
    reload();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/projects/${id}/`);
    flash('Project deleted');
    reload();
  };

  return (
    <div>
      <h2 className="tab-heading">{editing ? 'Edit Project' : 'Add Project'}</h2>
      <form className="admin-form" onSubmit={handleSave}>
        <div className="field">
          <label>Title</label>
          <input name="title" value={form.title} required onChange={onChange} />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea name="description" rows={4} value={form.description} onChange={onChange} />
        </div>
        <div className="field">
          <label>Tech Stack (comma separated)</label>
          <input name="tech_stack" value={form.tech_stack} placeholder="React, Django, MongoDB" onChange={onChange} />
        </div>
        <div className="row-2">
          <div className="field">
            <label>GitHub URL</label>
            <input name="github_url" value={form.github_url} onChange={onChange} />
          </div>
          <div className="field">
            <label>Live URL</label>
            <input name="live_url" value={form.live_url} onChange={onChange} />
          </div>
        </div>
        <div className="field">
          <label>Video URL (YouTube embed link)</label>
          <input name="video_url" value={form.video_url} placeholder="https://www.youtube.com/embed/..." onChange={onChange} />
        </div>
        <div className="field">
          <label>Project Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="btn-row">
          <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add Project'}</button>
          {editing && <button type="button" className="btn-outline" onClick={cancel}>Cancel</button>}
        </div>
      </form>

      <div className="items-list">
        {(data || []).map((p) => (
          <div key={p.id} className="list-row">
            <span className="list-name">{p.title}</span>
            <div className="list-actions">
              <button className="btn-edit" onClick={() => startEdit(p)}>Edit</button>
              <button className="btn-del"  onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
