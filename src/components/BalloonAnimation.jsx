import React from 'react'

const BalloonAnimation = () => {
  const balloons = [
    { color: '#FFB6C1', delay: '0s', left: '10%' },
    { color: '#F5E6D3', delay: '1s', left: '25%' },
    { color: '#D2B48C', delay: '2s', left: '50%' },
    { color: '#FFC0CB', delay: '3s', left: '75%' },
    { color: '#E6D3A3', delay: '4s', left: '90%' }
  ]

  const balloonStyle = {
    position: 'absolute',
    width: '40px',
    height: '60px',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    opacity: 0.8,
    bottom: '-80px'
  }

  const stringStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    width: '2px',
    height: '20px',
    background: 'linear-gradient(to bottom, #8B4513, transparent)',
    transform: 'translateX(-50%)'
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      pointerEvents: 'none', 
      zIndex: 1, 
      overflow: 'hidden' 
    }}>
      {balloons.map((balloon, index) => (
        <div
          key={index}
          style={{
            ...balloonStyle,
            backgroundColor: balloon.color,
            left: balloon.left,
            animation: `floatBalloon 8s ease-in-out infinite`,
            animationDelay: balloon.delay
          }}
        >
          <div style={stringStyle}></div>
        </div>
      ))}
      <style>{`
        @keyframes floatBalloon {
          0% {
            bottom: -80px;
            transform: translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          25% {
            transform: translateX(-10px) rotate(-2deg);
          }
          50% {
            transform: translateX(10px) rotate(2deg);
          }
          75% {
            transform: translateX(-5px) rotate(-1deg);
          }
          90% {
            opacity: 0.8;
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

export default BalloonAnimation