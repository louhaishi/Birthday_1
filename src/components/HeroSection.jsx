import React, { useState, useEffect } from 'react'
import FloatingHearts from './FloatingHearts'
import BalloonAnimation from './BalloonAnimation'
import './HeroSection.css'

const HeroSection = ({ onCelebrate }) => {
  const [showMessage, setShowMessage] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 500)
    const timer2 = setTimeout(() => setShowSubtitle(true), 1500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section className="hero-section">
      <FloatingHearts />
      <BalloonAnimation />
      
      <div className="hero-content">
        <h1 className={`birthday-title ${showMessage ? 'fade-in' : ''}`}>
          Happy Birthday Sarah! 🎂
        </h1>
        
        <p className={`birthday-subtitle ${showSubtitle ? 'fade-in' : ''}`}>
          Hope your special day is filled with happiness, love, and wonderful surprises! ✨
        </p>
        
        <button 
          className="celebrate-btn"
          onClick={onCelebrate}
        >
          🎉 Celebrate! 🎉
        </button>
      </div>
    </section>
  )
}

export default HeroSection