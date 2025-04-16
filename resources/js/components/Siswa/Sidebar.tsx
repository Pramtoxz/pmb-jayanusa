import { Link } from '@inertiajs/react';
import { UserCircle, CreditCard, LogOut } from 'lucide-react';
import { router } from '@inertiajs/react';

interface SidebarProps {
  activePage: 'profile' | 'pembayaran';
}

export default function Sidebar({ activePage }: SidebarProps) {
  const menuItems = [
    {
      title: 'Profile',
      icon: <UserCircle className="w-5 h-5" />,
      href: route('siswa.profile'),
      active: activePage === 'profile'
    },
    {
      title: 'Pembayaran',
      icon: <CreditCard className="w-5 h-5" />,
      href: route('siswa.pembayaran'),
      active: activePage === 'pembayaran'
    }
  ];

  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <div className="w-full sm:w-64 bg-white shadow-sm rounded-lg">
      <div className="p-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Dashboard 
        </h2>
        <br />
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                item.active
                  ? 'bg-[#02188B] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#02188B]'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.title}
            </Link>
          ))}
          
          {/* Tambahkan garis pemisah */}
          <div className="border-t border-gray-200 my-2"></div>
          
          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-red-600 hover:bg-red-50"
          >
            <span className="mr-3">
              <LogOut className="w-5 h-5" />
            </span>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
} 