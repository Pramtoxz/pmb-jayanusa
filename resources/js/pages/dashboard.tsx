import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, CreditCard, GraduationCap, Activity, Bell, Settings, Search, Clock, CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentChart } from '@/components/charts/payment-chart';
import { DaftarUlangChart } from '@/components/charts/daftar-ulang-chart';

interface Props {
    stats: {
        total_pendaftar: number;
        pembayaran_pending: number;
        pembayaran_diterima: number;
        daftar_ulang_pending: number;
        daftar_ulang_diterima: number;
        siswa_terbaru: Array<{
            nik: string;
            nama: string;
            asal_sekolah: string;
            program_studi: string;
            created_at: string;
        }>;
        pembayaran_terbaru: Array<{
            kode_pembayaran: string;
            jumlah: number;
            status: string;
            nama_siswa: string;
            created_at: string;
        }>;
        daftar_ulang_terbaru: Array<{
            kode_pembayaran: string;
            bank: string;
            status: string;
            nama_siswa: string;
            created_at: string;
        }>;
        statistik_prodi: Array<{
            program_studi: string;
            total: number;
        }>;
        statistik_pembayaran: {
            labels: string[];
            data: number[];
        };
        statistik_daftar_ulang: {
            labels: string[];
            data: number[];
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats }: Props) {
    const progressValue = (stats.pembayaran_diterima / stats.total_pendaftar) * 100;
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <Badge variant="outline" className="bg-primary/10">
                            Admin Panel
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Cari..." className="pl-8" />
                        </div>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings className="h-5 w-5" />
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
                            <Users className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_pendaftar}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.statistik_prodi.length} Program Studi
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pembayaran Pending</CardTitle>
                            <CreditCard className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pembayaran_pending}</div>
                            <p className="text-xs text-muted-foreground">
                                Menunggu verifikasi
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pembayaran Diterima</CardTitle>
                            <GraduationCap className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pembayaran_diterima}</div>
                            <p className="text-xs text-muted-foreground">
                                Pembayaran berhasil
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Progress Pendaftaran</CardTitle>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{Math.round(progressValue)}%</div>
                            <Progress value={progressValue} className="mt-2" />
                        </CardContent>
                    </Card>
                </div>

                {/* Daftar Ulang Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daftar Ulang Pending</CardTitle>
                            <Clock className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.daftar_ulang_pending}</div>
                            <p className="text-xs text-muted-foreground">
                                Menunggu verifikasi daftar ulang
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daftar Ulang Diterima</CardTitle>
                            <CheckCircle className="h-4 w-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.daftar_ulang_diterima}</div>
                            <p className="text-xs text-muted-foreground">
                                Daftar ulang berhasil
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-pink-500/10 to-pink-500/5">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Daftar Ulang</CardTitle>
                            <FileText className="h-4 w-4 text-pink-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.daftar_ulang_pending + stats.daftar_ulang_diterima}</div>
                            <p className="text-xs text-muted-foreground">
                                Total pendaftar ulang
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Tabs defaultValue="pendaftaran" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
                                    <TabsTrigger value="pembayaran">Pembayaran</TabsTrigger>
                                    <TabsTrigger value="daftar-ulang">Daftar Ulang</TabsTrigger>
                                </TabsList>
                                <TabsContent value="pendaftaran" className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Asal Sekolah</TableHead>
                                                <TableHead>Program Studi</TableHead>
                                                <TableHead>Tanggal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stats.siswa_terbaru.map((siswa) => (
                                                <TableRow key={siswa.nik}>
                                                    <TableCell>{siswa.nama}</TableCell>
                                                    <TableCell>{siswa.asal_sekolah}</TableCell>
                                                    <TableCell>{siswa.program_studi}</TableCell>
                                                    <TableCell>{new Date(siswa.created_at).toLocaleDateString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value="pembayaran" className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Kode</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Jumlah</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stats.pembayaran_terbaru.map((pembayaran) => (
                                                <TableRow key={pembayaran.kode_pembayaran}>
                                                    <TableCell>{pembayaran.kode_pembayaran}</TableCell>
                                                    <TableCell>{pembayaran.nama_siswa}</TableCell>
                                                    <TableCell>Rp {pembayaran.jumlah.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={pembayaran.status === 'dibayar' ? 'default' : 'outline'}>
                                                            {pembayaran.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value="daftar-ulang" className="space-y-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Kode</TableHead>
                                                <TableHead>Nama</TableHead>
                                                <TableHead>Bank</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {stats.daftar_ulang_terbaru.map((daftarUlang) => (
                                                <TableRow key={daftarUlang.kode_pembayaran}>
                                                    <TableCell>{daftarUlang.kode_pembayaran}</TableCell>
                                                    <TableCell>{daftarUlang.nama_siswa}</TableCell>
                                                    <TableCell>{daftarUlang.bank}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={daftarUlang.status === 'dibayar' ? 'default' : 'outline'}>
                                                            {daftarUlang.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    <div className="col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Statistik Pembayaran</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <PaymentChart data={stats.statistik_pembayaran} />
                            </CardContent>
                        </Card>
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle>Statistik Daftar Ulang</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DaftarUlangChart data={stats.statistik_daftar_ulang} />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.pembayaran_terbaru.slice(0, 3).map((pembayaran) => (
                                <div key={pembayaran.kode_pembayaran} className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {pembayaran.status === 'dibayar' ? 'Pembayaran Diterima' : 'Pembayaran Baru'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {pembayaran.nama_siswa} - Rp {pembayaran.jumlah.toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(pembayaran.created_at).toLocaleTimeString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
