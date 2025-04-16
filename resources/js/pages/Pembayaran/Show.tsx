import { Head, router } from '@inertiajs/react';
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
import { useState } from 'react';
import type { Errors } from '@inertiajs/core';

interface Pembayaran {
    id: number;
    kode: string;
    nama: string;
    nik: string;
    jumlah: number;
    status: string;
    bukti: string | null;
    skl: string | null;
    rapor: string | null;
    suratlulus: string | null;
    keterangan: string | null;
    tanggal: string;
}

interface Props {
    pembayaran: Pembayaran;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pembayaran',
        href: '/pembayaran',
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
    const [updateStatus, setUpdateStatus] = useState<{
        status: string;
        keterangan: string;
    }>({
        status: pembayaran.status,
        keterangan: pembayaran.keterangan || ''
    });
    const [allDocumentsChecked, setAllDocumentsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suratLulusFile, setSuratLulusFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpdateStatus = () => {
        // Validasi jika status ditolak harus ada keterangan
        if (updateStatus.status === 'ditolak' && !updateStatus.keterangan) {
            toast.error('Keterangan wajib diisi jika status ditolak');
            return;
        }

        // Validasi apakah admin sudah memeriksa semua dokumen
        if (!allDocumentsChecked) {
            toast.error('Mohon periksa semua dokumen terlebih dahulu');
            return;
        }

        setIsSubmitting(true);

        router.put(`/pembayaran/${pembayaran.id}`, {
            status: updateStatus.status,
            keterangan: updateStatus.keterangan
        }, {
            onSuccess: () => {
                toast.success('Status pembayaran berhasil diperbarui');
                setTimeout(() => {
                    router.get('/pembayaran');
                }, 1500);
            },
            onError: (errors: Errors) => {
                console.error('Error updating status:', errors);
                toast.error('Gagal memperbarui status pembayaran');
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
            preserveScroll: true
        });
    };

    const handleSuratLulusUpload = () => {
        if (!suratLulusFile) {
            toast.error('Silakan pilih file Surat Lulus terlebih dahulu');
            return;
        }
        
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('suratlulus', suratLulusFile);
        
        router.post(`/pembayaran/${pembayaran.id}/suratlulus`, formData, {
            onSuccess: () => {
                toast.success('Surat Lulus berhasil diunggah');
                setIsUploading(false);
                setSuratLulusFile(null);
            },
            onError: (errors) => {
                console.error('Error uploading:', errors);
                toast.error('Gagal mengunggah Surat Lulus');
                setIsUploading(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Pembayaran - ${pembayaran.kode}`} />
            <Toaster />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Detail Pembayaran</h2>
                        <p className="text-muted-foreground">
                            Informasi lengkap pembayaran
                        </p>
                    </div>
                    
                    <Button 
                        variant="outline"
                        onClick={() => router.get('/pembayaran')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Button>
                </div>

                {/* Konten detail akan dibagi menjadi beberapa bagian */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                                Informasi Pembayaran
                            </h3>
                            <div className="grid gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kode Pembayaran</span>
                                    <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md">{pembayaran.kode}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Jumlah</span>
                                    <p className="font-medium text-base bg-gray-50 dark:bg-gray-800 p-2 rounded-md text-green-600 dark:text-green-400">
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR"
                                        }).format(pembayaran.jumlah)}
                                    </p>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                Verifikasi & Update Status
                            </h3>

                            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="flex items-center">
                                    <input 
                                        id="document-verification"
                                        type="checkbox" 
                                        checked={allDocumentsChecked}
                                        onChange={() => setAllDocumentsChecked(!allDocumentsChecked)}
                                        className="h-4 w-4 text-primary border-gray-300 rounded"
                                    />
                                    <label htmlFor="document-verification" className="ml-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                                        Saya sudah memeriksa semua dokumen (Bukti Pembayaran, SKL, dan Rapor)
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status Pembayaran</Label>
                                    <Select
                                        value={updateStatus.status}
                                        onValueChange={(value) => {
                                            setUpdateStatus(prev => ({
                                                ...prev,
                                                status: value
                                            }));
                                        }}
                                        disabled={!allDocumentsChecked}
                                    >
                                        <SelectTrigger className={`w-full bg-white dark:bg-gray-900 focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out ${!allDocumentsChecked ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="dibayar" className="focus:bg-green-50 dark:focus:bg-green-900/20">
                                                <div className="flex items-center">
                                                    <span className={`w-3 h-3 rounded-full mr-2 bg-green-500`}></span>
                                                    Diterima
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="menunggu" className="focus:bg-yellow-50 dark:focus:bg-yellow-900/20">
                                                <div className="flex items-center">
                                                    <span className={`w-3 h-3 rounded-full mr-2 bg-yellow-500`}></span>
                                                    Menunggu
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="ditolak" className="focus:bg-red-50 dark:focus:bg-red-900/20">
                                                <div className="flex items-center">
                                                    <span className={`w-3 h-3 rounded-full mr-2 bg-red-500`}></span>
                                                    Ditolak
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="keterangan" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Keterangan</Label>
                                    <Textarea
                                        id="keterangan"
                                        value={updateStatus.keterangan}
                                        onChange={(e) => 
                                            setUpdateStatus(prev => ({
                                                ...prev,
                                                keterangan: e.target.value
                                            }))
                                        }
                                        placeholder="Tambahkan keterangan jika diperlukan"
                                        className={`min-h-[100px] resize-none bg-white dark:bg-gray-900 focus:ring-1 focus:ring-primary transition-all duration-200 ease-in-out ${!allDocumentsChecked ? 'opacity-60 cursor-not-allowed' : ''}`}
                                        disabled={!allDocumentsChecked}
                                    />
                                    <div className="flex items-start mt-1">
                                        {updateStatus.status === 'ditolak' ? (
                                            <div className="flex text-xs text-red-600 dark:text-red-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                                Wajib memberikan alasan penolakan
                                            </div>
                                        ) : (
                                            <div className="text-xs text-muted-foreground">Opsional</div>
                                        )}
                                    </div>
                                </div>

                                <Button 
                                    onClick={() => handleUpdateStatus()}
                                    disabled={isSubmitting || !allDocumentsChecked || (updateStatus.status === 'ditolak' && !updateStatus.keterangan)}
                                    className={`w-full shadow-md hover:shadow-lg transition-all ${
                                        updateStatus.status === 'dibayar' 
                                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                                        : updateStatus.status === 'ditolak' 
                                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Menyimpan...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                                <polyline points="7 3 7 8 15 8"></polyline>
                                            </svg>
                                            <span>Simpan Perubahan</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 mb-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Informasi Format Dokumen</h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                                        Dokumen SKL dan rapor ditampilkan dalam format PDF. Jika dokumen tidak tampil dengan baik pada preview, silakan klik tombol "Buka PDF" untuk melihat dokumen dalam tab baru.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
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
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Unduh Gambar
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 flex flex-col items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <p className="text-muted-foreground mb-1">Belum ada bukti pembayaran</p>
                                    <p className="text-xs text-muted-foreground opacity-70">Mahasiswa belum mengunggah bukti pembayaran</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                            <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                Surat Keterangan Lulus (SKL)
                            </h3>
                            {pembayaran.skl ? (
                                <div className="rounded-lg border overflow-hidden mt-2 shadow-md">
                                    <div className="bg-gray-100 dark:bg-gray-800 h-[400px]">
                                        <iframe
                                            src={pembayaran.skl}
                                            className="w-full h-full"
                                            title="Surat Keterangan Lulus"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-3 text-center bg-gray-50 dark:bg-gray-800 flex justify-center gap-3">
                                        <a 
                                            href={pembayaran.skl} 
                                            target="_blank" 
                                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <polyline points="10 9 9 9 8 9"></polyline>
                                            </svg>
                                            Buka PDF
                                        </a>
                                        <a 
                                            href={pembayaran.skl} 
                                            download 
                                            className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Unduh PDF
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 flex flex-col items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <p className="text-muted-foreground mb-1">Belum ada SKL</p>
                                    <p className="text-xs text-muted-foreground opacity-70">Mahasiswa belum mengunggah SKL</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                            <h3 className="text-base font-semibold text-primary mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                Rapor Terakhir
                            </h3>
                            {pembayaran.rapor ? (
                                <div className="rounded-lg border overflow-hidden mt-2 shadow-md">
                                    <div className="bg-gray-100 dark:bg-gray-800 h-[400px]">
                                        <iframe
                                            src={pembayaran.rapor}
                                            className="w-full h-full"
                                            title="Rapor Terakhir"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-3 text-center bg-gray-50 dark:bg-gray-800 flex justify-center gap-3">
                                        <a 
                                            href={pembayaran.rapor} 
                                            target="_blank" 
                                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                                <polyline points="10 9 9 9 8 9"></polyline>
                                            </svg>
                                            Buka PDF
                                        </a>
                                        <a 
                                            href={pembayaran.rapor} 
                                            download 
                                            className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 inline-flex items-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                            Unduh PDF
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed p-8 flex flex-col items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    <p className="text-muted-foreground mb-1">Belum ada Rapor</p>
                                    <p className="text-xs text-muted-foreground opacity-70">Mahasiswa belum mengunggah Rapor</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {updateStatus.status === 'dibayar' && (
                    <div className="mt-4 p-3 border border-green-200 dark:border-green-800 rounded-md bg-green-50 dark:bg-green-900/20">
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">Upload Surat Lulus</h4>
                        <p className="text-xs text-green-700 dark:text-green-500 mb-3">
                            Silakan upload surat lulus yang akan diberikan kepada calon siswa
                        </p>
                        
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="file"
                                    id="suratlulus"
                                    name="suratlulus"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => setSuratLulusFile(e.target.files?.[0] || null)}
                                />
                                <label
                                    htmlFor="suratlulus"
                                    className="cursor-pointer bg-white dark:bg-gray-800 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/40 px-3 py-2 rounded-md text-sm inline-flex items-center transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    Pilih File PDF
                                </label>
                                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                    {suratLulusFile ? suratLulusFile.name : 'Belum ada file dipilih'}
                                </span>
                            </div>
                            
                            <Button
                                onClick={handleSuratLulusUpload}
                                disabled={!suratLulusFile || isUploading}
                                variant="outline"
                                className="bg-green-100 hover:bg-green-200 text-green-800 border-green-300 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400 dark:border-green-800"
                            >
                                {isUploading ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Mengunggah...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                        <span>Upload Surat Lulus</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 