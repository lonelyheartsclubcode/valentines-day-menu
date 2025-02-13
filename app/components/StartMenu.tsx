import type React from "react"
import { motion } from "framer-motion"

interface StartMenuProps {
  onMenuClick: () => void
}

const StartMenu: React.FC<StartMenuProps> = ({ onMenuClick }) => {
  return (
    <motion.div
      className="fixed bottom-12 left-0 w-64 bg-[#ECE9D8] border-2 border-[#0054E3] shadow-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="h-12 bg-gradient-to-r from-[#0054E3] to-[#2683FF] flex items-center px-4">
        <span className="text-white font-bold">User</span>
      </div>
      <div className="p-2">
        <button
          className="w-full text-left px-2 py-1 hover:bg-[#316AC5] hover:text-white rounded flex items-center"
          onClick={onMenuClick}
        >
          <span className="mr-2 text-2xl">💌</span>
          Valentine's Menu
        </button>
      </div>
    </motion.div>
  )
}

export default StartMenu

