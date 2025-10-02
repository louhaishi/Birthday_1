import React, { useEffect, useState } from 'react'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 90 + 5, // Keep hearts within viewport
        animationDuration: Math.random() * 3 + 3,
        size: Math.random() * 15 + 15
      }
      
      setHearts(prev => [...prev, heart])
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id))
      }, heart.animationDuration * 1000)
    }

    const interval = setInterval(createHeart, 1500)
    return () => clearInterval(interval)
  }, [])

  const heartStyle = {
    position: 'fixed',
    bottom: '-50px',
    pointerEvents: 'none',
    zIndex: 1,
    userSelect: 'none',
    opacity: 0.8
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map(heart => (
        <div
          key={heart.id}
          style={{
            ...heartStyle,
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.animationDuration}s linear infinite`
          }}
        >
          💖
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            bottom: -50px;
            transform: translateX(0px) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translateX(10px) rotate(5deg);
          }
          50% {
            transform: translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateX(5px) rotate(2deg);
          }
          100% {
            bottom: 100vh;
            transform: translateX(0px) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default FloatingHearts