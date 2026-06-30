import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import apiClient from '../api/apiClient';
import { Briefcase, MapPin, Send, Loader2, X, ChevronRight, FileText, CheckCircle } from 'lucide-react';

/* ─── Job Details Modal ─────────────────────────────────────────────── */
const JobDetailsModal = ({ job, onClose, onApply }) => {
  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0D2137] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[#0D2137] border-b border-white/10 px-8 py-6">
          <div>
            <h2 className="text-2xl font-black text-white font-heading leading-tight">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-slate-400 font-light">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-400" /> {job.location}
              </span>
              <span className="text-white/20">|</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-sky-400" /> {job.type}
              </span>
              {job.department && (
                <>
                  <span className="text-white/20">|</span>
                  <span className="text-slate-500">Dept: {job.department}</span>
                </>
              )}
            </div>
          </div>
          <button
            id="close-job-modal"
            onClick={onClose}
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-8">
          {/* Description */}
          {job.description && (
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-sky-400 uppercase tracking-widest mb-4">
                <FileText className="w-4 h-4" /> Job Description
              </h3>
              <div className="text-slate-300 font-light leading-relaxed whitespace-pre-line text-sm">
                {job.description}
              </div>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-sky-400 uppercase tracking-widest mb-4">
                <CheckCircle className="w-4 h-4" /> Requirements
              </h3>
              <div className="text-slate-300 font-light leading-relaxed whitespace-pre-line text-sm">
                {job.requirements}
              </div>
            </div>
          )}

          {!job.description && !job.requirements && (
            <p className="text-slate-500 italic text-sm text-center py-4">
              Full details coming soon. Click Apply to express your interest.
            </p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-[#0D2137] border-t border-white/10 px-8 py-5 flex flex-col sm:flex-row gap-3">
          <button
            id="apply-from-modal-btn"
            onClick={() => { onApply(job.title); onClose(); }}
            className="flex-1 bg-blue-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(0,216,255,0.5)] uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            Apply for this Role <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="sm:w-auto flex-1 sm:flex-none bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium py-3 px-6 rounded-xl border border-white/10 transition-all text-sm uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Careers Page ─────────────────────────────────────────────── */
const Careers = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null); // job to show in modal

  useEffect(() => {
    apiClient.get('/positions').then(res => {
      if (res.data?.success) {
        setOpenPositions(res.data.data.filter(p => p.is_active));
      }
    }).catch(console.error).finally(() => setPositionsLoading(false));
  }, []);

  const handleApply = (positionTitle) => {
    setFormData(prev => ({ ...prev, position: positionTitle }));
    // Small timeout lets the modal close animation finish first
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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

      {/* Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
        />
      )}

      {/* Hero */}
      <div className="bg-[#0A192F] py-32 text-center text-white relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
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

          {/* ── Open Positions ── */}
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
                    className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-sky-500/40 transition-all group"
                  >
                    {/* Job header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center text-slate-400 mt-2 text-sm font-light">
                          <MapPin className="w-4 h-4 mr-1 text-blue-400" /> {job.location}
                          <span className="mx-3 text-white/20">|</span>
                          <Briefcase className="w-4 h-4 mr-1 text-sky-400" /> {job.type}
                        </div>
                        {job.department && (
                          <p className="text-xs text-slate-500 mt-2">Department: {job.department}</p>
                        )}
                      </div>
                    </div>

                    {/* Preview of description */}
                    {job.description && (
                      <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                        {job.description}
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      <button
                        id={`view-details-btn-${idx}`}
                        onClick={() => setSelectedJob(job)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg transition-all uppercase tracking-wider"
                      >
                        <FileText className="w-3.5 h-3.5" /> View Details
                      </button>
                      <button
                        id={`apply-btn-${idx}`}
                        onClick={() => handleApply(job.title)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-400/50 px-4 py-2 rounded-lg transition-all uppercase tracking-wider"
                      >
                        Apply <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Application Form ── */}
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-sky-400/5 rounded-3xl pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10 font-heading">Submit Your Application</h3>

            {status.message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium relative z-10 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Position Applying For *</label>
                <select
                  required
                  className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                  value={formData.position}
                  onChange={e => setFormData({ ...formData, position: e.target.value })}
                >
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
                  <input
                    required type="text"
                    className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input
                    required type="email"
                    className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                <input
                  required type="tel"
                  className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Upload Resume (PDF only) *</label>
                <input
                  id="resume-upload"
                  required type="file"
                  accept=".pdf,application/pdf"
                  className="w-full bg-[#112240] text-white px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-sky-500 cursor-pointer"
                  onChange={e => setResumeFile(e.target.files[0])}
                />
                <p className="text-xs text-sky-400/80 mt-2 font-light">Only PDF files are accepted. Max size: 5MB.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(0,216,255,0.6)] disabled:opacity-70 flex items-center justify-center mt-6 uppercase tracking-wider text-sm"
              >
                {loading ? 'Submitting...' : <> Submit Application <Send className="w-4 h-4 ml-2" /> </>}
              </button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Careers;
