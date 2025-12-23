"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Train, Plane, Hammer, Settings, Menu as MenuIcon, X, ShoppingCart, UserPlus, HardHat, Coins, Volume2, VolumeX, Music, Bell } from 'lucide-react'
import EnhancedMatch3Game from './EnhancedMatch3Game'
import RewardModal from './RewardModal'
import LoveNote from './LoveNote'
import { useTheme } from '@/app/context/ThemeContext'
import { toast } from 'sonner'

// Isometric Grid Constants
const TILE_WIDTH = 60
const TILE_HEIGHT = 30

// Isometric Utility Functions
const toIso = (x: number, y: number) => {
    return {
        left: (x - y) * TILE_WIDTH,
        top: (x + y) * TILE_HEIGHT
    }
}

// --- Placeholder Modals ---

interface ModalProps {
    onClose: () => void
    title: string
    children: React.ReactNode
    color?: string
}

const PlaceholderModal: React.FC<ModalProps> = ({ onClose, title, children, color = 'bg-blue-500' }) => (
    <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
    >
        <motion.div 
            initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 20 }}
            className="bg-[#F0F4C3] border-4 border-[#8BC34A] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
        >
            <div className={`${color} p-4 flex justify-between items-center border-b-4 border-black/10`}>
                <h2 className="text-white font-bold text-xl drop-shadow-md">{title}</h2>
                <button onClick={onClose} className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 border-2 border-white/20">
                    <X size={24} />
                </button>
            </div>
            <div className="p-6 bg-[url('https://www.transparenttextures.com/patterns/cream-dust.png')] min-h-[200px] flex flex-col items-center justify-center text-center">
                {children}
            </div>
        </motion.div>
    </motion.div>
)

// --- Building Component ---

const Building: React.FC<{ 
    type: string; 
    gridX: number; 
    gridY: number; 
    onClick?: () => void; 
    label?: string; 
    isChristmas: boolean 
}> = ({ type, gridX, gridY, onClick, label, isChristmas }) => {
    
    const pos = toIso(gridX, gridY)

    const getBuildingContent = () => {
        switch (type) {
            case 'event': 
                return (
                    <div className="relative w-24 h-24 -mt-12 -ml-8">
                        <div className="absolute bottom-0 w-full h-12 bg-[#9C27B0] rounded-full opacity-20 blur-md transform scale-x-150" />
                        <div className="relative w-full h-full">
                            <div className="text-[4rem] filter drop-shadow-lg transform -translate-y-4">🎪</div>
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-red-700 px-2 py-0.5 rounded text-xs font-bold animate-bounce border border-white shadow-sm whitespace-nowrap z-20">
                                PLAY!
                            </div>
                        </div>
                    </div>
                )
            case 'house':
                 return (
                    <div className="relative w-16 h-16 -mt-8 -ml-4">
                        <div className="text-[3rem] filter drop-shadow-lg transform -translate-y-2">
                            {isChristmas ? '🏠' : '🏡'}
                        </div>
                        {isChristmas && <div className="absolute top-0 right-0 text-lg">❄️</div>}
                    </div>
                )
            case 'barn':
                return (
                     <div className="relative w-20 h-20 -mt-10 -ml-6">
                        <div className="text-[3.5rem] filter drop-shadow-lg transform -translate-y-2">
                            {isChristmas ? '🛖' : '🛖'}
                        </div>
                    </div>
                )
            case 'factory':
                return (
                     <div className="relative w-20 h-20 -mt-10 -ml-6">
                        <div className="text-[3.5rem] filter drop-shadow-lg transform -translate-y-2">🏭</div>
                    </div>
                )
            case 'market':
                 return (
                     <div className="relative w-20 h-20 -mt-10 -ml-6">
                        <div className="text-[3.5rem] filter drop-shadow-lg transform -translate-y-2">🏪</div>
                    </div>
                )
            default: 
                return <div className="w-10 h-10 bg-gray-400 rounded-full" />
        }
    }

    return (
        <motion.div
            className="absolute z-20 cursor-pointer group"
            style={{ 
                left: pos.left + 600, 
                top: pos.top + 100,   
            }}
            onClick={onClick}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
        >
            {getBuildingContent()}
             {label && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-2 py-0.5 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                    {label}
                </div>
            )}
        </motion.div>
    )
}

