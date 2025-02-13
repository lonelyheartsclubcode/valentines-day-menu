import type React from "react"

interface DesktopIconProps {
  emoji: string
  label: string
  onClick: () => void
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ emoji, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center text-white cursor-pointer p-2 rounded hover:bg-black/20"
      onClick={onClick}
    >
      <div className="text-4xl mb-1">{emoji}</div>
      <span className="text-xs text-center bg-black/50 px-1 rounded whitespace-nowrap">{label}</span>
    </div>
  )
}

export default DesktopIcon

