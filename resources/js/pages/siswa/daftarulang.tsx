import { Head } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from '@/components/Siswa/Sidebar';
import PembayaranDaftarUlang from './pembayarandaftarulang';

interface SiswaData {
  nik: string;
  nama: string;
  program_studi: string;
  asal_sekolah: string;
  tahun_lulus: string;
}

interface PageProps {
  siswa: SiswaData;
  pembayaranDaftarUlang: {
    id: number;
    kode_pembayaran: string;
    nik_siswa: string;
    bank: string;
    bukti_pembayaran: string | null;
    keterangan: string | null;
    status: 'menunggu' | 'dibayar' | 'ditolak';
    catatan_admin: string | null;
  } | null;
}

export default function DaftarUlang({ siswa, pembayaranDaftarUlang }: PageProps) {
  return (
    <>
      <Head title="Daftar Ulang" />
      
      <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar activePage="daftar-ulang" />

          {/* Main Content */}
          <div className="flex-1">
            <Card className="max-w-[1200px]">
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Header Section */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Daftar Ulang
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Upload bukti pembayaran daftar ulang mahasiswa baru
                    </p>
                  </div>

                  {siswa && (
                    <div className="space-y-8">
                      {/* Info Mahasiswa */}
                      <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 rounded-xl border border-primary/10">
                        <h3 className="font-semibold text-primary mb-4">Data Calon Mahasiswa</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Nama</p>
                            <p className="font-medium text-lg">{siswa.nama}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">NIK</p>
                            <p className="font-medium font-mono">{siswa.nik}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Program Studi</p>
                            <p className="font-medium">
                              {siswa.program_studi === 'MI' ? 'D3-Manajemen Informatika' :
                               siswa.program_studi === 'SI' ? 'S1-Sistem Informasi' :
                               siswa.program_studi === 'SK' ? 'S1-Sistem Komputer' : ''}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Asal Sekolah</p>
                            <p className="font-medium">{siswa.asal_sekolah} ({siswa.tahun_lulus})</p>
                          </div>
                        </div>
                      </div>

                      {/* Form Upload Daftar Ulang */}
                      <PembayaranDaftarUlang pembayaranDaftarUlang={pembayaranDaftarUlang} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
