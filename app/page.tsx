'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Resume from '@/components/Resume'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import LoadingScreen from '@/components/LoadingScreen'
import AIVoiceInterface from '@/components/AIVoiceInterface'

export default function Home() {
  const [appState, setAppState] = useState<'loading' | 'interaction' | 'portfolio'>('loading')

  return (
    <>
      {appState === 'loading' && (
        <LoadingScreen onComplete={() => setAppState('interaction')} />
      )}
      
      {appState === 'interaction' && (
        <AIVoiceInterface onContinue={() => setAppState('portfolio')} />
      )}
      
      <main className={`min-h-screen ${(appState === 'portfolio') ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Education />
        <Resume />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
