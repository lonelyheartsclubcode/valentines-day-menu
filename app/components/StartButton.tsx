import type React from "react"

interface StartButtonProps {
  onClick: () => void
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button
      className="h-full px-3 flex items-center bg-gradient-to-b from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white font-bold rounded-r-sm transition-colors"
      onClick={onClick}
    >
      <span className="mr-2">🪟</span>
      <span className="whitespace-nowrap">Start</span>
    </button>
  )
}

export default StartButton

