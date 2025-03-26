import { useState, useRef, useEffect } from 'react'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AvatarAI from '@/assets/avatar-ai.png'

interface Message {
    role: 'ai' | 'user'
    content: string
    isTyping?: boolean
}

interface MenuItem {
    title: string
    response: string
}

const defaultWhatsAppMessage = "Halo! CS Jayanusa, Sesuai instruksi JAVA saya ingin menanyakan hal yang lebih spesifik"

// Fungsi untuk membuat URL WhatsApp yang valid
const getWhatsAppURL = () => {
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(defaultWhatsAppMessage)
    // Format nomor telepon (hilangkan karakter selain angka)
    const phoneNumber = "628116650635"
    // Buat URL WhatsApp dengan format yang benar
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
}

const menuItems: MenuItem[] = [
    {
        title: "Bagaimana cara pendaftaran online?",
        response: "Java Bantu Menjawab Pertanyaan Anda Ya! \n\n" +
            "Untuk Pendaftaran Online Anda bisa Klik Menu Pendaftaran Online dan isi Form, \n" +
            "Setelah itu Cetak Bukti Registrasi, \n" +
            "Dan Bayar Rp. 200.000 ke Bank Nagari (21000.10500.3997), \n" +
            "Dan Kirim Bukti Transfer dan Dokumen ke WA: 08116650635"
    },
    {
        title: "Berapa biaya pendaftarannya?",
        response: "Java Bantu Menjawab Pertanyaan Anda Ya! \n\n" +
            "Biaya pendaftaran sebesar Rp. 200.000, \n" +
            "Dapat dibayarkan ke:\n" +
            "Bank Nagari\n" +
            "No. Rekening: 21000.10500.3997\n" +
            "Atas nama: Yayasan Bina Manajemen Informatika"
    },
    {
        title: "Dimana lokasi kampusnya?",
        response: "Java Bantu Menjawab Pertanyaan Anda Ya!\n" +
            "Saat Ini Alamat Kampus Kita Berada di:\n" +
            "Jl. Damar No.69 E Padang, Sumatera Barat - Indonesia Untuk Gedung A\n" +
            "Jl. Olo Ladang No.1 Padang, Sumatera Barat - Indonesia Untuk Gedung B\n" +
            "Telp.: (0751) 28984\n" +
            "WA: 0811-6650-635"
    },
    {
        title: "Bagaimana jadwal perkuliahannya?",
        response: "Java Bantu Menjawab Pertanyaan Anda Ya! \n\n" +
            "Jadwal Perkuliahan:\n" +
            "Di STMIK - AMIK JAYANUSA, Kami memiliki 2 Jadwal Perkuliahan Diantaranya:\n" +
            "1. Kelas Pagi:\n" +
            "   - Senin-Jumat: 07.30-17.00\n" +
            "   - Sabtu: 07.30-17.00\n\n" +
            "2. Kelas Sore:\n" +
            "   - Senin-Jumat: 17.00-21.00\n" +
            "   - Sabtu: 15.15-18.30"
    },
    {
        title: "Saya Ingin Terhubung dengan Admin",
        response: "Java Bantu Menjawab Pertanyaan Anda Ya! \n\n" +
            "Untuk menghubungi Admin kami, silakan Klik Nomor dibawah ini melalui WhatsApp:\n\n" +
                   `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>\n\n` +
                   "Jam Kerja:\n" +
                   "Senin - Jumat: 09.30 - 18.30\n" +
                   "Sabtu: 09.30 - 18.00"
    }
]

