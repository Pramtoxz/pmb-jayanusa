import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { PROVINCES, CITIES } from "@/data/indonesia";

interface Siswa {
    nik: string;
    nama: string;
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
    program_studi: string;
    foto: string | File | null;
    beasiswa: string;
    kelas: string | null;
}

interface Props {
    calonMahasiswa: Siswa;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calon Mahasiswa',
        href: '/calon-mahasiswa',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({ calonMahasiswa }: Props) {
    const [data, setData] = useState<Siswa>(calonMahasiswa);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableCities, setAvailableCities] = useState<string[]>(CITIES[calonMahasiswa.provinsi] || []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProvinsiChange = (value: string) => {
        setData(prev => ({
            ...prev,
            provinsi: value,
            kota: ''
        }));
        setAvailableCities(CITIES[value] || []);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });
        formData.append('_method', 'PUT');

        router.post(`/calon-mahasiswa/${calonMahasiswa.nik}`, formData, {
            onSuccess: () => {
                toast.success('Data berhasil diperbarui');
                router.get('/calon-mahasiswa');
            },
            onError: (errors) => {
                setErrors(errors);
                toast.error('Gagal memperbarui data');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Calon Mahasiswa - ${calonMahasiswa.nama}`} />
            <Toaster />
            
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Edit Data Calon Mahasiswa</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Data Pribadi</h3>
                                    <p className="text-sm text-muted-foreground">Silakan lengkapi data pribadi dengan benar</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nik">NIK</Label>
                                    <Input
                                        id="nik"
                                        name="nik"
                                        type="text"
                                        maxLength={16}
                                        pattern="\d*"
                                        value={data.nik}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setData(prev => ({ ...prev, nik: value }));
                                        }}
                                        placeholder="Masukkan 16 digit NIK"
                                        className={errors.nik ? 'border-red-500' : ''}
                                    />
                                    <div className="flex justify-between text-xs">
                                        <p className="text-muted-foreground">Format: 16 digit angka</p>
                                        <p className="text-muted-foreground">{data.nik.length}/16</p>
                                    </div>
                                    {errors.nik && <p className="text-sm text-red-500 mt-1">{errors.nik}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="nama">Nama Lengkap</Label>
                                    <Input
                                        id="nama"
                                        name="nama"
                                        value={data.nama}
                                        onChange={handleChange}
                                        className={errors.nama ? 'border-red-500' : ''}
                                    />
                                    {errors.nama && <p className="text-sm text-red-500 mt-1">{errors.nama}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <Select
                                        value={data.jenis_kelamin}
                                        onValueChange={(value) => setData(prev => ({ ...prev, jenis_kelamin: value }))}
                                    >
                                        <SelectTrigger className={errors.jenis_kelamin ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">Laki-laki</SelectItem>
                                            <SelectItem value="P">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis_kelamin && <p className="text-sm text-red-500 mt-1">{errors.jenis_kelamin}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                    <Input
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                        onChange={handleChange}
                                        className={errors.tempat_lahir ? 'border-red-500' : ''}
                                    />
                                    {errors.tempat_lahir && <p className="text-sm text-red-500 mt-1">{errors.tempat_lahir}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                    <Input
                                        type="date"
                                        id="tanggal_lahir"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={handleChange}
                                        className={errors.tanggal_lahir ? 'border-red-500' : ''}
                                    />
                                    {errors.tanggal_lahir && <p className="text-sm text-red-500 mt-1">{errors.tanggal_lahir}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="alamat">Alamat Lengkap</Label>
                                    <Input
                                        id="alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat lengkap"
                                        className={errors.alamat ? 'border-red-500' : ''}
                                    />
                                    {errors.alamat && <p className="text-sm text-red-500 mt-1">{errors.alamat}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="provinsi">Provinsi</Label>
                                        <Select
                                            value={data.provinsi}
                                            onValueChange={handleProvinsiChange}
                                        >
                                            <SelectTrigger className={errors.provinsi ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih Provinsi" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {PROVINCES.map((province) => (
                                                    <SelectItem key={province} value={province}>
                                                        {province}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.provinsi && <p className="text-sm text-red-500 mt-1">{errors.provinsi}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kota">Kota/Kabupaten</Label>
                                        <Select
                                            value={data.kota}
                                            onValueChange={(value) => setData(prev => ({ ...prev, kota: value }))}
                                            disabled={!data.provinsi}
                                        >
                                            <SelectTrigger className={errors.kota ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih Kota/Kabupaten" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableCities.map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.kota && <p className="text-sm text-red-500 mt-1">{errors.kota}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kecamatan">Kecamatan</Label>
                                        <Input
                                            id="kecamatan"
                                            name="kecamatan"
                                            value={data.kecamatan}
                                            onChange={handleChange}
                                            className={errors.kecamatan ? 'border-red-500' : ''}
                                        />
                                        {errors.kecamatan && <p className="text-sm text-red-500 mt-1">{errors.kecamatan}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="kelurahan">Kelurahan</Label>
                                        <Input
                                            id="kelurahan"
                                            name="kelurahan"
                                            value={data.kelurahan}
                                            onChange={handleChange}
                                            className={errors.kelurahan ? 'border-red-500' : ''}
                                        />
                                        {errors.kelurahan && <p className="text-sm text-red-500 mt-1">{errors.kelurahan}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="agama">Agama</Label>
                                    <Select
                                        value={data.agama}
                                        onValueChange={(value) => setData(prev => ({ ...prev, agama: value }))}
                                    >
                                        <SelectTrigger className={errors.agama ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih Agama" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Islam">Islam</SelectItem>
                                            <SelectItem value="Kristen">Kristen</SelectItem>
                                            <SelectItem value="Katolik">Katolik</SelectItem>
                                            <SelectItem value="Hindu">Hindu</SelectItem>
                                            <SelectItem value="Buddha">Buddha</SelectItem>
                                            <SelectItem value="Konghucu">Konghucu</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.agama && <p className="text-sm text-red-500 mt-1">{errors.agama}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="no_hp">No HP</Label>
                                    <Input
                                        type="tel"
                                        id="no_hp"
                                        name="no_hp"
                                        pattern="\d*"
                                        value={data.no_hp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setData(prev => ({ ...prev, no_hp: value }));
                                        }}
                                        placeholder="Contoh: 08123456789"
                                        className={errors.no_hp ? 'border-red-500' : ''}
                                    />
                                    {errors.no_hp && <p className="text-sm text-red-500 mt-1">{errors.no_hp}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="asal_sekolah">Asal Sekolah</Label>
                                    <Input
                                        id="asal_sekolah"
                                        name="asal_sekolah"
                                        value={data.asal_sekolah}
                                        onChange={handleChange}
                                        className={errors.asal_sekolah ? 'border-red-500' : ''}
                                    />
                                    {errors.asal_sekolah && <p className="text-sm text-red-500 mt-1">{errors.asal_sekolah}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tahun_lulus">Tahun Lulus</Label>
                                    <Input
                                        type="number"
                                        id="tahun_lulus"
                                        name="tahun_lulus"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={data.tahun_lulus}
                                        onChange={handleChange}
                                        placeholder="Contoh: 2023"
                                        className={errors.tahun_lulus ? 'border-red-500' : ''}
                                    />
                                    {errors.tahun_lulus && <p className="text-sm text-red-500 mt-1">{errors.tahun_lulus}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="program_studi">Program Studi</Label>
                                    <Select
                                        value={data.program_studi}
                                        onValueChange={(value) => setData(prev => ({ ...prev, program_studi: value }))}
                                    >
                                        <SelectTrigger className={errors.program_studi ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Pilih Program Studi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MI">D3-Manajemen Informatika</SelectItem>
                                            <SelectItem value="SI">S1-Sistem Informasi</SelectItem>
                                            <SelectItem value="SK">S1-Sistem Komputer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.program_studi && <p className="text-sm text-red-500 mt-1">{errors.program_studi}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="beasiswa">Status Beasiswa</Label>
                                    <Select
                                        value={data.beasiswa}
                                        onValueChange={(value) => {
                                            setData(prev => ({
                                                ...prev,
                                                beasiswa: value,
                                                kelas: value === 'iya' ? null : prev.kelas
                                            }));
                                        }}
                                    >
                                        <SelectTrigger className={errors.beasiswa ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Penerima Beasiswa KIP-Kuliah (Isi Tidak Jika Tidak Penerima)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="iya">
                                                <div className="flex items-center justify-between">
                                                    <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        Ya (KIP-Kuliah)
                                                    </span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="tidak">
                                                <div className="flex items-center justify-between">
                                                    <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                        Tidak
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.beasiswa && <p className="text-sm text-red-500 mt-1">{errors.beasiswa}</p>}
                                </div>

                                {data.beasiswa === 'tidak' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="kelas">Kelas</Label>
                                        <Select
                                            value={data.kelas || ''}
                                            onValueChange={(value) => setData(prev => ({ ...prev, kelas: value }))}
                                        >
                                            <SelectTrigger className={errors.kelas ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="reguler">Non Kerja</SelectItem>
                                                <SelectItem value="kerja">Kerja</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.kelas && <p className="text-sm text-red-500 mt-1">{errors.kelas}</p>}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="foto">Foto</Label>
                                    {typeof data.foto === 'string' && data.foto && (
                                        <div className="mb-2">
                                            <img
                                                src={data.foto}
                                                alt="Foto saat ini"
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                            <p className="text-sm text-muted-foreground mt-1">Foto saat ini</p>
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        id="foto"
                                        name="foto"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                setData(prev => ({
                                                    ...prev,
                                                    foto: files[0]
                                                }));
                                            }
                                        }}
                                        accept="image/*"
                                        className={errors.foto ? 'border-red-500' : ''}
                                    />
                                    {errors.foto && <p className="text-sm text-red-500 mt-1">{errors.foto}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get('/calon-mahasiswa')}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 