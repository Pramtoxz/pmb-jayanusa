export default function JadwalPerkuliahan() {
    return (
        <section id="jadwal-kuliah" className="py-16 bg-gradient-to-b from-white to-[#FFF2F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] rounded-full text-[#02188B] text-sm font-semibold mb-4">
                        Waktu Pembelajaran
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 tracking-tight">
                        Jadwal Perkuliahan
                    </h2>
                    <p className="text-[#706f6c] text-lg max-w-2xl mx-auto">
                        Pilih waktu kuliah yang sesuai dengan jadwal Anda. Kami menyediakan kelas pagi dan sore untuk fleksibilitas maksimal.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Kelas Pagi Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#02188B]/10">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-[#FFF2F2] rounded-full">
                            <svg className="w-8 h-8 text-[#02188B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center text-[#02188B] mb-4">Kelas Pagi</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Senin - Jumat</p>
                                <p className="text-[#706f6c]">07:30 - 17:00</p>
                            </div>
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Sabtu</p>
                                <p className="text-[#706f6c]">07:30 - 17:00</p>
                            </div>
                            <div className="mt-4 p-3 bg-[#02188B]/5 rounded-lg">
                                <p className="text-sm text-[#02188B] italic">
                                    Ideal untuk mahasiswa reguler yang fokus penuh pada perkuliahan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Kelas Sore Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#02188B]/10">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-[#FFF2F2] rounded-full">
                            <svg className="w-8 h-8 text-[#02188B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-center text-[#02188B] mb-4">Kelas Sore</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Senin - Jumat</p>
                                <p className="text-[#706f6c]">17:00 - 21:00</p>
                            </div>
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Sabtu</p>
                                <p className="text-[#706f6c]">15:15 - 18:30</p>
                            </div>
                            <div className="mt-4 p-3 bg-[#02188B]/5 rounded-lg">
                                <p className="text-sm text-[#02188B] italic">
                                    Fleksibel untuk karyawan dan profesional yang bekerja
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-[#706f6c] italic">
                        * Jadwal dapat disesuaikan dengan kebutuhan mahasiswa
                    </p>
                </div>
            </div>
        </section>
    )
}