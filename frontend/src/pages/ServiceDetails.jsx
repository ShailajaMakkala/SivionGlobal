import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ServiceDetails = () => {
  const { serviceId } = useParams();

  // Mock data mapping
  const serviceData = {
    'java-fullstack': {
      title: 'Java Full Stack Development',
      tagline: 'Enterprise-grade Java solutions from backend APIs to modern frontends.',
      overview: 'Our Java Full Stack Development service covers the entire software development lifecycle. We build scalable, secure, and resilient applications using Spring Boot, Hibernate, and modern frontend frameworks like React and Angular.',
      features: ['Microservices Architecture', 'RESTful API Development', 'Secure Authentication & Authorization', 'Performance Optimization'],
      benefits: ['High Scalability for Enterprise Data', 'Robust Security Features', 'Cross-platform Compatibility'],
      technologies: 'Java, Spring Boot, React, PostgreSQL, Docker'
    },
    'web-development': {
      title: 'Website Design & Development',
      tagline: 'Beautiful, responsive websites that capture your brand identity.',
      overview: 'We design and develop high-performing corporate websites that not only look stunning but are also engineered for speed and conversion.',
      features: ['Custom UI/UX Design', 'Responsive Layouts', 'CMS Integration', 'Fast Load Times'],
      benefits: ['Improved Brand Perception', 'Higher Engagement Rates', 'Easy Content Management'],
      technologies: 'React, Next.js, Tailwind CSS, WordPress'
    },
    'web-application': {
      title: 'Web & App Development',
      tagline: 'Build scalable websites, web applications, and mobile apps tailored to your business requirements.',
      overview: 'From SaaS products to internal business tools and mobile apps, we develop scalable solutions tailored to your specific operational needs. Our team handles the full stack — from UI design to deployment.',
      features: ['Custom Web & Mobile Apps', 'Third-party API Integrations', 'Real-time Data Processing', 'Role-based Access Control', 'Cross-platform Mobile Development'],
      benefits: ['Streamlined Operations', 'Data-driven Insights', 'Increased Productivity', 'Faster Time-to-Market'],
      technologies: 'React, Node.js, Express, React Native, MongoDB, PostgreSQL'
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      tagline: 'Reach the right audience, generate quality leads, and grow your brand.',
      overview: 'Our comprehensive digital marketing services are designed to maximize your ROI through targeted campaigns across various platforms. We help you reach the right audience at the right time.',
      features: ['Search Engine Marketing (PPC)', 'Social Media Campaigns', 'Email Marketing Automation', 'Conversion Rate Optimization', 'Content Marketing'],
      benefits: ['Increased Brand Awareness', 'Higher Quality Leads', 'Measurable ROI', 'Targeted Audience Reach'],
      technologies: 'Google Ads, Facebook Ads, Mailchimp, HubSpot, Meta Business Suite'
    },
    'seo': {
      title: 'SEO (Search Engine Optimization)',
      tagline: 'Improve your online visibility and rank higher on search engines.',
      overview: 'We employ advanced on-page, off-page, and technical SEO strategies to ensure your business ranks at the top of search results for relevant keywords, attracting more potential customers organically.',
      features: ['Comprehensive Keyword Research', 'Technical Site Audits', 'High-quality Link Building', 'Content Optimization', 'Local SEO'],
      benefits: ['Sustainable Traffic Growth', 'Higher Trust & Credibility', 'Cost-effective Lead Generation', 'Improved Conversion Rates'],
      technologies: 'SEMrush, Ahrefs, Google Search Console, Screaming Frog, Moz'
    },
    'ai-solutions': {
      title: 'AI-Driven Solutions',
      tagline: 'Smart AI solutions that automate tasks and drive data-driven decisions.',
      overview: 'We build intelligent AI solutions that automate repetitive tasks, improve productivity, and help businesses make smarter, faster decisions. From machine learning models to AI-powered automation pipelines, we tailor every solution to your unique needs.',
      features: ['Custom ML Model Development', 'AI-powered Process Automation', 'Natural Language Processing (NLP)', 'Predictive Analytics', 'Computer Vision Solutions'],
      benefits: ['Reduced Operational Costs', 'Faster Decision Making', 'Improved Accuracy & Efficiency', 'Scalable Intelligence'],
      technologies: 'Python, TensorFlow, OpenAI API, LangChain, FastAPI, Hugging Face'
    },
    'n8n-automation': {
      title: 'N8N Workflow Automation',
      tagline: 'Connect your tools and streamline business operations without manual effort.',
      overview: 'We help businesses leverage n8n — a powerful workflow automation platform — to connect their tools, automate repetitive processes, and eliminate manual work. Our team designs, builds, and deploys custom automation workflows tailored to your business processes.',
      features: ['Custom Workflow Design', 'Multi-app Integration', 'Triggered Automations', 'Data Sync & Transformation', 'Error Handling & Monitoring'],
      benefits: ['Eliminate Manual Work', 'Reduced Human Error', 'Faster Business Processes', 'Cost Savings', 'Scalable Automation'],
      technologies: 'N8N, Zapier, Make (Integromat), REST APIs, Webhooks, Node.js'
    },
    'waba': {
      title: 'WABA (WhatsApp Business API)',
      tagline: 'Engage customers and automate conversations through WhatsApp.',
      overview: 'We help businesses integrate and leverage the WhatsApp Business API (WABA) to engage customers at scale, automate conversations, capture leads, provide support, and send transactional notifications — all through the world\'s most popular messaging platform.',
      features: ['WhatsApp Chatbot Development', 'Automated Drip Campaigns', 'Lead Capture & Qualification', 'Customer Support Automation', 'Broadcast Messaging'],
      benefits: ['Higher Customer Engagement', 'Instant Response Times', 'Increased Lead Conversion', 'Reduced Support Costs', 'Global Reach'],
      technologies: 'WhatsApp Business API, Twilio, Meta Cloud API, Dialogflow, Node.js'
    },
    'strategy-planning': {
      title: 'Strategy Planning',
      tagline: 'Technology and growth strategies aligned with your long-term vision.',
      overview: 'Our strategy planning service helps businesses develop technology roadmaps and growth strategies that align with their goals. We analyze your current state, identify opportunities, and create actionable plans to achieve sustainable growth.',
      features: ['Technology Roadmap Development', 'Digital Transformation Planning', 'Business Process Analysis', 'Competitive Benchmarking', 'KPI Definition & Tracking'],
      benefits: ['Clear Direction & Vision', 'Reduced Technology Risk', 'Faster Business Growth', 'Improved Resource Allocation'],
      technologies: 'Jira, Confluence, Miro, Notion, OKR Frameworks, Agile Methodologies'
    },
    'app-maintenance': {
      title: 'Application Maintenance & Support',
      tagline: 'Keep your applications secure, updated, and running smoothly.',
      overview: 'Our application maintenance and support service ensures your software remains secure, up-to-date, and performing at its best. We provide continuous monitoring, proactive updates, bug fixes, and optimization to minimize downtime and maximize performance.',
      features: ['24/7 Monitoring & Alerting', 'Security Patches & Updates', 'Performance Optimization', 'Bug Fixes & Enhancements', 'Database Maintenance'],
      benefits: ['Reduced Downtime', 'Improved Security Posture', 'Optimal Performance', 'Peace of Mind', 'Cost Predictability'],
      technologies: 'Docker, Kubernetes, AWS, Azure, Prometheus, Grafana, New Relic'
    },
    'cloud-migration': {
      title: 'Cloud Migration',
      tagline: 'Move your business to the cloud for scalability, security, and efficiency.',
      overview: 'We help businesses migrate their infrastructure and applications to the cloud, ensuring improved scalability, security, performance, and operational efficiency. Our team plans and executes migrations with minimal disruption to your operations.',
      features: ['Cloud Readiness Assessment', 'Migration Strategy & Planning', 'Data Migration & Validation', 'Application Re-architecture', 'Post-migration Optimization'],
      benefits: ['Reduced Infrastructure Costs', 'Improved Scalability', 'Enhanced Security', 'Better Disaster Recovery', 'Operational Efficiency'],
      technologies: 'AWS, Google Cloud, Microsoft Azure, Terraform, Docker, Kubernetes'
    },
    'uiux-design': {
      title: 'UI/UX Design',
      tagline: 'Create intuitive digital experiences that users love.',
      overview: 'Our UI/UX design service creates intuitive, user-friendly, and visually engaging digital experiences that drive customer satisfaction and adoption. We combine user research, design principles, and modern aesthetics to deliver interfaces that truly work.',
      features: ['User Research & Personas', 'Wireframing & Prototyping', 'Visual Design & Branding', 'Usability Testing', 'Design System Creation'],
      benefits: ['Higher User Satisfaction', 'Increased Conversion Rates', 'Reduced Development Costs', 'Stronger Brand Identity', 'Lower Support Burden'],
      technologies: 'Figma, Adobe XD, Framer, Storybook, Zeplin, InVision'
    }
  };

  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="py-32 text-center min-h-[60vh] bg-[#0A192F]">
        <h1 className="text-3xl font-bold text-white mb-4 font-heading">Service Not Found</h1>
        <p className="text-slate-400 mb-8 font-light">We couldn't find details for this specific service.</p>
        <Link to="/services" className="text-sky-400 font-semibold tracking-wider hover:text-white transition-colors uppercase text-sm">&larr; Back to Services</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} - SiviOn Global Technologies</title>
        <meta name="description" content={service.overview} />
      </Helmet>

      {/* Header */}
      <div className="bg-[#0A192F] py-32 text-center relative overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link to="/services" className="text-sky-400 hover:text-white text-sm font-bold mb-8 inline-block uppercase tracking-widest transition-colors">&larr; All Services</Link>
          <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight text-glow">{service.title}</h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto">{service.tagline}</p>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0A192F]">
        <div className="grid lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 font-heading">Service Overview</h2>
            <div 
              className="text-lg text-slate-400 font-light leading-relaxed mb-12"
              dangerouslySetInnerHTML={{ __html: service.overview }}
            />

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="glass-panel p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                     <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                  </span>
                  Key Features
                </h3>
                <ul className="space-y-5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-slate-300 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel p-8 rounded-3xl border-t border-sky-500/30">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                   <span className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center mr-3">
                     <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  </span>
                  Business Benefits
                </h3>
                <ul className="space-y-5">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky-400 mr-3 shrink-0 mt-0.5" />
                      <span className="text-slate-300 font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 font-heading">Technologies in Action</h3>
            <div className="flex flex-wrap gap-3">
              {service.technologies.split(',').map((tech, idx) => (
                <span key={idx} className="px-5 py-2.5 bg-[#112240] border border-white/10 text-sky-100 rounded-full text-sm font-semibold tracking-wider shadow-sm hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors uppercase">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          <div>
             <div className="glass-panel rounded-3xl p-8 md:p-10 text-white shadow-2xl overflow-hidden sticky top-28 border border-white/10 relative">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-sky-400/20 pointer-events-none"></div>
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/30 rounded-full blur-[50px] pointer-events-none"></div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-4 font-heading leading-tight">Ignite Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">Growth Engine</span></h3>
                 <p className="text-slate-300 font-light mb-8 leading-relaxed">
                   Contact our architects to discuss how our {service.title} capabilities can modernize your enterprise.
                 </p>
                 <Link to="/get-quote" className="block w-full text-center bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-sky-500 hover:shadow-[0_0_20px_rgba(0,216,255,0.6)] transition-all uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                   Engage Our Team
                 </Link>
               </div>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ServiceDetails;
