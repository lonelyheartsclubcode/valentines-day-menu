"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Menu from "./components/Menu"
import WindowsXPFrame from "./components/WindowsXPFrame"
import StartButton from "./components/StartButton"
import DesktopIcon from "./components/DesktopIcon"
import StartMenu from "./components/StartMenu"
import type React from "react"

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const [emojis, setEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([])
  const [showInitialAnimation, setShowInitialAnimation] = useState(false)
  const [showWarning, setShowWarning] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    // Set up periodic warning popup
    const showWarningPeriodically = () => {
      setShowWarning(true)
    }
    
    // Show warning every minute
    const warningInterval = setInterval(showWarningPeriodically, 60000)
    
    // Cleanup interval on unmount
    return () => clearInterval(warningInterval)
  }, [])

  useEffect(() => {
    const showPopup = async () => {
      await controls.start({ y: 0, opacity: 1 })
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await controls.start({ y: 100, opacity: 0 })
    }
    showPopup()
  }, [controls])

  const handleTap = (event: React.MouseEvent | React.TouchEvent) => {
    // Don't close start menu if clicking within it or on the start button
    const target = event.target as HTMLElement;
    if (target.closest('[data-start-menu="true"]') || target.closest('[data-start-button="true"]')) {
      return;
    }
    
    if (showStartMenu) setShowStartMenu(false)

    const { clientX, clientY } = "touches" in event ? event.touches[0] : event
    const newHeart = { id: Date.now(), x: clientX, y: clientY }
    setHearts((prevHearts) => [...prevHearts, newHeart])
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== newHeart.id))
    }, 1000)
  }

  const handleEmojiClick = (event: React.MouseEvent, emoji: string) => {
    event.preventDefault()
    event.stopPropagation()

    const centerX = window.innerWidth / 2
    const centerY = (window.innerHeight - 48) / 2 // Account for taskbar

    const newEmoji = {
      id: Date.now(),
      emoji,
      x: centerX,
      y: centerY,
    }

    setEmojis((prevEmojis) => [...prevEmojis, newEmoji])
    setTimeout(() => {
      setEmojis((prevEmojis) => prevEmojis.filter((e) => e.id !== newEmoji.id))
    }, 2000)
  }

  const handleOpenMenu = () => {
    setShowInitialAnimation(true)
    setTimeout(() => {
      setShowInitialAnimation(false)
      setShowMenu(true)
    }, 3000) // Increased duration for more emojis to show
  }

  const handleWarningClick = () => {
    setShowWarning(false)
    // Create 20 bug emojis with more random positions and staggered animations
    const newEmojis = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      emoji: "🐛",
      x: (Math.random() * 0.8 + 0.1) * window.innerWidth, // Keep within middle 80% of screen
      y: (Math.random() * 0.7 + 0.1) * (window.innerHeight - 100), // Keep within middle 70% of screen, avoid taskbar
      delay: i * 50, // Stagger the animations
    }))
    setEmojis((prev) => [...prev, ...newEmojis])
    
    // Remove emojis after animation
    setTimeout(() => {
      setEmojis((prev) => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)))
    }, 3000)
  }

  return (
    <main
      className="min-h-screen w-full text-black flex flex-col items-center justify-center relative overflow-hidden cursor-default"
      onClick={handleTap}
      onTouchStart={handleTap}
      style={{
        backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/windows_98_x_windows_xp_by_windowsartist2009_dh9kb4u-pre.jpg-tYFhyigbvwRrjP9gV03kfnyTPiwp1K.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showWarning && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-yellow-100 border-2 border-yellow-400 px-4 py-2 rounded shadow-lg cursor-pointer z-50 flex items-center hover:bg-yellow-50 active:bg-yellow-200"
          onClick={handleWarningClick}
        >
          <span className="text-2xl mr-2 animate-bounce">⚠️</span>
          <span className="font-bold text-gray-800">Your computer might be at risk! Click here to scan now!</span>
        </motion.div>
      )}

      {/* Desktop icon */}
      {!showMenu && !showInitialAnimation && (
        <div className="absolute top-4 left-4">
          <DesktopIcon emoji="💌" label="Valentine's Menu" onClick={handleOpenMenu} />
        </div>
      )}

      {showInitialAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-serif text-center text-rose-700 flex flex-col items-center justify-center bg-white/90 p-8 rounded-lg"
        >
          <div className="flex items-center">
            Valentine&apos;s Day Menu for Nayu
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="ml-4 text-rose-500 text-5xl md:text-7xl">❤️</span>
            </motion.div>
          </div>
          <motion.div
            className="mt-4 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {["😍", "💖", "🌹", "🍫", "🎁", "💕", "😘", "💞"].map((emoji, index) => (
              <motion.span
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="inline-block mx-1"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}

      {showMenu && !isMinimized && (
        <WindowsXPFrame
          onClose={() => setShowMenu(false)}
          onMinimize={() => setIsMinimized(true)}
          onMaximize={() => setIsMaximized(!isMaximized)}
          isMaximized={isMaximized}
        >
          <Menu />
        </WindowsXPFrame>
      )}

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none text-2xl z-50"
          initial={{ x: heart.x, y: heart.y, scale: 0 }}
          animate={{ y: heart.y - 100, scale: 1, opacity: [1, 0] }}
          transition={{ duration: 1 }}
        >
          ❤️
        </motion.div>
      ))}

      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="fixed pointer-events-none text-6xl z-50"
          style={{ left: "50%", top: "50%" }}
          initial={{ x: "-50%", y: "-50%", scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            rotate: 360,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.5 }}
        >
          {emoji.emoji}
        </motion.div>
      ))}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-[#245EDC] to-[#3C8BF5] flex items-center px-2 z-50">
        <StartButton onClick={() => setShowStartMenu(!showStartMenu)} />
        {showMenu && isMinimized && (
          <button
            className="ml-2 px-4 h-8 bg-[#3C8BF5] hover:bg-[#4C9BFF] text-white text-sm rounded-sm flex items-center"
            onClick={() => setIsMinimized(false)}
          >
            <span className="mr-2">💌</span>
            Valentine's Menu
          </button>
        )}
        <div className="flex-grow" />
        {["😍", "💖", "🌹", "🍫", "🎁"].map((emoji) => (
          <button
            key={emoji}
            className="mx-1 text-2xl hover:bg-[#3C8BF5] rounded p-1 transition-colors"
            onClick={(e) => handleEmojiClick(e, emoji)}
          >
            {emoji}
          </button>
        ))}
        <div className="text-white text-xs pl-2 pr-2 border-l border-[#1D4BBC]">{new Date().toLocaleTimeString()}</div>
      </div>

      {/* Start Menu */}
      {showStartMenu && (
        <div data-start-menu="true" onClick={(e) => e.stopPropagation()}>
          <StartMenu
            onMenuClick={() => {
              handleOpenMenu()
              setShowStartMenu(false)
            }}
          />
        </div>
      )}
    </main>
  )
}

