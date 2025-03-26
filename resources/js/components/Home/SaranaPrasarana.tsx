import {Users, ClipboardCheck, BookOpen, AirVent, Building2} from 'lucide-react'

export default function SaranaPrasarana() {
    return (
        <section className="py-16 bg-gradient-to-br from-white via-[#FFF2F2] to-white dark:from-[#161615] dark:via-[#1D0002] dark:to-[#161615]">
              <div className="max-w-6xl mx-auto px-4">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full text-[#02188B] dark:text-[#FF4433] text-sm font-semibold mb-4">
                                    Sarana & Prasarana
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 dark:text-[#EDEDEC] tracking-tight">
                                    Sarana & Prasarana
                                </h2>
                                <p className="text-[#706f6c] dark:text-[#A1A09A] text-lg max-w-2xl mx-auto mb-12">
                                    Jelajahi berbagai sarana dan prasarana yang tersedia di Jayanusa
                                </p>
                            </div>
                            <div className="bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/2">
                                        <div className="relative w-full" style={{ paddingBottom: '120%' }}>
                                            <iframe
                                                src="https://www.instagram.com/reel/C4kY2lmtdiF/embed"
                                                className="absolute top-0 left-0 w-full h-full rounded-xl"
                                                frameBorder="0"
                                                scrolling="no"
                                                allowFullScreen
                                                allow="encrypted-media; autoplay"
                                            ></iframe>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-6">
                                    <div className="flex items-start gap-4 hover:transform hover:scale-105 transition-all duration-300">
                                            <div className="p-2 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg shadow-md">
                                            <Users className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" />
                                            </div>
                                            <div className="bg-white dark:bg-[#161615] p-4 rounded-lg shadow-md flex-1">
                                                <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">Staff Pengajar</h3>
                                                <p className="text-[#706f6c] dark:text-[#A1A09A]">Staff pengajar yang berpengalaman dan kompeten</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 hover:transform hover:scale-105 transition-all duration-300">
                                            <div className="p-2 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg shadow-md">
                                                <ClipboardCheck className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" />
                                            </div>
                                            <div className="bg-white dark:bg-[#161615] p-4 rounded-lg shadow-md flex-1">
                                                <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">Lab Komputer</h3>
                                                <p className="text-[#706f6c] dark:text-[#A1A09A]">Dilengkapi dengan perangkat komputer terbaru dan software industri</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 hover:transform hover:scale-105 transition-all duration-300">
                                            <div className="p-2 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg shadow-md">
                                            <BookOpen className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" />
                                            </div>
                                            <div className="bg-white dark:bg-[#161615] p-4 rounded-lg shadow-md flex-1">
                                                <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">Perpustakaan</h3>
                                                <p className="text-[#706f6c] dark:text-[#A1A09A]">Akses ke ribuan buku dan jurnal</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 hover:transform hover:scale-105 transition-all duration-300">
                                            <div className="p-2 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg shadow-md">
                                            <AirVent className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" />
                                            </div>
                                            <div className="bg-white dark:bg-[#161615] p-4 rounded-lg shadow-md flex-1">
                                                <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">Kelas dan Aula</h3>
                                                <p className="text-[#706f6c] dark:text-[#A1A09A]">Kelas dan Aula yang nyaman dan modern dengan full AC</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4 hover:transform hover:scale-105 transition-all duration-300">
                                            <div className="p-2 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg shadow-md">
                                            <Building2 className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" />
                                            </div>
                                            <div className="bg-white dark:bg-[#161615] p-4 rounded-lg shadow-md flex-1">
                                                <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">Fasilitas Lainnya</h3>
                                                <p className="text-[#706f6c] dark:text-[#A1A09A]">Fasilitas lainnya yang tersedia di Jayanusa untuk menunjang kegiatan mahasiswa</p>
                                            </div>
                                        </div>
                                     </div>
                                </div>
                            </div>
                        </div>
        </section>
    )
}