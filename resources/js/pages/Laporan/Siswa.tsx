import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SiswaData {
    nik: string;
    nama: string;
    program_studi: string;
    kelas: string;
    beasiswa: string;
    status_pembayaran: string;
    tanggal_daftar: string;
}

interface PageProps {
    siswa?: SiswaData[];
    flash?: {
        data?: {
            siswa: SiswaData[];
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Siswa',
        href: '/laporan/siswa',
    },
];

const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case 'dibayar':
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case 'menunggu':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case 'belum ada':
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        default:
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
};

export default function Siswa() {
    const { flash, siswa: initialSiswa } = usePage<PageProps>().props;
    const [tanggalAwal, setTanggalAwal] = useState('');
    const [tanggalAkhir, setTanggalAkhir] = useState('');
    const [kelas, setKelas] = useState('all');
    const [programStudi, setProgramStudi] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [dataSiswa, setDataSiswa] = useState<SiswaData[]>([]);

    useEffect(() => {
        // Set data awal dari props siswa
        if (initialSiswa && Array.isArray(initialSiswa)) {
            setDataSiswa(initialSiswa);
        }
        // Update data ketika ada flash data
        if (flash?.data?.siswa) {
            setDataSiswa(flash.data.siswa);
        }
    }, [flash, initialSiswa]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!tanggalAwal || !tanggalAkhir) {
            alert('Mohon isi tanggal awal dan akhir');
            return;
        }
        
        setIsLoading(true);

        router.post('/laporan/siswa', {
            tanggal_awal: tanggalAwal,
            tanggal_akhir: tanggalAkhir,
            kelas: kelas,
            program_studi: programStudi
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setIsLoading(false),
            onError: () => setIsLoading(false)
        });
    };

    const handleDownloadPDF = () => {
        if (!tanggalAwal || !tanggalAkhir) {
            alert('Mohon isi tanggal awal dan akhir');
            return;
        }

        // Buat form element untuk submit
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/laporan/siswa/download-pdf';

        // Tambahkan CSRF token
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
        }

        // Tambahkan input fields
        for (const [key, value] of Object.entries({
            tanggal_awal: tanggalAwal,
            tanggal_akhir: tanggalAkhir,
            kelas: kelas,
            program_studi: programStudi
        })) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Siswa" />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Laporan Siswa</h2>
                        <p className="text-muted-foreground">
                            Lihat laporan detail siswa berdasarkan periode
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Filter Laporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_awal">Tanggal Awal</Label>
                                    <Input
                                        type="date"
                                        id="tanggal_awal"
                                        value={tanggalAwal}
                                        onChange={(e) => setTanggalAwal(e.target.value)}
                                        max={tanggalAkhir || undefined}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_akhir">Tanggal Akhir</Label>
                                    <Input
                                        type="date"
                                        id="tanggal_akhir"
                                        value={tanggalAkhir}
                                        onChange={(e) => setTanggalAkhir(e.target.value)}
                                        min={tanggalAwal || undefined}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="kelas">Kelas</Label>
                                    <Select value={kelas} onValueChange={setKelas}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Kelas</SelectItem>
                                            <SelectItem value="reguler">Reguler</SelectItem>
                                            <SelectItem value="kerja">Kerja</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="program_studi">Program Studi</Label>
                                    <Select value={programStudi} onValueChange={setProgramStudi}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Program Studi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Program Studi</SelectItem>
                                            <SelectItem value="MI">D3-Manajemen Informatika</SelectItem>
                                            <SelectItem value="SI">S1-Sistem Informasi</SelectItem>
                                            <SelectItem value="SK">S1-Sistem Komputer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Memuat...' : 'Tampilkan Laporan'}
                                </Button>
                                <Button 
                                    type="button"
                                    variant="outline"
                                    onClick={handleDownloadPDF}
                                    disabled={isLoading}
                                >
                                    Download PDF
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {dataSiswa.length > 0 && (
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center space-x-1">
                                            <span>NIK</span>
                                            <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead className="cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center space-x-1">
                                            <span>Nama</span>
                                            <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead>Program Studi</TableHead>
                                    <TableHead>Kelas</TableHead>
                                    <TableHead>Beasiswa</TableHead>
                                    <TableHead>Status Pembayaran</TableHead>
                                    <TableHead className="cursor-pointer hover:text-primary transition-colors">
                                        <div className="flex items-center space-x-1">
                                            <span>Tanggal Daftar</span>
                                            <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataSiswa.map((item) => (
                                    <TableRow key={item.nik}>
                                        <TableCell>{item.nik}</TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>{item.program_studi}</TableCell>
                                        <TableCell>{item.kelas}</TableCell>
                                        <TableCell>{item.beasiswa}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(item.status_pembayaran)}`}>
                                                {item.status_pembayaran}
                                            </span>
                                        </TableCell>
                                        <TableCell>{item.tanggal_daftar}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 