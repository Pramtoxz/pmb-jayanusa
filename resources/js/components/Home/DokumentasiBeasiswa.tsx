import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

// Import gambar beasiswa
import Pengenalan from '@/assets/images/beasiswa/1.svg'
import Australia from '@/assets/images/beasiswa/2.svg'
import Malaysia from '@/assets/images/beasiswa/3.svg'
import Jepang from '@/assets/images/beasiswa/4.svg'

const bannerImages = [
  { url: Pengenalan, title: "" },
  { url: Australia, title: "" },
  { url: Malaysia, title: "" },
  { url: Jepang, title: "" },
]

export default function DokumentasiBeasiswa() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Slide setiap 5 detik

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-[#ffff]/90 rounded-3xl shadow-2xl overflow-hidden border-0">
      <div className="relative w-full" style={{ aspectRatio: "3780/1890" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={bannerImages[currentIndex].url}
              alt={bannerImages[currentIndex].title}
              className="w-full h-full object-cover"
              style={{ maxWidth: "3780px", maxHeight: "1890px" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
                {bannerImages[currentIndex].title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indikator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  )
} 