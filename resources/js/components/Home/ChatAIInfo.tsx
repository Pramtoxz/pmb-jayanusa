import { useState, useRef, useEffect } from 'react'
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AvatarAI from '@/assets/images/home/avatar-ai.png'
import Norek from '@/assets/images/home/rekening.png'
import messageSound from '@/assets/sound/message-sound.mp3'

interface Message {
    role: 'ai' | 'user'
    content: string
    isTyping?: boolean
}

interface MenuItem {
    title: string
    response: string
    keywords: string[]
}

const defaultWhatsAppMessage = "Halo! CS Jayanusa, Sesuai instruksi JaVA saya ingin menanyakan hal yang lebih spesifik"

// Fungsi untuk membuat URL WhatsApp yang valid
const getWhatsAppURL = () => {
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(defaultWhatsAppMessage)
    // Format nomor telepon (hilangkan karakter selain angka)
    const phoneNumber = "628116650635"
    // Buat URL WhatsApp dengan format yang benar
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
}

// Fungsi untuk menganalisis kata kunci
const analyzeKeywords = (text: string): string[] => {
    const words = text.toLowerCase().split(/\s+/)
    const commonWords = ['yang', 'dan', 'atau', 'dengan', 'ke', 'di', 'dari', 'untuk', 'pada', 'dalam', 'oleh', 'karena', 'jika', 'maka', 'seperti', 'juga', 'bisa', 'ada', 'ini', 'itu', 'saya', 'anda', 'kamu', 'mereka', 'kita', 'bisa', 'ada', 'sudah', 'belum', 'akan', 'sedang', 'pernah', 'sering', 'jarang', 'selalu', 'kadang', 'mungkin', 'pasti', 'tidak', 'bukan', 'ya', 'tidak', 'apa', 'siapa', 'dimana', 'kapan', 'bagaimana', 'mengapa', 'berapa']
    
    return words.filter(word => 
        word.length > 2 && 
        !commonWords.includes(word) && 
        /^[a-zA-Z0-9]+$/.test(word)
    )
}

