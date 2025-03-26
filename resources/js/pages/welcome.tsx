import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import DokumentasiBeasiswa from '@/components/DokumentasiBeasiswa';
import ChatAIInfo from '@/components/ChatAIInfo'

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PMB STMIK Jayanusa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen flex flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <Navigation auth={auth} />
                
                <main className="flex-grow">
                    {/* Hero Section */}
                    <Hero />
                       {/* Program Studi Section */}
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
                          {/* Jadwal Perkuliahan Section */}
                          <section id="jadwal-kuliah" className="py-16 bg-gradient-to-b from-white to-[#FFF2F2] dark:from-[#161615] dark:to-[#1D0002]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full text-[#02188B] dark:text-[#FF4433] text-sm font-semibold mb-4">
                                    Waktu Pembelajaran
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 dark:text-[#EDEDEC] tracking-tight">
                                    Jadwal Perkuliahan
                                </h2>
                                <p className="text-[#706f6c] dark:text-[#A1A09A] text-lg max-w-2xl mx-auto">
                                    Pilih waktu kuliah yang sesuai dengan jadwal Anda. Kami menyediakan kelas pagi dan sore untuk fleksibilitas maksimal.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Kelas Pagi Card */}
                                <div className="bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#02188B] dark:text-[#FF4433]">Kelas Pagi</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-[#706f6c] dark:text-[#A1A09A]">Senin - Jumat</span>
                                            <span className="ml-auto font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">07.30 WIB - 17.00 WIB</span>
                                        </div>
                                        {/* <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-[#706f6c] dark:text-[#A1A09A]">Sabtu</span>
                                            <span className="ml-auto font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">07.30 - 17.00</span>
                                        </div> */}
                                    </div>
                                </div>

                                {/* Kelas Sore Card */}
                                <div className="bg-white dark:bg-[#161615] rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center mb-6">
                                        <div className="w-12 h-12 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full flex items-center justify-center mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#02188B] dark:text-[#FF4433]">Kelas Sore</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-[#706f6c] dark:text-[#A1A09A]">Senin - Jumat</span>
                                            <span className="ml-auto font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">17.00 WIB - 21.00 WIB</span>
                                        </div>
                                        {/* <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-[#706f6c] dark:text-[#A1A09A]">Sabtu</span>
                                            <span className="ml-auto font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">15.15 - 18.30</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-12 text-center">
                                <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] italic">
                                    * Jadwal dapat disesuaikan dengan kebutuhan mahasiswa
                                </p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Info Section */}
                    <section id="info" className="py-12 bg-white dark:bg-[#161615]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="lg:text-center mb-12">
                                <h2 className="text-base text-[#02188B] font-semibold dark:text-[#FF4433]">Informasi Pendaftaran</h2>
                                <p className="mt-2 text-3xl leading-8 font-bold text-[#1b1b18] sm:text-4xl dark:text-[#EDEDEC]">
                                    Tanyakan Pada Java
                                </p>
                                <p className="mt-4 max-w-2xl text-xl text-[#706f6c] lg:mx-auto dark:text-[#A1A09A]">
                                   Jayanusa Virtual Assistant siap membantu Anda dengan informasi seputar pendaftaran
                                </p>
                            </div>

                            <div className="mt-12">
                                <ChatAIInfo />
                            </div>
                        </div>
                    </section>

                    {/* Recent Registrations Section */}
                    <section className="py-16 bg-gradient-to-br from-[#FDFDFC] via-[#FFF2F2] to-[#FDFDFC] dark:from-[#0a0a0a] dark:via-[#1D0002] dark:to-[#0a0a0a]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full text-[#02188B] dark:text-[#FF4433] text-sm font-semibold mb-4">
                                    Program Unggulan
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 dark:text-[#EDEDEC] tracking-tight">
                                    Program Beasiswa
                                </h2>
                                <p className="text-[#706f6c] dark:text-[#A1A09A] text-lg max-w-2xl mx-auto mb-12">
                                    Jelajahi berbagai program beasiswa internasional yang telah kami jalin dengan berbagai universitas di dunia
                                </p>
                            </div>

                            {/* Tabs Container dengan styling yang lebih menarik */}
                            <div className="bg-white dark:bg-[#161615] rounded-2xl shadow-xl p-6 md:p-8">
                                <DokumentasiBeasiswa />
                            </div>

                            {/* Additional Info Cards */}
                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="bg-white dark:bg-[#161615] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#02188B] dark:text-[#FF4433] mb-2">
                                        Beasiswa Penuh
                                    </h3>
                                    <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Kesempatan mendapatkan beasiswa penuh untuk studi di luar negeri
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-[#161615] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#02188B] dark:text-[#FF4433] mb-2">
                                        Kerjasama Global
                                    </h3>
                                    <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Bermitra dengan universitas terkemuka di berbagai negara
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-[#161615] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="w-12 h-12 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-lg flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B] dark:text-[#FF4433]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#02188B] dark:text-[#FF4433] mb-2">
                                        Fasilitas Lengkap
                                    </h3>
                                    <p className="text-[#706f6c] dark:text-[#A1A09A]">
                                        Termasuk akomodasi dan tunjangan hidup selama masa studi
                                    </p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-12 text-center">
                                <a 
                                    href="#info" 
                                    className="inline-flex items-center px-6 py-3 bg-[#02188B] dark:bg-[#FF4433] text-white rounded-full hover:bg-[#021070] dark:hover:bg-[#E53E2E] transition-colors duration-300"
                                >
                                    <span>Pelajari Lebih Lanjut</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}
