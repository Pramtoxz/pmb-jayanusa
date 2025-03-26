import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
export default function Footer() {
  return (
    <footer className="bg-white shadow-inner dark:bg-[#161615]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tentang Kami */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={LogoJayanusa} 
                alt="Logo STMIK Jayanusa" 
                className="h-12 w-auto"
              />
              <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433]">STMIK - AMIK JAYANUSA</h3>
            </div>
            <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] leading-relaxed mb-6">
              STMIK - AMIK JAYANUSA berdiri pada tahun 2002 berdasarkan SK DIKTI No. 153/D/O/2002 tanggal 02 Agustus 2002. Dan Alhamdulillah sampai saat ini semua Prodi yang ada sudah Ter-Akreditasi B.
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/stmikamikjayanusa" 
                className="text-[#02188B] hover:text-[#D42800] dark:text-[#FF4433] dark:hover:text-[#E53E2E] transition-colors duration-200"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@jayanusapadang" 
                className="text-[#02188B] hover:text-[#D42800] dark:text-[#FF4433] dark:hover:text-[#E53E2E] transition-colors duration-200"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/stmikamikjayanusa" 
                className="text-[#02188B] hover:text-[#D42800] dark:text-[#FF4433] dark:hover:text-[#E53E2E] transition-colors duration-200"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div>
            <h3 className="text-lg font-semibold text-[#02188B] dark:text-[#FF4433] mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm text-[#706f6c] dark:text-[#A1A09A]">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Jl. Damar No.69 E Padang, atau Jl. Olo Ladang No.1 Padang, Sumatera Barat</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.472 3.528C18.208 1.264 15.208 0 12 0 5.472 0 0 5.472 0 12c0 2.088.552 4.128 1.584 5.928L0 24l6.168-1.56C7.872 23.448 9.912 24 12 24c6.528 0 12-5.472 12-12 0-3.208-1.264-6.208-3.528-8.472zM12 21.984c-1.992 0-3.936-.528-5.64-1.536l-.408-.24-4.2 1.104 1.128-4.104-.264-.42A9.945 9.945 0 012.016 12C2.016 6.576 6.576 2.016 12 2.016c2.688 0 5.208 1.048 7.104 2.944S22.032 9.312 22.032 12c0 5.424-4.56 9.984-10.032 9.984zm5.52-7.44c-.288-.144-1.728-.852-1.992-.948-.264-.096-.456-.144-.648.144-.192.288-.744.948-.912 1.14-.168.192-.336.216-.624.072-.288-.144-1.212-.444-2.304-1.416-.852-.756-1.428-1.692-1.596-1.98-.168-.288-.018-.444.126-.588.129-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.56-.888-2.136-.24-.576-.48-.48-.648-.48-.168 0-.36-.024-.552-.024s-.504.072-.768.36c-.264.288-1.008.984-1.008 2.4 0 1.416 1.032 2.784 1.176 2.976.144.192 1.992 3.048 4.824 4.272.672.288 1.2.456 1.608.588.672.216 1.284.192 1.776.12.54-.072 1.728-.708 1.968-1.392.24-.684.24-1.272.168-1.392-.072-.12-.264-.192-.552-.336z" />
                </svg>
                <span>08116650635</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>jayanusa@jayanusa.ac.id</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#02188B] dark:text-[#FF4433] mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(0751)-28984</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-xs text-[#706f6c] dark:text-[#A1A09A]">
            Copyright © {new Date().getFullYear()} STMIK Jayanusa - Campus For Information Technology
          </p>
        </div>
      </div>
    </footer>
  );
} 