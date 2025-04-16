import { Card, CardContent } from "@/components/ui/card";
import FormPendaftaran from './FormPendaftaran';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Pencil, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Sidebar from '@/components/Siswa/Sidebar';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SiswaData {
  nik: string;
  nama: string;
  alamat: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: 'L' | 'P';
  kota: string;
  kecamatan: string;
  kelurahan: string;
  provinsi: string;
  agama: string;
  no_hp: string;
  asal_sekolah: string;
  tahun_lulus: string;
  program_studi: string;
  foto: string;
  beasiswa: string;
  kelas: string;
  fotoPreview: string | null;
}

interface FormDataType extends Omit<SiswaData, 'foto'> {
  foto: File | null;
}

interface Props {
  siswa: SiswaData | null;
  initialData?: FormDataType;
}

export default function SiswaProfile({ siswa }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [alert] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <Head title="Profil Siswa">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
      </Head>
      
      <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <Sidebar activePage="profile" />

          {/* Main Content */}
          <div className="flex-1">
            {/* Alert Messages */}
            {alert.type && (
              <div className="mb-6">
                <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
                  {alert.type === 'error' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {alert.type === 'error' ? 'Error' : 'Sukses'}
                  </AlertTitle>
                  <AlertDescription>
                    {alert.message}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Tombol Kembali ke Home */}
            <div className="mb-6">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-muted"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-6">
                {!siswa || isEditing ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="hover:bg-muted"
                        disabled={!siswa}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                      </Button>
                      <div>
                        <h2 className="text-2xl font-bold text-primary">
                          {siswa ? 'Edit Data Mahasiswa' : 'Pendaftaran Mahasiswa Baru'}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {siswa ? 'Perbarui informasi data diri mahasiswa' : 'Silakan lengkapi form pendaftaran berikut'}
                        </p>
                      </div>
                    </div>
                    <FormPendaftaran 
                      initialData={siswa ? {
                        nik: siswa.nik,
                        nama: siswa.nama,
                        alamat: siswa.alamat,
                        tempat_lahir: siswa.tempat_lahir,
                        tanggal_lahir: siswa.tanggal_lahir,
                        jenis_kelamin: siswa.jenis_kelamin,
                        kota: siswa.kota,
                        kecamatan: siswa.kecamatan,
                        kelurahan: siswa.kelurahan,
                        provinsi: siswa.provinsi,
                        agama: siswa.agama,
                        no_hp: siswa.no_hp,
                        asal_sekolah: siswa.asal_sekolah,
                        tahun_lulus: siswa.tahun_lulus,
                        program_studi: siswa.program_studi,
                        foto: null,
                        fotoPreview: siswa.foto,
                        beasiswa: siswa.beasiswa,
                        kelas: siswa.kelas
                      } : undefined}
                    />
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                          Data Calon Mahasiswa
                        </h2>
                        <p className="text-sm text-muted-foreground">Informasi data diri mahasiswa</p>
                      </div>
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit Data
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Foto Section */}
                      <div className="order-1 lg:order-2">
                        <div className="bg-white rounded-lg shadow-sm p-4">
                          <div className="aspect-[3/4] w-48 mx-auto overflow-hidden rounded-lg border-2 border-primary">
                            <img 
                              src={siswa.foto} 
                              alt="Foto Profil"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <h3 className="font-semibold text-lg">{siswa.nama}</h3>
                            <p className="text-sm text-muted-foreground">
                              {siswa.program_studi === 'MI' ? 'D3-Manajemen Informatika' :
                               siswa.program_studi === 'SI' ? 'S1-Sistem Informasi' :
                               siswa.program_studi === 'SK' ? 'S1-Sistem Komputer' : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Data Section */}
                      <div className="order-2 lg:order-1 lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
                          {/* Data Pribadi */}
                          <div>
                            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                              Data Pribadi
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">NIK</p>
                                <p className="font-semibold">{siswa.nik}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Jenis Kelamin</p>
                                <p className="font-semibold">{siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Tempat Lahir</p>
                                <p className="font-semibold">{siswa.tempat_lahir}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Tanggal Lahir</p>
                                <p className="font-semibold">{formatDate(siswa.tanggal_lahir)}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Agama</p>
                                <p className="font-semibold">{siswa.agama}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Nomor HP</p>
                                <p className="font-semibold">{siswa.no_hp}</p>
                              </div>
                            </div>
                          </div>

                          {/* Alamat */}
                          <div>
                            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                              Alamat
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Alamat Lengkap</p>
                                <p className="font-semibold">{siswa.alamat}</p>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Provinsi</p>
                                  <p className="font-semibold">{siswa.provinsi}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Kota/Kabupaten</p>
                                  <p className="font-semibold">{siswa.kota}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Kecamatan</p>
                                  <p className="font-semibold">{siswa.kecamatan}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Kelurahan</p>
                                  <p className="font-semibold">{siswa.kelurahan}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Data Pendidikan */}
                          <div>
                            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                              Data Pendidikan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Asal Sekolah</p>
                                <p className="font-semibold">{siswa.asal_sekolah}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Tahun Lulus</p>
                                <p className="font-semibold">{siswa.tahun_lulus}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">Status Beasiswa</p>
                                <p className="font-semibold">
                                  {siswa.beasiswa === 'iya' ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      KIP-Kuliah
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                      Tidak
                                    </span>
                                  )}
                                </p>
                              </div>
                              {siswa.beasiswa === 'tidak' && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">Kelas</p>
                                  <p className="font-semibold">
                                    {siswa.kelas === 'reguler' ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        Non Kerja
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                        Kerja
                                      </span>
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
} 