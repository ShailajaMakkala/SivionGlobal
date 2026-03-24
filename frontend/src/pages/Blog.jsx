import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackBlogs = [
    { id: 1, title: 'Top 5 Digital Marketing Trends in 2024', slug: 'digital-marketing-trends-2024', author: 'Marketing Team', created_at: '2024-01-15T00:00:00.000Z', excerpt: 'Discover the latest strategies and tools to supercharge your digital presence this year.' },
    { id: 2, title: 'Why Your Business Needs a Custom Web App', slug: 'why-custom-web-apps', author: 'Tech Lead', created_at: '2024-02-10T00:00:00.000Z', excerpt: 'Learn how custom web applications provide better security, scalability, and ROI compared to off-the-shelf solutions.' },
    { id: 3, title: 'Mastering SEO: A Beginner\'s Guide', slug: 'mastering-seo-guide', author: 'SEO Expert', created_at: '2024-03-05T00:00:00.000Z', excerpt: 'A comprehensive guide to understanding search engine optimization and improving your online visibility.' },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get('/blogs');
        if (response.data?.data && response.data.data.length > 0) {
          setBlogs(response.data.data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (error) {
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Helmet>
        <title>Blog & Insights - SiviOn Global Technologies</title>
        <meta name="description" content="Read the latest insights on technology, web development, SEO, and digital marketing from our experts." />
      </Helmet>

      <div className="bg-[#0A192F] py-32 text-center text-white relative overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight text-glow">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">News</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto">
            Discover the latest trends in technology and digital marketing.
          </p>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0A192F] min-h-screen">
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium tracking-widest uppercase text-sm animate-pulse">Loading intelligence...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="glass-panel rounded-3xl overflow-hidden hover:border-sky-500/50 transition-all border border-white/10 flex flex-col h-full group">
                <div className="h-48 bg-[#112240] flex items-center justify-center p-6 text-center relative overflow-hidden border-b border-white/10">
                  {blog.card_bg ? (
                    <img src={blog.card_bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-sky-400/20 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  )}
                  <span className="text-2xl font-black font-heading text-white opacity-40 group-hover:opacity-100 transition-opacity relative z-10 drop-shadow-md text-glow">{blog.title}</span>
                </div>
                <div className="p-8 flex flex-col flex-grow relative bg-white/[0.02]">
                  <div className="text-xs font-bold text-sky-400 mb-3 uppercase tracking-widest">
                    {formatDate(blog.created_at)} <span className="mx-2 text-white/20">|</span> {blog.author}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-sky-300 transition-all font-heading">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  <div 
                    className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.excerpt || 'Read the full article to learn more about this topic and discover valuable insights for your digital strategy.' }}
                  />
                  <Link to={`/blog/${blog.slug}`} className="text-sm font-semibold text-sky-400 hover:text-white transition-colors mt-auto inline-flex items-center uppercase tracking-wider">
                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Blog;
