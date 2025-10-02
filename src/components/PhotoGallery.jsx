import React, { useState, useEffect } from 'react'
import './PhotoGallery.css'

// Import your actual images
import firstDateImg from '../assets/first date.jpeg'
import beachDateImg from '../assets/beach date.jpeg'
import romanticDinnerImg from '../assets/romantic dinner.jpeg'
import mountainHikingImg from '../assets/mountain hiking.jpeg'
import movieImg from '../assets/movie.jpeg'

const PhotoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Your actual memories with real photos
  const memories = [
    {
      id: 1,
      image: firstDateImg,
      caption: "Our magical first date ✨",
      description: "The day we first met and everything felt perfect!"
    },
    {
      id: 2,
      image: beachDateImg,
      caption: "Tanning by the beach and looking for jellyfish 😂",
      description: "Sun-kissed skin and jellyfish hunting adventures by the ocean"
    },
    {
      id: 3,
      image: romanticDinnerImg,
      caption: "The best dinner date 🌟",
      description: "The dinner after a long walk"
    },
    {
      id: 4,
      image: mountainHikingImg,
      caption: "Mountain hiking adventure 🏔️",
      description: "Falling 3 times"
    },
    {
      id: 5,
      image: movieImg,
      caption: "Cinema day \"Superman\" 🎬",
      description: "Cinema day \"Superman\""
    }
  ]

  // Auto-advance slideshow
  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % memories.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [isAutoPlay, memories.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % memories.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + memories.length) % memories.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="photo-gallery">
      <div className="gallery-header">
        <h2 className="gallery-title">Our Beautiful Journey Together 💕</h2>
        <p className="gallery-subtitle">Every moment with you is a treasure worth remembering</p>
      </div>

      {/* Main Slideshow */}
      <div className="slideshow-container">
        <div className="slideshow-wrapper">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="polaroid">
                <div className="polaroid-image">
                  <img src={memory.image} alt={memory.caption} />
                </div>
                <div className="polaroid-caption">
                  <h3>{memory.caption}</h3>
                  <p className="memory-description">{memory.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="slide-btn prev-btn" onClick={prevSlide}>
          ❮
        </button>
        <button className="slide-btn next-btn" onClick={nextSlide}>
          ❯
        </button>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {memories.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <h3 className="timeline-title">Our Story Timeline ✨</h3>
        <div className="timeline">
          {memories.map((memory, index) => (
            <div 
              key={memory.id} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              onClick={() => goToSlide(index)}
            >
              <div className="timeline-content">
                <div className="timeline-polaroid">
                  <img src={memory.image} alt={memory.caption} />
                </div>
                <div className="timeline-info">
                  <h4>{memory.caption}</h4>
                  <p>{memory.description}</p>
                </div>
              </div>
              <div className="timeline-marker">💖</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoGallery