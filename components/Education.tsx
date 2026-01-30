'use client'

import { useEffect, useRef, useState } from 'react'
import { portfolioData } from '@/constants/data'
import { FaGraduationCap } from 'react-icons/fa'

function EducationItem({ edu, index }: { edu: any, index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div 
      ref={itemRef}
      className={`relative group mb-24 last:mb-0`}
    >
      {/* Timeline Dot (The Node) */}
      <div className={`absolute left-[-4px] md:left-1/2 md:-translate-x-[5px] top-0 w-[10px] h-[10px] rounded-full bg-[#020617] border-2 transition-all duration-700 z-20 ${isVisible ? 'border-cyan-400 scale-150 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'border-gray-700 scale-100'}`}>
        {isVisible && <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20"></div>}
      </div>

      {/* Horizontal Connector Line (Linking to center node) */}
      <div className={`absolute top-[5px] h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transition-all duration-1000 hidden md:block z-10 ${isVisible ? 'w-12 opacity-100' : 'w-0 opacity-0'} ${isEven ? 'right-1/2' : 'left-1/2'}`}></div>

      <div className={`ml-8 md:ml-0 md:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-20' : 'translate-x-20'}`} ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto md:text-left'}`}>
        <div className="relative p-8 bg-gray-900/40 border border-white/5 rounded-3xl transition-all duration-500 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 shadow-2xl overflow-hidden card-3d">
          <div className="card-3d-inner">
            {/* Technical Accent */}
            <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-cyan-500/20 uppercase tracking-widest">
              Edu_Node_0{index + 1}
            </div>
            
            <span className={`inline-block px-3 py-1 mb-4 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-mono tracking-widest uppercase transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              {edu.period}
            </span>
            
            <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} mb-4`}>
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500">
                <FaGraduationCap size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                {edu.degree}
              </h3>
              <p className="text-cyan-500/80 font-mono text-sm">
                {edu.institution}
              </p>
            </div>
            
            <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
              {edu.details}
            </p>

            {/* HUD Corner Design */}
            <div className={`absolute bottom-0 ${isEven ? 'left-0' : 'right-0'} w-8 h-8 border-b-2 ${isEven ? 'border-l-2' : 'border-r-2'} border-white/5 group-hover:border-cyan-500/20 transition-all`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Education() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsHeaderVisible(true),
      { threshold: 0.1 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="education"
      className="py-24 bg-[#020617] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className={`text-center mb-24 transition-all duration-1000 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Academic <span className="text-gradient">Foundation</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500/50 mx-auto mb-6"></div>
          <p className="text-gray-400 font-mono text-[10px] tracking-[0.3em] uppercase">
            Knowledge Acquisition Timeline
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line (The Backbone) */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-transparent hidden md:block"></div>

          <div className="relative">
            {portfolioData.education?.map((edu, index) => (
              <EducationItem key={index} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
