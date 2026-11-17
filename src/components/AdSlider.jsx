import React, { useEffect, useState } from 'react'
import { fetchActiveAds } from '../services/adService'

const AdSlider = () => {
  const [ads, setAds] = useState([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetchActiveAds().then(({ data }) => {
      if (data) setAds(data)
    })
  }, [])

  useEffect(() => {
    if (ads.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % ads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [ads])

  if (ads.length === 0) return null

  return (
    <div className="ad-card">
      <div className="ad-card__label">Advertisement</div>
      <div className="ad-card__media">
        {ads.map((ad, idx) => (
          <a
            key={ad.id}
            href={ad.link_url || '#'}
            target={ad.link_url ? '_blank' : undefined}
            rel={ad.link_url ? 'noopener noreferrer' : undefined}
            className={`ad-card__slide ${idx === current ? 'is-visible' : ''}`}
            aria-hidden={idx !== current}
            tabIndex={idx === current ? 0 : -1}
          >
            <img src={ad.image_url} alt={ad.title || 'Advertisement'} />
          </a>
        ))}
      </div>
      <p className="ad-card__title">{ads[current]?.title || 'Sponsored content'}</p>
    </div>
  )
}

export default AdSlider
