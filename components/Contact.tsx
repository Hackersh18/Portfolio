'use client'

import { useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

import { portfolioData } from '@/constants/data'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Signal received. I will establish a link shortly.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-[#020617] relative overflow-hidden"
    >
      {/* HUD Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Establish <span className="text-gradient">Link</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-500/50 mx-auto mb-6"></div>
            <p className="text-gray-400 font-mono text-[10px] tracking-[0.3em] uppercase">
              Secure Communication Channel
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-10">
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Open for collaborations on high-impact AI systems, research projects, or architecture design. Signal your interest below.
              </p>

              <div className="space-y-8">
                {[
                  { icon: FaEnvelope, title: "Comm Channel", value: portfolioData.contact.email, link: `mailto:${portfolioData.contact.email}` },
                  { icon: FaPhone, title: "Direct Line", value: portfolioData.contact.phone, link: `tel:${portfolioData.contact.phone}` },
                  { icon: FaMapMarkerAlt, title: "Base Location", value: portfolioData.contact.location, link: "#" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mr-6 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all duration-300">
                      <item.icon className="text-cyan-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-500/50 mb-1">{item.title}</h3>
                      {item.link !== "#" ? (
                        <a href={item.link} className="text-lg text-white hover:text-cyan-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-10 border-t border-white/5">
                <div className="p-6 bg-gray-900/40 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-mono text-cyan-500/30 uppercase tracking-[0.2em] mb-4">Encryption Status</p>
                  <div className="flex space-x-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-full h-1 bg-cyan-500/20 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-3xl group-hover:bg-cyan-500/15 transition-all duration-500"></div>
              <div className="relative bg-gray-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest mb-2 px-1">Source Identity</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-light"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest mb-2 px-1">Return Path</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-light"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest mb-2 px-1">Message Payload</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-light resize-none"
                      placeholder="Type your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group relative overflow-hidden px-8 py-5 bg-cyan-600 text-white rounded-xl font-bold tracking-[0.2em] uppercase text-xs transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
                  >
                    <span className="relative z-10">Transmit Signal</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
