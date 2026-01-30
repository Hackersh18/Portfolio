'use client'

import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(true)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    if (!isStarted) return

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 1
      })
    }, 30) // Faster interval for ~3 seconds total loading time

    return () => clearInterval(timer)
  }, [isStarted])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setShowContent(false)
        if (onComplete) onComplete()
      }, 1000)
    }
  }, [progress, onComplete])

  if (!showContent) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden">
      {!isStarted ? (
        <button 
          onClick={() => {
            // Prime the audio context immediately on user click
            if (typeof window !== 'undefined') {
              // 1. Prime SpeechSynthesis
              const utterance = new SpeechSynthesisUtterance("");
              window.speechSynthesis.speak(utterance);
              
              // 2. Prime Audio element
              const audio = new Audio();
              audio.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
              audio.play().catch(() => {});
            }
            setIsStarted(true);
          }}
          className="group relative px-12 py-4 bg-transparent border-2 border-cyan-500 font-mono text-xl tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] card-3d overflow-hidden"
        >
          <div className="card-3d-inner relative z-10 text-cyan-500 group-hover:text-black transition-colors duration-300">
            <span>INITIALIZE PORTFOLIO</span>
          </div>
          <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      ) : (
        <>
          {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage: `linear-gradient(to right, #00f2ff 1px, transparent 1px), linear-gradient(to bottom, #00f2ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Main HUD Circle */}
      <div className="relative w-64 h-64 md:w-96 md:h-96">
        {/* Outer Rotating Ring */}
        <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-4 border-2 border-dashed border-cyan-400/40 rounded-full animate-reverse-spin"></div>
        
        {/* Inner HUD Elements */}
        <div className="absolute inset-8 border-t-4 border-b-4 border-cyan-500/60 rounded-full animate-spin-fast"></div>
        <div className="absolute inset-12 border-l-4 border-r-4 border-cyan-300/50 rounded-full animate-reverse-spin-slow"></div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl md:text-6xl font-bold text-cyan-400 font-mono tracking-tighter mb-2">
            {progress}%
          </div>
          <div className="text-xs md:text-sm text-cyan-500 font-mono tracking-widest uppercase animate-pulse">
            Initializing PORTFOLIO.
          </div>
        </div>

        {/* Scanning Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/4 w-full animate-scan pointer-events-none"></div>
      </div>

      {/* System Status Lines */}
      <div className="mt-12 w-full max-w-xs md:max-w-md space-y-4 px-4">
        <div className="flex justify-between items-end text-[10px] md:text-xs font-mono text-cyan-500/70">
          <span>SYSTEM_BOOT_SEQUENCE</span>
          <span>STABLE</span>
        </div>
        <div className="h-1 bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/30">
          <div 
            className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="h-[2px] bg-cyan-500/20 w-full"></div>
            <div className="h-[2px] bg-cyan-500/40 w-3/4"></div>
            <div className="h-[2px] bg-cyan-500/10 w-1/2"></div>
          </div>
          <div className="flex justify-end items-start text-[8px] md:text-[10px] font-mono text-cyan-400/50">
            LOAD_MOD: NEXT_CORE_v14
          </div>
        </div>
      </div>

      {/* Floating Data Bits */}
      <div className="absolute top-10 left-10 text-[8px] text-cyan-500/40 font-mono hidden md:block">
        <p>MEM_SCAN: 0x8FF21</p>
        <p>CORE_TEMP: 32.4C</p>
        <p>NET_LINK: SECURE</p>
      </div>
      <div className="absolute bottom-10 right-10 text-[8px] text-cyan-500/40 font-mono hidden md:block text-right">
        <p>LATENCY: 12ms</p>
        <p>BUFFER: 1024KB</p>
        <p>UPLOADING_PORTFOLIO_v2.0</p>
      </div>

        </>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { top: -25%; }
          100% { top: 100%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(720deg); }
        }
        @keyframes reverse-spin-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 6s linear infinite; }
        .animate-spin-fast { animation: spin-fast 4s linear infinite; }
        .animate-reverse-spin-slow { animation: reverse-spin-slow 15s linear infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
      `}</style>
    </div>
  )
}
