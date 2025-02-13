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
      className="bg-white rounded shadow-inner p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-serif text-rose-800 mb-2">Valentine&apos;s Day</h1>
        <h2 className="text-xl md:text-2xl font-serif text-rose-600">Prix Fixe Menu</h2>
        <div className="flex justify-center items-center mt-2">
          <Heart className="text-rose-500 mr-2" size={16} />
          <span className="text-rose-600 font-serif">for Nayu</span>
          <Heart className="text-rose-500 ml-2" size={16} />
        </div>
      </div>
      <div className="space-y-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-rose-200 pb-4 last:border-b-0"
          >
            <h3 className="text-lg md:text-xl font-serif font-semibold mb-1 text-rose-800">{item.name}</h3>
            <p className="text-rose-600 italic text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 text-center text-rose-600 font-serif text-sm">
        <p>Bon Appétit!</p>
      </div>
    </motion.div>
  )
}

