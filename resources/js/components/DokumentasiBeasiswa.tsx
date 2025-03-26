import { useState, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

// Import gambar beasiswa
import Australia2016 from '@/assets/beasiswa/australi-2016.jpg'
import Australia2017 from '@/assets/beasiswa/australi-2017.jpg'
import Australia2018_1 from '@/assets/beasiswa/australi-2018-1.jpg'
import Australia2018_2 from '@/assets/beasiswa/australi-2018-2.jpg'
import Australia2018_3 from '@/assets/beasiswa/australi-2018-3.jpg'
import Australia2019_1 from '@/assets/beasiswa/australi-2019-1.jpg'
import Australia2019 from '@/assets/beasiswa/australi-2019.jpg'
import Japan1 from '@/assets/beasiswa/japan-1.jpg'
import Japan2 from '@/assets/beasiswa/japan-2.jpg'
import Japan3 from '@/assets/beasiswa/japan-3.jpg'
import Japan4 from '@/assets/beasiswa/japan-4.jpg'
import Malaysia2017_1 from '@/assets/beasiswa/malaysia-2017-1.jpg'
import Malaysia2017 from '@/assets/beasiswa/malaysia-2017.jpg'
import Malaysia2019_1 from '@/assets/beasiswa/malaysia-2019-1.jpg'
import Malaysia2019 from '@/assets/beasiswa/malaysia-2019.jpg'
import Malaysia2020_1 from '@/assets/beasiswa/malaysia-2020-1.jpg'
import Malaysia2020_2 from '@/assets/beasiswa/malaysia-2020-2.jpg'
import Thailand2013_1 from '@/assets/beasiswa/thailand-2013-1.jpg'
import Thailand2013 from '@/assets/beasiswa/thailand-2013.jpg'

interface BeasiswaGallery {
  [key: string]: {
    title: string;
    images: string[];
  };
}

const beasiswaGallery: BeasiswaGallery = {
  australia: {
    title: "Beasiswa Australia",
    images: [
      Australia2016, Australia2017,
      Australia2018_1, Australia2018_2, Australia2018_3,
      Australia2019_1, Australia2019
    ]
  },
  japan: {
    title: "Beasiswa Jepang",
    images: [Japan1, Japan2, Japan3, Japan4]
  },
  malaysia: {
    title: "Beasiswa Malaysia",
    images: [
      Malaysia2017_1, Malaysia2017,
      Malaysia2019_1, Malaysia2019,
      Malaysia2020_1, Malaysia2020_2
    ]
  },
  thailand: {
    title: "Beasiswa Thailand",
    images: [Thailand2013_1, Thailand2013]
  }
}

export default function DokumentasiBeasiswa() {
  const [selectedTab, setSelectedTab] = useState('australia')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (!tabsRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!tabsRef.current) return
    
    const scrollAmount = 200
    const newScrollLeft = tabsRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    tabsRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    })
  }

  return (
    <Card className="backdrop-blur-sm bg-white/90 dark:bg-[#161615]/90 rounded-3xl shadow-2xl overflow-hidden border-0">
      <Tabs 
        defaultValue="australia" 
        className="w-full"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        {/* Tab List Container */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            {showLeftArrow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/90 dark:bg-[#161615]/90 shadow-lg hover:bg-white dark:hover:bg-[#161615] transition-all duration-300"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </motion.div>
            )}

            <div 
              ref={tabsRef}
              className="flex-1 overflow-x-auto scrollbar-hide mx-4"
              onScroll={handleScroll}
            >
              <TabsList className="w-full flex justify-center gap-2 bg-transparent">
                {Object.keys(beasiswaGallery).map((country) => (
                  <TabsTrigger
                    key={country}
                    value={country}
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-gray-100/50 dark:bg-gray-800/50 data-[state=active]:bg-[#02188B] dark:data-[state=active]:bg-[#FF4433] data-[state=active]:text-white"
                  >
                    {beasiswaGallery[country].title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {showRightArrow && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/90 dark:bg-[#161615]/90 shadow-lg hover:bg-white dark:hover:bg-[#161615] transition-all duration-300"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {Object.entries(beasiswaGallery).map(([country, data]) => (
            <TabsContent key={country} value={country}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {data.images.map((image, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 }
                    }}
                    className="group relative aspect-video rounded-xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${data.title} dokumentasi ${index + 1}`}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-white text-lg font-semibold">
                          {data.title}
                        </h4>
                        <p className="text-white/80 text-sm">
                          Dokumentasi {index + 1}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Card>
  )
} 