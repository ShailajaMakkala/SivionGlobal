import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { FileText, Trash2, Edit, Plus, Search, Loader2 } from 'lucide-react';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ id: null, title: '', slug: '', content: '', author: '', image_url: '', card_bg: '', meta_description: '' });

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get('/blogs');
      if (response.data?.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await apiClient.delete(`/blogs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('sivion_admin_token')}` }
        });
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        alert('Failed to delete blog.');
      }
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setCurrentBlog(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', currentBlog.title);
      formData.append('slug', currentBlog.slug);
      formData.append('content', currentBlog.content);
      formData.append('author', currentBlog.author);
      formData.append('meta_description', currentBlog.meta_description);
      
      if (currentBlog.image_url instanceof File) {
        formData.append('image', currentBlog.image_url);
      } else if (typeof currentBlog.image_url === 'string') {
        formData.append('image', currentBlog.image_url);
      }
      
      if (currentBlog.card_bg instanceof File) {
        formData.append('card_bg', currentBlog.card_bg);
      } else if (typeof currentBlog.card_bg === 'string') {
        formData.append('card_bg', currentBlog.card_bg);
      }

      if (currentBlog.id) {
        const response = await apiClient.put(`/blogs/${currentBlog.id}`, formData);
        if (response.data.success) {
          setBlogs(blogs.map(b => b.id === currentBlog.id ? response.data.data : b));
        }
      } else {
        const response = await apiClient.post('/blogs', formData);
        if (response.data.success) {
          setBlogs([response.data.data, ...blogs]);
        }
      }
      setIsEditing(false);
      setCurrentBlog({ id: null, title: '', slug: '', content: '', author: '', image_url: '', card_bg: '', meta_description: '' });
    } catch (error) {
      console.error('Save error:', error);
      const errMsg = error.response?.data?.error || error.message || 'Unknown error';
      alert(`Error saving blog post: ${errMsg}`);
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog({
      ...blog,
      image_url: blog.image
    });
    setIsEditing(true);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white font-heading mb-2">Manage Blogs</h1>
          <p className="text-slate-400 font-light">Create, edit, and publish content for your audience. Note: Content supports raw HTML.</p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500" />
            </div>
            <input
              type="text"
              className="w-full bg-[#112240] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => { setIsEditing(true); setCurrentBlog({ id: null, title: '', slug: '', content: '', author: '', image_url: '', card_bg: '', meta_description: '' }); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] whitespace-nowrap"
          >
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl mb-8 animate-[fadeIn_0.3s_ease-out]">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
            {currentBlog.id ? 'Edit Post' : 'Create New Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input required type="text" value={currentBlog.title} onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Slug (URL Path)</label>
                <input required type="text" value={currentBlog.slug} onChange={e => setCurrentBlog({ ...currentBlog, slug: e.target.value })} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 font-mono text-sm" placeholder="e.g. new-tech-trends" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                <input type="text" value={currentBlog.author || ''} onChange={e => setCurrentBlog({ ...currentBlog, author: e.target.value })} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL (Full Article)</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'image_url')} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Card Background Image URL</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'card_bg')} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Meta Description (SEO)</label>
                <input type="text" value={currentBlog.meta_description || ''} onChange={e => setCurrentBlog({ ...currentBlog, meta_description: e.target.value })} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">Content (HTML Supported)</label>
                <textarea required rows="10" value={currentBlog.content} onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-sky-500 font-mono text-sm" placeholder="<p>Write your amazing blog details here...</p>" />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition-colors">Cancel</button>
              <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-sky-500/20">Save Post</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p className="text-lg">No blog posts found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#112240] border-b border-white/10">
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Status</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Title & Slug</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Author</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase">Date</th>
                    <th className="p-4 text-xs font-semibold text-slate-300 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] block"></span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-white mb-0.5">{blog.title}</p>
                        <p className="text-xs text-sky-400 font-mono">/{blog.slug}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-400">{blog.author || 'System'}</td>
                      <td className="p-4 text-sm text-slate-400">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(blog)} className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(blog.id)} className="p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors">
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

export default ManageBlogs;