const menuItems: MenuItem[] = [
    {
        title: "Gimana sih cara daftar online?",
        keywords: ["daftar", "pendaftaran", "online", "registrasi", "form", "cara", "proses"],
        response: "Hai Sobat! JaVA siap bantu jawab pertanyaanmu ya! 😊\n\n" +
            "Untuk daftar online gampang banget kok! Begini caranya:\n" +
            "1. Tinggal klik menu 'Pendaftaran Online' terus isi formnya\n" +
            "2. Cetak bukti registrasinya\n" +
            "3. Bisa transfer ke:\n" +
            `<img src="${Norek}" alt="No. Rekening" style="width: 1000px; height: auto; margin-top: 10px;" />`+
            "\n\n<strong>Kirim bukti transfer dan dokumennya ke WA kita ya: " +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span></strong>`
   },
    {
        title: "Berapa ya biaya daftarnya?",
        keywords: ["biaya", "harga", "bayar", "transfer", "rekening", "uang", "dana"],
        response: "Hai Sobat! JaVA bantu jawab ya! 😊\n\n" +
            "Untuk Biaya pendaftarannya cuma \n"+
            "<span class='text-red-500'>Rp 200.000</span> aja nih\n" +
            "Bisa transfer ke:\n" +
            `<img src="${Norek}" alt="No. Rekening" style="width: 1000px; height: auto; margin-top: 10px;" />`+
            "\n\n<strong>Kirim bukti transfer dan dokumennya ke WA kita ya: " +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span></strong>`
    },
    {
        title: "Jadwal kuliah gimana ya?",
        keywords: ["jadwal", "waktu", "jam", "kuliah", "kelas", "jadwal", "jadwal"],
        response: "Hai Sobat! JaVA kasih info jadwal kuliah ya! 📚\n\n" +
            "Di STMIK-AMIK JAYANUSA ada 2 pilihan waktu kuliah nih:\n" +
            "1. Kelas Pagi:\n" +
            "   - Senin-Jumat: 07.30-17.00\n" +
            "   - Sabtu: 07.30-17.00\n\n" +
            "2. Kelas Sore (cocok buat yang kerja):\n" +
            "   - Senin-Jumat: 17.00-21.00\n" +
            "   - Sabtu: 15.15-18.30"
    },
    {
        title: "Pengen ngobrol sama Admin nih",
        keywords: ["admin", "cs", "customer service", "hubungi", "kontak", "wa", "whatsapp"],
        response: "Hai Sobat! JaVA bantu hubungin ke admin ya! 👋\n\n" +
            "Langsung aja klik nomor WA admin kita:\n\n" +
                   `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>\n\n` +
                   "Admin online di jam:\n" +
                   "Senin - Jumat: 09.30 - 18.30\n" +
                   "Sabtu: 09.30 - 18.00"
    },
    {
        title: "Apa aja sih UKM di Jayanusa?",
        keywords: ["ukm", "organisasi", "kegiatan", "mahasiswa", "aktivitas", "kampus", "unit"],
        response: "Hai Sobat! JaVA kasih tau tentang UKM di Jayanusa ya! 🎭\n\n" +
            "Ada banyak UKM keren nih yang bisa kamu ikutin:\n\n" +
            "1. SENJA (Unit Kegiatan Mahasiswa Seni Jayanusa) 🎨\n" +
            "2. UKO (Unit Kegiatan Olahraga) ⚽\n" +
            "3. FSI Shidratulfikri Jayanusa (Forum Studi Islam) 🕌\n" +
            "4. UKM KWU (UKM Kewirausahaan Jayanusa) 💼\n" +
            "5. MAPALA (Mahasiswa Pencinta Alam Jayanusa) 🏔️\n" +
            "6. UKM Robotic 🤖\n\n" +
            "Keren kan? Kamu bisa pilih sesuai minat dan bakatmu!"
    },
    {
        title: "Dimana nih lokasi lengkap kampusnya?",
        keywords: ["lokasi", "alamat", "kampus", "gedung", "tempat", "dimana", "maps", "google"],
        response: "Hai Sobat! JaVA kasih tau lokasi lengkap kampus kita ya! 🏫\n\n" +
            "Kita punya 2 gedung nih:\n\n" +
            "🏢 Gedung A: \n" +
            "Jl. Damar No.69 E Padang\n" +
            "<a href='https://maps.app.goo.gl/5a8YPLyQVuqwB6vg6' target='_blank' class='text-blue-600 hover:underline'>📍 Lihat Lokasi di Google Maps</a>\n\n" +
            "🏢 Gedung B: \n" +
            "Jl. Olo Ladang No.1 Padang\n" +
            "<a href='https://maps.app.goo.gl/MEenmLExFi9J1YS68' target='_blank' class='text-blue-600 hover:underline'>📍 Lihat Lokasi di Google Maps</a>\n\n" +
            "Kalau mau tanya-tanya langsung bisa hubungi:\n" +
            "☎️ Telp: (0751) 28984\n" +
            `📱 WA: <a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">0811-6650-635</a>`
    },
    {
        title: "Social Media Jayanusa",
        keywords: ["sosial", "media", "instagram", "ig", "tiktok", "tt", "medsos", "follow"],
        response: "Hai Sobat! Yuk follow social media Jayanusa biar update terus! 📱\n\n" +
            "📸 Instagram:\n" +
            "<a href='https://www.instagram.com/stmikamikjayanusa/' target='_blank' class='text-blue-600 hover:underline'>@stmikamikjayanusa</a>\n\n" +
            "🎵 TikTok:\n" +
            "<a href='https://www.tiktok.com/@jayanusapadang' target='_blank' class='text-blue-600 hover:underline'>@jayanusapadang</a>\n\n" +
            "Follow kita ya! Banyak info menarik dan kegiatan seru di kampus loh! 🎉"
    },
    {
        title: "Berapa biaya UKT per semester?",
        keywords: ["ukt", "spp", "semester", "biaya kuliah", "pembangunan", "uang kuliah", "per semester"],
        response: "Hai Sobat! JaVA kasih info biaya kuliah ya! 💰\n\n" +
            "Kabar gembira nih! Di STMIK-AMIK JAYANUSA:\n\n" +
            "✨ UKT hanya <span class='text-red-500 font-bold'>Rp 3.900.000 / Semester</span>\n" +
            "✨ <span class='text-green-500 font-bold'>GRATIS Biaya Pembangunan!</span>\n\n" +
            "Mau info lebih detail? Langsung aja hubungi WA admin kita:\n" +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>`
    },
    {
        title: "Program Studi apa aja yang ada di Jayanusa?",
        keywords: ["prodi", "jurusan", "program", "studi", "kuliah", "fakultas", "major"],
        response: "Hai Sobat! JAVA kasih tau program studi di Jayanusa ya! 🎓\n\n" +
            "Ada 3 program studi unggulan nih:\n\n" +
            "1. D3 - Manajemen Informatika (Akreditasi B) 💻\n" +
            "   Peluang karir:\n" +
            "   • Programmer\n" +
            "   • Database Engineer\n" +
            "   • Network Engineer\n\n" +
            "2. S1 - Sistem Informasi (Akreditasi B) 📊\n" +
            "   Peluang karir:\n" +
            "   • Programmer\n" +
            "   • System Analyst\n" +
            "   • Database Engineer\n" +
            "   • Network Engineer\n\n" +
            "3. S1 - Sistem Komputer (Akreditasi B) 🖥️\n" +
            "   Peluang karir:\n" +
            "   • Programmer\n" +
            "   • IoT Developer\n" +
            "   • Network Engineer\n" +
            "   • Robotica\n\n" +
            "Mau info lebih detail? Langsung aja hubungi admin kita:\n" +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>`
    },
    {
        title: "Ada program beasiswa gak?",
        keywords: ["beasiswa", "scholarship", "bantuan", "biaya", "study", "luar negeri", "international"],
        response: "Hai Sobat! JAVA kasih tau program beasiswa internasional kita ya! 🌏\n\n" +
            "Jayanusa punya kerjasama beasiswa dengan berbagai negara:\n\n" +
            "1. Beasiswa Australia 🦘\n" +
            "2. Beasiswa Jepang 🗾\n" +
            "3. Beasiswa Malaysia 🇲🇾\n" +
            "4. Beasiswa Thailand 🇹🇭\n\n" +
            "Keuntungan beasiswa:\n" +
            "✨ Beasiswa Penuh\n" +
            "✨ Kerjasama dengan universitas terkemuka\n" +
            "✨ Termasuk akomodasi dan tunjangan hidup\n\n" +
            "Mau info lebih detail? Langsung aja hubungi admin kita:\n" +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>`
    },
    {
        title: "Apa aja sih fasilitas kampusnya?",
        keywords: ["fasilitas", "sarana", "prasarana", "kampus", "gedung", "lab", "laboratorium"],
        response: "Hai Sobat! JAVA kasih tau fasilitas lengkap kampus ya! 🏫\n\n" +
            "Fasilitas yang tersedia:\n\n" +
            "1. Staff Pengajar 👨‍🏫\n" +
            "   • Berpengalaman dan kompeten\n\n" +
            "2. Lab Komputer 💻\n" +
            "   • Perangkat komputer terbaru\n" +
            "   • Software industri\n\n" +
            "3. Perpustakaan 📚\n" +
            "   • Ribuan buku dan jurnal\n\n" +
            "4. Kelas dan Aula 🏢\n" +
            "   • Nyaman dan modern\n" +
            "   • Full AC\n\n" +
            "5. Fasilitas Lainnya 🎯\n" +
            "   • Menunjang kegiatan mahasiswa\n\n" +
            "Mau lihat langsung fasilitasnya? Hubungi admin kita:\n" +
            `<span class="text-blue-600 hover:underline"><a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer">0811-6650-635</a></span>`
    }
]

