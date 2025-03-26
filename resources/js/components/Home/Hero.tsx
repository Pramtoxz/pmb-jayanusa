import { Link } from '@inertiajs/react';
import Ambasador from '@/assets/images/home/brandambasador.webp';
import JavaAI from '@/assets/images/home/java-ai.json';
import Lottie from 'lottie-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column */}
        <div className="relative px-6 py-12 flex items-center lg:px-12 bg-gradient-to-br from-white to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-[2.5rem] leading-tight lg:text-[4.5rem] font-bold mb-8 bg-gradient-to-r from-gray-900 to-[#02188B] bg-clip-text text-transparent animate-fade-in dark:from-white dark:to-[#FF4433]">
              Penerimaan Mahasiswa Baru
              <br />
                <span className="text-[#02188B]">STMIK-AMIK JAYANUSA</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-xl animate-slide-in dark:text-gray-300">
              Penerimaan Mahasiswa Baru STMIK-AMIK JAYANUSA telah dibuka!
              Raih kesempatan untuk menjadi bagian dari perguruan tinggi
              terkemuka di bidang teknologi informasi dan komputer.
            </p>
            <div className="flex flex-wrap items-center gap-4 relative">
              <div className="relative">
                <Link
                  href={route('register')}
                  className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-lg bg-[#02188B] text-white transition-all duration-300 hover:bg-[#D42800] hover:transform hover:-translate-y-1 hover:shadow-lg inline-block"
                >
                  Daftar Sekarang
                </Link>
              </div>
              <div className="relative">
                <a
                  href="#chat-ai"
                  className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#02188B] text-[#02188B] transition-all duration-300 hover:bg-[#fff5f5] hover:transform hover:-translate-y-1 inline-block"
                >
                  Tanya JaVA
                </a>
                <div className="absolute -right-16 -top-16 w-32 h-32 pointer-events-none">
                  <Lottie
                    animationData={JavaAI}
                    loop={true}
                    autoplay={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#02188B] to-transparent opacity-5 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#02188B] to-transparent opacity-5 rounded-tr-full" />
        </div>

        {/* Right Column */}
        <div className="bg-[#02188B] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="relative h-full flex items-center justify-center p-12">
            <div className="flex justify-center items-center w-full max-w-lg animate-fade-in">
              <img 
                src={Ambasador}
                alt="Brand Ambassador STMIK Jayanusa"
                className="w-full max-w-[500px] transition-transform duration-300 hover:scale-105 mt-8"
              />
            </div>
          </div>
          
          {/* Decorative Shapes */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-10 rounded-tl-full" />
        </div>
      </div>
    </section>
  );
} 