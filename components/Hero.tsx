'use client'

import { useEffect, useState } from 'react'
import { FaArrowDown, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

import { portfolioData } from '@/constants/data'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [systemText, setSystemText] = useState('')
  const fullText = "Initialize neural handshake... Syncing professional credentials... System online."

  useEffect(() => {
    setIsVisible(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Typing effect
    let i = 0
    const timer = setInterval(() => {
      setSystemText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(timer)
    }, 50)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(timer)
    }
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden"
    >
      {/* AI Engineer Technical Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Digital Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay animate-pulse"></div>

        {/* 3D Perspective Grid Floor with Mouse Parallax */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-full opacity-[0.15] perspective-grid transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-50%) rotateX(10deg) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <div 
            className="w-full h-full animate-grid-perspective" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)`, 
              backgroundSize: '100px 100px',
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)'
            }} 
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]"></div>
        
        {/* Scanning Beam */}
        <div className="absolute inset-0 w-full h-2 bg-gradient-to-b from-cyan-500/20 via-cyan-500/5 to-transparent opacity-30 animate-scan pointer-events-none"></div>

        {/* 3D Floating HUD Elements */}
        <div 
          className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 hidden lg:block animate-float-3d transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px) rotate(45deg)` }}
        >
          <div className="w-full h-full border-2 border-cyan-500/50 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 border border-cyan-400 animate-spin-slow"></div>
          </div>
        </div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-24 h-24 opacity-10 hidden lg:block animate-float-3d transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePos.x * 1.2}px, ${-mousePos.y * 1.2}px)`, animationDelay: '-5s' }}
        >
          <div className="w-full h-full border border-blue-500/50 rounded-full flex items-center justify-center">
            <div className="w-full h-px bg-blue-400 animate-pulse"></div>
          </div>
        </div>

        {/* Glowing Orbs with Mouse Parallax */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)`, animationDelay: '2s' }}
        ></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-500 rounded-full animate-float opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-float opacity-40" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transform: `perspective(1000px) rotateX(${-mousePos.y * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)` }}
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="h-4 font-mono text-[10px] text-cyan-500/60 uppercase tracking-tighter">
              {systemText}<span className="animate-cursor">_</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">
            <span className="text-white block reveal-text hover:animate-glitch transition-all">Hi I'm</span>
            <div className="glitch-text-wrapper block reveal-text" style={{ animationDelay: '0.5s' }}>
              <span className="text-gradient animate-text-glow">Harsh Dayal </span>
              {/* Glitch Layers */}
              <span className="glitch-layer glitch-layer-1 text-gradient">Harsh Dayal </span>
              <span className="glitch-layer glitch-layer-2 text-gradient">Harsh Dayal </span>
            </div>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            {portfolioData.role}. Building the future of autonomous systems and neural architectures.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a
              href="#projects"
              className="group relative px-10 py-4 bg-cyan-600 text-white rounded-full font-bold tracking-widest uppercase text-xs overflow-hidden transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <span className="relative z-10">Initialize Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="#contact"
              className="px-10 py-4 bg-transparent text-cyan-400 border border-cyan-500/30 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-cyan-500/5 hover:border-cyan-500 transition-all duration-300"
            >
              Establish Link
            </a>
          </div>

          {/* Technical Social Links */}
          <div className="flex justify-center space-x-8 mb-16">
            {[
              { icon: FaGithub, href: "https://github.com", label: "Neural Code" },
              { icon: FaLinkedin, href: "https://linkedin.com", label: "System Sync" },
              { icon: FaEnvelope, href: `mailto:${portfolioData.contact.email}`, label: "Direct Comms" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-2 text-gray-500 hover:text-cyan-400 transition-all duration-300"
              >
                <social.icon size={24} className="group-hover:scale-110" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          <div className="animate-bounce mt-8">
            <a href="#about" className="text-cyan-500/50 hover:text-cyan-400 transition-colors">
              <FaArrowDown size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
