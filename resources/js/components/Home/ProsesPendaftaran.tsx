import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import JavaAI from '@/assets/images/home/java-ai.json';

export default function ProsesPendaftaran() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Buat Akun Terlebih Dahulu di website kami dengan klik tombol Daftar sekarang",
    "Lengkapi Data Diri Kamu Dengan Klik Halaman Profile",
    "Jika sudah lengkap, Silahkan Klik Menu Pembayaran",
    "Lalu Silahkan upload Rapor dan SKL/Ijazah SLTA/Sederajat Kamu",
    "Setelah itu Kamu Bisa Transfer Ke Nomor Rekening Yang Sudah Tersedia",
    "Setelah Melakukan Pembayaran, Silahkan Upload Bukti Transfer yang sudah di sediain",
    "Setelah itu kamu hanya perlu menunggu verifikasi dari admin kami",
    "Kalau Semua Persyaratan sudah Oke dan Surat Lulus kamu di terbitkan",
    "Silahkan Upload Bukti Pembayaran Daftar Ulang karna langkah terakhir,Untuk Bergabung dengan kami",
    "Selamat Datang di STMIK-AMIK JAYANUSA"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <section id="proses-pendaftaran" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Alur Pendaftaran
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#02188B] flex items-center justify-center relative">
                <span className="text-white text-sm sm:text-base font-bold">{index + 1}</span>
                {currentStep === index && (
                  <div className="absolute -right-3 -top-3 w-12 h-12 sm:w-16 sm:h-16">
                    <Lottie
                      animationData={JavaAI}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm sm:text-base md:text-lg ${currentStep === index ? 'text-[#02188B] font-semibold' : 'text-gray-900'}`}>
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 