// --- Tile Component ---

const Tile: React.FC<{ x: number; y: number; type: 'grass' | 'road' | 'water' | 'snow'; isChristmas: boolean }> = ({ x, y, type, isChristmas }) => {
    const pos = toIso(x, y)
    
    let bgColor = isChristmas ? '#E3F2FD' : '#AED581' 
    let border = isChristmas ? '#BBDEFB' : '#9CCC65'

    if (type === 'road') {
        bgColor = '#78909C'
        border = '#546E7A'
    } else if (type === 'water') {
        bgColor = '#4FC3F7'
        border = '#29B6F6'
    } else if (type === 'snow') {
         bgColor = '#FFFFFF'
         border = '#E0E0E0'
    }

    return (
        <div
            className="absolute"
            style={{
                left: pos.left + 600,
                top: pos.top + 100,
                width: TILE_WIDTH * 2 + 2, 
                height: TILE_HEIGHT * 2 + 2,
            }}
        >
             <svg width={TILE_WIDTH * 2} height={TILE_HEIGHT * 2} viewBox="0 0 100 50" className="absolute top-0 left-0 overflow-visible">
                <path 
                    d="M50 0 L100 25 L50 50 L0 25 Z" 
                    fill={bgColor} 
                    stroke={border} 
                    strokeWidth="1"
                />
                {type === 'water' && (
                     <path d="M20 20 Q30 10 40 20 T60 20" stroke="white" strokeWidth="2" fill="none" opacity="0.5" className="animate-pulse" />
                )}
             </svg>
        </div>
    )
}

// --- Main Game Component ---

const TownshipGame: React.FC = () => {
    const [view, setView] = useState<'city' | 'minigame'>('city')
    const [showReward, setShowReward] = useState(false)
    const [showLoveNote, setShowLoveNote] = useState(false)
    const [activeModal, setActiveModal] = useState<string | null>(null)
    const [isAnimating, setIsAnimating] = useState(false) // For temporary feedback animations
    const { theme } = useTheme()
    const isChristmas = theme === 'christmas'
    
    // State for settings
    const [musicOn, setMusicOn] = useState(true)
    const [sfxOn, setSfxOn] = useState(true)
    const [notificationsOn, setNotificationsOn] = useState(false)

    const handleWin = () => {
        setShowReward(true)
    }

    const openModal = (modalName: string) => setActiveModal(modalName)
    const closeModal = () => setActiveModal(null)

    const playFeedbackAnimation = () => {
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 1000)
    }

    const toggleSetting = (setting: string) => {
        if (setting === 'music') {
            setMusicOn(!musicOn)
            toast.success(`Music ${!musicOn ? 'On' : 'Off'}`, { duration: 1000 })
        } else if (setting === 'sfx') {
            setSfxOn(!sfxOn)
            toast.success(`Sound Effects ${!sfxOn ? 'On' : 'Off'}`, { duration: 1000 })
        } else if (setting === 'notifications') {
            setNotificationsOn(!notificationsOn)
            toast.success(`Notifications ${!notificationsOn ? 'On' : 'Off'}`, { duration: 1000 })
        }
    }

    // Grid Map
    const mapSize = 10
    const tiles = []
    for (let x = 0; x < mapSize; x++) {
        for (let y = 0; y < mapSize; y++) {
            let type: 'grass' | 'road' | 'water' | 'snow' = isChristmas ? 'snow' : 'grass'
            if (x === 4 || y === 4) type = 'road'
            if (x > 6 && y > 6) type = 'water'
            tiles.push(<Tile key={`${x}-${y}`} x={x} y={y} type={type} isChristmas={isChristmas} />)
        }
    }

    return (
        <div className="flex flex-col relative overflow-hidden font-sans select-none bg-[#87CEEB]" style={{ height: '100%', minHeight: '500px' }}>
            {/* UI Layer */}
            <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-between p-2">
                
                {/* Top Bar */}
                <div className="flex justify-between items-start pointer-events-auto">
                    <div className="flex flex-col gap-2">
                        {/* Level Bar */}
                        <div className="flex items-center group cursor-pointer" onClick={() => openModal("Level")}>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[#00A8E8] rotate-45 border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                    <span className="-rotate-45 text-white font-bold text-xl">15</span>
                                </div>
                            </div>
                            <div className="h-6 bg-[#333]/80 -ml-6 pl-8 pr-2 rounded-r-full flex items-center border border-white/30 min-w-[120px]">
                                <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#00E676] w-[75%] h-full" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Population */}
                        <div className="flex items-center bg-[#333]/80 text-white px-2 py-1 rounded-lg border border-white/30 self-start ml-2 cursor-pointer hover:bg-[#333]" onClick={() => openModal("Population")}>
                            <Users size={16} className="text-[#00E676] mr-1" />
                            <span className="text-sm font-bold">330/385</span>
                        </div>
                    </div>

                    {/* Right Stats */}
                    <div className="flex flex-col gap-1 items-end">
                        <div className="bg-[#333]/80 text-white px-3 py-1 rounded-l-lg border-r-0 border border-white/30 flex items-center min-w-[100px] justify-between group hover:bg-[#333] cursor-pointer" onClick={() => openModal("Bank")}>
                            <span className="text-[#FFD700] font-bold text-lg mr-2">1,645</span>
                            <div className="bg-[#FFD700] w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-[#B8860B] border border-[#B8860B]">$</div>
                            <div className="ml-1 bg-[#00E676] w-5 h-5 rounded flex items-center justify-center text-white text-xs hover:bg-[#00C853]">+</div>
                        </div>
                        <div className="bg-[#333]/80 text-white px-3 py-1 rounded-l-lg border-r-0 border border-white/30 flex items-center min-w-[100px] justify-between group hover:bg-[#333] cursor-pointer" onClick={() => openModal("Bank")}>
                            <span className="text-[#00E676] font-bold text-lg mr-2">46</span>
                            <div className="bg-[#00E676] w-6 h-6 rounded border border-[#007c3e] flex items-center justify-center text-white text-xs">T</div>
                            <div className="ml-1 bg-[#00E676] w-5 h-5 rounded flex items-center justify-center text-white text-xs hover:bg-[#00C853]">+</div>
                        </div>
                    </div>
                </div>

                {/* Middle Left Buttons */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto">
                    <button 
                        className="w-10 h-10 bg-blue-500 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                        onClick={() => openModal("Settings")}
                    >
                        <Settings size={20} />
                    </button>
                     <button 
                        className="w-10 h-10 bg-blue-500 rounded-lg border-2 border-white shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                        onClick={() => openModal("Menu")}
                    >
                        <MenuIcon size={20} />
                    </button>
                </div>

                {/* Bottom Bar */}
                <div className="flex justify-between items-end pointer-events-auto mb-1">
                    <button 
                        className="w-16 h-16 bg-blue-500 rounded-xl border-2 border-white shadow-xl flex flex-col items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform overflow-hidden"
                        onClick={() => openModal("Friends")}
                    >
                         <div className="flex -space-x-2 mb-1">
                            <div className="w-6 h-6 bg-gray-300 rounded-full border border-white" />
                            <div className="w-6 h-6 bg-gray-400 rounded-full border border-white" />
                         </div>
                         <span className="text-[10px] font-bold bg-blue-600 px-2 rounded-full">Friends</span>
                    </button>

                    <div className="flex gap-4 items-end">
                         <button 
                            className="w-16 h-16 bg-[#FF9800] rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform relative"
                            onClick={() => openModal("Train")}
                        >
                            <Train size={28} />
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border border-white">1</div>
                        </button>
                        <button 
                            className="w-20 h-20 bg-[#F44336] rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform -mb-2 relative z-10"
                            onClick={() => openModal("Airport")}
                        >
                            <Plane size={36} />
                             <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border border-white">3</div>
                        </button>
                        <button 
                            className="w-16 h-16 bg-[#FFC107] rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
                            onClick={() => {
                                playFeedbackAnimation();
                                // In a real implementation, this would open a placement mode
                                toast.success("Entered Construction Mode!", { duration: 1000 });
                            }}
                        >
                            <Hammer size={28} className={isAnimating ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Game View Area - Isometric Canvas */}
            <div className="flex-1 relative overflow-hidden bg-[#87CEEB]">
                {view === 'city' ? (
                    <div className="absolute inset-0 overflow-auto cursor-grab active:cursor-grabbing custom-scrollbar">
                        <div className="relative min-w-[1500px] min-h-[1000px] flex items-center justify-center origin-center transform scale-75 md:scale-100">
                            <div className="relative" style={{ width: 1000, height: 800 }}>
                                {tiles}
                                <Building type="event" gridX={2} gridY={2} label="Event Center" onClick={() => setView('minigame')} isChristmas={isChristmas} />
                                <Building type="house" gridX={6} gridY={2} label="My House" onClick={() => {
                                    playFeedbackAnimation();
                                    // Little jump animation could go here
                                }} isChristmas={isChristmas} />
                                <Building type="house" gridX={7} gridY={2} label="Guest House" onClick={() => {
                                     playFeedbackAnimation();
                                }} isChristmas={isChristmas} />
                                <Building type="barn" gridX={2} gridY={6} label="Barn" onClick={() => openModal("Barn")} isChristmas={isChristmas} />
                                <Building type="factory" gridX={6} gridY={6} label="Factory" onClick={() => openModal("Factory")} isChristmas={isChristmas} />
                                <Building type="market" gridX={4} gridY={0} label="Market" onClick={() => openModal("Market")} isChristmas={isChristmas} />
                                
                                <div className="absolute" style={{ left: toIso(0, 0).left + 600, top: toIso(0, 0).top + 100 - 20 }}>
                                    <div className="text-4xl">{isChristmas ? '🎄' : '🌲'}</div>
                                </div>
                                <div className="absolute" style={{ left: toIso(9, 0).left + 600, top: toIso(9, 0).top + 100 - 20 }}>
                                    <div className="text-4xl">{isChristmas ? '☃️' : '🌳'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full w-full bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
                        <EnhancedMatch3Game onWin={handleWin} onBack={() => setView('city')} />
                    </div>
                )}
            </div>

            <AnimatePresence>
                {activeModal && (
                    <>
                        {activeModal === "Level" && (
                            <PlaceholderModal title="Level 15 Stats" onClose={closeModal} color="bg-blue-500">
                                <div className="text-4xl mb-4">⭐</div>
                                <p className="text-gray-700 font-bold">XP: 12,450 / 15,000</p>
                                <div className="w-full bg-gray-300 h-4 rounded-full mt-2 mb-4 border-2 border-gray-400">
                                    <div className="bg-green-500 h-full rounded-full w-[80%]" />
                                </div>
                                <p className="text-gray-600 text-sm">Next Unlock: Zoo Entrance</p>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Population" && (
                            <PlaceholderModal title="Town Population" onClose={closeModal} color="bg-green-600">
                                <Users size={48} className="text-green-600 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">330 / 385</h3>
                                <p className="text-gray-600">Build more Community Buildings to increase population cap!</p>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Bank" && (
                            <PlaceholderModal title="Bank of Nayu" onClose={closeModal} color="bg-yellow-600">
                                <Coins size={48} className="text-yellow-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Need more coins?</h3>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-white p-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
                                        <div className="text-yellow-500 font-bold">1,000 Coins</div>
                                        <div className="text-green-600 font-bold text-sm">$0.99</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-300 cursor-pointer hover:bg-gray-50">
                                        <div className="text-yellow-500 font-bold">10,000 Coins</div>
                                        <div className="text-green-600 font-bold text-sm">$4.99</div>
                                    </div>
                                </div>
                                <p className="text-xs text-red-500 mt-4 italic">*Store is currently closed for renovation*</p>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Settings" && (
                            <PlaceholderModal title="Game Settings" onClose={closeModal} color="bg-gray-600">
                                <Settings size={48} className="text-gray-600 mb-4" />
                                <div className="space-y-2 w-full text-left">
                                    <div 
                                        className="flex justify-between items-center bg-white p-2 rounded border cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleSetting('music')}
                                    >
                                        <div className="flex items-center"><Music size={16} className="mr-2"/> Music</div>
                                        <div className={`w-10 h-6 rounded-full relative transition-colors ${musicOn ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${musicOn ? 'right-1' : 'left-1'}`} />
                                        </div>
                                    </div>
                                    <div 
                                        className="flex justify-between items-center bg-white p-2 rounded border cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleSetting('sfx')}
                                    >
                                        <div className="flex items-center"><Volume2 size={16} className="mr-2"/> Sound FX</div>
                                        <div className={`w-10 h-6 rounded-full relative transition-colors ${sfxOn ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${sfxOn ? 'right-1' : 'left-1'}`} />
                                        </div>
                                    </div>
                                    <div 
                                        className="flex justify-between items-center bg-white p-2 rounded border cursor-pointer hover:bg-gray-50"
                                        onClick={() => toggleSetting('notifications')}
                                    >
                                        <div className="flex items-center"><Bell size={16} className="mr-2"/> Notifications</div>
                                        <div className={`w-10 h-6 rounded-full relative transition-colors ${notificationsOn ? 'bg-green-500' : 'bg-gray-300'}`}>
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notificationsOn ? 'right-1' : 'left-1'}`} />
                                        </div>
                                    </div>
                                </div>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Menu" && (
                            <PlaceholderModal title="Game Menu" onClose={closeModal} color="bg-blue-800">
                                <div className="grid grid-cols-3 gap-4 w-full">
                                    {['Achievements', 'Zoo', 'Regatta', 'Co-op', 'Airport', 'Mine'].map(item => (
                                        <div key={item} className="flex flex-col items-center bg-white/50 p-2 rounded cursor-pointer hover:bg-white/80">
                                            <div className="w-10 h-10 bg-blue-300 rounded-full mb-1" />
                                            <span className="text-xs font-bold text-blue-900">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Friends" && (
                            <PlaceholderModal title="Friends List" onClose={closeModal} color="bg-blue-500">
                                <div className="w-full space-y-2">
                                    <div className="flex items-center bg-white p-2 rounded shadow-sm">
                                        <div className="w-10 h-10 bg-pink-200 rounded-full border-2 border-pink-400 flex items-center justify-center">👩‍🦰</div>
                                        <div className="ml-3 text-left flex-1">
                                            <div className="font-bold text-gray-800">Mika</div>
                                            <div className="text-xs text-gray-500">Level 99 • Helped you recently!</div>
                                        </div>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">Gift</button>
                                    </div>
                                    <div className="flex items-center bg-white p-2 rounded shadow-sm opacity-60">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-gray-400 flex items-center justify-center">👤</div>
                                        <div className="ml-3 text-left flex-1">
                                            <div className="font-bold text-gray-800">Ernie</div>
                                            <div className="text-xs text-gray-500">Level 15 • Needs help</div>
                                        </div>
                                        <button className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">Gift</button>
                                    </div>
                                </div>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Train" && (
                            <PlaceholderModal title="Train Schedule" onClose={closeModal} color="bg-orange-500">
                                <Train size={48} className="text-orange-600 mb-4" />
                                <p className="text-gray-800 font-bold text-lg mb-2">Train #1 is Arriving!</p>
                                <div className="bg-white p-4 rounded border-2 border-orange-200 w-full">
                                    <div className="flex justify-between border-b pb-2 mb-2">
                                        <span>Cargo:</span>
                                        <span className="font-bold text-green-600">Building Materials</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Time Left:</span>
                                        <span className="font-bold text-red-500">00:05:23</span>
                                    </div>
                                </div>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Airport" && (
                            <PlaceholderModal title="Airport Orders" onClose={closeModal} color="bg-red-500">
                                <Plane size={48} className="text-red-600 mb-4" />
                                <div className="bg-white p-2 rounded border border-gray-300 w-full mb-2 flex justify-between items-center">
                                    <div className="flex items-center"><div className="text-2xl mr-2">🥖</div> <span>x3</span></div>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Fill</button>
                                </div>
                                <div className="bg-white p-2 rounded border border-gray-300 w-full mb-2 flex justify-between items-center">
                                    <div className="flex items-center"><div className="text-2xl mr-2">🥛</div> <span>x5</span></div>
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Fill</button>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Plane departs in 3h 20m</p>
                            </PlaceholderModal>
                        )}
                        {activeModal === "Barn" && (
                            <PlaceholderModal title="Storage Barn" onClose={closeModal} color="bg-red-600">
                                <div className="text-6xl mb-4">{isChristmas ? '🛖' : '🛖'}</div>
                                <h3 className="text-xl font-bold text-gray-800">Barn Capacity</h3>
                                <div className="w-full bg-gray-200 h-6 rounded-full mt-2 mb-2 border border-gray-400 relative overflow-hidden">
                                    <div className="bg-green-500 h-full w-[90%] absolute top-0 left-0" />
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold z-10">135 / 150</span>
                                </div>
                                <button className="bg-yellow-500 text-white px-4 py-2 rounded font-bold shadow-sm hover:bg-yellow-600 border-b-4 border-yellow-700 active:border-b-0 active:mt-1">Upgrade</button>
                            </PlaceholderModal>
                        )}
                         {activeModal === "Factory" && (
                            <PlaceholderModal title="Sugar Factory" onClose={closeModal} color="bg-gray-500">
                                <div className="text-6xl mb-4">🏭</div>
                                <div className="flex gap-2 justify-center w-full mb-4">
                                    <div className="bg-white p-2 rounded border-2 border-blue-300 relative">
                                        <div className="text-2xl">🍬</div>
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✓</div>
                                    </div>
                                     <div className="bg-white p-2 rounded border-2 border-gray-300 opacity-50">
                                        <div className="text-2xl">🍭</div>
                                    </div>
                                     <div className="bg-white p-2 rounded border-2 border-gray-300 opacity-50">
                                        <div className="text-2xl">🍩</div>
                                    </div>
                                </div>
                            </PlaceholderModal>
                        )}
                         {activeModal === "Market" && (
                            <PlaceholderModal title="City Market" onClose={closeModal} color="bg-orange-600">
                                <div className="text-6xl mb-4">🏪</div>
                                <div className="grid grid-cols-2 gap-2 w-full text-left">
                                    <div className="bg-amber-100 p-2 rounded border border-amber-300">
                                        <span className="text-xl mr-2">🌾</span> 
                                        <span className="font-bold">Wheat</span>
                                        <span className="float-right text-orange-700 font-bold">10g</span>
                                    </div>
                                     <div className="bg-amber-100 p-2 rounded border border-amber-300">
                                        <span className="text-xl mr-2">🥛</span> 
                                        <span className="font-bold">Milk</span>
                                        <span className="float-right text-orange-700 font-bold">25g</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">New goods in: 4h 30m</p>
                            </PlaceholderModal>
                        )}
                    </>
                )}
            </AnimatePresence>

            {showReward && <RewardModal onClose={() => {
                setShowReward(false)
                setShowLoveNote(true)
            }} />}
            {showLoveNote && <LoveNote onClose={() => setShowLoveNote(false)} />}
        </div>
    )
}

export default TownshipGame
