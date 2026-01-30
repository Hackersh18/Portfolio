'use client'

import { useEffect, useRef, useState } from 'react'

import { portfolioData } from '@/constants/data'

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-24 bg-[#020617] relative"
    >
      {/* Decorative side accent */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className={`md:w-1/2 mb-8 md:mb-0 ${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Neural</span>
                <br />
                <span className="text-gradient">Profile</span>
              </h2>
              <div className="w-20 h-1 bg-cyan-500 mb-8"></div>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed font-light">
                {portfolioData.about}
              </p>
            </div>
            
            <div className={`md:w-1/2 flex flex-col gap-4 ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
              {portfolioData.whatIDo.map((item, i) => (
                <div 
                  key={i} 
                  className="card-3d relative group w-full"
                >
                  <div className="card-3d-inner relative bg-gray-900/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-xl overflow-hidden flex flex-col justify-between">
                    {/* HUD Corner Accents */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/30 group-hover:border-cyan-500 transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/30 group-hover:border-cyan-500 transition-colors"></div>
                    
                    <div className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-4 animate-pulse shrink-0"></div>
                      <span className="text-gray-400 group-hover:text-cyan-400 transition-colors font-light text-sm md:text-base leading-none uppercase tracking-[0.15em]">
                        {item}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-end text-[7px] font-mono text-cyan-500/10 uppercase tracking-[0.3em] group-hover:text-cyan-500/30 transition-colors">
                      <span>Neural_Node_0{i + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 stagger-item ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            {portfolioData.achievements?.map((achievement, i) => (
              <div key={i} className="bg-gray-900/40 border border-white/5 rounded-2xl p-6 hover:bg-cyan-500/5 hover:border-cyan-500/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <span className="text-xs font-mono">0{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-400 font-light">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
