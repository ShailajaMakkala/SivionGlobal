import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { getImageUrl } from '../utils/getImageUrl';

const BlogDetails = () => {
  const { slug: rawSlug } = useParams();
  // Decode URL encoding (e.g. %20 → space) then normalize to match DB
  const slug = decodeURIComponent(rawSlug || '');
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.get(`/blogs/${encodeURIComponent(slug)}`);
        if (response.data?.data) {
          setBlog(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', slug);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="py-32 text-center text-sky-400 font-medium tracking-widest uppercase text-sm animate-pulse min-h-[60vh] bg-[#0A192F]">Loading intelligence...</div>;
  }

  if (!blog) {
    return (
      <div className="py-32 text-center min-h-[60vh] bg-[#0A192F]">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">Article Not Found</h1>
        <p className="text-slate-400 mb-8 font-light">The intelligence report you are looking for does not exist.</p>
        <Link to="/blog" className="text-sky-400 font-semibold tracking-wider hover:text-white transition-colors uppercase text-sm">&larr; Back to Archives</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - SiviOn Global Technologies</title>
      </Helmet>

      <section className="py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0A192F] min-h-screen">
        <div className="mb-10 text-center">
          <div className="text-sm font-bold text-sky-400 mb-4 uppercase tracking-widest">
            {formatDate(blog.created_at)}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white mb-8 leading-tight font-heading">{blog.title}</h1>

          {blog.image ? (
            <div className="w-full aspect-video rounded-3xl shadow-2xl mb-12 border border-white/10 overflow-hidden">
              <img src={getImageUrl(blog.image)} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-[#112240] rounded-3xl mb-12 flex items-center justify-center border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-sky-400/10 mix-blend-overlay"></div>
              <span className="text-white/20 font-black text-4xl tracking-widest uppercase">{blog.title.substring(0, 10)}...</span>
            </div>
          )}
        </div>

        <div
          className="prose prose-invert prose-lg max-w-none prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-headings:font-heading prose-headings:font-black prose-headings:text-white prose-p:font-light prose-p:leading-relaxed prose-p:text-white text-white text-justify whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link to="/blog" className="text-sky-400 font-semibold tracking-wider uppercase text-sm hover:text-white transition-colors flex items-center">
            <span className="mr-2">&larr;</span> Back to Archives
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
