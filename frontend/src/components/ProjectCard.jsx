import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className="glass-panel rounded-3xl overflow-hidden group relative h-full flex flex-col"
    >
      <div className="h-56 overflow-hidden relative border-b border-white/10">
        {project.card_bg || project.image ? (
          <div className="w-full h-full relative">
            <img 
              src={project.card_bg || project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out saturate-[0.8] group-hover:saturate-100"
            />
            {project.card_bg && project.image && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60"></div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F]">
            <div className="w-16 h-1 rounded-full bg-blue-500/30 mb-2"></div>
            <div className="w-24 h-1 rounded-full bg-sky-500/30"></div>
          </div>
        )}
        
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-white rounded-full">
            {project.category}
          </span>
        </div>
        
        {/* Hover overlay View icon */}
        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <ExternalLink className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow bg-white/[0.02]">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-sky-300 transition-all">
          {project.title}
        </h3>
        <div 
          className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {(typeof project.technologies === 'string' ? project.technologies.split(',') : (project.technologies || [])).map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 text-sky-100 text-[11px] uppercase tracking-wider font-semibold rounded-full border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors">
              {tech.trim ? tech.trim() : tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
