'use client'

import { useEffect, useRef, useState } from 'react'
import { FaFileDownload, FaFilePdf, FaTerminal } from 'react-icons/fa'
import { portfolioData } from '@/constants/data'

export default function Resume() {
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
      id="resume"
      ref={sectionRef}
      className="py-16 bg-[#020617] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative group max-w-4xl mx-auto">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-3xl group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>
            
            <div className="relative bg-gray-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
              {/* Technical HUD Elements */}
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-cyan-500/30 uppercase tracking-[0.3em]">
                System_Export_Protocol
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Technical <span className="text-gradient">Manifesto</span>
                  </h2>
                  <p className="text-gray-400 font-light max-w-md leading-relaxed">
                    Download my comprehensive technical CV for a detailed breakdown of my neural architectures, research publications, and deployment history.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <a
                    href={portfolioData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center space-x-4 px-10 py-5 bg-cyan-600 text-white rounded-2xl font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:-translate-y-1 active:translate-y-0"
                  >
                    <FaFileDownload className="text-xl animate-bounce" />
                    <span>View Resume</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 rounded-2xl"></div>
                  </a>
                  
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest">
                    <FaTerminal className="text-xs" />
                    <span>SHA-256 Verified Source</span>
                  </div>
                </div>
              </div>

              {/* Decorative Progress Bar */}
              <div className="mt-10 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-full animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
