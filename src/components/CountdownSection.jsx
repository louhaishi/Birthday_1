import { useState, useEffect } from 'react'
import './CountdownSection.css'

const CountdownSection = () => {
  const [daysTogether, setDaysTogether] = useState(0)
  const [timeUntilEvents, setTimeUntilEvents] = useState([])

  // Set your relationship start date here
  const relationshipStartDate = new Date('2024-01-01') // Update this to your actual start date
  
  // Define your special upcoming events
  const upcomingEvents = [
    {
      name: "Our Anniversary",
      date: new Date('2026-02-04'),
      emoji: "💕"
    },
    {
      name: "Valentine's Day",
      date: new Date('2025-02-14'),
      emoji: "💝"
    },
    {
      name: "Next Trip",
      date: new Date('2025-02-28'),
      emoji: "✈️"
    },
    {
      name: "Your Next Birthday",
      date: new Date('2025-10-03'),
      emoji: "🎂"
    }
  ]

  const calculateDaysTogether = () => {
    // Set to 240 days as requested
    setDaysTogether(240)
  }

  const calculateTimeUntilEvents = () => {
    // Use your specific day counts
    const eventCountdowns = [
      {
        name: "Our Anniversary",
        date: new Date('2026-02-04'),
        emoji: "💕",
        daysUntil: 125
      },
      {
        name: "Valentine's Day",
        date: new Date('2025-02-14'),
        emoji: "💝",
        daysUntil: 135
      },
      {
        name: "Next Trip",
        date: new Date('2025-02-28'),
        emoji: "✈️",
        daysUntil: 149
      },
      {
        name: "Your Next Birthday",
        date: new Date('2025-10-03'),
        emoji: "🎂",
        daysUntil: 366
      }
    ]
    
    // Sort by days until event (soonest first)
    eventCountdowns.sort((a, b) => a.daysUntil - b.daysUntil)
    setTimeUntilEvents(eventCountdowns)
  }

  useEffect(() => {
    calculateDaysTogether()
    calculateTimeUntilEvents()
    
    // Update every day
    const interval = setInterval(() => {
      calculateDaysTogether()
      calculateTimeUntilEvents()
    }, 24 * 60 * 60 * 1000) // 24 hours
    
    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="countdown-section">
      <div className="countdown-container">
        <h2 className="section-title">Our Journey Together</h2>
        
        {/* Days Together Counter */}
        <div className="days-together">
          <div className="counter-display">
            <div className="counter-number">{daysTogether.toLocaleString()}</div>
            <div className="counter-label">Days Together</div>
            <div className="heart-decoration">💕</div>
          </div>
          <p className="counter-subtitle">
            Every day with you has been a blessing
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <h3 className="events-title">Upcoming Special Moments</h3>
          <div className="events-grid">
            {timeUntilEvents.slice(0, 4).map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-emoji">{event.emoji}</div>
                <div className="event-name">{event.name}</div>
                <div className="event-countdown">
                  <span className="days-count">{event.daysUntil}</span>
                  <span className="days-label">days</span>
                </div>
                <div className="event-date">{formatDate(event.date)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountdownSection