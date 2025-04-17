import {Users, ClipboardCheck, BookOpen, AirVent, Building2} from 'lucide-react'
import Sarana from '@/assets/images/home/sarana.mp4'

export default function SaranaPrasarana() {
    return (
        <section className="py-16 bg-gradient-to-br from-white via-[#FFF2F2] to-white">
              <div className="max-w-6xl mx-auto px-4">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-[#FFF2F2] rounded-full text-[#02188B] text-sm font-semibold mb-4">
                                    Sarana & Prasarana
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 tracking-tight">
                                    Sarana & Prasarana
                                </h2>
                                <p className="text-[#706f6c] text-lg max-w-2xl mx-auto mb-12">
                                    Jelajahi berbagai sarana dan prasarana yang tersedia di Jayanusa
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="w-full">
                                        <div className="relative w-full">
                                            <video
                                                className="rounded-xl w-full shadow-lg"
                                                autoPlay
                                                controls
                                                loop
                                                playsInline
                                                preload="metadata"
                                            >
                                                <source src={Sarana} type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="group bg-white hover:bg-[#FFF2F2] rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-[#FFF2F2] group-hover:bg-white rounded-lg shadow-md transition-colors">
                                                    <Users className="h-6 w-6 text-[#02188B]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-[#02188B] mb-2">Staff Pengajar</h3>
                                                    <p className="text-[#706f6c]">Staff pengajar yang berpengalaman dan kompeten</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group bg-white hover:bg-[#FFF2F2] rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-[#FFF2F2] group-hover:bg-white rounded-lg shadow-md transition-colors">
                                                    <ClipboardCheck className="h-6 w-6 text-[#02188B]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-[#02188B] mb-2">Lab Komputer</h3>
                                                    <p className="text-[#706f6c]">Dilengkapi dengan perangkat komputer terbaru dan software industri</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group bg-white hover:bg-[#FFF2F2] rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-[#FFF2F2] group-hover:bg-white rounded-lg shadow-md transition-colors">
                                                    <BookOpen className="h-6 w-6 text-[#02188B]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-[#02188B] mb-2">Perpustakaan</h3>
                                                    <p className="text-[#706f6c]">Akses ke ribuan buku dan jurnal</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group bg-white hover:bg-[#FFF2F2] rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-[#FFF2F2] group-hover:bg-white rounded-lg shadow-md transition-colors">
                                                    <AirVent className="h-6 w-6 text-[#02188B]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-[#02188B] mb-2">Kelas dan Aula</h3>
                                                    <p className="text-[#706f6c]">Kelas dan Aula yang nyaman dan modern dengan full AC</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group bg-white hover:bg-[#FFF2F2] rounded-xl p-4 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary/10">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 bg-[#FFF2F2] group-hover:bg-white rounded-lg shadow-md transition-colors">
                                                    <Building2 className="h-6 w-6 text-[#02188B]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-[#02188B] mb-2">Fasilitas Lainnya</h3>
                                                    <p className="text-[#706f6c]">Fasilitas lainnya yang tersedia di Jayanusa untuk menunjang kegiatan mahasiswa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </section>
    )
}