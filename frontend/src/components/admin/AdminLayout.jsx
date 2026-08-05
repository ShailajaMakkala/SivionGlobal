import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Mail, MessageSquare, BriefcaseBusiness, CalendarCheck, LogOut, Menu, X } from 'lucide-react';
import Logo from '../Logo';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('sivion_admin_user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('sivion_admin_token');
    localStorage.removeItem('sivion_admin_user');
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { title: 'Manage Blogs', path: '/admin/blogs', icon: <FileText size={20} /> },
    { title: 'Manage Portfolio', path: '/admin/portfolio', icon: <Briefcase size={20} /> },
    { title: 'Job Applications', path: '/admin/careers', icon: <BriefcaseBusiness size={20} /> },
    { title: 'Consultation Bookings', path: '/admin/consultations', icon: <CalendarCheck size={20} /> },
    { title: 'Quote Requests', path: '/admin/quotes', icon: <MessageSquare size={20} /> },
    { title: 'Contact Messages', path: '/admin/contacts', icon: <Mail size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0A192F] text-slate-300 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-[#112240] border-r border-white/5 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="h-20 flex items-center px-6 border-b border-white/5 justify-between">
          <Link to="/admin" className="outline-none" onClick={() => setSidebarOpen(false)}>
            <div style={{ transform: 'scale(3)', transformOrigin: 'left center' }}>
              <Logo className="h-10 max-w-[200px]" />
            </div>
          </Link>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-blue-600/20 text-sky-400 font-semibold border border-blue-500/30 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-sky-400' : 'text-slate-500'}>{item.icon}</span>
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5 pb-8">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout ({adminUser.name?.split(' ')[0] || 'Admin'})</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-[#112240] border-b border-white/5 flex items-center justify-between px-6 z-30 shadow-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none"></div>
          <button 
            className="md:hidden text-slate-400 hover:text-white relative z-10"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-auto flex items-center gap-4 relative z-10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{adminUser.name || 'System Admin'}</p>
              <p className="text-xs text-sky-400 uppercase tracking-widest">{adminUser.role || 'Super Admin'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white font-black shadow-lg">
              {(adminUser.name || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0A192F] relative">
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-sky-500/5 blur-[150px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
