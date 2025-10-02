import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import FloatingHearts from './components/FloatingHearts'
import BalloonAnimation from './components/BalloonAnimation'
import PhotoGallery from './components/PhotoGallery'
import LoveNotes from './components/LoveNotes'
import InteractiveSection from './components/InteractiveSection'
import CountdownSection from './components/CountdownSection'
import FinalSurprise from './components/FinalSurprise'
import './App.css'

function App() {
  // Trigger confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D2B48C', '#F5E6D3', '#E6D3A3', '#B8860B', '#FFB6C1', '#FFC0CB']
    })
  }

  // Auto-trigger confetti on load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti()
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <FloatingHearts />
      <BalloonAnimation />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        color: '#8B4513',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '4rem', 
          marginBottom: '2rem',
          opacity: 0,
          animation: 'fadeIn 1s ease-out 0.5s forwards'
        }}>
          Happy Birthday Sarah! 🎂
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          opacity: 0,
          animation: 'fadeIn 1s ease-out 1.5s forwards'
        }}>
          Hope your special day is filled with happiness, love, and wonderful surprises! ✨
        </p>
        <button 
          style={{
            background: 'linear-gradient(45deg, #D2B48C, #DEB887, #F5DEB3)',
            border: 'none',
            padding: '1rem 2.5rem',
            fontSize: '1.2rem',
            borderRadius: '50px',
            color: '#8B4513',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 15px rgba(139, 69, 19, 0.2)'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          onClick={triggerConfetti}
        >
          🎉 Celebrate! 🎉
        </button>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <PhotoGallery />
      <LoveNotes />
      <CountdownSection />
      <InteractiveSection />
      <FinalSurprise />
    </div>
  )
}

export default App
