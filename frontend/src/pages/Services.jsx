import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, Smartphone, Megaphone, TrendingUp, Monitor, Server, Bot, Workflow, MessageCircle, BarChart3, Wrench, Cloud, Palette } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const servicesList = [
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
      title: 'WABA (WhatsApp Business API)',
      description: 'Engage customers, capture leads, provide support, and automate conversations through WhatsApp.',
      icon: MessageCircle,
      linkTo: '/services/waba',
      bgImage: '/service_bg_marketing_1773640894132.png'
    },
    {
      title: 'SEO (Search Engine Optimization)',
      description: 'Improve your online visibility and rank higher on search engines to attract more potential customers.',
      icon: TrendingUp,
      linkTo: '/services/seo',
      bgImage: '/service_bg_marketing_1773640894132.png'
    },
    {
      title: 'Strategy Planning',
      description: 'Develop technology and growth strategies that align with your business goals and long-term vision.',
      icon: BarChart3,
      linkTo: '/services/strategy-planning',
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
      title: 'Application Maintenance & Support',
      description: 'Keep your applications secure, updated, optimized, and running smoothly with continuous support.',
      icon: Wrench,
      linkTo: '/services/app-maintenance',
      bgImage: '/service_bg_java_1773640831559.png'
    },
    {
      title: 'Digital Marketing',
      description: 'Reach the right audience, generate quality leads, and grow your brand through targeted digital campaigns.',
      icon: Megaphone,
      linkTo: '/services/digital-marketing',
      bgImage: '/service_bg_marketing_1773640894132.png'
    },
    {
      title: 'Cloud Migration',
      description: 'Move your business to the cloud for improved scalability, security, performance, and operational efficiency.',
      icon: Cloud,
      linkTo: '/services/cloud-migration',
      bgImage: '/service_bg_web_1773640813931.png'
    },
    {
      title: 'UI/UX Design',
      description: 'Create intuitive, user-friendly, and engaging digital experiences that enhance customer satisfaction and adoption.',
      icon: Palette,
      linkTo: '/services/uiux-design',
      bgImage: '/service_bg_web_1773640813931.png'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - SiviOn Global Technologies</title>
        <meta name="description" content="Explore SiviOn's IT services including Java Full Stack, Web Development, SEO, and Digital Marketing." />
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 py-24 text-center relative overflow-hidden text-white">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-slate-300 border-b border-slate-700 pb-8 inline-block px-8">Comprehensive IT & Digital Solutions</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need a Custom Solution?</h2>
          <p className="text-slate-600 mb-8">We understand that every business is unique. Contact us to discuss your specific requirements and let our experts design a tailored solution for you.</p>
          <a href="/get-quote" className="inline-flex bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg">Request a Proposal</a>
        </div>
      </section>
    </>
  );
};

export default Services;
