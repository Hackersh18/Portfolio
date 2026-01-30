'use client'

import { useEffect, useRef, useState } from 'react'
import { portfolioData } from '@/constants/data'

export default function AIVoiceInterface({ onContinue }: { onContinue: () => void }) {
  const [inputValue, setInputValue] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const hasGreetedRef = useRef(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const speak = async (text: string) => {
    // 1. Cancel any existing speech (Native or Audio)
    window.speechSynthesis.cancel()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setAiResponse(text)

    try {
      console.log('Attempting Deepgram TTS...');
      // 2. Try Deepgram via our API route
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (response.ok) {
        console.log('Deepgram success!');
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.play()
        return
      } else {
        const errorData = await response.json();
        console.warn('Deepgram API returned an error:', errorData);
      }
    } catch (error) {
      console.error('Deepgram failed, falling back to native TTS:', error)
    }

    console.log('Falling back to native browser TTS...');

    // 3. Fallback: Native Browser TTS (Old logic)
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    
    const preferredVoices = [
      'Google English (India)',
      'Microsoft Ravi Online',
      'en-IN'
    ]
    
    let selectedVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Neural'))
    if (!selectedVoice) {
      for (const pref of preferredVoices) {
        selectedVoice = voices.find(v => v.name.includes(pref) || v.lang.includes(pref))
        if (selectedVoice) break
      }
    }
    
    utterance.voice = selectedVoice || voices[0]
    utterance.rate = 1.05
    utterance.pitch = 0.85
    window.speechSynthesis.speak(utterance)
  }

  const handleInput = (input: string) => {
    const query = input.toLowerCase()
    let response = ""

    if (query.includes("portfolio") || query.includes("enter") || query.includes("open") || query.includes("go to")) {
      speak("Understood. Initializing full portfolio interface. Please wait a moment.")
      setTimeout(() => {
        onContinue()
      }, 8000)
      return
    }

    if (query.includes("about") || query.includes("who is") || query.includes("yourself") || query.includes("tell me about harsh")) {
      response = `Harsh Dayal is a ${portfolioData.role}. ${portfolioData.about}`
    } else if (query.includes("skill") || query.includes("technology") || query.includes("stack") || query.includes("what does he know")) {
      const topSkills = portfolioData.skills.slice(0, 5).join(", ")
      response = `Harsh is highly proficient in modern web technologies. His core stack includes ${topSkills}, and he is also experienced with ${portfolioData.skills.slice(5).join(", ")}. He specializes in ${portfolioData.whatIDo[0]} and ${portfolioData.whatIDo[1]}.`
    } else if (query.includes("project") || query.includes("work")) {
      const projectCount = portfolioData.projects.length
      const featured = portfolioData.projects[0].title
      response = `Harsh has successfully delivered ${projectCount} major projects. His work ranges from ${portfolioData.projects[0].description} to ${portfolioData.projects[1].description}. A standout project is his ${featured}. Would you like me to elaborate on any specific one?`
    } else if (query.includes("experience") || query.includes("career") || query.includes("history") || query.includes("job") || query.includes("company")) {
      const latestExp = portfolioData.experience[0]
      response = `Harsh has a strong background in AI research and engineering. He is currently a ${latestExp.role} at ${latestExp.company}, where he is ${latestExp.description}. Previously, he held positions at SynthAI Corp and FutureTech Solutions.`
    } else if (query.includes("education") || query.includes("college") || query.includes("university") || query.includes("study") || query.includes("degree")) {
      const edu = portfolioData.education[0]
      response = `Harsh holds a ${edu.degree} from ${edu.institution}, graduating in ${edu.period} with an impressive CGPA of 8.27. His studies focused on core computer science and software engineering.`
    } else if (query.includes("achievement") || query.includes("award") || query.includes("certification") || query.includes("won")) {
      const topAchievement = portfolioData.achievements[0]
      response = `Harsh has several notable technical achievements. He has ${topAchievement}, was the ${portfolioData.achievements[1]}, and served as a Campus Lead at Coding Ninjas. He also qualified for TCS CodeVita Round 2.`
    } else if (query.includes("resume") || query.includes("cv") || query.includes("manifesto") || query.includes("download")) {
      response = `You can download Harsh's complete Technical Manifesto from the portfolio section. It contains his full career timeline and research publications. Just type Enter Portfolio and scroll to the Resume section.`
    } else if (query.includes("contact") || query.includes("email") || query.includes("reach") || query.includes("hire") || query.includes("connect") || query.includes("phone") || query.includes("location")) {
      response = `You can connect with Harsh via email at ${portfolioData.contact.email}. He is currently based in ${portfolioData.contact.location} and is open to discussing new opportunities or collaborations. You can also reach his system at ${portfolioData.contact.phone}.`
    } else if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
      response = `Hello. I am Harsh's virtual Portfolio Assistant. I can provide detailed insights into his technical expertise, project history, and professional background. How may I assist you today?`
    } else if (query.includes("do") || query.includes("services")) {
      response = `Harsh provides a range of high-end services, primarily focusing on ${portfolioData.whatIDo.join(", ")}. He is known for his commitment to code quality and performance optimization.`
    } else {
      response = "I have access to Harsh's complete professional profile. You can ask me about his technical skills, specific projects he has built, or his contact details for potential collaboration."
    }

    speak(response)
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      handleInput(inputValue)
      setInputValue('')
    }
  }

  useEffect(() => {
    const greet = () => {
      if (hasGreetedRef.current) return
      if (window.speechSynthesis.paused) window.speechSynthesis.resume()

      const hour = new Date().getHours()
      let timeGreeting = "Good evening"
      if (hour >= 5 && hour < 12) timeGreeting = "Good morning"
      else if (hour >= 12 && hour < 17) timeGreeting = "Good afternoon"

      const text = ` ${timeGreeting}.  I am Harsh Dayal's virtual Portfolio Assistant. How may I help you today? You can ask about his skills, projects, or simply type Enter Portfolio to proceed. `
      speak(text)
      hasGreetedRef.current = true
    }

    window.speechSynthesis.onvoiceschanged = greet
    const speechTimeout = setTimeout(greet, 1000)

    return () => {
      clearTimeout(speechTimeout)
      window.speechSynthesis.onvoiceschanged = null
      window.speechSynthesis.cancel()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const animate = () => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const time = Date.now() * 0.001
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const baseRadius = canvas.width / 4

      // Ambient Breathing Animation
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath()
        const layerScale = 1 - layer * 0.1
        const layerOpacity = 0.8 - layer * 0.2

        for (let i = 0; i < 360; i += 2) {
          const angle = (i * Math.PI) / 180
          const pulse = Math.sin(time * 2 + layer) * 5
          const wave = Math.sin(angle * 5 + time * 3) * 10
          const r = (baseRadius + pulse + wave) * layerScale
          
          const x = centerX + r * Math.cos(angle)
          const y = centerY + r * Math.sin(angle)
          
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius * 2 * layerScale)
        if (layer === 0) {
          gradient.addColorStop(0, `rgba(6, 182, 212, ${layerOpacity})`)
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
          ctx.fillStyle = gradient
          ctx.fill()
        } else {
          ctx.strokeStyle = `rgba(34, 211, 238, ${layerOpacity * 0.5})`
          ctx.lineWidth = 2 - layer * 0.5
          ctx.stroke()
        }
      }
      ctx.shadowBlur = 15
      ctx.shadowColor = 'rgba(6, 182, 212, 0.5)'
    }
    draw()
  }

  useEffect(() => {
    animate()
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9998] bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Container for Everything Inside the Frame */}
      <div className="absolute inset-4 md:inset-8 overflow-hidden">
        {/* Modern Hacker Background - Now Contained */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Matrix/Code Rain Effect */}
          <div className="absolute inset-0 opacity-[0.05] flex justify-around">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-matrix-rain"
                style={{ 
                  animationDuration: `${10 + Math.random() * 20}s`,
                  animationDelay: `${Math.random() * 10}s` 
                }}
              ></div>
            ))}
          </div>

          {/* Digital Noise/Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

          {/* Scrolling Hex Data Streams */}
          <div className="absolute top-10 left-6 bottom-10 w-32 opacity-10 font-mono text-[7px] text-cyan-500 overflow-hidden hidden lg:block">
            <div className="animate-data-scroll">
              {[...Array(20)].map((_, i) => (
                <p key={i} className="mb-2 break-all">
                  {Math.random().toString(16).repeat(5)}
                </p>
              ))}
            </div>
          </div>

          {/* Floating Data Bits - Positions updated to be inside frame */}
          <div className="absolute top-6 left-6 font-mono text-[9px] text-cyan-500/30 space-y-1 hidden md:block animate-pulse">
            <p className="flex items-center"><span className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></span> SCAN_MODE: ACTIVE</p>
            <p className="flex items-center"><span className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></span> LINK_STATUS: SECURE</p>
            <p className="flex items-center"><span className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></span> CORE_TEMP: 32.4C</p>
          </div>

          <div className="absolute bottom-6 right-6 font-mono text-[9px] text-cyan-500/30 space-y-1 hidden md:block text-right">
            <p>LATENCY: 12ms</p>
            <p>BUFF_SIZE: 1024KB</p>
            <p>TRACE: 0x82A1B</p>
          </div>

          {/* Animated Background Grid */}
          <div 
            className="absolute inset-0 animate-grid-move opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Vignette for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_80%,#020617_100%)]"></div>
        </div>
      </div>

      {/* Technical HUD Frame Overlay */}
      <div className="absolute inset-4 md:inset-8 border border-cyan-500/10 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/50"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500/50"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-500/50"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-500/50"></div>
        
        {/* Subtle Side Accents */}
        <div className="absolute top-1/2 left-0 w-1 h-16 -translate-y-1/2 bg-cyan-500/20"></div>
        <div className="absolute top-1/2 right-0 w-1 h-16 -translate-y-1/2 bg-cyan-500/20"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl h-full flex flex-col items-center justify-between py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center animate-fade-in flex-shrink-0">
          <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-mono mb-2 md:mb-4 tracking-widest uppercase">
            System Identity: Harsh Dayal
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 tracking-tight">
            I'm your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI Assistant</span>
          </h1>
          <div className="min-h-[1.2rem]">
            <p className="text-gray-400 font-light tracking-wide text-xs md:text-sm px-4">
              {aiResponse ? aiResponse : "Ready to explore Harsh's work?"}
            </p>
          </div>
        </div>

        {/* Reactive Bubble Container - Scaled down for vertical safety */}
        <div className="relative w-full max-w-[200px] md:max-w-[280px] lg:max-w-[340px] aspect-square flex items-center justify-center group my-1 md:my-2 flex-shrink">
          {/* Decorative HUD Rings */}
          <div className="absolute inset-[-12px] border border-cyan-500/5 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-[-6px] border border-dashed border-cyan-500/10 rounded-full animate-reverse-spin"></div>
          <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-30 text-center">
            <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse">Processing System</span>
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="w-full max-w-xl space-y-4 md:space-y-6 animate-slide-up px-4 flex-shrink-0">
          <div className="space-y-3">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 px-2">
              {['About Harsh', 'Experience', 'Education', 'Top Skills', 'Show Projects', 'Contact Info', 'Enter Portfolio'].map((label) => (
                <button key={label} onClick={() => handleInput(label)} className="px-2.5 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-[8px] md:text-[9px] text-cyan-400/70 font-mono hover:bg-cyan-500/20 transition-all">
                  <span className="opacity-50 mr-1">$</span> {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleTextSubmit} className="relative">
              <div className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-2xl"></div>
              <div className="relative bg-gray-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a command (e.g. 'skills')..."
                  className="w-full bg-transparent px-5 py-3.5 md:py-4 text-white placeholder-gray-500 focus:outline-none text-sm md:text-base"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-full opacity-50 group-focus-within:opacity-100 transition-opacity"></div>
              </div>
            </form>
          </div>

          <div className="flex justify-center items-center space-x-4 md:space-x-6 pb-2">
            <button onClick={onContinue} className="relative overflow-hidden px-8 md:px-10 py-3 md:py-4 bg-cyan-600 text-white rounded-full font-bold tracking-widest uppercase text-[9px] md:text-[10px] hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/40 group">
              <span className="relative z-10">Enter Portfolio</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
