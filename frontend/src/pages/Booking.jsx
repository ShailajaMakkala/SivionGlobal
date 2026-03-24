import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, Monitor, Smartphone, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import apiClient from '../api/apiClient';

const Booking = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        preferred_date: '',
        preferred_time: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await apiClient.post('/consultations', formData);
            setStatus({
                type: 'success',
                message: 'Your consultation slot has been secured! Our team will contact you shortly to confirm the time.'
            });
            setFormData({ first_name: '', last_name: '', email: '', company: '', preferred_date: '', preferred_time: '', message: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.error || 'Something went wrong. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Book a Consultation - SiviOn Global Technologies</title>
                <meta name="description" content="Schedule a free consultation with our tech experts to discuss your enterprise IT and digital marketing needs." />
            </Helmet>

            {/* Header Section */}
            <div className="bg-[#0A192F] pt-32 pb-20 text-center relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-black mb-6 font-heading tracking-tight text-white"
                    >
                        Schedule a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Consultation</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto"
                    >
                        Let's discuss how SiviOn Global Technologies can accelerate your digital transformation journey. Pick a time that works best for you.
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-[#0A192F] relative min-h-[60vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">

                        {/* Left Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            <div className="glass-panel p-8 rounded-3xl">
                                <h3 className="text-2xl font-bold text-white mb-6">What to expect</h3>
                                <ul className="space-y-6">
                                    {[
                                        { icon: Monitor, title: 'Architecture Review', desc: "We'll evaluate your current tech stack and identify bottlenecks." },
                                        { icon: Smartphone, title: 'Digital Strategy', desc: "Discuss marketing plans and SEO maneuvers tailored to your niche." },
                                        { icon: MessageSquare, title: 'Actionable Proposal', desc: "Receive a comprehensive development roadmap post-meeting." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex flex-shrink-0 items-center justify-center mr-4">
                                                <item.icon className="w-5 h-5 text-sky-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                                                <p className="text-sm font-light text-slate-400">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="glass-panel p-8 rounded-3xl bg-gradient-to-br from-blue-900/40 to-transparent border-sky-500/20">
                                <h3 className="text-lg font-bold text-white mb-2">Need immediate assistance?</h3>
                                <p className="text-slate-400 text-sm mb-4 font-light">Skip the form and reach out directly to our sales engineering team.</p>
                                <a href="mailto:hello@sivion.com" className="text-sky-400 font-semibold hover:text-white transition-colors">hello@sivion.com</a>
                            </div>
                        </motion.div>

                        {/* Right Booking Form Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden">
                                {/* Form decorative background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                                {/* Status Message */}
                                {status.message && (
                                    <div className={`relative z-10 p-4 rounded-xl mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">First Name <span className="text-sky-400">*</span></label>
                                            <input
                                                type="text" name="first_name" required value={formData.first_name} onChange={handleChange}
                                                className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Last Name <span className="text-sky-400">*</span></label>
                                            <input
                                                type="text" name="last_name" required value={formData.last_name} onChange={handleChange}
                                                className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Work Email <span className="text-sky-400">*</span></label>
                                        <input
                                            type="email" name="email" required value={formData.email} onChange={handleChange}
                                            className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                            placeholder="example@company.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Company / Organization</label>
                                        <input
                                            type="text" name="company" value={formData.company} onChange={handleChange}
                                            className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                            placeholder="Your Enterprise Ltd."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-sky-400" /> Preferred Date <span className="text-sky-400 ml-1">*</span>
                                            </label>
                                            <input
                                                type="date" name="preferred_date" required value={formData.preferred_date} onChange={handleChange}
                                                className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-sky-500 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-sky-400" /> Preferred Time <span className="text-sky-400 ml-1">*</span>
                                            </label>
                                            <select
                                                name="preferred_time" required value={formData.preferred_time} onChange={handleChange}
                                                className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3.5 text-slate-300 focus:outline-none focus:border-sky-500 transition-all appearance-none"
                                            >
                                                <option value="">Select a time slot</option>
                                                <option value="Morning (09:00 - 12:00 EST)">Morning (09:00 - 12:00 EST)</option>
                                                <option value="Afternoon (12:00 - 15:00 EST)">Afternoon (12:00 - 15:00 EST)</option>
                                                <option value="Evening (15:00 - 18:00 EST)">Evening (15:00 - 18:00 EST)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <label className="text-sm font-medium text-slate-300">How can we help you? <span className="text-sky-400">*</span></label>
                                        <textarea
                                            name="message" required rows="4" value={formData.message} onChange={handleChange}
                                            className="w-full bg-[#0A192F]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600"
                                            placeholder="Tell us briefly about your project goals or IT bottlenecks..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-sky-500 hover:shadow-[0_0_20px_rgba(0,216,255,0.4)] transition-all uppercase tracking-wider text-sm flex items-center justify-center group disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Booking...</>
                                        ) : (
                                            <><CheckCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" /> Secure My Slot</>
                                        )}
                                    </button>

                                </form>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Booking;
