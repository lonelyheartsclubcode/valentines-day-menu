import { useState, useEffect } from "react"
import { Minus, Square, X } from "lucide-react"
import type React from "react"

interface WindowsXPFrameProps {
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
}

const WindowsXPFrame: React.FC<WindowsXPFrameProps> = ({ children, onClose, onMinimize, onMaximize, isMaximized }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      className={`bg-[#ECE9D8] border-2 border-[#0054E3] rounded-t-lg shadow-lg transition-all duration-300 flex flex-col ${
        isMaximized
          ? isMobile
            ? "fixed inset-4 rounded-t-lg"
            : "fixed inset-0 rounded-none"
          : "w-full max-w-4xl mx-4 relative min-h-[80vh]"
      }`}
    >
      <div className="bg-gradient-to-r from-[#0054E3] to-[#2683FF] text-white py-1 px-2 flex justify-between items-center rounded-t shrink-0">
        <div className="text-sm md:text-base font-semibold flex items-center">
          <span className="mr-2 text-xl">💌</span>
          Valentine's Menu - Internet Explorer
        </div>
        <div className="flex space-x-1 md:space-x-2">
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#FFB154] rounded-sm hover:bg-[#FFD054] flex items-center justify-center touch-manipulation"
            onClick={onMinimize}
          >
            <Minus size={isMobile ? 16 : 14} />
          </button>
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#00CA4E] rounded-sm hover:bg-[#00EA5E] flex items-center justify-center touch-manipulation"
            onClick={onMaximize}
          >
            <Square size={isMobile ? 16 : 14} />
          </button>
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#FF605C] rounded-sm hover:bg-[#FF805C] flex items-center justify-center touch-manipulation"
            onClick={onClose}
          >
            <X size={isMobile ? 16 : 14} />
          </button>
        </div>
      </div>
      <div 
        className="flex-1 bg-white overflow-hidden flex flex-col" 
      >
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default WindowsXPFrame

