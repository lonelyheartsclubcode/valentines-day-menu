"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { supabase, type MessageLog } from '@/lib/supabase'

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
  const [showPopup1, setShowPopup1] = useState(false)
  const [showPopup2, setShowPopup2] = useState(false)
  const [showPopup3, setShowPopup3] = useState(false)
  const [showPopup4, setShowPopup4] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [showSentAnimation, setShowSentAnimation] = useState(0)
  const [messageLogs, setMessageLogs] = useState<MessageLog[]>([])

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

    // Show first popup after 1 second
    const timer = setTimeout(() => {
      setShowPopup1(true)
    }, 1000)

    return () => {
      clearInterval(animationFrame)
      clearTimeout(timer)
    }
  }, [])

  const startPopupCycle = () => {
    setShowPopup1(true)
  }

  const handleClosePopup1 = () => {
    setShowPopup1(false)
    setTimeout(() => setShowPopup2(true), 500)
  }

  const handleClosePopup2 = () => {
    setShowPopup2(false)
    setTimeout(() => setShowPopup3(true), 500)
  }

  const handleClosePopup3 = () => {
    setShowPopup3(false)
    setTimeout(() => setShowPopup4(true), 500)
  }

  const handleClosePopup4 = () => {
    setShowPopup4(false)
    setTimeout(() => setShowPopup1(true), 60000) // 60 seconds = 60000ms
  }

  const getMessageContent = (popupNumber: number): string => {
    switch(popupNumber) {
      case 1:
        return "i need an extra 30 min"
      case 2:
        return "wyd"
      case 3:
        return "see you soon"
      case 4:
        return "🎸 🎮 🎧 🎬 🎨"
      default:
        return ""
    }
  }

  const logMessage = async (messageNumber: number, response: string) => {
    const now = new Date()
    const timestamp = now.toLocaleString()
    const originalMessage = getMessageContent(messageNumber)
    
    const newLog: MessageLog = {
      timestamp,
      original_message: originalMessage,
      response,
      message_number: messageNumber
    }
    
    try {
      const { error } = await supabase
        .from('message_logs')
        .insert(newLog)
      
      if (error) {
        console.error('Error logging message:', error)
      }
    } catch (error) {
      console.error('Error logging message:', error)
    }
  }

  const handleSendReply = async (popupNumber: number) => {
    if (replyText.trim()) {
      // Log the message before clearing the reply text
      await logMessage(popupNumber, replyText.trim())
      
      setShowSentAnimation(popupNumber)
      setReplyText("")
      setTimeout(() => {
        setShowSentAnimation(0)
        switch(popupNumber) {
          case 1:
            handleClosePopup1()
            break
          case 2:
            handleClosePopup2()
            break
          case 3:
            handleClosePopup3()
            break
          case 4:
            handleClosePopup4()
            break
        }
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, popupNumber: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendReply(popupNumber)
    }
  }

  const handleLoginKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

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
    <div className="fixed inset-0 overflow-hidden" style={{
      background: `linear-gradient(135deg, #FFE6EA 0%, #FFB6C1 50%, #FF69B4 100%)`,
      backgroundSize: "400% 400%",
      animation: "gradient 15s ease infinite"
    }}>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pixelate {
          0% {
            clip-path: inset(100% 100% 100% 100%);
            transform: scale(0.5);
            opacity: 0;
          }
          10% {
            clip-path: inset(78% 82% 80% 81%);
            transform: scale(0.6);
            opacity: 0.2;
          }
          20% {
            clip-path: inset(65% 68% 70% 65%);
            transform: scale(0.7);
            opacity: 0.4;
          }
          30% {
            clip-path: inset(50% 52% 55% 50%);
            transform: scale(0.8);
            opacity: 0.6;
          }
          40% {
            clip-path: inset(35% 38% 40% 35%);
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            clip-path: inset(20% 22% 25% 20%);
            transform: scale(0.95);
            opacity: 0.9;
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes y2kSendMessage {
          0% {
            clip-path: inset(100% 100% 100% 100%);
            transform: scale(0.5);
            opacity: 0;
          }
          10% {
            clip-path: inset(78% 82% 80% 81%);
            transform: scale(0.6);
            opacity: 0.2;
          }
          20% {
            clip-path: inset(65% 68% 70% 65%);
            transform: scale(0.7);
            opacity: 0.4;
          }
          30% {
            clip-path: inset(50% 52% 55% 50%);
            transform: scale(0.8);
            opacity: 0.6;
          }
          40% {
            clip-path: inset(35% 38% 40% 35%);
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            clip-path: inset(20% 22% 25% 20%);
            transform: scale(0.95);
            opacity: 0.9;
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Bouncing emojis */}
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute text-4xl pointer-events-none drop-shadow-lg"
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

      {/* First Popup - Top Right */}
      {showPopup1 && (
        <div className="fixed top-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#C0C0C0] border-2 border-[#808080] shadow-xl w-80 rounded"
            style={{
              animation: 'pixelate 0.4s steps(7, end)',
              imageRendering: 'pixelated'
            }}
          >
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center">
              <span className="text-white text-sm font-bold font-['MS_Sans_Serif']">Message from: mika</span>
              <button onClick={handleClosePopup1} className="text-white hover:bg-[#FF0000] p-1 rounded">
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-[#ECE9D8] flex flex-col h-full relative">
              <div className="text-sm font-['MS_Sans_Serif']">i need an extra 30 min</div>
              {showSentAnimation === 1 && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div
                    className="px-4 py-2 rounded-lg text-white text-sm font-['MS_Sans_Serif'] shadow-lg"
                    style={{
                      animation: 'pixelate 1.5s steps(7, end)',
                      background: 'linear-gradient(-45deg, #FF61D8, #9F53FF, #00FFFF, #5EFF53)',
                      backgroundSize: '300% 300%',
                      imageRendering: 'pixelated'
                    }}
                  >
                    Message Sent!
                  </div>
                </div>
              )}
              <div className="flex flex-col flex-grow mt-4">
                <div className="flex h-full space-x-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e as any, 1)}
                    className="flex-1 px-2 py-1 border border-[#808080] bg-white text-sm font-['MS_Sans_Serif'] resize-none"
                    placeholder="Type your reply..."
                  />
                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => handleSendReply(1)}
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Send
                    </button>
                    <button 
                      onClick={handleClosePopup1} 
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Second Popup - Bottom Left */}
      {showPopup2 && (
        <div className="fixed bottom-4 left-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#C0C0C0] border-2 border-[#808080] shadow-xl w-80 rounded"
            style={{
              animation: 'pixelate 0.4s steps(7, end)',
              imageRendering: 'pixelated'
            }}
          >
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center">
              <span className="text-white text-sm font-bold font-['MS_Sans_Serif']">Message from: mika</span>
              <button onClick={handleClosePopup2} className="text-white hover:bg-[#FF0000] p-1 rounded">
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-[#ECE9D8] flex flex-col h-full relative">
              <div className="text-sm font-['MS_Sans_Serif']">wyd</div>
              {showSentAnimation === 2 && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div
                    className="px-4 py-2 rounded-lg text-white text-sm font-['MS_Sans_Serif'] shadow-lg"
                    style={{
                      animation: 'pixelate 1.5s steps(7, end)',
                      background: 'linear-gradient(-45deg, #FF61D8, #9F53FF, #00FFFF, #5EFF53)',
                      backgroundSize: '300% 300%',
                      imageRendering: 'pixelated'
                    }}
                  >
                    Message Sent!
                  </div>
                </div>
              )}
              <div className="flex flex-col flex-grow mt-4">
                <div className="flex h-full space-x-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e as any, 2)}
                    className="flex-1 px-2 py-1 border border-[#808080] bg-white text-sm font-['MS_Sans_Serif'] resize-none"
                    placeholder="Type your reply..."
                  />
                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => handleSendReply(2)}
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Send
                    </button>
                    <button 
                      onClick={handleClosePopup2} 
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Third Popup - Bottom Right */}
      {showPopup3 && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#C0C0C0] border-2 border-[#808080] shadow-xl w-80 rounded"
            style={{
              animation: 'pixelate 0.4s steps(7, end)',
              imageRendering: 'pixelated'
            }}
          >
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center">
              <span className="text-white text-sm font-bold font-['MS_Sans_Serif']">Message from: mika</span>
              <button onClick={handleClosePopup3} className="text-white hover:bg-[#FF0000] p-1 rounded">
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-[#ECE9D8] flex flex-col h-full relative">
              <div className="text-sm font-['MS_Sans_Serif']">see you soon</div>
              {showSentAnimation === 3 && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div
                    className="px-4 py-2 rounded-lg text-white text-sm font-['MS_Sans_Serif'] shadow-lg"
                    style={{
                      animation: 'pixelate 1.5s steps(7, end)',
                      background: 'linear-gradient(-45deg, #FF61D8, #9F53FF, #00FFFF, #5EFF53)',
                      backgroundSize: '300% 300%',
                      imageRendering: 'pixelated'
                    }}
                  >
                    Message Sent!
                  </div>
                </div>
              )}
              <div className="flex flex-col flex-grow mt-4">
                <div className="flex h-full space-x-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e as any, 3)}
                    className="flex-1 px-2 py-1 border border-[#808080] bg-white text-sm font-['MS_Sans_Serif'] resize-none"
                    placeholder="Type your reply..."
                  />
                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => handleSendReply(3)}
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Send
                    </button>
                    <button 
                      onClick={handleClosePopup3} 
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Fourth Popup - Top Left */}
      {showPopup4 && (
        <div className="fixed top-4 left-4 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#C0C0C0] border-2 border-[#808080] shadow-xl w-80 rounded"
            style={{
              animation: 'pixelate 0.4s steps(7, end)',
              imageRendering: 'pixelated'
            }}
          >
            <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex justify-between items-center">
              <span className="text-white text-sm font-bold font-['MS_Sans_Serif']">Message from: mika</span>
              <button onClick={handleClosePopup4} className="text-white hover:bg-[#FF0000] p-1 rounded">
                <X size={14} />
              </button>
            </div>
            <div className="p-4 bg-[#ECE9D8] flex flex-col h-full relative">
              <div className="text-sm font-['MS_Sans_Serif']">🎸 🎮 🎧 🎬 🎨</div>
              {showSentAnimation === 4 && (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                  <div
                    className="px-4 py-2 rounded-lg text-white text-sm font-['MS_Sans_Serif'] shadow-lg"
                    style={{
                      animation: 'pixelate 1.5s steps(7, end)',
                      background: 'linear-gradient(-45deg, #FF61D8, #9F53FF, #00FFFF, #5EFF53)',
                      backgroundSize: '300% 300%',
                      imageRendering: 'pixelated'
                    }}
                  >
                    Message Sent!
                  </div>
                </div>
              )}
              <div className="flex flex-col flex-grow mt-4">
                <div className="flex h-full space-x-2">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e as any, 4)}
                    className="flex-1 px-2 py-1 border border-[#808080] bg-white text-sm font-['MS_Sans_Serif'] resize-none"
                    placeholder="Type your reply..."
                  />
                  <div className="flex flex-col justify-between">
                    <button
                      onClick={() => handleSendReply(4)}
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Send
                    </button>
                    <button 
                      onClick={handleClosePopup4} 
                      className="w-[76px] px-4 py-1 bg-[#C0C0C0] border border-[#808080] active:border-[#404040] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] text-sm font-['MS_Sans_Serif']"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Login form */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gradient-to-br from-[#F8F7FF] to-[#E8E6FF] border-4 border-[#9D8CFF] rounded-lg p-8 shadow-xl w-96">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#7B6FFF] to-[#B4A8FF] text-transparent bg-clip-text">
              crushcultureOS
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-[#6C5CE7] font-medium">User name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleLoginKeyPress}
                className="w-full px-3 py-2 border-2 border-[#9D8CFF] rounded focus:outline-none focus:border-[#6C5CE7] bg-white/90 focus:ring-2 focus:ring-[#B4A8FF]/30"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[#6C5CE7] font-medium">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleLoginKeyPress}
                className="w-full px-3 py-2 border-2 border-[#9D8CFF] rounded focus:outline-none focus:border-[#6C5CE7] bg-white/90 focus:ring-2 focus:ring-[#B4A8FF]/30"
              />
            </div>
            {error && (
              <div className="text-[#D8548E] text-sm font-medium">{error}</div>
            )}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#7B6FFF] to-[#9D8CFF] text-white font-['MS_Sans_Serif'] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040] border border-[#404040] active:border-[#202020] hover:from-[#6C5CE7] hover:to-[#7B6FFF]"
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