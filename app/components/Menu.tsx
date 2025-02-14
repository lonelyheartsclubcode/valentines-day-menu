'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const menuItems = [
  {
    name: "🍣 Salmon Sashimi with Yuzu-Soy Drizzle",
    description:
      "Fresh sushi-grade salmon slices drizzled with a tangy yuzu-soy sauce, garnished with scallions and sesame seeds.",
  },
  {
    name: "🐟 Miso-Glazed Black Cod",
    description: "Tender black cod fillet marinated in a sweet and savory miso glaze, baked to perfection.",
  },
  {
    name: "🥬 Shanghai-Style Sautéed Bok Choy",
    description: "Crisp baby bok choy stir-fried with garlic and ginger in a light soy-sesame sauce.",
  },
  {
    name: "🍵 Matcha Crème Brûlée",
    description: "Creamy matcha-infused custard topped with a layer of caramelized sugar for a delightful crunch.",
  },
]

const drinkPairings = [
  {
    dish: "🍣 Salmon Sashimi with Yuzu-Soy Drizzle",
    drink: "Chummy Cool Soju",
    description: "The light, smooth profile of this soju complements the delicate salmon while the yuzu's citrusy zing enhances the crisp, clean finish."
  },
  {
    dish: "🐟 Miso-Glazed Black Cod",
    drink: "Dassai 45 Nigori Sake",
    description: "The rich, umami-packed miso pairs beautifully with the creamy texture and subtle sweetness of this unfiltered sake, balancing the dish's savory caramelization."
  },
  {
    dish: "🥬 Shanghai-Style Sautéed Bok Choy",
    drink: "Santa Margherita Pinot Grigio (2021, Alto Adige)",
    description: "A crisp, dry Pinot Grigio cuts through the garlic and soy, providing a fresh contrast to the wok-fried greens."
  },
  {
    dish: "🍵 Matcha Crème Brûlée",
    drink: "Duckhorn Vineyards Sauvignon Blanc (2021, North Coast)",
    description: "The vibrant acidity and tropical fruit notes in this Sauvignon Blanc play well with the creamy, earthy matcha without overwhelming the dessert's delicate sweetness."
  }
]

const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'drinks'>('menu')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
    >
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-serif text-rose-800 mb-2">Valentine&apos;s Day</h1>
        <h2 className="text-2xl md:text-3xl font-serif text-rose-600">Prix Fixe Menu</h2>
        <div className="flex justify-center items-center mt-2">
          <Heart className="text-rose-500 mr-2" size={20} />
          <span className="text-rose-600 font-serif text-lg">for Nayu</span>
          <Heart className="text-rose-500 ml-2" size={20} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2 bg-rose-50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'menu'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-600 hover:bg-rose-100'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setActiveTab('drinks')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'drinks'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-600 hover:bg-rose-100'
            }`}
          >
            Drink Pairings
          </button>
        </div>
      </div>

      {/* Menu Items */}
      {activeTab === 'menu' && (
        <motion.div 
          className="space-y-6 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="border-b border-rose-200 pb-4 last:border-b-0"
            >
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2 text-rose-800 leading-tight">
                {item.name}
              </h3>
              <p className="text-rose-600 italic text-base md:text-lg leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Drink Pairings */}
      {activeTab === 'drinks' && (
        <motion.div 
          className="space-y-8 flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {drinkPairings.map((pairing, index) => (
            <motion.div
              key={pairing.dish}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="border-b border-rose-200 pb-6 last:border-b-0"
            >
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2 text-rose-800 leading-tight">
                {pairing.dish}
              </h3>
              <div className="ml-4">
                <p className="text-rose-700 font-medium mb-2">
                  Pair with: {pairing.drink}
                </p>
                <p className="text-rose-600 italic text-base md:text-lg leading-relaxed">
                  {pairing.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div 
        className="text-center text-rose-600 font-serif text-lg mt-6 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Bon Appétit!</p>
      </motion.div>
    </motion.div>
  )
}

export default Menu

