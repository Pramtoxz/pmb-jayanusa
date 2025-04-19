import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import Ambasador from '@/assets/images/home/brandambasador.webp';
import Putra from '@/assets/images/home/putra.svg';
import JavaAI from '@/assets/images/home/java-ai.json';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

interface PageProps {
  auth: SharedData['auth'];
  [key: string]: SharedData['auth'] | unknown;
}

export default function Hero() {
  const { auth } = usePage<PageProps>().props;
  const [currentImage, setCurrentImage] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const images = [Ambasador, Putra];

  useEffect(() => {
    const changeImage = () => {
      setOpacity(0);
      setCurrentImage((prev) => (prev + 1) % images.length);
      setTimeout(() => {
        setOpacity(1);
      }, 300);
    };

    const interval = setInterval(changeImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden" id="home">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Column */}
        <div className="relative px-6 py-12 flex items-center lg:px-12 bg-gradient-to-br from-white to-pink-50">
          <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-[2.5rem] leading-tight lg:text-[4.5rem] font-bold mb-8 bg-gradient-to-r from-gray-900 to-[#02188B] bg-clip-text text-transparent animate-fade-in">
              Penerimaan Mahasiswa Baru
              <br />
              <span className="text-[#02188B]">STMIK-AMIK JAYANUSA</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-xl animate-slide-in">
              Penerimaan Mahasiswa Baru STMIK-AMIK JAYANUSA telah dibuka!
              Raih kesempatan untuk menjadi bagian dari perguruan tinggi
              terkemuka di bidang teknologi informasi dan komputer.
            </p>
            <div className="flex flex-wrap items-center gap-4 relative">
              <div className="relative">
                <Link
                  href={route('siswa.profile')}
                  className="relative overflow-hidden px-8 py-4 rounded-lg font-semibold text-lg bg-[#02188B] text-white transition-all duration-300 hover:bg-[#D42800] hover:transform hover:-translate-y-1 hover:shadow-lg inline-block"
                >
                  {auth.user ? 'Profile' : 'Daftar Sekarang'}
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
            <div className="flex justify-center items-center w-full max-w-lg">
              <img 
                src={images[currentImage]}
                alt={currentImage === 0 ? "Brand Ambassador STMIK Jayanusa" : "Putra STMIK Jayanusa"}
                className="w-full max-w-[700px] mt-8 transition-all duration-300"
                style={{ opacity }}
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