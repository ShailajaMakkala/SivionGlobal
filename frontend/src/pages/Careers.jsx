import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import apiClient from '../api/apiClient';
import { Briefcase, MapPin, Send, Loader2 } from 'lucide-react';

const Careers = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);
  const [positionsLoading, setPositionsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/positions').then(res => {
      if (res.data?.success) {
        setOpenPositions(res.data.data.filter(p => p.is_active));
      }
    }).catch(console.error).finally(() => setPositionsLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('position', formData.position);
      if (resumeFile) data.append('resume', resumeFile);

      await apiClient.post('/careers/apply', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus({ type: 'success', message: 'Application submitted successfully. We will review it shortly!' });
      setFormData({ name: '', email: '', phone: '', position: '' });
      setResumeFile(null);
      // Reset file input
      const fileInput = document.getElementById('resume-upload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to submit application.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers - SiviOn Global Technologies</title>
        <meta name="description" content="Join our dynamic team at SiviOn Global Technologies. View open positions and apply online." />
      </Helmet>

      <div className="bg-[#0A192F] py-32 text-center text-white relative overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight text-glow">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto">
            Build your career with a global technology leader.
          </p>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0A192F]">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Open Positions */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-4">Opportunities</h2>
            <h3 className="text-3xl font-bold text-white mb-8 font-heading">Current Openings</h3>
            
            {positionsLoading ? (
              <div className="flex flex-col items-center justify-center p-12 glass-panel rounded-2xl border border-white/5">
                <Loader2 className="w-8 h-8 text-sky-400 animate-spin mb-4" />
                <p className="text-slate-400 font-light italic">Fetching latest opportunities...</p>
              </div>
            ) : openPositions.length === 0 ? (
              <div className="glass-panel p-10 rounded-2xl border border-white/5 text-center">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h4 className="text-white font-bold mb-2">No Active Openings</h4>
                <p className="text-slate-400 text-sm font-light">
                  We don't have any specific roles open right now, but we're always looking for talent. 
                  Submit a <strong>General Application</strong> and we'll keep you in mind!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {openPositions.map((job, idx) => (
                  <div 
                    key={idx} 
                    className="glass-panel p-6 rounded-2xl hover:border-sky-500/50 transition-colors group cursor-pointer border border-white/5" 
                    onClick={() => {
                      setFormData({...formData, position: job.title});
                      window.scrollTo({ top: document.querySelector('form').offsetTop - 100, behavior: 'smooth' });
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{job.title}</h3>
                        <div className="flex items-center text-slate-400 mt-2 text-sm font-light">
                          <MapPin className="w-4 h-4 mr-1 text-blue-400" /> {job.location}
                          <span className="mx-3 text-white/20">|</span>
                          <Briefcase className="w-4 h-4 mr-1 text-sky-400" /> {job.type}
                        </div>
                        {job.department && (
                          <p className="text-xs text-slate-500 mt-2">Department: {job.department}</p>
                        )}
                      </div>
                      <div className="text-sky-400 text-sm font-semibold tracking-wider group-hover:translate-x-1 transition-transform uppercase flex items-center">
                        Apply <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Application Form */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-sky-400/5 rounded-3xl pointer-events-none"></div>
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10 font-heading">Submit Your Application</h3>
            
            {status.message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium relative z-10 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Position Applying For *</label>
                <select required className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all placeholder-slate-500" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})}>
                  <option value="" className="bg-[#112240]">Select a position</option>
                  {openPositions.map((job, idx) => (
                    <option key={idx} value={job.title} className="bg-[#112240]">{job.title}</option>
                  ))}
                  <option value="General Application" className="bg-[#112240]">General Application</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input required type="email" className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                <input required type="tel" className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Upload Resume (PDF only) *</label>
                <div className="relative">
                  <input
                    id="resume-upload"
                    required
                    type="file"
                    accept=".pdf,application/pdf"
                    className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-sky-500 cursor-pointer"
                    onChange={e => setResumeFile(e.target.files[0])}
                  />
                </div>
                <p className="text-xs text-sky-400/80 mt-2 font-light">Only PDF files are accepted. Max size: 5MB.</p>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(0,216,255,0.6)] disabled:opacity-70 flex items-center justify-center mt-6 uppercase tracking-wider text-sm">
                {loading ? 'Submitting...' : <>Submit Application <Send className="w-4 h-4 ml-2" /></>}
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Careers;
