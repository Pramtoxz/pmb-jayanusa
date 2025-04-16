import { type SharedData } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import Navigation from '@/components/Home/Navigation';
import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Hero';
import ProgramStudi from '@/components/Home/ProgramStudi';
import JadwalPerkuliahan from '@/components/Home/JadwalPerkuliahan';
import SaranaPrasarana from '@/components/Home/SaranaPrasarana';
import ProgramBeasiswa from '@/components/Home/ProgramBeasiswa';
import ProgramKerjasama from '@/components/Home/ProgramKerjasama';
import ChatAIInfo from '@/components/Home/ChatAIInfo';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import Java from '@/assets/images/home/java-ai.json';
import Lottie from 'lottie-react';


export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [showProfileDialog, setShowProfileDialog] = useState(false);

    useEffect(() => {
        // Periksa jika user sudah login dan belum lengkap data profilnya
        if (auth?.user && !auth.user.is_profile_complete) {
            setShowProfileDialog(true);
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
                    <ProgramStudi />
                    <JadwalPerkuliahan />
                    <ChatAIInfo />
                    <SaranaPrasarana />
                    <ProgramBeasiswa />
                    <ProgramKerjasama />
                </main>

                <Footer />

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
            </div>
        </>
    );
}
