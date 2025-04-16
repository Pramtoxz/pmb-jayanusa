import { useState, useRef } from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import EcCouncil from '@/assets/images/partners/ec-council.png'
import Metrodata from '@/assets/images/partners/metro.png'
import Cisco from '@/assets/images/partners/cisco.png'
import Oracle from '@/assets/images/partners/oracle.png'
import Mikrotik from '@/assets/images/partners/mikrotik.png'
import Nusatalent from '@/assets/images/partners/nusatalent.png'

export default function ProgramKerjasama() {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 300;
            carouselRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    return (
        <section className="py-16 bg-gradient-to-br from-white via-[#FFF2F2] to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] rounded-full text-[#02188B] text-sm font-semibold mb-4">
                        Kerjasama Internasional
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 tracking-tight">
                        Program Kerja Sama
                    </h2>
                    <p className="text-[#706f6c] text-lg max-w-2xl mx-auto mb-12">
                        Adapun Kerjasama dengan Perguruan Tinggi atau Instansi di Luar Negeri, Yaitu:
                    </p>
                </div>

                {/* Responsive Carousel */}
                <div className="carousel-container mx-auto max-w-full">
                    {/* Navigation Buttons - Hidden on mobile */}
                    <button 
                        onClick={() => scroll('left')}
                        className="carousel-nav-button carousel-nav-button-left hidden md:flex"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    
                    <button 
                        onClick={() => scroll('right')}
                        className="carousel-nav-button carousel-nav-button-right hidden md:flex"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Carousel Container */}
                    <div 
                        ref={carouselRef}
                        className="overflow-x-scroll scrollbar-hide scroll-smooth px-4 md:px-8"
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={(e) => {
                            setIsDragging(true);
                            setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
                            setScrollLeft(carouselRef.current?.scrollLeft || 0);
                        }}
                        onTouchMove={(e) => {
                            if (!isDragging) return;
                            e.preventDefault();
                            const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
                            const walk = (x - startX) * 2;
                            if (carouselRef.current) {
                                carouselRef.current.scrollLeft = scrollLeft - walk;
                            }
                        }}
                        onTouchEnd={() => setIsDragging(false)}
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <div className="flex gap-4 sm:gap-6 md:gap-8">
                            {/* Partner Items */}
                            {[
                                { img: EcCouncil, name: "EC-Council Academia" },
                                { img: Metrodata, name: "Metrodata Academy" },
                                { img: Cisco, name: "Cisco Network Academy" },
                                { img: Oracle, name: "Oracle Academy" },
                                { img: Mikrotik, name: "Mikrotik Academy" },
                                { img: Nusatalent, name: "Nusatalent" }
                            ].map((partner, index) => (
                                <div key={index} className="carousel-item">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center p-2 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#FFD700]">
                                        <img 
                                            src={partner.img} 
                                            alt={partner.name} 
                                            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain"
                                        />
                                    </div>
                                    <h3 className="mt-2 md:mt-4 text-sm sm:text-base md:text-lg font-semibold text-[#02188B] text-center">
                                        {partner.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator - Visible only on mobile */}
                    <div className="flex justify-center mt-4 gap-2 md:hidden">
                        <div className="w-8 h-1 bg-[#02188B] rounded-full opacity-50"></div>
                        <div className="w-8 h-1 bg-[#02188B] rounded-full"></div>
                        <div className="w-8 h-1 bg-[#02188B] rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}