// Tambahkan fungsi untuk memutar suara
const playMessageSound = () => {
    const audio = new Audio(messageSound)
    audio.play()
}

export default function ChatAIInfo() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content: 'Halo! Saya JaVA (Jawaban Pintar dari Jayanusa), asisten virtual yang siap membantu Anda mendapatkan informasi tentang STMIK - AMIK JAYANUSA. Apa yang ingin Anda ketahui?'
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

    const findBestMatch = (text: string): MenuItem | null => {
        const userKeywords = analyzeKeywords(text)
        let bestMatch: MenuItem | null = null
        let maxMatches = 0

        for (const item of menuItems) {
            const matches = userKeywords.filter(keyword => 
                item.keywords.some(itemKeyword => 
                    itemKeyword.includes(keyword) || keyword.includes(itemKeyword)
                )
            ).length

            if (matches > maxMatches) {
                maxMatches = matches
                bestMatch = item
            }
        }

        return maxMatches > 0 ? bestMatch : null
    }

    const handleSend = (content: string = input) => {
        if (!content.trim()) return

        setMessages(prev => [...prev, { role: 'user', content }])
        setInput('')
        setIsAITyping(true)

        setTimeout(() => {
            const bestMatch = findBestMatch(content)
            let response = ''

            if (bestMatch) {
                response = bestMatch.response
            } else {
                response = 'Yahhh :( \n\nSayangnya,JaVA tidak memahami pertanyaan Anda... \n\n Tenang saja, jika pertanyaan kamu masih belum terjawab sempurna, jangan sungkan untuk menghubungi Admin kami melalui WhatsApp: \n\n' +
                    `<a href="${getWhatsAppURL()}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">0811-6650-635</a>`
            }
            
            // Mainkan suara hanya saat AI merespons
            playMessageSound()
            
            setIsAITyping(false)
            setMessages(prev => [...prev, { role: 'ai', content: response }])
        }, 1000)
    }

    return (
        <section id="chat-ai" className="py-16 bg-gradient-to-br from-white via-[#FFF2F2] to-white dark:from-[#161615] dark:via-[#1D0002] dark:to-[#161615]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1 bg-[#FFF2F2] dark:bg-[#1D0002] rounded-full text-[#02188B] dark:text-[#FF4433] text-sm font-semibold mb-4">
                        Chat AI
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1b1b18] mb-6 dark:text-[#EDEDEC] tracking-tight">
                        Tanya JaVA Sekarang
                    </h2>
                    <p className="text-[#706f6c] dark:text-[#A1A09A] text-lg max-w-2xl mx-auto mb-12">
                        Dapatkan informasi lengkap seputar STMIK-AMIK Jayanusa dengan bantuan asisten virtual kami
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto bg-white dark:bg-[#161615] rounded-2xl shadow-lg border dark:border-gray-800">
                    {/* Header dengan branding JaVA */}
                    <div className="p-4 border-b dark:border-gray-800 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <img 
                                src={AvatarAI}
                                alt="JAVA Assistant"
                                className="p-1"
                            />
                        </Avatar>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Jayanusa Virtual Assistant</p>
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
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 font-medium">Tanyakan pada JaVA:</p>
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
                                placeholder="Tanyakan pada JaVA..."
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
            </div>
        </section>
    )
} 