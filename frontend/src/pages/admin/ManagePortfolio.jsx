import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { Briefcase, Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';

const ManagePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({ id: null, title: '', category: '', client: '', image_url: '', card_bg: '', completion_date: '', tech_stack: [], description: '' });

  const fetchProjects = async () => {
    try {
      const response = await apiClient.get('/portfolio');
      if (response.data?.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.delete(`/portfolio/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete project.');
      }
    }
  };

  const handleTechStackChange = (e) => {
    const tsArray = e.target.value.split(',').map(item => item.trim());
    setCurrentProject({ ...currentProject, tech_stack: tsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map frontend 'tech_stack' array to backend 'technologies' string
      const payload = {
        ...currentProject,
        image: currentProject.image_url, // Ensure field mapping
        technologies: Array.isArray(currentProject.tech_stack) 
          ? currentProject.tech_stack.join(', ') 
          : currentProject.tech_stack
      };

      if (currentProject.id) {
        const response = await apiClient.put(`/portfolio/${currentProject.id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        if (response.data.success) {
          setProjects(projects.map(p => p.id === currentProject.id ? response.data.data : p));
        }
      } else {
        const response = await apiClient.post('/portfolio', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        if (response.data.success) {
          setProjects([response.data.data, ...projects]);
        }
      }
      setIsEditing(false);
      setCurrentProject({ id: null, title: '', category: '', client: '', image_url: '', card_bg: '', completion_date: '', tech_stack: [], description: '' });
    } catch (error) {
       console.error('Save error:', error);
       alert('Error saving project.');
    }
  };

  const handleEdit = (project) => {
    setCurrentProject({
      ...project,
      image_url: project.image, // Map backend 'image' to frontend 'image_url'
      tech_stack: typeof project.technologies === 'string' 
        ? project.technologies.split(',').map(t => t.trim()) 
        : (project.technologies || [])
    });
    setIsEditing(true);
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading mb-2">Manage Portfolio</h1>
          <p className="text-slate-400 font-light">Showcase your best corporate work and case studies.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              className="w-full bg-[#112240] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              placeholder="Search by title or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { setIsEditing(true); setCurrentProject({ id: null, title: '', category: '', client: '', image_url: '', card_bg: '', completion_date: '', tech_stack: [], description: '' }); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] whitespace-nowrap"
          >
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl mb-8 animate-[fadeIn_0.3s_ease-out]">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            {currentProject.id ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Project Title</label>
                <input required type="text" value={currentProject.title} onChange={e => setCurrentProject({...currentProject, title: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category (e.g. Web Development)</label>
                <input required type="text" value={currentProject.category} onChange={e => setCurrentProject({...currentProject, category: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Client</label>
                <input type="text" value={currentProject.client || ''} onChange={e => setCurrentProject({...currentProject, client: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL (Full View)</label>
                <input type="text" value={currentProject.image_url || ''} onChange={e => setCurrentProject({...currentProject, image_url: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" placeholder="e.g., /clinicappointment.png or https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Card Background Image URL</label>
                <input type="text" value={currentProject.card_bg || ''} onChange={e => setCurrentProject({...currentProject, card_bg: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" placeholder="e.g., /clinicappointment.png or https://..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack (Comma Separated)</label>
                <input type="text" value={(currentProject.tech_stack || []).join(', ')} onChange={handleTechStackChange} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 text-sm" placeholder="React, Node.js, PostgreSQL" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea rows="4" value={currentProject.description || ''} onChange={e => setCurrentProject({...currentProject, description: e.target.value})} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 text-sm" placeholder="A brief summary of what the project accomplished..." />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-sky-500/20">Save Project</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className="text-lg">No portfolio projects found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#112240] border-b border-white/10">
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Title & Category</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Client</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Tech Stack</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProjects.map(project => (
                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <p className="text-sm font-bold text-white mb-0.5">{project.title}</p>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">{project.category}</span>
                      </td>
                      <td className="p-4 text-sm text-slate-400">{project.client || 'N/A'}</td>
                      <td className="p-4 text-xs text-slate-500">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(typeof project.technologies === 'string' ? project.technologies.split(',') : (project.technologies || [])).slice(0, 3).map((tech, i) => (
                            <span key={i} className="bg-white/5 px-2 py-1 rounded text-slate-400">{tech}</span>
                          ))}
                          {(Array.isArray(project.technologies) ? project.technologies.length > 3 : (project.technologies?.split(',')?.length > 3)) && 
                            <span className="px-2 py-1">+{(Array.isArray(project.technologies) ? project.technologies.length : project.technologies.split(',').length) - 3}</span>
                          }
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(project)} className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
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
      )}
    </div>
  );
};

export default ManagePortfolio;
