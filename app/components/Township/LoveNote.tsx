'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, X } from "lucide-react"

interface LoveNoteProps {
  onClose: () => void
}

const LoveNote: React.FC<LoveNoteProps> = ({ onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const photos = [
    "/love-note/IMG_0252.jpg",
    "/love-note/IMG_2876.jpg",
    "/love-note/IMG_3134.jpg",
    "/love-note/IMG_3156.jpg",
    "/love-note/IMG_3559.jpg",
    "/love-note/IMG_3906.jpg",
    "/love-note/IMG_4723.jpg",
    "/love-note/IMG_5234.JPG",
    "/love-note/IMG_5307.jpg",
    "/love-note/IMG_5810.jpg",
    "/love-note/IMG_5941.jpg",
    "/love-note/IMG_6167.JPG",
    "/love-note/IMG_6996.jpg",
    "/love-note/IMG_7076.jpg",
    "/love-note/IMG_7291.jpg",
    "/love-note/IMG_7369.jpg",
    "/love-note/IMG_8080.jpg",
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const startMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      })
    }
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <audio ref={audioRef} loop>
        <source src="/love-note/song.mp3" type="audio/mpeg" />
      </audio>

      <style jsx global>{`
        @keyframes pixelate {
          0% {
            clip-path: inset(100% 100% 100% 100%);
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#C0C0C0] border-2 border-[#808080] shadow-xl w-full max-w-lg max-h-[85vh] overflow-hidden rounded"
        style={{
          animation: 'pixelate 0.4s steps(7, end)',
        }}
      >
        {/* Title bar */}
        <div className="bg-gradient-to-r from-[#7B6FFF] to-[#9D8CFF] px-2 py-1 flex justify-between items-center">
          <span className="text-white text-sm font-bold">for nayu</span>
          <div className="flex items-center gap-1">
            {!isPlaying && (
              <button
                onClick={startMusic}
                className="text-white text-xs px-2 py-0.5 hover:bg-white/20 rounded"
              >
                play
              </button>
            )}
            <button
              onClick={toggleMute}
              className="text-white hover:bg-white/20 p-1 rounded"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button onClick={onClose} className="text-white hover:bg-[#FF0000] p-1 rounded">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#ECE9D8] p-6 overflow-y-auto max-h-[calc(85vh-32px)]">
          {/* Letter */}
          <div className="text-sm text-gray-800 space-y-4 mb-6">
            <p>
              I kept trying to write something. Kept deleting it.
            </p>

            <p>
              I like my life more with you in it. That's the thing.
            </p>

            <p>
              The ordinary stuff especially. Morning coffee. Walking around. Doing nothing.
            </p>

            <p>
              You make me laugh. You make me think. Sometimes you drive me a little crazy but I like that too.
            </p>

            <p>
              I'm not good at this. But I wanted you to know.
            </p>

            <p className="text-[#7B6FFF] font-medium pt-2">
              I love you.
            </p>
          </div>

          {/* Photo gallery */}
          <div className="border-2 border-[#808080] bg-white p-1">
            <div className="relative aspect-[4/3] bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhotoIndex}
                  src={photos[currentPhotoIndex]}
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              <button
                onClick={prevPhoto}
                className="absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-[#C0C0C0] border border-[#808080] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040]"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-[#C0C0C0] border border-[#808080] shadow-[inset_-1px_-1px_#404040,inset_1px_1px_#fff] active:shadow-[inset_1px_1px_#404040]"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Photo dots */}
            <div className="flex justify-center gap-1 mt-2 pb-1 flex-wrap">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full border border-[#808080] ${
                    index === currentPhotoIndex ? "bg-[#7B6FFF]" : "bg-[#C0C0C0]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoveNote
