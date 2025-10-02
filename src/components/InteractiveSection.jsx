import React, { useState, useRef, useEffect } from 'react'
import './InteractiveSection.css'

const InteractiveSection = () => {
  // Surprise Box State
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  
  // Scratch Card State
  const [isScratched, setIsScratched] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const canvasRef = useRef(null)
  const [scratchedArea, setScratchedArea] = useState(0)

  const quizQuestions = [
    {
      question: "What's my favorite color?",
      options: ["Blue", "Pink", "Green", "Black"],
      correct: 3,
      explanation: "You always remember how much I love black! 💕"
    },
    {
      question: "What's my dream vacation destination?",
      options: ["Paris", "Japan", "Samoa", "Italy"],
      correct: 2,
      explanation: "You know I've always dreamed of visiting Samoa together! 🏝️"
    },
    {
      question: "What do I like the most?",
      options: ["Math", "Geography", "AI", "Candles"],
      correct: 1,
      explanation: "You know me so well - I love geography the most! 🌍"
    },
    {
      question: "What always makes me smile?",
      options: ["Cute puppies", "Your jokes", "You not being cold", "Surprise flowers"],
      correct: 2,
      explanation: "You not being cold always makes me smile! 😊"
    }
  ]

  // Surprise Box Functions
  const openSurpriseBox = () => {
    setIsBoxOpen(true)
  }

  const closeSurpriseBox = () => {
    setIsBoxOpen(false)
  }

  // Quiz Functions
  const startQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setShowQuizResults(false)
  }

  const selectAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
    
    if (currentQuestion + 1 < quizQuestions.length) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 1500)
    } else {
      setTimeout(() => {
        setShowQuizResults(true)
      }, 1500)
    }
  }

  const resetQuiz = () => {
    setQuizStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setShowQuizResults(false)
  }

  // Scratch Card Functions
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      
      // Create scratch overlay
      ctx.fillStyle = '#D2B48C'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add text overlay
      ctx.fillStyle = '#8B4513'
      ctx.font = 'bold 20px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Scratch to reveal', canvas.width/2, canvas.height/2 - 10)
      ctx.fillText('your surprise! 💝', canvas.width/2, canvas.height/2 + 20)
    }
  }, [])

  const startScratch = (e) => {
    setIsScratching(true)
    scratch(e)
  }

  const scratch = (e) => {
    if (!isScratching) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    
    let clientX, clientY
    if (e.touches) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    
    const x = clientX - rect.left
    const y = clientY - rect.top
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2 * Math.PI)
    ctx.fill()
    
    // Check scratched area
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }
    
    const scratchedPercent = (transparent / (pixels.length / 4)) * 100
    setScratchedArea(scratchedPercent)
    
    if (scratchedPercent > 50) {
      setIsScratched(true)
    }
  }

  const stopScratch = () => {
    setIsScratching(false)
  }

  const resetScratchCard = () => {
    setIsScratched(false)
    setScratchedArea(0)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#D2B48C'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#8B4513'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Scratch to reveal', canvas.width/2, canvas.height/2 - 10)
    ctx.fillText('your surprise! 💝', canvas.width/2, canvas.height/2 + 20)
  }

  return (
    <section className="interactive-section">
      <div className="interactive-header">
        <h2 className="interactive-title">Special Surprises Just for You! 🎁</h2>
        <p className="interactive-subtitle">Click, play, and discover hidden messages made with love</p>
      </div>

      <div className="interactive-grid">
        
        {/* Surprise Box */}
        <div className="surprise-box-container">
          <h3>Mystery Surprise Box 🎁</h3>
          <div className={`surprise-box ${isBoxOpen ? 'open' : ''}`}>
            <div className="box-lid" onClick={openSurpriseBox}>
              {!isBoxOpen && <span className="box-text">Click to Open!</span>}
            </div>
            <div className="box-content">
              {isBoxOpen && (
                <div className="surprise-message">
                  <div className="gift-animation">🎉</div>
                  <h4>Surprise! 💕</h4>
                  <p>Nhebbbekk barsha barsha barshaaaaaaa</p>
                  <div className="cute-gif">
                    <div className="dancing-heart">💖</div>
                  </div>
                  <button className="close-box-btn" onClick={closeSurpriseBox}>
                    Close Box
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Game */}
        <div className="quiz-container">
          <h3>How Well Do You Know Me? 🤔</h3>
          
          {!quizStarted ? (
            <div className="quiz-start">
              <div className="quiz-preview">
                <p>Test your knowledge about me!</p>
                <div className="quiz-stats">
                  <span>📝 {quizQuestions.length} Questions</span>
                  <span>💖 Made with Love</span>
                </div>
              </div>
              <button className="start-quiz-btn" onClick={startQuiz}>
                Start Quiz! 🚀
              </button>
            </div>
          ) : showQuizResults ? (
            <div className="quiz-results">
              <div className="results-animation">🎊</div>
              <h4>Quiz Complete!</h4>
              <div className="score-display">
                You scored {score} out of {quizQuestions.length}!
              </div>
              <div className="score-message">
                {score === quizQuestions.length ? 
                  "Perfect! You know me so well! 💕" : 
                  score >= quizQuestions.length / 2 ? 
                  "Great job! You really pay attention! 😊" : 
                  "That's okay, we have more time to learn about each other! 💖"
                }
              </div>
              <button className="reset-quiz-btn" onClick={resetQuiz}>
                Play Again 🔄
              </button>
            </div>
          ) : (
            <div className="quiz-question">
              <div className="question-progress">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </div>
              <h4>{quizQuestions[currentQuestion].question}</h4>
              <div className="quiz-options">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="quiz-option"
                    onClick={() => selectAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scratch Card */}
        <div className="scratch-card-container">
          <h3>Scratch Card Surprise 🪙</h3>
          <div className="scratch-card">
            <div className="scratch-card-base">
              <div className="hidden-message">
                <div className="surprise-content">
                  <h4>You Found It! 🌟</h4>
                  <p>Wallahh i really love you Sarah</p>
                  <div className="hidden-image">🌈✨💖✨🌈</div>
                </div>
              </div>
            </div>
            
            <canvas
              ref={canvasRef}
              width={300}
              height={200}
              className={`scratch-overlay ${isScratched ? 'fully-scratched' : ''}`}
              onMouseDown={startScratch}
              onMouseMove={scratch}
              onMouseUp={stopScratch}
              onMouseLeave={stopScratch}
              onTouchStart={startScratch}
              onTouchMove={scratch}
              onTouchEnd={stopScratch}
            />
          </div>
          
          {isScratched && (
            <button className="reset-scratch-btn" onClick={resetScratchCard}>
              Reset Card 🔄
            </button>
          )}
          
          <div className="scratch-progress">
            Scratched: {Math.round(scratchedArea)}%
          </div>
        </div>

      </div>
    </section>
  )
}

export default InteractiveSection