'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const menuItems = [
  {
    name: "Salmon Sashimi with Yuzu-Soy Drizzle",
    description:
      "Fresh sushi-grade salmon slices drizzled with a tangy yuzu-soy sauce, garnished with scallions and sesame seeds.",
  },
  {
    name: "Miso-Glazed Black Cod",
    description: "Tender black cod fillet marinated in a sweet and savory miso glaze, baked to perfection.",
  },
  {
    name: "Shanghai-Style Sautéed Bok Choy",
    description: "Crisp baby bok choy stir-fried with garlic and ginger in a light soy-sesame sauce.",
  },
  {
    name: "Matcha Crème Brûlée",
    description: "Creamy matcha-infused custard topped with a layer of caramelized sugar for a delightful crunch.",
  },
]

const Menu: React.FC = () => {
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

