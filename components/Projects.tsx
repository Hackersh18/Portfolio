'use client'

import { useEffect, useRef, useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa'

import { portfolioData } from '@/constants/data'

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-[#020617] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Project <span className="text-gradient">Archives</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-500/50 mb-6"></div>
            <p className="text-gray-400 font-mono text-[10px] tracking-[0.3em] uppercase">
              Accessing Neural Network Implementations...
            </p>
          </div>

          <div className="relative group/scroll">
            {/* Custom Scroll Container */}
            <div className="flex overflow-x-auto pb-12 gap-8 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {portfolioData.projects.map((project, index) => (
                <div
                  key={project.title}
                  className={`flex-shrink-0 w-[300px] md:w-[450px] group relative bg-gray-900/40 border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] stagger-item ${isVisible ? 'visible' : ''} card-3d snap-center`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="card-3d-inner h-full flex flex-col">
                    {/* Tech HUD Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-24 w-full -translate-y-full group-hover:animate-scanline pointer-events-none"></div>

                    <div className="h-48 md:h-64 relative overflow-hidden bg-gray-950 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 opacity-50"></div>
                      <div className="relative z-10 flex flex-col items-center" style={{ transform: 'translateZ(50px)' }}>
                        <div className="w-12 h-12 md:w-16 md:h-16 border border-cyan-500/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-500 transition-all duration-500">
                          <FaCode className="text-cyan-500 text-xl md:text-2xl" />
                        </div>
                        <span className="text-white text-lg md:text-xl font-bold tracking-tight px-4 text-center">
                          {project.title}
                        </span>
                      </div>
                      {/* Background grid for image area */}
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(to right, #00f2ff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                    </div>

                    <div className="p-6 md:p-8 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex space-x-2 md:space-x-3">
                          <a
                            href="#"
                            className="p-1.5 md:p-2 bg-white/5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            aria-label="GitHub"
                          >
                            <FaGithub size={16} />
                          </a>
                          <a
                            href="#"
                            className="p-1.5 md:p-2 bg-white/5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            aria-label="Live Demo"
                          >
                            <FaExternalLinkAlt size={14} />
                          </a>
                        </div>
                      </div>

                      <p className="text-gray-400 font-light mb-6 md:mb-8 leading-relaxed text-xs md:text-sm">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 bg-white/5 border border-white/5 text-cyan-500/80 rounded-full text-[8px] md:text-[10px] font-mono tracking-wider uppercase group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Design Accent */}
                    <div className="absolute top-4 left-4 font-mono text-[8px] text-cyan-500/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Data_Stream_ID: {index + 104}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Hints */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-4 pointer-events-none opacity-50 group-hover/scroll:opacity-100 transition-opacity">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] animate-pulse">Drag to scroll</span>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
