import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './FinalSurprise.css'

const FinalSurprise = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [fireworksTriggered, setFireworksTriggered] = useState(false)

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const triggerFireworks = () => {
    setFireworksTriggered(true)
    
    // Multiple fireworks bursts
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#D2B48C', '#F5DEB3', '#B8860B']
    }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        setShowFinalMessage(true)
        return
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Left side firework
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      
      // Right side firework
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
      
      // Center firework
      confetti({
        ...defaults,
        particleCount: particleCount * 1.5,
        origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  const resetSurprise = () => {
    setShowFinalMessage(false)
    setFireworksTriggered(false)
  }

  return (
    <section className="final-surprise">
      <div className="surprise-container">
        {/* Animated Heart */}
        <div className={`heart-container ${isVisible ? 'visible' : ''}`}>
          <div className="beating-heart">❤️</div>
          <h2 className="love-message">I love you forever ❤️</h2>
          <p className="love-subtitle">
            You mean the world to me, Sarah
          </p>
        </div>

        {/* Surprise Button */}
        <div className={`surprise-button-container ${isVisible ? 'visible' : ''}`}>
          {!showFinalMessage ? (
            <button 
              className={`surprise-button ${fireworksTriggered ? 'triggered' : ''}`}
              onClick={triggerFireworks}
              disabled={fireworksTriggered}
            >
              {!fireworksTriggered ? (
                <>
                  <span className="button-text">Click for your surprise!</span>
                  <span className="button-emoji">🎆</span>
                </>
              ) : (
                <>
                  <span className="button-text">Creating magic...</span>
                  <span className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="final-message-container">
              <div className="final-message">
                <h3>Habiibiii w Rouu7yyy</h3>
                <p>
                  Happyy birthdayyyy to my sweet grumpyyyy giirlll ❤️
                </p>
                <p>
                  Habibi i know that we fight a lot and we're facing a lot of challenges, but wallah we're in the right path, we are fighting for each other, i really love you and i wanna spend the rest of my life with you my QUEEN, babyy since i saw you the first day, you are the first and last thing i think of before i sleep and when i wake up ❤️ now it's 241 days of joy and happiness, we shared a lot of cute moments, a lot of fights (A LOT OF FIGHTS!!!!!), we traveled Tunisia from North to South we experienced a lot of Things together... I really miss those days Wallah.... I miss every second, every smile, every fight, every time you act dallouu3a, every date we had inshallah real soon we'll travel and we unlock another country and another new Experience ❤️
                </p>
                <p>
                  I LOVEEE YOU SOOO SOOO MUCHH MY PRINCESS ❤️
                </p>
                <p>
                  Perhaps you're Mad cz it's a short paragraph but Trust me behind this Wall (Web APP) there are Thousands and thousands of code lines written by love so Chub ❤️
                </p>
                <p>
                  I LOVE YOU SARAH!
                </p>
                <button className="reset-button" onClick={resetSurprise}>
                  Experience it again ✨
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <span className="floating-heart">💕</span>
          <span className="floating-heart">💖</span>
          <span className="floating-heart">💝</span>
          <span className="floating-heart">🌟</span>
          <span className="floating-heart">✨</span>
          <span className="floating-heart">🎀</span>
        </div>
      </div>
    </section>
  )
}

export default FinalSurprise