import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { Lock, Mail, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('sivion_admin_token', response.data.token);
        localStorage.setItem('sivion_admin_user', JSON.stringify(response.data.admin));
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="max-w-md w-full glass-panel p-8 rounded-2xl shadow-2xl relative z-10 border-t border-white/10 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black font-heading mb-2">Admin Portal</h2>
          <p className="text-slate-400 font-light text-sm">Sign in to manage SiviOn Global</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#112240] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                placeholder="admin@sivion.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#112240] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(0,216,255,0.5)] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
