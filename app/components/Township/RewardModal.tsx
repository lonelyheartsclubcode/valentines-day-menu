"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Gift, X } from 'lucide-react'

interface RewardModalProps {
    onClose: () => void
}

const RewardModal: React.FC<RewardModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border-4 border-rose-300"
            >
                <div className="bg-rose-500 p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Gift className="mr-2" />
                        Congratulations!
                    </h2>
                    <button onClick={onClose} className="text-white hover:bg-rose-600 rounded-full p-1">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 flex flex-col items-center text-center">
                    <div className="text-6xl mb-4">🍎</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">You won an Apple Gift Card!</h3>
                    <p className="text-gray-600 mb-6">
                        Use this to buy some Township cash or whatever you'd like!
                    </p>

                    <div className="bg-gray-100 p-4 rounded-lg w-full mb-6 border-dashed border-2 border-gray-300">
                        <p className="font-mono text-lg font-bold text-gray-800 select-all">
                            XMAS-2025-LOVE-NAYU
                        </p>
                        <p className="text-xs text-gray-500 mt-1">(Not a real code, check your DMs! 😉)</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-left w-full">
                        <p className="font-handwriting text-gray-700 italic">
                            "Merry Christmas my love! I know how much you love building your town, so here's a little something to help you expand. I love you so much! ❤️"
                        </p>
                        <p className="text-right text-gray-600 font-bold mt-2">- Mika</p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default RewardModal
