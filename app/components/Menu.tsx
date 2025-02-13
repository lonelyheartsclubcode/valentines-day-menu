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

export default function Menu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full flex flex-col"
    >
      <div className="text-center mb-8 flex-none">
        <h1 className="text-4xl md:text-5xl font-serif text-rose-800 mb-3">Valentine&apos;s Day</h1>
        <h2 className="text-2xl md:text-3xl font-serif text-rose-600">Prix Fixe Menu</h2>
        <div className="flex justify-center items-center mt-3">
          <Heart className="text-rose-500 mr-2" size={20} />
          <span className="text-rose-600 font-serif text-lg">for Nayu</span>
          <Heart className="text-rose-500 ml-2" size={20} />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <div className="space-y-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-rose-200 pb-6 last:border-b-0"
            >
              <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2 text-rose-800 leading-tight">{item.name}</h3>
              <p className="text-rose-600 italic text-base md:text-lg leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-rose-600 font-serif text-base md:text-lg flex-none">
        <p>Bon Appétit!</p>
      </div>
    </motion.div>
  )
}

