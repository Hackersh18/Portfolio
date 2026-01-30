'use client'

import { useEffect, useRef, useState } from 'react'
import {
  FaPython,
  FaJava,
  FaDatabase,
  FaLinux,
  FaGithub,
  FaGitAlt,
  FaDocker,
  FaBrain,
  FaCode,
} from 'react-icons/fa'
import {
  SiJavascript,
  SiCplusplus,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiDjango,
  SiMongodb,
} from 'react-icons/si'

const skills = [
  { name: 'Python', icon: FaPython, color: 'text-blue-400' },
  { name: 'Java', icon: FaJava, color: 'text-red-500' },
  { name: 'C++', icon: SiCplusplus, color: 'text-blue-600' },
  { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
  { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-400' },
  { name: 'PyTorch', icon: SiPytorch, color: 'text-orange-500' },
  { name: 'LangChain', icon: FaCode, color: 'text-green-400' },
  { name: 'Django', icon: SiDjango, color: 'text-green-600' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
  { name: 'SQL', icon: FaDatabase, color: 'text-blue-500' },
  { name: 'Linux', icon: FaLinux, color: 'text-gray-300' },
  { name: 'Docker', icon: FaDocker, color: 'text-blue-500' },
]

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="py-24 bg-[#020617] relative overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#00f2ff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Tech <span className="text-gradient">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-500/50 mx-auto mb-6"></div>
            <p className="text-gray-400 font-light max-w-2xl mx-auto uppercase tracking-[0.2em] text-[10px]">
              System Capabilities & Technical Proficiency
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.name}
                  className={`group relative bg-gray-900/40 border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:bg-cyan-500/10 hover:border-cyan-500/30 flex flex-col items-center justify-center overflow-hidden stagger-item ${isVisible ? 'visible' : ''} card-3d`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="card-3d-inner flex flex-col items-center">
                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-500 blur-xl"></div>
                    
                    <Icon
                      className={`${skill.color} text-4xl mb-4 group-hover:scale-110 transition-all duration-500 relative z-10`}
                      style={{ transform: 'translateZ(30px)' }}
                    />
                    <span className="text-gray-500 group-hover:text-gray-200 transition-colors font-mono text-[10px] md:text-xs uppercase tracking-widest text-center relative z-10">
                      {skill.name}
                    </span>
                    
                    {/* HUD design element */}
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/10 group-hover:border-cyan-500/50 transition-colors"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
