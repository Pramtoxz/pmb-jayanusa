import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"

interface PembayaranDaftarUlang {
    id: number;
    nik_siswa: string;
    nama: string;
    bank: string;
    status: string;
    bukti: string | null;
    keterangan: string | null;
    catatan_admin: string | null;
    tanggal: string;
}

interface Props {
    pembayaran: PembayaranDaftarUlang;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pembayaran Daftar Ulang',
        href: '/admin/pembayaran-daftar-ulang',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case 'dibayar':
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case 'menunggu':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case 'ditolak':
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
};

export default function Show({ pembayaran }: Props) {
    const { put, data, setData } = useForm({
        status: pembayaran.status,
        catatan_admin: pembayaran.catatan_admin || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.status) {
            toast.error('Status pembayaran harus dipilih');
            return;
        }

        put(route('admin.daftar-ulang.verify', pembayaran.id), {
            onSuccess: () => {
                toast.success('Status pembayaran berhasil diperbarui');
            },
            onError: () => {
                toast.error('Gagal memperbarui status pembayaran');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pembayaran Daftar Ulang - ${pembayaran.kode_pembayaran}`} />
            <Toaster />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Detail Pembayaran Daftar Ulang</h2>
                        <p className="text-muted-foreground">
                            Informasi lengkap pembayaran daftar ulang
                        </p>
                    </div>
                    
                    <Button 
                        variant="outline"
                        onClick={() => router.get('/admin/pembayaran-daftar-ulang')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Informasi Mahasiswa
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Nama Lengkap</span>
                                <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.nama || '-'}</p>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">NIK</span>
                                <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.nik || '-'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                            </svg>
                            Informasi Pembayaran
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kode Pembayaran</span>
                                <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.kode_pembayaran}</p>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bank</span>
                                <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.bank || '-'}</p>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
                                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                                    <p className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mt-1 ${getStatusBadgeStyle(pembayaran.status)}`}>
                                        {pembayaran.status === 'dibayar' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6L9 17l-5-5"></path>
                                        </svg>}
                                        {pembayaran.status === 'menunggu' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>}
                                        {pembayaran.status === 'ditolak' && <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="15" y1="9" x2="9" y2="15"></line>
                                            <line x1="9" y1="9" x2="15" y2="15"></line>
                                        </svg>}
                                        {pembayaran.status}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tanggal</span>
                                <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.tanggal || '-'}</p>
                            </div>
                            {pembayaran.keterangan && (
                                <div className="space-y-1.5">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Keterangan</span>
                                    <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md italic">{pembayaran.keterangan}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            Bukti Pembayaran
                        </h3>
                        {pembayaran.bukti ? (
                            <div className="rounded-lg border overflow-hidden mt-2 shadow-md">
                                <div className="relative pb-[70%] bg-gray-100 dark:bg-gray-800">
                                    <img 
                                        src={pembayaran.bukti} 
                                        alt="Bukti Pembayaran"
                                        className="absolute w-full h-full object-contain transition-transform duration-200 hover:scale-105"
                                    />
                                </div>
                                <div className="p-3 text-center bg-gray-50 dark:bg-gray-800 flex justify-center gap-3">
                                    <a 
                                        href={pembayaran.bukti} 
                                        target="_blank" 
                                        className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                        Lihat Gambar Asli
                                    </a>
                                    <a 
                                        href={pembayaran.bukti} 
                                        download 
                                        className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        Unduh Gambar
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 flex flex-col items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                                <p className="text-muted-foreground mb-1">Belum ada bukti pembayaran</p>
                                <p className="text-xs text-muted-foreground opacity-70">Mahasiswa belum mengunggah bukti pembayaran</p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Verifikasi & Update Status
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status Pembayaran</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(value) => {
                                        setData('status', value);
                                    }}
                                >
                                    <SelectTrigger className="w-full bg-white dark:bg-gray-900 focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out">
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dibayar" className="focus:bg-green-50 dark:focus:bg-green-900/20">
                                            <div className="flex items-center">
                                                <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                                                Diterima
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="menunggu" className="focus:bg-yellow-50 dark:focus:bg-yellow-900/20">
                                            <div className="flex items-center">
                                                <span className="w-3 h-3 rounded-full mr-2 bg-yellow-500"></span>
                                                Menunggu
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="ditolak" className="focus:bg-red-50 dark:focus:bg-red-900/20">
                                            <div className="flex items-center">
                                                <span className="w-3 h-3 rounded-full mr-2 bg-red-500"></span>
                                                Ditolak
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {data.status === 'ditolak' && (
                                <div className="space-y-2">
                                    <Label htmlFor="catatan_admin" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Catatan Admin</Label>
                                    <Textarea
                                        id="catatan_admin"
                                        value={data.catatan_admin}
                                        onChange={(e) => 
                                            setData('catatan_admin', e.target.value)
                                        }
                                        placeholder="Tambahkan catatan admin jika diperlukan"
                                        className="min-h-[100px] resize-none bg-white dark:bg-gray-900 focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out"
                                    />
                                    <div className="flex text-xs text-red-600 dark:text-red-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <line x1="12" y1="8" x2="12" y2="12"></line>
                                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                        </svg>
                                        Wajib memberikan alasan penolakan
                                    </div>
                                </div>
                            )}

                            <Button 
                                type="submit"
                                disabled={data.status === 'ditolak' && !data.catatan_admin}
                                className={`w-full shadow-md hover:shadow-lg transition-all ${
                                    data.status === 'dibayar' 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : data.status === 'ditolak' 
                                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            >
                                Simpan Perubahan
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 