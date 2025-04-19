import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PembayaranDaftarUlang {
    id: number;
    kode_pembayaran: string;
    status: string;
    created_at: string;
    siswa?: {
        nama: string;
        program_studi: string;
    };
}

interface FlashData {
    data: PembayaranDaftarUlang[];
    total_siswa: number;
}

interface PageProps {
    flash: {
        data?: FlashData;
    };
    data?: {
        data: PembayaranDaftarUlang[];
        total_siswa: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Daftar Ulang',
        href: '/laporan/daftar-ulang',
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

export default function LaporanDaftarUlang() {
    const { flash } = usePage<PageProps>().props;
    const [tanggalAwal, setTanggalAwal] = useState('');
    const [tanggalAkhir, setTanggalAkhir] = useState('');
    const [status, setStatus] = useState('all');
    const [programStudi, setProgramStudi] = useState('all');
    const [laporanData, setLaporanData] = useState<PembayaranDaftarUlang[]>([]);
    const [totalSiswa, setTotalSiswa] = useState(0);

    useEffect(() => {
        if (flash?.data) {
            setLaporanData(flash.data.data);
            setTotalSiswa(flash.data.total_siswa);
        }
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!tanggalAwal || !tanggalAkhir) {
            alert('Mohon isi tanggal awal dan akhir');
            return;
        }

        router.post('/laporan/daftar-ulang', {
            tanggal_awal: tanggalAwal,
            tanggal_akhir: tanggalAkhir,
            status: status,
            program_studi: programStudi
        }, {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error(errors);
                alert('Terjadi kesalahan saat memuat data');
            }
        });
    };

    const handleDownloadPDF = () => {
        if (!tanggalAwal || !tanggalAkhir) {
            alert('Mohon isi tanggal awal dan akhir');
            return;
        }

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/laporan/daftar-ulang/download-pdf';

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken;
            form.appendChild(csrfInput);
        }

        for (const [key, value] of Object.entries({
            tanggal_awal: tanggalAwal,
            tanggal_akhir: tanggalAkhir,
            status: status,
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
            <Head title="Laporan Daftar Ulang" />
            <div className="flex h-full flex-1 flex-col space-y-8 p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Laporan Daftar Ulang</h2>
                        <p className="text-muted-foreground">
                            Lihat laporan daftar ulang berdasarkan periode
                        </p>
                    </div>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Filter Periode</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <Label htmlFor="tanggal_awal">Tanggal Awal</Label>
                                    <Input
                                        type="date"
                                        id="tanggal_awal"
                                        value={tanggalAwal}
                                        onChange={(e) => setTanggalAwal(e.target.value)}
                                        max={tanggalAkhir || undefined}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="tanggal_akhir">Tanggal Akhir</Label>
                                    <Input
                                        type="date"
                                        id="tanggal_akhir"
                                        value={tanggalAkhir}
                                        onChange={(e) => setTanggalAkhir(e.target.value)}
                                        min={tanggalAwal || undefined}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={status} onValueChange={setStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Status</SelectItem>
                                            <SelectItem value="dibayar">Dibayar</SelectItem>
                                            <SelectItem value="menunggu">Menunggu</SelectItem>
                                            <SelectItem value="ditolak">Ditolak</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
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
                                <Button type="submit">Tampilkan Laporan</Button>
                                <Button 
                                    type="button"
                                    variant="outline"
                                    onClick={handleDownloadPDF}
                                >
                                    Download PDF
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {laporanData.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Total Siswa Daftar Ulang</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalSiswa} orang</div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="cursor-pointer hover:text-primary transition-colors">
                                            <div className="flex items-center space-x-1">
                                                <span>Nama Siswa</span>
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                        <TableHead>Kode Pembayaran</TableHead>
                                        <TableHead>Program Studi</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="cursor-pointer hover:text-primary transition-colors">
                                            <div className="flex items-center space-x-1">
                                                <span>Tanggal</span>
                                                <ArrowUpDown className="h-4 w-4" />
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {laporanData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.siswa?.nama}</TableCell>
                                            <TableCell>{item.kode_pembayaran}</TableCell>
                                            <TableCell>
                                                {item.siswa?.program_studi === 'MI' ? 'D3-Manajemen Informatika' :
                                                 item.siswa?.program_studi === 'SI' ? 'S1-Sistem Informasi' :
                                                 item.siswa?.program_studi === 'SK' ? 'S1-Sistem Komputer' :
                                                 item.siswa?.program_studi}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
} 