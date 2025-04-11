import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { type SharedData } from '@/types';
import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
import { UserCircle } from 'lucide-react';

interface NavigationProps {
  auth: SharedData['auth'];
}

export default function Navigation({ auth }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#program-studi", label: "Program Studi" },
    { href: "#jadwal-kuliah", label: "Jadwal Kuliah" },
    { href: "#beasiswa", label: "Beasiswa" },
    { href: "#chat-ai", label: "Bantuan" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      className="text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group dark:text-gray-200"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#02188B] dark:bg-[#FF4433] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
    </a>
  );

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-md dark:bg-[#161615]/80' 
        : 'bg-white dark:bg-[#161615]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <img 
                src={LogoJayanusa} 
                alt="Logo STMIK Jayanusa" 
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="ml-2 text-[#02188B] text-base font-bold transition-colors duration-200 group-hover:text-[#D42800] dark:text-[#FF4433] dark:group-hover:text-[#02188B]">
                STMIK-AMIK JAYANUSA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            
            {auth.user ? (
              <Link
                href={route('siswa.profile')}
                className="flex items-center gap-2 text-gray-700 hover:text-[#02188B] px-3 py-2 text-sm font-medium transition-colors duration-200 dark:text-gray-200"
              >
                <UserCircle className="w-5 h-5" />
                <span>Menu</span>
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="bg-[#02188B] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-[#D42800] dark:bg-[#FF4433] dark:hover:bg-[#E53E2E] transform hover:scale-105 hover:shadow-lg"
                >
                  Login
                </Link>
                <Link
                  href={route('register')}
                  className="bg-[#D42800] text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-[#02188B] dark:bg-[#E53E2E] dark:hover:bg-[#FF4433] transform hover:scale-105 hover:shadow-lg"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#1b1b18] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:text-[#FF4433] transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Buka menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`${
          isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } fixed top-16 left-0 right-0 transition-all duration-300 ease-in-out transform sm:hidden bg-white dark:bg-[#161615] shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          
          {auth.user ? (
            <Link
              href={route('siswa.profile')}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-[#1b1b18] hover:bg-[#FFF2F2] hover:text-[#02188B] dark:text-[#EDEDEC] dark:hover:bg-[#1D0002] dark:hover:text-[#FF4433] transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserCircle className="w-5 h-5" />
              <span>Menu</span>
            </Link>
          ) : (
            <div className="space-y-2 px-3">
              <Link
                href={route('login')}
                className="block w-full text-center py-2 rounded-md text-base font-medium bg-[#02188B] text-white hover:bg-[#D42800] dark:bg-[#FF4433] dark:hover:bg-[#E53E2E] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href={route('register')}
                className="block w-full text-center py-2 rounded-md text-base font-medium bg-[#D42800] text-white hover:bg-[#02188B] dark:bg-[#E53E2E] dark:hover:bg-[#FF4433] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 