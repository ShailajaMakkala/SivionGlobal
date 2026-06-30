import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard';
import { Code, Smartphone, Megaphone, TrendingUp, Cpu, ShieldCheck, Globe, Zap, ArrowRight, CheckCircle, Bot, Workflow } from 'lucide-react';
import { motion } from 'framer-motion';
import apiClient from '../api/apiClient';

const Home = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const response = await apiClient.get('/portfolio');
        if (response.data?.success) {
          // Take top 3 for preview
          setRecentProjects(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching recent projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchRecentProjects();
  }, []);

  const services = [
    {
      title: 'AI-Driven Solutions',
      description: 'Smart AI solutions that automate tasks, improve productivity, and help businesses make faster, data-driven decisions.',
      icon: Bot,
      linkTo: '/services/ai-solutions',
      bgImage: '/service_bg_java_1773640831559.png'
    },
    {
      title: 'N8N Workflow Automation',
      description: 'Connect your tools, automate repetitive processes, and streamline business operations without manual effort.',
      icon: Workflow,
      linkTo: '/services/n8n-automation',
      bgImage: '/service_bg_java_1773640831559.png'
    },
    {
      title: 'Web & App Development',
      description: 'Build scalable websites, web applications, and mobile apps tailored to your business requirements.',
      icon: Code,
      linkTo: '/services/web-application',
      bgImage: '/service_bg_web_1773640813931.png'
    },
    {
      title: 'Digital Marketing',
      description: 'Reach the right audience, generate quality leads, and grow your brand through targeted digital campaigns.',
      icon: Megaphone,
      linkTo: '/services/digital-marketing',
      bgImage: '/service_bg_marketing_1773640894132.png'
    }
  ];

  return (
    <>
      <Helmet>
        <title>SiviOn Global Technologies - Premium IT Services</title>
        <meta name="description" content="SiviOn Global Technologies provides premium web development, enterprise Java solutions, and data-driven digital marketing." />
      </Helmet>

      <Hero />

      {/* Company Intro Section */}
      <section className="py-24 relative bg-[#0A192F] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-bold tracking-widest uppercase text-sm border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm inline-block mb-6">
              Who We Are
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 font-heading">
              Innovating the Future of Business
            </h3>
            <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
              SiviOn Global Technologies is a premier IT consulting and development firm. We specialize in transforming obsolete workflows into high-performance, digitally native ecosystems. From enterprise Java architectures to data-driven marketing, we are the architects behind your next big leap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-bold tracking-widest uppercase text-sm border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                Our Capabilities
              </h2>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-white mb-6 font-heading"
            >
              Architecting Digital <span className="text-slate-500">Excellence</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-slate-400 text-lg font-light leading-relaxed"
            >
              We deploy elite engineering squads and marketing strategists to transform complex challenges into elegant, scalable solutions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative overflow-hidden border-y border-white/5 bg-[#112240]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#112240] to-[#0A192F]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-4">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight font-heading">
              Engineering with <br />Uncompromising Quality
            </h3>
            <p className="text-slate-400 mb-10 leading-relaxed font-light text-lg">
              We reject the status quo. Every line of code we write and every campaign we launch is subject to rigorous testing, ensuring enterprise-grade security, scalability, and performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              {[
                { title: 'Skilled Team', desc: 'Elite engineers and strategists.' },
                { title: 'Scalable Solutions', desc: 'Built for enterprise growth.' },
                { title: 'On-Time Delivery', desc: 'Agile sprints, rigorous deadlines.' },
                { title: 'Cost-Effective Services', desc: 'Maximum ROI on your investment.' },
                { title: 'Client-Focused Approach', desc: 'Your vision, amplified.' },
                { title: 'Modern Technologies', desc: 'Next-gen tools & frameworks.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-white font-bold mb-1 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-sky-400 mr-2" />
                    {item.title}
                  </h4>
                  <p className="text-sm font-light text-slate-400 pl-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-sky-400 blur-[80px] opacity-20 rounded-full" />
            <div className="glass-panel p-2 rounded-3xl relative">
              <div className="aspect-[4/5] rounded-[20px] bg-[#112240] overflow-hidden border border-white/10 relative">
                {/* Abstract tech visualization */}
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex justify-center items-center">
                    <div className="absolute w-64 h-64 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-48 h-48 border border-sky-400/30 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-full blur-[2px] opacity-80 animate-pulse"></div>
                      <span className="relative z-10 text-white font-bold text-xl tracking-widest drop-shadow-md">SIVION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Work / Process */}
      <section className="py-24 bg-[#0A192F] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-bold tracking-widest uppercase text-sm border border-white/10 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm inline-block mb-4">
              How We Work
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white font-heading">
              Our Proven Process
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Understanding your specific enterprise needs and objectives.' },
              { step: '02', title: 'Strategy & Design', desc: 'Architecting scalable plans and UI/UX prototypes.' },
              { step: '03', title: 'Agile Development', desc: 'Iterative, high-quality coding and engineering.' },
              { step: '04', title: 'Launch & Scale', desc: 'Thorough testing, deployment, and ongoing optimization.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all"
              >
                <div className="text-5xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors absolute top-4 right-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 mt-4">{item.title}</h4>
                <p className="text-slate-400 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Quality Check */}
      <section className="py-24 bg-[#0A192F] relative border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-blue-900/10 to-transparent border border-white/10 rounded-3xl p-12 relative overflow-hidden">

          <div className="relative z-10">
            <ShieldCheck className="w-16 h-16 text-sky-400 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight font-heading">Trusted by Industry Leaders Worldwide</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We measure our success entirely by the success of our clients. Ensuring quality, security, and scalability is paramount in everything we build.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <CheckCircle className="w-5 h-5 text-sky-400" />
                <span className="text-white font-medium text-sm tracking-wide">100% Satisfaction Rate</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <CheckCircle className="w-5 h-5 text-sky-400" />
                <span className="text-white font-medium text-sm tracking-wide">Global Support Team</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
                <CheckCircle className="w-5 h-5 text-sky-400" />
                <span className="text-white font-medium text-sm tracking-wide">ISO Certified Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-bold tracking-widest uppercase text-sm mb-4 inline-block border border-white/10 px-4 py-1.5 rounded-full bg-white/5">
                Our Portfolio
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-white font-heading">Digital Masterpieces</h3>
            </div>
            <a href="/portfolio" className="group mt-6 md:mt-0 text-white font-semibold flex items-center bg-white/5 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
              View Complete Archive
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-sky-400" />
            </a>
          </div>

          {loadingProjects ? (
            <div className="text-center py-20 w-full col-span-full">
              <div className="w-12 h-12 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">Synchronizing...</p>
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="text-center py-20 w-full col-span-full glass-panel rounded-3xl border border-white/5">
              <p className="text-slate-400">Our masterpieces are currently under lock and key. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full col-span-full">
              {recentProjects.map((project, index) => (
                <ProjectCard key={project.id || index} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

    </>
  );
};

export default Home;
