import type React from "react"
import { Minus, Square, X } from "lucide-react"

interface WindowsXPFrameProps {
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  isMaximized: boolean
}

const WindowsXPFrame: React.FC<WindowsXPFrameProps> = ({ children, onClose, onMinimize, onMaximize, isMaximized }) => {
  return (
    <div
      className={`bg-[#ECE9D8] border-2 border-[#0054E3] rounded-t-lg shadow-lg transition-all duration-300 ${
        isMaximized ? "fixed inset-0 rounded-none" : "w-full max-w-4xl"
      }`}
    >
      <div className="bg-gradient-to-r from-[#0054E3] to-[#2683FF] text-white py-1 px-2 flex justify-between items-center rounded-t">
        <div className="text-sm font-semibold flex items-center">
          <span className="mr-2 text-xl">💌</span>
          Valentine's Menu - Internet Explorer
        </div>
        <div className="flex space-x-2">
          <button
            className="w-6 h-6 bg-[#FFB154] rounded-sm hover:bg-[#FFD054] flex items-center justify-center"
            onClick={onMinimize}
          >
            <Minus size={14} />
          </button>
          <button
            className="w-6 h-6 bg-[#00CA4E] rounded-sm hover:bg-[#00EA5E] flex items-center justify-center"
            onClick={onMaximize}
          >
            <Square size={14} />
          </button>
          <button
            className="w-6 h-6 bg-[#FF605C] rounded-sm hover:bg-[#FF805C] flex items-center justify-center"
            onClick={onClose}
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white overflow-auto" style={{ height: isMaximized ? "calc(100vh - 40px)" : "auto" }}>
        {children}
      </div>
    </div>
  )
}

export default WindowsXPFrame

