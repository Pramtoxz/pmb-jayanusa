import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { type SharedData } from '@/types';
import LogoJayanusa from '@/assets/jayanusa.webp';

interface NavigationProps {
  auth: SharedData['auth'];
}

export default function Navigation({ auth }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow dark:bg-[#161615]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src={LogoJayanusa} alt="Logo STMIK Jayanusa" className="h-8 w-auto" />
              <span className="ml-2 text-[#02188B] text-base font-bold">STMIK-AMIK JAYANUSA</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="#home" className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium dark:text-gray-200">
              Home
            </a>
            <a href="#program-studi" className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium dark:text-gray-200">
              Program Studi
            </a>         
            <Link href="#jadwal-kuliah" className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium dark:text-gray-200">
              Jadwal Kuliah
            </Link>
            <Link href="#dokumentasi-beasiswa" className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium dark:text-gray-200">
              Beasiswa
            </Link>
            <a href="#info" className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium dark:text-gray-200">
              Bantuan
            </a>
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="bg-[#02188B] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#D42800]"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href={route('register')}
                className="bg-[#02188B] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#D42800]"
              >
                Daftar
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#1b1b18] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:text-[#FF4433]"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433]">
            Home
          </a>
          <a href="#program-studi" className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433]">
            Program Studi
          </a>
          <Link href="#jadwal-kuliah" className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433]">
            Jadwal Kuliah
          </Link>
          <Link href="#dokumentasi-beasiswa" className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433]">
            Beasiswa
          </Link>
          <a href="#info" className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433]">
            Bantuan
          </a>
          
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="block px-3 py-2 rounded-md text-base font-medium bg-[#02188B] text-white hover:bg-[#D42800] dark:bg-[#FF4433] dark:hover:bg-[#E53E2E]"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={route('register')}
              className="block px-3 py-2 rounded-md text-base font-medium border border-[#02188B] text-[#02188B] hover:bg-[#02188B] hover:text-white dark:border-[#FF4433] dark:text-[#FF4433] dark:hover:bg-[#FF4433] dark:hover:text-white"
            >
              Pendaftaran Online
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 