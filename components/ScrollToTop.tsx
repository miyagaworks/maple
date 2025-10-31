'use client'

import { useState, useEffect } from 'react'
import { FaChevronUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 xl:bottom-8 -right-2 xl:right-8 text-white p-4 rounded-xl xl:rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          style={{ backgroundColor: '#f5d10f' }}
          aria-label="ページトップへ戻る"
        >
          <FaChevronUp className="text-2xl" style={{ color: '#572A06' }} />
        </button>
      )}
    </>
  )
}
