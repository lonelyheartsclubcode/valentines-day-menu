"use client"

import React from "react"
import { motion } from "framer-motion"
import { useTheme } from '../context/ThemeContext'

interface StartMenuProps {
  onMenuClick: () => void
  onLogout: () => void
}

const StartMenu: React.FC<StartMenuProps> = ({ onMenuClick, onLogout }) => {
  const { theme } = useTheme()
  const isChristmas = theme === 'christmas'

  return (
    <motion.div
      className="fixed bottom-12 left-0 w-64 bg-[#ECE9D8] border-2 border-[#0054E3] shadow-lg z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className={`h-12 bg-gradient-to-r ${isChristmas ? 'from-[#D32F2F] to-[#FF5252]' : 'from-[#0054E3] to-[#2683FF]'} flex items-center px-4`}>
        <span className="text-white font-bold">🪩 nayu</span>
      </div>
      <div className="p-2 space-y-1">
        <button
          className="w-full text-left px-2 py-1 hover:bg-[#316AC5] hover:text-white rounded flex items-center"
          onClick={onMenuClick}
        >
          <span className="mr-2 text-2xl">{isChristmas ? '🎄' : '💌'}</span>
          {isChristmas ? "Christmas Menu" : "Valentine's Menu"}
        </button>
        <button
          className="w-full text-left px-2 py-1 hover:bg-[#316AC5] hover:text-white rounded flex items-center"
          onClick={onLogout}
        >
          <span className="mr-2 text-2xl">🔒</span>
          Log Off
        </button>
      </div>
    </motion.div>
  )
}

export default StartMenu
