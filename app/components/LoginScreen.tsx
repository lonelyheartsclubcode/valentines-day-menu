"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoginScreenProps {
  onLogin: () => void
}

interface BouncingEmoji {
  id: number
  x: number
  y: number
  emoji: string
  velocityX: number
  velocityY: number
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [emojis, setEmojis] = useState<BouncingEmoji[]>([])

  useEffect(() => {
    // Create initial emojis
    const initialEmojis = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: i % 2 === 0 ? "💿" : "❤️", // CD and heart
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: (Math.random() - 0.5) * 4,
    }))
    setEmojis(initialEmojis)

    // Animation loop with rotation for disco ball
    const animationFrame = setInterval(() => {
      setEmojis((prevEmojis) =>
        prevEmojis.map((emoji) => {
          let newX = emoji.x + emoji.velocityX
          let newY = emoji.y + emoji.velocityY
          let newVelocityX = emoji.velocityX
          let newVelocityY = emoji.velocityY

          // Bounce off walls
          if (newX < 0 || newX > window.innerWidth - 40) {
            newVelocityX = -emoji.velocityX
            newX = Math.max(0, Math.min(window.innerWidth - 40, newX))
          }
          if (newY < 0 || newY > window.innerHeight - 40) {
            newVelocityY = -emoji.velocityY
            newY = Math.max(0, Math.min(window.innerHeight - 40, newY))
          }

          return {
            ...emoji,
            x: newX,
            y: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
          }
        })
      )
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(animationFrame)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.toLowerCase() === "nayu" && password === "vampkingmika") {
      onLogin()
    } else {
      setError("Invalid username or password")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#235ADC] overflow-hidden">
      {/* Bouncing emojis */}
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute text-4xl pointer-events-none"
          style={{
            x: emoji.x,
            y: emoji.y,
          }}
          animate={emoji.emoji === "💿" ? { rotate: 360 } : {}}
          transition={emoji.emoji === "💿" ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
        >
          {emoji.emoji}
        </motion.div>
      ))}

      {/* Login form */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-[#ECE9D8] border-2 border-[#0054E3] rounded-lg p-8 shadow-lg w-96">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0054E3] to-[#2683FF] text-transparent bg-clip-text">
              crushcultureOS
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">User name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0054E3]"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#0054E3]"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="xp-button"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen 