"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, ArrowLeft } from 'lucide-react'

// Game Constants
const BOARD_SIZE = 8
const CELL_SIZE = 50 // px
const ANIMATION_DURATION = 0.3

// Township-themed assets (using emojis for now, can be replaced with images)
const ITEMS = [
    { id: 'wheat', icon: '🌾', color: '#F5DEB3' },
    { id: 'corn', icon: '🌽', color: '#FFD700' },
    { id: 'carrot', icon: '🥕', color: '#FFA500' },
    { id: 'strawberry', icon: '🍓', color: '#FF69B4' },
    { id: 'milk', icon: '🥛', color: '#F0FFFF' },
    { id: 'egg', icon: '🥚', color: '#FFFACD' },
]

interface Cell {
    id: string
    type: string
    x: number
    y: number
    isMatched?: boolean
    key: number // Unique key for React/Framer Motion
}

interface EnhancedMatch3GameProps {
    onWin: () => void
    onBack: () => void
}

const EnhancedMatch3Game: React.FC<EnhancedMatch3GameProps> = ({ onWin, onBack }) => {
    const [board, setBoard] = useState<Cell[]>([])
    const [selected, setSelected] = useState<Cell | null>(null)
    const [score, setScore] = useState(0)
    const [moves, setMoves] = useState(20)
    const [isProcessing, setIsProcessing] = useState(false)
    const uniqueKeyCounter = useRef(0)
    const targetScore = 1000

    // Helper to get random item type
    const getRandomType = () => ITEMS[Math.floor(Math.random() * ITEMS.length)].id

    // Initialize board
    const initBoard = useCallback(() => {
        const newBoard: Cell[] = []
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                // Prevent initial matches
                let type = getRandomType()
                while (
                    (x >= 2 && newBoard[y * BOARD_SIZE + x - 1].type === type && newBoard[y * BOARD_SIZE + x - 2].type === type) ||
                    (y >= 2 && newBoard[(y - 1) * BOARD_SIZE + x].type === type && newBoard[(y - 2) * BOARD_SIZE + x].type === type)
                ) {
                    type = getRandomType()
                }
                
                newBoard.push({
                    id: `${x}-${y}`,
                    type,
                    x,
                    y,
                    key: uniqueKeyCounter.current++
                })
            }
        }
        setBoard(newBoard)
        setScore(0)
        setMoves(20)
        setIsProcessing(false)
    }, [])

    useEffect(() => {
        initBoard()
    }, [initBoard])

    // Check for matches
    const findMatches = (currentBoard: Cell[]) => {
        const matches = new Set<string>()

        // Horizontal
        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE - 2; x++) {
                const c1 = currentBoard.find(c => c.x === x && c.y === y)
                const c2 = currentBoard.find(c => c.x === x + 1 && c.y === y)
                const c3 = currentBoard.find(c => c.x === x + 2 && c.y === y)
                if (c1 && c2 && c3 && c1.type === c2.type && c2.type === c3.type) {
                    matches.add(c1.id)
                    matches.add(c2.id)
                    matches.add(c3.id)
                }
            }
        }

        // Vertical
        for (let x = 0; x < BOARD_SIZE; x++) {
            for (let y = 0; y < BOARD_SIZE - 2; y++) {
                const c1 = currentBoard.find(c => c.x === x && c.y === y)
                const c2 = currentBoard.find(c => c.x === x && c.y === y + 1)
                const c3 = currentBoard.find(c => c.x === x && c.y === y + 2)
                if (c1 && c2 && c3 && c1.type === c2.type && c2.type === c3.type) {
                    matches.add(c1.id)
                    matches.add(c2.id)
                    matches.add(c3.id)
                }
            }
        }
        return Array.from(matches)
    }

    // Process board state (remove matches, drop, refill)
    const processBoard = async (currentBoard: Cell[], depth = 0) => {
        const matches = findMatches(currentBoard)
        
        if (matches.length === 0) {
            setIsProcessing(false)
            return
        }

        setIsProcessing(true)

        // 1. Mark matches (visual delay)
        await new Promise(r => setTimeout(r, 300))
        
        // Remove matched cells
        const remainingCells = currentBoard.filter(c => !matches.includes(c.id))
        
        // Update score
        setScore(prev => {
            const newScore = prev + matches.length * 10 * (depth + 1)
            if (newScore >= targetScore && prev < targetScore) {
                setTimeout(onWin, 500)
            }
            return newScore
        })

        // 2. Drop cells
        const droppedCells = remainingCells.map(cell => {
             // Calculate how many holes are below this cell
             let dropDistance = 0
             for (let y = cell.y + 1; y < BOARD_SIZE; y++) {
                 // Check if there was a matched cell at (cell.x, y)
                 // Or rather, count how many items in the same column BELOW this one were removed
                 // Actually simpler: iterate columns.
                 return cell
             }
             return cell
        })

        // Better drop logic:
        const newBoardState: Cell[] = []
        
        for (let x = 0; x < BOARD_SIZE; x++) {
            const col = currentBoard.filter(c => c.x === x && !matches.includes(c.id)).sort((a, b) => a.y - b.y)
            
            // Existing cells fall down
            for (let i = 0; i < col.length; i++) {
                const cell = col[i]
                const newY = BOARD_SIZE - col.length + i // Stack at bottom
                newBoardState.push({ ...cell, y: newY })
            }

            // New cells fill top
            const missingCount = BOARD_SIZE - col.length
            for (let i = 0; i < missingCount; i++) {
                newBoardState.push({
                    id: `new-${uniqueKeyCounter.current++}`,
                    type: getRandomType(),
                    x,
                    y: i, // Start at top slots
                    key: uniqueKeyCounter.current++
                })
            }
        }

        setBoard(newBoardState)
        
        // Wait for drop animation
        await new Promise(r => setTimeout(r, 400))
        
        // Recursively check for new matches
        processBoard(newBoardState, depth + 1)
    }

    const handleCellClick = async (clickedCell: Cell) => {
        if (isProcessing || moves <= 0) return

        if (!selected) {
            setSelected(clickedCell)
            return
        }

        if (selected.id === clickedCell.id) {
            setSelected(null)
            return
        }

        // Check adjacency
        const isAdjacent = Math.abs(selected.x - clickedCell.x) + Math.abs(selected.y - clickedCell.y) === 1
        
        if (!isAdjacent) {
            setSelected(clickedCell)
            return
        }

        // Perform swap
        const newBoard = board.map(c => {
            if (c.id === selected.id) return { ...c, x: clickedCell.x, y: clickedCell.y }
            if (c.id === clickedCell.id) return { ...c, x: selected.x, y: selected.y }
            return c
        })

        setBoard(newBoard)
        setSelected(null)
        setMoves(m => m - 1)

        const matches = findMatches(newBoard)

        if (matches.length > 0) {
            await processBoard(newBoard)
        } else {
            // Swap back if no match
            await new Promise(r => setTimeout(r, 300))
            setBoard(board) // Revert
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full bg-[#E0F7FA] p-4 select-none">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-4 border-2 border-[#4FC3F7]">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                     <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="text-[#0277BD]" />
                    </button>
                    <div className="flex space-x-4">
                        <div className="bg-[#B3E5FC] px-3 py-1 rounded-full border border-[#4FC3F7] shadow-inner flex flex-col items-center min-w-[80px]">
                            <span className="text-[10px] text-[#01579B] font-bold uppercase">Score</span>
                            <span className="text-lg font-bold text-[#0277BD]">{score}</span>
                        </div>
                         <div className="bg-[#B3E5FC] px-3 py-1 rounded-full border border-[#4FC3F7] shadow-inner flex flex-col items-center min-w-[80px]">
                            <span className="text-[10px] text-[#01579B] font-bold uppercase">Target</span>
                            <span className="text-lg font-bold text-[#0277BD]">{targetScore}</span>
                        </div>
                        <div className="bg-[#B3E5FC] px-3 py-1 rounded-full border border-[#4FC3F7] shadow-inner flex flex-col items-center min-w-[80px]">
                            <span className="text-[10px] text-[#01579B] font-bold uppercase">Moves</span>
                            <span className="text-lg font-bold text-[#0277BD]">{moves}</span>
                        </div>
                    </div>
                </div>

                {/* Game Board */}
                <div 
                    className="relative bg-[#B2EBF2] rounded-lg shadow-inner mx-auto overflow-hidden"
                    style={{
                        width: BOARD_SIZE * CELL_SIZE,
                        height: BOARD_SIZE * CELL_SIZE,
                    }}
                >
                     <AnimatePresence>
                        {board.map((cell) => {
                            const item = ITEMS.find(i => i.id === cell.type)
                            const isSelected = selected?.id === cell.id
                            return (
                                <motion.div
                                    key={cell.key}
                                    layout
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ 
                                        x: cell.x * CELL_SIZE, 
                                        y: cell.y * CELL_SIZE,
                                        opacity: 1,
                                        scale: isSelected ? 1.1 : 1,
                                        zIndex: isSelected ? 10 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="absolute top-0 left-0 w-[50px] h-[50px] flex items-center justify-center cursor-pointer"
                                    onClick={() => handleCellClick(cell)}
                                >
                                    <div 
                                        className={`w-[42px] h-[42px] rounded-lg shadow-sm flex items-center justify-center text-2xl transition-all duration-200 border-2 ${isSelected ? 'border-white shadow-lg brightness-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: item?.color }}
                                    >
                                        {item?.icon}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>
                
                 {/* Footer controls */}
                <div className="mt-4 flex justify-center">
                    <button 
                        onClick={initBoard}
                        className="flex items-center space-x-2 bg-[#0288D1] text-white px-4 py-2 rounded-full hover:bg-[#0277BD] transition-colors shadow-md active:transform active:scale-95"
                    >
                        <RefreshCw size={16} />
                        <span>Restart Level</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EnhancedMatch3Game









