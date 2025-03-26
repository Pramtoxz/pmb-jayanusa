export default function ProgramStudi() {
    return (
        <section id="program-studi" className="py-16 bg-gradient-to-br from-white via-[#FFF2F2] to-white dark:from-[#161615] dark:via-[#1D0002] dark:to-[#161615]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full text-[#02188B] dark:text-[#FF4433] text-sm font-semibold mb-4">
                        Pilihan Karir Masa Depan
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 dark:text-[#EDEDEC] tracking-tight">
                        Program Studi Unggulan
                    </h2>
                    <p className="text-[#706f6c] dark:text-[#A1A09A] text-lg max-w-2xl mx-auto mb-12">
                        Pilih program studi yang sesuai dengan passion dan cita-cita Anda dalam dunia teknologi informasi
                    </p>
                </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* D3 Manajemen Informatika Card */}
                                <div className="group bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#02188B] dark:text-[#FF4433] mb-4">
                                            D3 - Manajemen Informatika
                                        </h3>
                                        <h4 className="text-1xl font-bold text-[#FF4433] dark:text-[#02188B] mb-4">
                                            Akreditasi B
                                        </h4>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A] mb-6">
                                            Program studi yang mempersiapkan mahasiswa untuk menjadi ahli dalam pengelolaan sistem informasi, pengembangan aplikasi, dan manajemen basis data.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Programmer</span>
                                            </div>                                           
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Database Engineer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Network Engineer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* S1 Sistem Informasi Card */}
                                <div className="group bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#02188B] dark:text-[#FF4433] mb-4">
                                            S1 - Sistem Informasi
                                        </h3>
                                        <h4 className="text-1xl font-bold text-[#FF4433] dark:text-[#02188B] mb-4">
                                            Akreditasi B
                                        </h4>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A] mb-6">
                                            Program studi yang mengintegrasikan teknologi informasi dengan proses bisnis. Mahasiswa akan mempelajari analisis sistem, perancangan software, dan business intelligence.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Programmer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>System Analyst</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Database Engineer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Network Engineer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* S1 Sistem Komputer Card */}
                                <div className="group bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#02188B] dark:text-[#FF4433] mb-4">
                                            S1 - Sistem Komputer
                                        </h3>
                                        <h4 className="text-1xl font-bold text-[#FF4433] dark:text-[#02188B] mb-4">
                                            Akreditasi B
                                        </h4>
                                        <p className="text-[#706f6c] dark:text-[#A1A09A] mb-6">
                                            Program studi yang berfokus pada arsitektur komputer, jaringan, dan sistem embedded. Mahasiswa akan mempelajari perancangan hardware, IoT, dan teknologi cloud computing.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Programmer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>IoT Developer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Network Engineer</span>
                                            </div>
                                            <div className="flex items-center text-[#02188B] dark:text-[#FF4433]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>Robotica</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        </section>
    )
} 