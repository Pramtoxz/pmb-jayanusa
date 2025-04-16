import DokumentasiBeasiswa from "./DokumentasiBeasiswa";

export default function ProgramBeasiswa() {
    return (
        <section id="beasiswa" className="py-16 bg-gradient-to-br from-[#FDFDFC] via-[#FFF2F2] to-[#FDFDFC]">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] rounded-full text-[#02188B] text-sm font-semibold mb-4">
                        Program Unggulan
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 tracking-tight">
                        Program Beasiswa
                    </h2>
                    <p className="text-[#706f6c] text-lg max-w-2xl mx-auto mb-12">
                        Jelajahi berbagai program beasiswa internasional yang telah kami jalin dengan berbagai universitas di dunia
                    </p>
                </div>

                {/* Tabs Container */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <DokumentasiBeasiswa />
                </div>

                {/* Additional Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-[#FFF2F2] rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#02188B] mb-2">
                            Beasiswa Penuh
                        </h3>
                        <p className="text-[#706f6c]">
                            Kesempatan mendapatkan beasiswa penuh untuk studi di luar negeri
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-[#FFF2F2] rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#02188B] mb-2">
                            Kerjasama Global
                        </h3>
                        <p className="text-[#706f6c]">
                            Bermitra dengan universitas terkemuka di berbagai negara
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-[#FFF2F2] rounded-lg flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02188B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#02188B] mb-2">
                            Fasilitas Lengkap
                        </h3>
                        <p className="text-[#706f6c]">
                            Termasuk akomodasi dan tunjangan hidup selama masa studi
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <a 
                        href="#info" 
                        className="inline-flex items-center px-6 py-3 bg-[#02188B] text-white rounded-full hover:bg-[#021070] transition-colors duration-300"
                    >
                        <span>Daftar Sekarang</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}