import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, RefreshCw, ShieldCheck } from 'lucide-react';
import { FormEventHandler } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/images/home/java-ai.json';
import LogoJayanusa from '@/assets/images/home/jayanusa.webp';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import Swal from 'sweetalert2';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
    captchaAnswer: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

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

// Generate pertanyaan matematika sederhana
const generateMathCaptcha = () => {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = (num1 + num2).toString();
            break;
        case '-':
            num1 = Math.floor(Math.random() * 10) + 5;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = (num1 - num2).toString();
            break;
        case '×':
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = (num1 * num2).toString();
            break;
        default:
            num1 = 1;
            num2 = 1;
            answer = "2";
    }
    
    return {
        question: `Berapa hasil ${num1} ${operation} ${num2}?`,
        answers: [answer]
    };
};

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCaptcha, setCurrentCaptcha] = useState({ question: "", answers: [""] });
    const [captchaError, setCaptchaError] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [verifyEnabled, setVerifyEnabled] = useState(false);
    const [captchaType, setCaptchaType] = useState<'text' | 'math'>('text'); 

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
        captchaAnswer: '',
    });

    // Generate pertanyaan CAPTCHA acak
    const generateCaptcha = useCallback(() => {
        // Randomly decide whether to use text or math captcha
        const useMathCaptcha = Math.random() > 0.5;
        
        if (useMathCaptcha) {
            setCaptchaType('math');
            setCurrentCaptcha(generateMathCaptcha());
        } else {
            setCaptchaType('text');
            const randomIndex = Math.floor(Math.random() * captchaQuestions.length);
            setCurrentCaptcha(captchaQuestions[randomIndex]);
        }
        
        setData('captchaAnswer', '');
        setCaptchaError('');
        setVerifyEnabled(false);
        
        // Enable verify button after a short delay
        setTimeout(() => setVerifyEnabled(true), 800);
    }, [setData]);

    // Generate CAPTCHA when component mounts
    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);
    
    // When dialog closes, regenerate CAPTCHA for next time
    useEffect(() => {
        if (!showCaptcha) {
            generateCaptcha();
        }
    }, [showCaptcha, generateCaptcha]);

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
        // Generate CAPTCHA baru setiap kali tombol login diklik
        generateCaptcha();
        setShowCaptcha(true);
    };

    const handleCaptchaSubmit = () => {
        if (!verifyEnabled) return;
        
        if (!validateCaptcha()) {
            return;
        }

        setShowCaptcha(false);
        setIsLoading(true);
        post(route('login'), {
            onSuccess: () => {
                setIsLoading(false);
            },
            onError: (errors) => {
                setIsLoading(false);
                let errorMessage = 'Username atau password salah';
                if (errors.email === 'These credentials do not match our records.') {
                    errorMessage = 'Email atau password yang Anda masukkan salah';
                } else if (errors.email) {
                    errorMessage = errors.email;
                } else if (errors.password) {
                    errorMessage = errors.password;
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: errorMessage,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Coba Lagi'
                });
                
                generateCaptcha();
            },
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
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 transition-all duration-500 p-4 sm:p-6 md:p-8">
                <Head title="Login PPMB JAYANUSA">
                    <link rel="preload" href={LogoJayanusa} as="image" />
                </Head>
                
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
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
                                Sistem Penerimaan Pendaftaran Mahasiswa Baru
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
                                            className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                        className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center"
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

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <TextLink 
                                    href={route('register')} 
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                >
                                    Daftar sekarang
                                </TextLink>
                            </div>

                            <div className="mt-6 text-center text-sm text-gray-600">
                                Etss... Udah Follow Instagram Jayanusa Belum?{' '}
                                <a href="https://www.instagram.com/stmikamikjayanusa/" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                    Klik Disini!
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500 font-medium">
                        &copy; {new Date().getFullYear()} STMIK - AMIK JAYANUSA. Hak Cipta Dilindungi.
                    </div>
                </div>
            </div>

            <Dialog open={showCaptcha} onOpenChange={(open) => {
                setShowCaptcha(open);
                if (!open) generateCaptcha();
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
                            Verifikasi Keamanan
                        </DialogTitle>
                        <DialogDescription>
                            Mohon jawab pertanyaan berikut agar jaVa tidak mengira bahwa kamu ROBOT
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-2">
                        <div className="flex items-start space-x-4">
                            <div className="w-24 h-24 flex-shrink-0">
                                <Lottie 
                                    animationData={animationData} 
                                    loop={true}
                                    autoplay={true}
                                />
                            </div>
                            <div className="flex-1">
                                <div className={`
                                    bg-white p-3.5 rounded-lg shadow-sm border border-gray-100 relative 
                                    ${captchaType === 'math' ? 'border-l-4 border-l-blue-500' : ''}
                                `}>
                                    <div className="absolute -left-2 top-4 transform -translate-y-1/2">
                                        <div className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium text-blue-600">JaVa:</span> {currentCaptcha.question}
                                    </p>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="captcha-answer" className="text-xs text-gray-500 mb-1 block">Jawaban Anda:</label>
                                    <input
                                        id="captcha-answer"
                                        type="text"
                                        value={data.captchaAnswer}
                                        onChange={(e) => setData('captchaAnswer', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Ketik jawaban Anda di sini"
                                        autoComplete="off"
                                        autoFocus
                                    />
                                </div>
                                {captchaError && (
                                    <div className="mt-2 flex items-center space-x-2 p-2 bg-red-50 rounded-md">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="text-sm text-red-600">
                                            {captchaError}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={generateCaptcha}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Ganti Pertanyaan
                        </button>
                        <button
                            type="button"
                            onClick={handleCaptchaSubmit}
                            disabled={!verifyEnabled}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-200 flex items-center ${
                                verifyEnabled 
                                    ? "hover:bg-blue-700" 
                                    : "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Verifikasi
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