export default function ChatAIInfo() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content: 'Halo! Saya JAVA (Jawaban Pintar dari Jayanusa), asisten virtual yang siap membantu Anda mendapatkan informasi tentang STMIK - AMIK JAYANUSA. Apa yang ingin Anda ketahui?'
        }
    ])
    const [input, setInput] = useState('')
    const [isAITyping, setIsAITyping] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages, isAITyping])

    const handleSend = (content: string = input) => {
        if (!content.trim()) return

        setMessages(prev => [...prev, { role: 'user', content }])
        setInput('')
        setIsAITyping(true)

        setTimeout(() => {
            let response = ''
            if (content.toLowerCase().includes('daftar') || content.toLowerCase().includes('pendaftaran')) {
                response = 'Untuk pendaftaran, Anda dapat memilih 2 cara:\n\n' +
                    '1. Pendaftaran Online:\n' +
                    '- Klik menu Pendaftaran Online dan isi form\n' +
                    '- Cetak bukti registrasi\n' +
                    '- Bayar Rp. 200.000 ke Bank Nagari (21000.10500.3997)\n' +
                    '- Kirim bukti transfer dan dokumen ke WA: 08116650635\n\n' +
                    '2. Pendaftaran Offline:\n' +
                    '- Kunjungi kampus pada jam kerja:\n' +
                    'Senin-Jumat: 09.30-18.30\n' +
                    'Sabtu: 09.30-18.00'
            } else {
                const menuItem = menuItems.find(item => 
                    content.toLowerCase().includes(item.title.toLowerCase())
                )
                response = menuItem ? menuItem.response : 
                    'Yahhh :( \n\nSayangnya,JAVA tidak memahami pertanyaan Anda. Tapi tenang saja jika kamu memiliki pertanyaan yang lebih spesifik, jangan sungkan untuk menghubungi Costumer Service kami melalui WhatsApp: \n\n' +
                    `<a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">0811-6650-635</a>`
            }
            
            setIsAITyping(false)
            setMessages(prev => [...prev, { role: 'ai', content: response }])
        }, 1000)
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#161615] rounded-2xl shadow-lg border dark:border-gray-800">
            {/* Header dengan branding JAVA */}
            <div className="p-4 border-b dark:border-gray-800 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <img 
                        src={AvatarAI}
                        alt="JAVA Assistant"
                        className="p-1"
                    />
                </Avatar>
                <div>
                    <p className="font-semibold text-gray-900 dark:text-white">JAVA</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
                </div>
            </div>

            {/* Chat Area dengan height yang sedikit lebih tinggi */}
            <div ref={chatContainerRef} className="h-[350px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="space-y-3">
                    {messages.map((message, i) => (
                        <div
                            key={i}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                        >
                            {message.role === 'ai' && (
                                <Avatar className="h-8 w-8 shrink-0">
                                    <img 
                                        src={AvatarAI}
                                        alt="JAVA Assistant"
                                        className="p-1"
                                    />
                                </Avatar>
                            )}
                            <div
                                className={`max-w-[85%] rounded-xl p-3 ${
                                    message.role === 'user'
                                        ? 'bg-[#02188B] text-white dark:bg-[#FF4433]'
                                        : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                                }`}
                            >
                                <p 
                                    className="whitespace-pre-line text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                />
                            </div>
                            {message.role === 'user' && <div className="w-8 h-8 shrink-0" />}
                        </div>
                    ))}
                    {isAITyping && (
                        <div className="flex items-end gap-2">
                            <Avatar className="h-8 w-8 shrink-0">
                                <img 
                                    src={AvatarAI} 
                                    alt="AI Assistant"
                                    className="p-1"
                                />
                            </Avatar>
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Suggested Questions dengan layout yang lebih compact */}
            <div className="p-3 border-t border-b dark:border-gray-800 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Tanyakan pada JAVA:</p>
                <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleSend(item.title)}
                            className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Area yang lebih compact */}
            <div className="p-3">
                <div className="flex gap-2">
                    <Input
                        placeholder="Tanyakan pada JAVA..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-sm"
                    />
                    <Button 
                        onClick={() => handleSend()}
                        className="bg-[#02188B] hover:bg-[#021070] dark:bg-[#FF4433] dark:hover:bg-[#E53E2E] px-3"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                        >
                            <path d="M22 2L11 13" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    )
} 