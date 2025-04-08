import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, LogIn } from 'lucide-react';
import { FormEventHandler } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/images/home/java-ai.json';
import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    // Tambahkan useEffect untuk menerapkan tema dari localStorage
    useEffect(() => {
        const savedThemeMode = localStorage.getItem('themeMode') as 'light' | 'dark' | 'system' || 'system';
        
        if (savedThemeMode === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', systemPrefersDark);
        } else {
            document.documentElement.classList.toggle('dark', savedThemeMode === 'dark');
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (savedThemeMode === 'system') {
                document.documentElement.classList.toggle('dark', mediaQuery.matches);
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        post(route('login'), {
            onFinish: () => {
                reset('password');
                setIsLoading(false);
            },
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Head title="Login PPMB JAYANUSA" />
                <div className="w-64 h-64">
                    <Lottie 
                        animationData={animationData} 
                        loop={true}
                        autoplay={true}
                    />
                </div>
                <p className="mt-4 text-indigo-700 font-medium">
                    ⏳ Sedang Di Proses...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#1a1a1a] dark:via-[#0f1117] dark:to-black transition-all duration-500 p-4 sm:p-6 md:p-8">
            <Head title="Login PPMB JAYANUSA">
                <link rel="preload" href={LogoJayanusa} as="image" />
            </Head>
            
            <div className="w-full max-w-md transition-all duration-700 opacity-100 scale-100">
                <div className="bg-white dark:bg-[#1a1a1a]/80 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl dark:border dark:border-[#dd00ff]/20">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-[#b800e6] dark:via-[#dd00ff] dark:to-[#ff00ff] p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full"></div>
                            <div className="absolute top-20 -right-10 w-32 h-32 bg-indigo-400 opacity-20 rounded-full"></div>
                        </div>
                        
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-105 z-10">
                            <img 
                                src={LogoJayanusa}
                                alt="Logo Jayanusa" 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-white text-2xl font-bold text-center z-10">
                            PPMB JAYANUSA
                        </h1>
                        <p className="text-blue-100 text-sm mt-1 z-10">
                            STMIK - AMIK JAYANUSA
                        </p>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form className="space-y-5" onSubmit={submit}>
                            <div className="group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan email Anda"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <a 
                                            href="https://wa.me/628116650635"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                        >
                                            Lupa password?
                                        </a>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Masukkan password"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4.5 w-4.5" />
                                        ) : (
                                            <Eye className="h-4.5 w-4.5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Ingat saya
                                </label>
                            </div>

                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-[#b800e6] dark:via-[#dd00ff] dark:to-[#ff00ff] hover:from-blue-700 hover:to-indigo-800 dark:hover:from-[#a500cc] dark:hover:via-[#c700e6] dark:hover:to-[#e600e6] text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <LogIn className="h-4 w-4 mr-2" />
                                            Masuk
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {status && (
                            <div className="mt-5 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
                                {status}
                            </div>
                        )}

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            Belum punya akun?{' '}
                            <TextLink 
                                href={route('register')} 
                                className="text-blue-600 hover:text-blue-800 dark:text-[#dd00ff] dark:hover:text-[#ff00ff] font-medium transition-colors duration-200"
                            >
                                Daftar sekarang
                            </TextLink>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            Etss... Udah Follow Instagram Jayanusa Belum?{' '}
                            <a href="https://www.instagram.com/stmikamikjayanusa/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 dark:text-[#dd00ff] dark:hover:text-[#ff00ff] font-medium transition-colors duration-200">
                                Klik Disini!
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    &copy; {new Date().getFullYear()} STMIK - AMIK JAYANUSA. Hak Cipta Dilindungi.
                </div>
            </div>
        </div>
    );
}
