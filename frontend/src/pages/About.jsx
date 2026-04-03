import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, Users, Target, Globe } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - SiviOn Global Technologies</title>
        <meta name="description" content="Learn about SiviOn Global Technologies, our mission, vision, and the team driving digital innovation." />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-[#0A192F] py-32 text-center text-white relative overflow-hidden border-b border-white/5">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A192F] to-[#0A192F]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight"
          >
            Decoding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Future</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed"
          >
            We are a collective of elite engineers, designers, and strategists obsessed with pushing the boundaries of what is possible on the web.
          </motion.p>
        </div>
      </div>

      {/* Story & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-4">Our Origin</h2>
            <h3 className="text-4xl font-black text-white mb-6 font-heading leading-tight">Born from a desire to engineer perfection.</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 font-light">
              Founded in 2018, SiviOn Global Technologies started with a simple premise: enterprise software doesn't have to be slow, bloated, or ugly.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
              Today, we partner with industry leaders and disruptive startups to architect platforms that scale globally, load instantly, and command attention.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
               <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-500">
                  <Target className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Our Mission</h4>
                  <p className="text-sm text-slate-400 font-light">To deliver uncompromising digital quality that accelerates global innovation.</p>
               </div>
               <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-sky-400">
                  <Globe className="w-8 h-8 text-sky-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Our Vision</h4>
                  <p className="text-sm text-slate-400 font-light">To be the apex architectural firm for the modern web.</p>
               </div>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-sky-400/30 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[4/3] group p-2">
               <div className="w-full h-full rounded-[20px] overflow-hidden relative bg-[#112240]">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team collaborating" className="w-full h-full object-cover saturate-50 group-hover:saturate-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#112240] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase mb-4">Principles</h2>
            <h3 className="text-4xl font-black text-white font-heading">The SiviOn DNA</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Award, title: "Uncompromising Quality", desc: "Good enough is never enough. We chase perfection in every pixel and byte." },
               { icon: Users, title: "Radical Transparency", desc: "No black boxes. Total visibility into our process, code, and strategy." },
               { icon: Target, title: "Data-Driven Precision", desc: "Opinions are fine, but data scales. Every decision is backed by analytics." }
             ].map((value, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-8 rounded-3xl"
                >
                   <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-sky-400" />
                   </div>
                   <h4 className="text-2xl font-bold text-white mb-3">{value.title}</h4>
                   <p className="text-slate-400 font-light leading-relaxed">{value.desc}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default About;
