"use client"

import { useState, useEffect } from "react"
import { Minus, Square, X } from "lucide-react"
import type React from "react"

interface WindowsXPFrameProps {
  children: React.ReactNode
  title?: string
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus?: () => void
  isMaximized: boolean
  style?: React.CSSProperties
}

const WindowsXPFrame: React.FC<WindowsXPFrameProps> = ({
  children,
  title = "Valentine's Menu - Internet Explorer",
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isMaximized,
  style
}) => {
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
      className={`bg-[#ECE9D8] border-2 border-[#0054E3] rounded-t-lg shadow-lg transition-all duration-300 flex flex-col ${isMaximized
        ? "fixed inset-0 rounded-none z-[1000] !top-0 !left-0 !right-0 !bottom-12" // Maximize over everything but taskbar
        : "absolute w-full max-w-2xl"
        }`}
      style={{
        ...style,
        height: isMaximized
          ? 'calc(100vh - 3rem)' // Account for taskbar
          : undefined,
        minHeight: isMaximized ? undefined : '70vh',
        maxHeight: isMaximized ? undefined : '85vh',
        WebkitOverflowScrolling: 'touch',
        left: isMaximized ? 0 : style?.left || '50%',
        top: isMaximized ? 0 : style?.top || '10%',
        transform: isMaximized ? 'none' : 'translateX(-50%)',
      }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div
        className="bg-gradient-to-r from-[#0054E3] to-[#2683FF] text-white py-1 px-2 flex justify-between items-center rounded-t shrink-0 select-none"
        onDoubleClick={onMaximize}
      >
        <div className="text-sm md:text-base font-semibold flex items-center">
          <span className="mr-2 text-xl">💌</span>
          {title}
        </div>
        <div className="flex space-x-1 md:space-x-2">
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#FFB154] rounded-sm hover:bg-[#FFD054] flex items-center justify-center touch-manipulation"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            <Minus size={isMobile ? 16 : 14} />
          </button>
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#00CA4E] rounded-sm hover:bg-[#00EA5E] flex items-center justify-center touch-manipulation"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            <Square size={isMobile ? 16 : 14} />
          </button>
          <button
            className="w-8 h-8 md:w-6 md:h-6 bg-[#FF605C] rounded-sm hover:bg-[#FF805C] flex items-center justify-center touch-manipulation"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <X size={isMobile ? 16 : 14} />
          </button>
        </div>
      </div>
      <div
        className="flex-1 bg-white overflow-y-auto p-4 md:p-8 pb-16 relative"
      >
        {children}
      </div>
    </div>
  )
}

export default WindowsXPFrame

