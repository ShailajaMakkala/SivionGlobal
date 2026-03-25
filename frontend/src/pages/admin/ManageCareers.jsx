import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

import apiClient from '../../api/apiClient';
import {
  BriefcaseBusiness, Trash2, Search, FileDown, Loader2,
  Plus, Edit, ToggleLeft, ToggleRight, Briefcase, Users
} from 'lucide-react';

const EMPTY_POSITION = { id: null, title: '', location: '', type: 'Full-time', department: '', description: '', requirements: '', is_active: true };

// ───── Tab: Manage Job Postings ─────
const JobPostingsTab = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(EMPTY_POSITION);
  const authHeaders = { headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` } };

  useEffect(() => {
    apiClient.get('/positions').then(res => {
      if (res.data?.success) setPositions(res.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting?')) return;
    try {
      await apiClient.delete(`/positions/${id}`, authHeaders);
      setPositions(positions.filter(p => p.id !== id));
    } catch { alert('Failed to delete.'); }
  };

  const handleToggle = async (pos) => {
    try {
      const res = await apiClient.put(`/positions/${pos.id}`, { ...pos, is_active: !pos.is_active }, authHeaders);
      if (res.data?.success) setPositions(positions.map(p => p.id === pos.id ? res.data.data : p));
    } catch { alert('Failed to update status.'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (current.id) {
        const res = await apiClient.put(`/positions/${current.id}`, current, authHeaders);
        if (res.data?.success) setPositions(positions.map(p => p.id === current.id ? res.data.data : p));
      } else {
        const res = await apiClient.post('/positions', current, authHeaders);
        if (res.data?.success) setPositions([res.data.data, ...positions]);
      }
      setIsEditing(false);
      setCurrent(EMPTY_POSITION);
    } catch { alert('Error saving position.'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400 font-light">Add, edit, or disable job openings displayed on the Careers page.</p>
        <button
          onClick={() => { setIsEditing(true); setCurrent(EMPTY_POSITION); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus size={18} /> Add Position
        </button>
      </div>

      {isEditing && (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl mb-6">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            {current.id ? 'Edit Position' : 'Add New Position'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Job Title *</label>
                <input required type="text" value={current.title} onChange={e => setCurrent({ ...current, title: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" placeholder="e.g. Senior Java Developer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                <input required type="text" value={current.location} onChange={e => setCurrent({ ...current, location: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" placeholder="Remote / US" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type *</label>
                <select required value={current.type} onChange={e => setCurrent({ ...current, type: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
                <input type="text" value={current.department || ''} onChange={e => setCurrent({ ...current, department: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" placeholder="Engineering, Marketing, etc." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea rows="3" value={current.description || ''} onChange={e => setCurrent({ ...current, description: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 text-sm" placeholder="Brief role overview..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Requirements</label>
                <textarea rows="3" value={current.requirements || ''} onChange={e => setCurrent({ ...current, requirements: e.target.value })}
                  className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 text-sm" placeholder="Skills, experience, qualifications..." />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-sky-500/20">Save Position</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-sky-400 animate-spin" /></div>
        ) : positions.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p>No job positions yet. Click "Add Position" to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#112240] border-b border-white/10">
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Position</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Location</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Type</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Department</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {positions.map(pos => (
                  <tr key={pos.id} className={`hover:bg-white/5 transition-colors ${!pos.is_active ? 'opacity-50' : ''}`}>
                    <td className="p-4">
                      <button onClick={() => handleToggle(pos)} title={pos.is_active ? 'Active – click to deactivate' : 'Inactive – click to activate'}>
                        {pos.is_active
                          ? <ToggleRight className="w-6 h-6 text-emerald-400" />
                          : <ToggleLeft className="w-6 h-6 text-slate-500" />}
                      </button>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-white">{pos.title}</p>
                      {pos.description && <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">{pos.description}</p>}
                    </td>
                    <td className="p-4 text-sm text-slate-400">{pos.location}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">{pos.type}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-400">{pos.department || '—'}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setCurrent(pos); setIsEditing(true); }} className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(pos.id)} className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ───── Tab: View Applications ─────
const ApplicationsTab = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const authHeaders = { headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` } };

  useEffect(() => {
    apiClient.get('/careers', authHeaders).then(res => {
      if (res.data?.success) setApplications(res.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await apiClient.delete(`/careers/${id}`, authHeaders);
      setApplications(applications.filter(a => a.id !== id));
    } catch { alert('Failed to delete.'); }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await apiClient.patch(`/careers/${id}/status`, { status: newStatus }, authHeaders);
      if (response.data?.success) {
        setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));

        // Find the application details to send email
        const app = applications.find(a => a.id === id);
        if (app && (newStatus === 'selected' || newStatus === 'rejected')) {
          sendEmailNotification(app, newStatus);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  const sendEmailNotification = (app, status) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    // Choose template based on status
    const templateId = status === 'selected'
      ? (import.meta.env.VITE_EMAILJS_SELECTED_TEMPLATE_ID || 'template_g3wf66q')
      : (import.meta.env.VITE_EMAILJS_REJECTED_TEMPLATE_ID || 'template_e55htyi');

    const templateParams = {
      to_name: app.name,
      to_email: app.email,
      from_name: 'SiviOn Global Technologies',
      status: status === 'selected' ? 'Selected' : 'Rejected',
      position: app.position,
      message: status === 'selected'
        ? 'Congratulations! You have been selected for the position. We will get in touch with you soon.'
        : 'Thank you for your interest. Unfortunately, we have decided not to move forward with your application at this time.'
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      }, (err) => {
        console.error('Failed to send email:', err);
      });
  };


  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      selected: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
      rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    return styles[status] || styles.pending;
  };


  const filtered = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400 font-light">View and manage candidates who have submitted applications.</p>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input type="text" className="w-full bg-[#112240] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            placeholder="Search name or position..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-sky-400 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <BriefcaseBusiness className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#112240] border-b border-white/10">
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Date</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Applicant</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Position</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Status</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-center">Resume</th>
                  <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-sm text-slate-400 whitespace-nowrap">{new Date(app.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-white">{app.name}</p>
                      <p className="text-xs text-sky-400">{app.email}</p>
                      <p className="text-xs text-slate-500">{app.phone || 'No phone'}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">{app.position}</span>
                    </td>
                    <td className="p-4">
                      <select
                        value={app.status || 'pending'}
                        onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border capitalize outline-none cursor-pointer transition-colors ${getStatusBadge(app.status)}`}
                      >
                        <option value="pending" className="bg-[#112240] text-amber-400 font-bold">Pending</option>
                        <option value="selected" className="bg-[#112240] text-emerald-300 font-bold">Selected</option>
                        <option value="rejected" className="bg-[#112240] text-red-400 font-bold">Rejected</option>

                      </select>
                    </td>
                    <td className="p-4 text-center">
                      {app.resume_url ? (
                        <a href={app.resume_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-lg transition-colors border border-blue-500/30">
                          <FileDown className="w-4 h-4" />
                        </a>
                      ) : <span className="text-xs text-slate-500 italic">No URL</span>}
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(app.id)} className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// ───── Main Component with Tabs ─────
const ManageCareers = () => {
  const [activeTab, setActiveTab] = useState('postings');

  const tabs = [
    { id: 'postings', label: 'Job Postings', icon: <Briefcase size={16} /> },
    { id: 'applications', label: 'Applications', icon: <Users size={16} /> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white font-heading mb-2">Careers Management</h1>
        <p className="text-slate-400 font-light">Manage open job positions and review incoming applications.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-white/10 pb-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm transition-all rounded-t-xl border-b-2 ${activeTab === tab.id
                ? 'border-sky-400 text-sky-400 bg-sky-400/5'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'postings' ? <JobPostingsTab /> : <ApplicationsTab />}
    </div>
  );
};

export default ManageCareers;