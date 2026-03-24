import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const StaticPage = ({ title, content }) => {
  return (
    <>
      <Helmet>
        <title>{title} - SiviOn Global Technologies</title>
      </Helmet>

      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>

      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate prose-blue max-w-none">
          {content ? (
            typeof content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              content
            )
          ) : (
            <p className="text-slate-600">This page is currently under development. Please check back later.</p>
          )}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">&larr; Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaticPage;
