import React, { useEffect, useState } from 'react'

const taglines = [
  { text: 'खबरों में आगे।', language: 'hi' },
  { text: 'The News That Keeps You Ahead.', language: 'en' },
]

const AnimatedTagline = ({ variant = 'compact' }) => {
  const [index, setIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 2550)
    const switchTimer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % taglines.length)
      setIsExiting(false)
    }, 3000)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(switchTimer)
    }
  }, [index])

  const tagline = taglines[index]

  const isHero = variant === 'hero'

  return (
    <span
      className={`animated-tagline ${isHero ? 'animated-tagline--hero' : ''} ${isExiting ? 'is-exiting' : ''}`}
      lang={tagline.language}
      aria-live="polite"
    >
      {isHero && tagline.language === 'en' ? (
        <>News that keeps<br /><em>you ahead.</em></>
      ) : tagline.text}
    </span>
  )
}

export default AnimatedTagline
