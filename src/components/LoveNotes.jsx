import React, { useState } from 'react'
import './LoveNotes.css'

const LoveNotes = () => {
  const [flippedCards, setFlippedCards] = useState({})

  const loveNotes = [
    {
      id: 1,
      frontText: "Reason #1",
      backText: "I'm so in love with your eyes ✨",
      color: "#FFB6C1"
    },
    {
      id: 2,
      frontText: "Reason #2", 
      backText: "You respect me 💕",
      color: "#F5E6D3"
    },
    {
      id: 3,
      frontText: "Reason #3",
      backText: "You inspire me to reach my goals 💖",
      color: "#E6D3A3"
    },
    {
      id: 4,
      frontText: "Reason #4",
      backText: "I love your mom, Aicha and Abdullah 🤗",
      color: "#D2B48C"
    },
    {
      id: 5,
      frontText: "Reason #5",
      backText: "You make me feel like the luckiest man ever 💫",
      color: "#DEB887"
    },
    {
      id: 6,
      frontText: "Reason #6",
      backText: "You are my home 🏠",
      color: "#F5DEB3"
    }
  ]

  const toggleCard = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  return (
    <section className="love-notes">
      <div className="love-notes-header">
        <h2 className="love-notes-title">Why I Love You 💕</h2>
        <p className="love-notes-subtitle">Click each card to reveal a special message just for you</p>
      </div>

      <div className="notes-grid">
        {loveNotes.map((note) => (
          <div 
            key={note.id}
            className={`flip-card ${flippedCards[note.id] ? 'flipped' : ''}`}
            onClick={() => toggleCard(note.id)}
          >
            <div className="flip-card-inner">
              {/* Front of card */}
              <div 
                className="flip-card-front"
                style={{ backgroundColor: note.color }}
              >
                <div className="card-content">
                  <div className="heart-decoration">💖</div>
                  <h3 className="card-title">{note.frontText}</h3>
                  <p className="click-hint">Click to reveal</p>
                  <div className="decorative-border"></div>
                </div>
              </div>

              {/* Back of card */}  
              <div 
                className="flip-card-back"
                style={{ backgroundColor: note.color }}
              >
                <div className="card-content">
                  <p className="love-message">{note.backText}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="love-notes-footer">
        <div className="handwritten-note">
          <p className="main-message">
            "Every day with you is a new reason to fall in love all over again..."
          </p>
          <div className="footer-signature">
            <span>Forever yours,</span>
            <span className="signature-heart">💝</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveNotes