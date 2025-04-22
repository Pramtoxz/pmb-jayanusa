import { type SharedData } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import Navigation from '@/components/Home/Navigation';
import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Hero';
import ProgramStudi from '@/components/Home/ProgramStudi';
import JadwalPerkuliahan from '@/components/Home/JadwalPerkuliahan';
import VisiMisi from '@/components/Home/VisiMisi';
import SaranaPrasarana from '@/components/Home/SaranaPrasarana';
import ProgramBeasiswa from '@/components/Home/ProgramBeasiswa';
import ProgramKerjasama from '@/components/Home/ProgramKerjasama';
import ChatAIInfo from '@/components/Home/ChatAIInfo';
import ProsesPendaftaran from '@/components/Home/ProsesPendaftaran';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import Java from '@/assets/images/home/java-ai.json';
import Lottie from 'lottie-react';
import { Button } from "@/components/ui/button";

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const [showBiayaDialog, setShowBiayaDialog] = useState(false);

    useEffect(() => {
        // Periksa jika user sudah login dan belum lengkap data profilnya
        if (auth?.user && !auth.user.is_profile_complete) {
            setShowProfileDialog(true);
        }
        
        // Tampilkan modal biaya jika belum login
        if (!auth?.user) {
            setShowBiayaDialog(true);
        }
    }, [auth]);

    return (
        <>
            <Head title="PPMB-Jayanusa">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen flex flex-col bg-[#FDFDFC]">
                <Navigation auth={auth} />
                
                <main className="flex-grow">
                    <Hero />
                    <VisiMisi />
                    <ProsesPendaftaran />
                    <ProgramStudi />
                    <JadwalPerkuliahan />
                    <ChatAIInfo />
                    <SaranaPrasarana />
                    <ProgramBeasiswa />
                    <ProgramKerjasama />
                </main>

                <Footer />

                {/* Modal Profile */}
                <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <div className="flex justify-center mb-4">
                                <Lottie 
                                    animationData={Java} 
                                    loop={true} 
                                    style={{ width: 200, height: 200 }}
                                />
                            </div>
                            <DialogTitle className="text-center text-xl font-bold text-[#02188B]">Hei Sobat JaVa!!!</DialogTitle>
                            <DialogDescription className="text-center text-gray-600">
                                Untuk Mendaftar Silahkan Klik Halaman Profile Atau Klik Tombol Dibawah Ini Untuk Melengkapi Data Profil Anda
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => setShowProfileDialog(false)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => router.get('/siswa/profile')}
                                className="px-4 py-2 text-sm text-white bg-[#02188B] rounded-md hover:bg-[#D42800] transition-colors"
                            >
                                Lengkapi Sekarang
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Modal Biaya */}
                <Dialog open={showBiayaDialog} onOpenChange={setShowBiayaDialog}>
                    <DialogContent className="w-[90%] max-w-[400px] p-4 sm:p-6 rounded-xl">
                        <DialogHeader className="space-y-4">
                            <div className="flex justify-center">
                                <Lottie 
                                    animationData={Java} 
                                    loop={true} 
                                    style={{ width: '150px', height: '150px' }}
                                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
                                />
                            </div>
                            <div className="space-y-3">
                                <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-[#02188B] px-2">
                                    🎓 Wujudkan Impian Kuliah Kamu!
                                </DialogTitle>
                                <DialogDescription className="text-center space-y-2">
                                    <p className="text-xl sm:text-2xl font-bold text-[#D42800]">
                                        Cukup 1 Juta Rupiah
                                    </p>
                                    <p className="text-base sm:text-lg text-gray-600">
                                        Langsung Kuliah di Kampus IT Terbaik
                                    </p>
                                    <div className="bg-[#02188B]/10 rounded-lg p-3 mt-2">
                                        <p className="text-base sm:text-lg font-semibold text-[#02188B]">
                                            BONUS SPESIAL! 🎉
                                        </p>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            Gratis Uang Pembangunan
                                        </p>
                                    </div>
                                    <p className="text-sm text-[#D42800] font-medium mt-2">
                                        *Promo terbatas! Daftar sekarang juga
                                    </p>
                                </DialogDescription>
                            </div>
                        </DialogHeader>
                        <DialogFooter className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 px-2">
                            <Button
                                onClick={() => setShowBiayaDialog(false)}
                                variant="outline"
                                className="w-full sm:w-auto border-[#02188B] text-[#02188B] hover:bg-gray-100 text-sm sm:text-base py-2 px-4"
                            >
                                Nanti Dulu
                            </Button>
                            <Button
                                onClick={() => router.get('/register')}
                                className="w-full sm:w-auto bg-[#02188B] hover:bg-[#D42800] text-white text-sm sm:text-base py-2 px-8 rounded-md transition-colors"
                            >
                                Ya, Saya Mau Daftar! 🚀
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
