import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/images/home/java-ai.json';
import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Daftar pertanyaan CAPTCHA
const captchaQuestions = [
    { question: "Tuliskan satu warna dari pelangi", answers: ["merah", "jingga", "kuning", "hijau", "biru", "nila", "ungu"] },
    { question: "Apa hewan yang menggonggong?", answers: ["anjing", "dog"] },
    { question: "Berapa hasil 2 + 2?", answers: ["4", "empat"] },
    { question: "Apa ibu kota Indonesia?", answers: ["jakarta"] },
    { question: "Sebutkan salah satu nama hari dalam seminggu", answers: ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"] },
    { question: "Berapa hasil 5 + 5?", answers: ["10", "sepuluh"] },
    { question: "Apa nama kampus kita?", answers: ["jayanusa", "stmik amik jayanusa", "stmik-amik jayanusa"] },
    { question: "Berapa jumlah bulan dalam setahun?", answers: ["12", "duabelas"] },
    { question: "Sebutkan salah satu nama bulan", answers: ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"] },
    { question: "Apa warna bendera Indonesia?", answers: ["merah putih"] },
    { question: "Berapa hasil 3 + 3?", answers: ["6", "enam"] },
    { question: "Apa nama provinsi tempat kampus kita berada?", answers: ["sumatera barat", "sumbar"] },
    { question: "Berapa hasil 4 + 4?", answers: ["8", "delapan"] },
    { question: "Sebutkan nama hewan yang berkokok di pagi hari", answers: ["ayam", "ayam jantan"] },
    { question: "Apa warna langit di siang hari?", answers: ["biru"] }
];

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    captchaAnswer: string;
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCaptcha, setCurrentCaptcha] = useState({ question: "", answers: [""] });
    const [captchaError, setCaptchaError] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        captchaAnswer: '',
    });

    // Generate pertanyaan CAPTCHA acak
    const generateCaptcha = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * captchaQuestions.length);
        setCurrentCaptcha(captchaQuestions[randomIndex]);
        setData('captchaAnswer', '');
        setCaptchaError('');
    }, [setData]);

    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    // Validasi CAPTCHA
    const validateCaptcha = (): boolean => {
        const userAnswer = data.captchaAnswer.toLowerCase().trim();
        const isValid = currentCaptcha.answers.includes(userAnswer);
        
        if (!isValid) {
            setCaptchaError('Jawaban tidak tepat, silakan coba lagi');
            generateCaptcha();
        }
        
        return isValid;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setShowCaptcha(true);
    };

    const handleCaptchaSubmit = () => {
        if (!validateCaptcha()) {
            return;
        }

        setShowCaptcha(false);
        setIsLoading(true);
        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
                setIsLoading(false);
            },
        });
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Head title="Daftar PPMB JAYANUSA" />
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
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#1a1a1a] dark:via-[#0f1117] dark:to-black transition-all duration-500 p-4 sm:p-6 md:p-8">
                <Head title="Daftar PPMB JAYANUSA">
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
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                        Nama Lengkap
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Masukkan nama lengkap Anda"
                                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Masukkan email Anda"
                                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="group">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                        Password
                                    </label>
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

                                <div className="group">
                                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? "text" : "password"}
                                            required
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Masukkan ulang password"
                                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4.5 w-4.5" />
                                            ) : (
                                                <Eye className="h-4.5 w-4.5" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} />
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
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Daftar
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                                Sudah punya akun?{' '}
                                <TextLink 
                                    href={route('login')} 
                                    className="text-blue-600 hover:text-blue-800 dark:text-[#dd00ff] dark:hover:text-[#ff00ff] font-medium transition-colors duration-200"
                                >
                                    Masuk
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

            <Dialog open={showCaptcha} onOpenChange={setShowCaptcha}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Verifikasi Keamanan</DialogTitle>
                        <DialogDescription>
                            Mohon jawab pertanyaan berikut agar JaVa tidak mengira bahwa kamu ROBOT
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-start space-x-4 p-4">
                        <div className="w-24 h-24 flex-shrink-0">
                            <Lottie 
                                animationData={animationData} 
                                loop={true}
                                autoplay={true}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 relative">
                                <div className="absolute -left-2 top-4 transform -translate-y-1/2">
                                    <div className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white dark:border-r-gray-800 border-b-8 border-b-transparent"></div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-medium text-blue-600 dark:text-blue-400">JaVa:</span> {currentCaptcha.question}
                                </p>
                            </div>
                            <input
                                type="text"
                                value={data.captchaAnswer}
                                onChange={(e) => setData('captchaAnswer', e.target.value)}
                                className="mt-3 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Ketik jawaban Anda di sini"
                            />
                            {captchaError && (
                                <div className="mt-2 flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <p className="text-sm text-red-600 dark:text-red-400">
                                        {captchaError}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={generateCaptcha}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Ganti Pertanyaan
                        </button>
                        <button
                            type="button"
                            onClick={handleCaptchaSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Verifikasi
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
