export default function VisiMisi() {
    return (
        <section id="visi-misi" className="py-16 bg-gradient-to-b from-white to-[#FFF2F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] rounded-full text-[#02188B] text-sm font-semibold mb-4">
                        Visi & Misi
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 tracking-tight">
                        STMIK - AMIK JAYANUSA
                    </h2>
                    <p className="text-[#706f6c] text-lg max-w-2xl mx-auto">
                    Merupakan institusi pendidikan tinggi yang didirikan secara resmi pada tahun 2002 melalui Surat Keputusan Direktorat Jenderal Pendidikan Tinggi (DIKTI) Nomor 153/D/O/2002 tertanggal 02 Agustus 2002. Sebagai bukti komitmen terhadap kualitas pendidikan, seluruh Program Studi telah berhasil meraih Akreditasi B dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT).                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Kelas Pagi Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#02188B]/10">
                    <h3 className="text-2xl font-bold text-center text-[#02188B] mb-4">STMIK</h3>
                    <div className="space-y-4">
                            <div className="mt-4 p-3 bg-[#02188B]/5 rounded-lg">
                                <p className="font-semibold text-[#02188B] mb-2">Visi</p>
                                <p className="text-[#706f6c]">Menjadi perguruan tinggi yang Berorientasi Global dan Berbasis sertifikasi kompetensi pada tahun 2030.</p>
                            </div>
                            <div className="mt-4 p-3 bg-[#02188B]/5 rounded-lg">
                            <p className="font-semibold text-[#02188B] mb-2">Misi</p>
                                <p className="text-[#706f6c]">1. Meningkatkan Tridharma Perguruan tinggi dalam rangka mewujudkan sekolah tinggi komputer yang berorientasi global tahun 2030.</p>
                                <p className="text-[#706f6c]">2. Meningkatkan pembangunan sarana dan prasarana untuk pelaksanaan tridharma perguruan tinggi.</p>
                                <p className="text-[#706f6c]">3. Meningkatkan kualitas tenaga pendidik dan kependidikan.</p>
                                <p className="text-[#706f6c]">4. Meningkatkan kerjasama dengan perguruan tinggi sejenis baik berskala lokal, nasional maupun internasional.</p>
                                <p className="text-[#706f6c]">5. Menghasilkan lulusan berkualitas, berakhlak baik, berjiwa wirausaha, mampu berbahasa inggris dan kompeten di bidangnya.</p>
                                <p className="text-[#706f6c]">6. Meningkatkan berbagai sertifikasi kompetensi untuk menghasilkan lulusan yang kompetitif sehingga mampu bersaing di tingkat regional dan global.</p>
                                <p className="text-[#706f6c]">7. Meningkatkan kerjasama dengan lembaga-lembaga penyelenggara sertifikasi IT dalam rangka mewujudkan perguruan tinggi yang bersertifikasi kompetensi di 2030.</p>
                            </div>
                        </div>
                    </div>

                    {/* Kelas Sore Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-[#02188B]/10">
                        <h3 className="text-2xl font-bold text-center text-[#02188B] mb-4">AMIK</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Visi</p>
                                <p className="text-[#706f6c]">Menjadi perguruan tinggi komputer yang terkemuka di Sumatera dan Berbasis Sertifikasi kompetisi pada tahun 2030</p>
                            </div>
                            <div className="p-4 bg-[#FFF2F2] rounded-lg">
                                <p className="font-semibold text-[#1b1b18] mb-2">Misi</p>
                                <p className="text-[#706f6c]">1. Meningkatkan Tridharma Perguruan tinggi (Pendidikan, Penelitian, dan Pengabdian Masyarakat) sebagai upaya untuk menciptakan perguruan tinggi terkemuka di Sumatera Barat</p>
                                <p className="text-[#706f6c]">2. Membangun sarana dan prasarana untuk menunjang pelaksanaan tridharma perguruan tinggi dan mendorong terlaksananya lingkungan akademik yang kondusif.</p>
                                <p className="text-[#706f6c]">3. Melaksanakan peningkatan kualitas pendidik dan tenaga kependidikan.</p>
                                <p className="text-[#706f6c]">4. Meningkatkan kerjasama dengan perguruan tinggi lain baik berskala lokal, nasional maupun internasional.</p>
                                <p className="text-[#706f6c]">5. Melaksanakan berbagai sertifikasi kompetensi untuk menciptakan lulusan yang kompeten dan kompetitif.</p>
                                <p className="text-[#706f6c]">6. Melaksanakan kerjasama dengan lembaga-lembaga sertifikasi IT sebagai upaya untuk mewujudkan AMIK Jayanusa yang berbasis sertifikasi kompetensi di 2030.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}