import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Pembayaran {
    kode: string;
    jumlah: number;
    status: string;
    bukti: string | null;
    keterangan: string;
    tanggal: string;
    skl: string | null;
    rapor: string | null;
    suratlulus: string | null;
}

interface CalonMahasiswaDetail {
    nik: string;
    nama: string;
    email: string;
    alamat: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    kota: string;
    kecamatan: string;
    kelurahan: string;
    provinsi: string;
    agama: string;
    no_hp: string;
    asal_sekolah: string;
    tahun_lulus: string;
    foto: string;
    program_studi: string;
    beasiswa: string;
    kelas: string | null;
    pembayaran: Pembayaran[];
}

interface Props {
    calonMahasiswa: CalonMahasiswaDetail;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calon Mahasiswa',
        href: '/calon-mahasiswa',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

export default function Show({ calonMahasiswa }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Calon Mahasiswa - ${calonMahasiswa.nama}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Detail Calon Mahasiswa</h2>
                            <Button 
                                variant="outline"
                                onClick={() => router.get('/calon-mahasiswa')}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Informasi Pribadi */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Informasi Pribadi</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Foto</span>
                                        {calonMahasiswa.foto && (
                                            <img 
                                                src={calonMahasiswa.foto} 
                                                alt={calonMahasiswa.nama}
                                                className="w-32 h-32 object-cover rounded-lg mt-2"
                                            />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500">NIK</span>
                                            <p className="font-medium">{calonMahasiswa.nik}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Nama Lengkap</span>
                                            <p className="font-medium">{calonMahasiswa.nama}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Email</span>
                                            <p className="font-medium">{calonMahasiswa.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">No. HP</span>
                                            <p className="font-medium">{calonMahasiswa.no_hp}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Tempat Lahir</span>
                                            <p className="font-medium">{calonMahasiswa.tempat_lahir}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Tanggal Lahir</span>
                                            <p className="font-medium">{calonMahasiswa.tanggal_lahir}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Jenis Kelamin</span>
                                            <p className="font-medium">
                                                {calonMahasiswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Agama</span>
                                            <p className="font-medium">{calonMahasiswa.agama}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-sm text-gray-500">Alamat Lengkap</span>
                                        <p className="font-medium">{calonMahasiswa.alamat}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500">Provinsi</span>
                                            <p className="font-medium">{calonMahasiswa.provinsi}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Kota</span>
                                            <p className="font-medium">{calonMahasiswa.kota}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Kecamatan</span>
                                            <p className="font-medium">{calonMahasiswa.kecamatan}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Kelurahan</span>
                                            <p className="font-medium">{calonMahasiswa.kelurahan}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Informasi Akademik & Pembayaran */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Informasi Akademik</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500">Program Studi</span>
                                            <p className="font-medium">{calonMahasiswa.program_studi}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Beasiswa</span>
                                            <p className="font-medium capitalize">{calonMahasiswa.beasiswa}</p>
                                        </div>
                                        {calonMahasiswa.beasiswa === 'tidak' && (
                                            <div>
                                                <span className="text-sm text-gray-500">Kelas</span>
                                                <p className="font-medium capitalize">{calonMahasiswa.kelas}</p>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-sm text-gray-500">Asal Sekolah</span>
                                            <p className="font-medium">{calonMahasiswa.asal_sekolah}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Tahun Lulus</span>
                                            <p className="font-medium">{calonMahasiswa.tahun_lulus}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Informasi Pembayaran</h3>
                                </div>

                                <div className="space-y-4">
                                    {calonMahasiswa.pembayaran.map((bayar) => (
                                        <div key={bayar.kode} className="p-4 border rounded-lg">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <span className="text-sm text-gray-500">Kode Pembayaran</span>
                                                    <p className="font-medium">{bayar.kode}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Tanggal</span>
                                                    <p className="font-medium">{bayar.tanggal}</p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Jumlah</span>
                                                    <p className="font-medium">
                                                        Rp {bayar.jumlah.toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-sm text-gray-500">Status</span>
                                                    <p className={`font-medium capitalize ${
                                                        bayar.status === 'dibayar' ? 'text-green-600' : 
                                                        bayar.status === 'menunggu' ? 'text-yellow-600' : 
                                                        'text-red-600'
                                                    }`}>
                                                        {bayar.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-sm text-gray-500">Keterangan</span>
                                                <p className="font-medium">{bayar.keterangan}</p>
                                            </div>
                                            {bayar.bukti && (
                                                <div className="mt-2">
                                                    <span className="text-sm text-gray-500">Bukti Pembayaran</span>
                                                    <img 
                                                        src={bayar.bukti} 
                                                        alt="Bukti Pembayaran"
                                                        className="mt-2 max-w-xs rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Dokumen SKL */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-base font-semibold text-blue-600 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Surat Keterangan Lulus (SKL)
                        </h3>
                        
                        {calonMahasiswa.pembayaran[0]?.skl ? (
                            <div className="mt-2">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Dokumen SKL</span>
                                    <a 
                                        href={calonMahasiswa.pembayaran[0].skl} 
                                        target="_blank" 
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        Buka Dokumen
                                    </a>
                                </div>
                                <iframe 
                                    src={calonMahasiswa.pembayaran[0].skl} 
                                    className="w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700" 
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                <p className="mt-4 text-muted-foreground">Dokumen SKL belum diupload</p>
                            </div>
                        )}
                    </div>

                    {/* Dokumen Rapor */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-base font-semibold text-green-600 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Rapor Terakhir
                        </h3>
                        
                        {calonMahasiswa.pembayaran[0]?.rapor ? (
                            <div className="mt-2">
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Dokumen Rapor</span>
                                    <a 
                                        href={calonMahasiswa.pembayaran[0].rapor} 
                                        target="_blank" 
                                        className="text-xs text-green-600 dark:text-green-400 hover:underline flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        Buka Dokumen
                                    </a>
                                </div>
                                <iframe 
                                    src={calonMahasiswa.pembayaran[0].rapor} 
                                    className="w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700" 
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                <p className="mt-4 text-muted-foreground">Dokumen Rapor belum diupload</p>
                            </div>
                        )}
                    </div>

                    {/* Dokumen Surat Lulus */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h3 className="text-base font-semibold text-purple-600 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Surat Lulus
                        </h3>
                        
                        {calonMahasiswa.pembayaran[0]?.suratlulus ? (
                            <div className="mt-2">
                                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Surat Lulus</span>
                                    <a 
                                        href={calonMahasiswa.pembayaran[0].suratlulus} 
                                        target="_blank" 
                                        className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        Buka Dokumen
                                    </a>
                                </div>
                                <iframe 
                                    src={calonMahasiswa.pembayaran[0].suratlulus} 
                                    className="w-full h-64 rounded-lg border border-gray-200 dark:border-gray-700" 
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                <p className="mt-4 text-muted-foreground">Surat Lulus belum tersedia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 