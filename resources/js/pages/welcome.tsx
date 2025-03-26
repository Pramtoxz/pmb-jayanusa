import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/components/Home/Navigation';
import Footer from '@/components/Home/Footer';
import Hero from '@/components/Home/Hero';
import ProgramStudi from '@/components/Home/ProgramStudi';
import JadwalPerkuliahan from '@/components/Home/JadwalPerkuliahan';
import SaranaPrasarana from '@/components/Home/SaranaPrasarana';
import ProgramBeasiswa from '@/components/Home/ProgramBeasiswa';
import ProgramKerjasama from '@/components/Home/ProgramKerjasama';
import ChatAIInfo from '@/components/Home/ChatAIInfo';

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
                    <Hero />
                    <ProgramStudi />
                    <JadwalPerkuliahan />
                                <ChatAIInfo />
                    <SaranaPrasarana />
                    <ProgramBeasiswa />
                    <ProgramKerjasama />
                </main>

                <Footer />
            </div>
        </>
    );
}
