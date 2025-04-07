import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROVINCES, CITIES } from "@/data/indonesia";
import { Label } from "@/components/ui/label";

interface FormData {
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
  foto: File | null;
  fotoPreview: string | null;
  beasiswa: string;
  kelas: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Calon Mahasiswa',
        href: '/calon-mahasiswa',
    },
    {
        title: 'Tambah Baru',
        href: '/calon-mahasiswa/create',
    },
];

export default function Create() {
    const [formData, setFormData] = useState<FormData>({
        nik: '',
        nama: '',
        alamat: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 'L',
        kota: '',
        kecamatan: '',
        kelurahan: '',
        provinsi: '',
        agama: '',
        no_hp: '',
        asal_sekolah: '',
        tahun_lulus: '',
        program_studi: '',
        foto: null,
        fotoPreview: null,
        beasiswa: '',
        kelas: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                foto: file,
                fotoPreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleProvinsiChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            provinsi: value,
            kota: ''
        }));
        setAvailableCities(CITIES[value] || []);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const formDataToSend = new FormData();
        
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'foto' && key !== 'fotoPreview' && value !== null) {
                formDataToSend.append(key, value);
            }
        });

        if (formData.foto instanceof File) {
            formDataToSend.append('foto', formData.foto);
        }

        router.post('/calon-mahasiswa', formDataToSend, {
            onSuccess: () => {
                router.visit('/calon-mahasiswa');
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Calon Mahasiswa" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="rounded-xl bg-white shadow-sm">
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Tambah Calon Mahasiswa</h2>
                        
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
                                        value={formData.nik}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setFormData(prev => ({ ...prev, nik: value }));
                                        }}
                                        placeholder="Masukkan 16 digit NIK"
                                    />
                                    <div className="flex justify-between text-xs">
                                        <p className="text-muted-foreground">Format: 16 digit angka</p>
                                        <p className="text-muted-foreground">{formData.nik.length}/16</p>
                                    </div>
                                    {errors.nik && <p className="text-sm text-destructive">{errors.nik}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="nama">Nama Lengkap</label>
                                    <Input
                                        id="nama"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="jenis_kelamin" className="font-medium">Jenis Kelamin <span className="text-destructive">*</span></label>
                                    <Select 
                                        value={formData.jenis_kelamin}
                                        onValueChange={(value) => 
                                            setFormData(prev => ({ ...prev, jenis_kelamin: value as 'L' | 'P' }))
                                        }
                                    >
                                        <SelectTrigger className="transition-colors duration-200 focus:border-primary">
                                            <SelectValue placeholder="Pilih Jenis Kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="L">Laki-laki</SelectItem>
                                            <SelectItem value="P">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="tempat_lahir">Tempat Lahir</label>
                                    <Input
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        value={formData.tempat_lahir}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
                                    <Input
                                        type="date"
                                        id="tanggal_lahir"
                                        name="tanggal_lahir"
                                        value={formData.tanggal_lahir}
                                        onChange={handleChange}
                                    />
                                    {errors.tanggal_lahir && <p className="text-sm text-destructive">{errors.tanggal_lahir}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="alamat" className="font-medium">Alamat Lengkap <span className="text-destructive">*</span></label>
                                    <Input
                                        type="text"
                                        id="alamat"
                                        name="alamat"
                                        value={formData.alamat}
                                        onChange={handleChange}
                                        placeholder="Masukkan alamat lengkap"
                                        className="transition-colors duration-200 focus:border-primary"
                                    />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="provinsi" className="font-medium">Provinsi</label>
                                        <Select 
                                            value={formData.provinsi}
                                            onValueChange={handleProvinsiChange}
                                        >
                                            <SelectTrigger className="transition-colors duration-200 focus:border-primary">
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
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="kota" className="font-medium">Kota/Kabupaten</label>
                                        <Select
                                            value={formData.kota}
                                            onValueChange={(value) => 
                                                setFormData(prev => ({ ...prev, kota: value }))
                                            }
                                            disabled={!formData.provinsi}
                                        >
                                            <SelectTrigger className="transition-colors duration-200 focus:border-primary">
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
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="kecamatan" className="font-medium">Kecamatan</label>
                                        <Input
                                            type="text"
                                            id="kecamatan"
                                            name="kecamatan"
                                            value={formData.kecamatan}
                                            onChange={handleChange}
                                            className="transition-colors duration-200 focus:border-primary"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="kelurahan" className="font-medium">Kelurahan</label>
                                        <Input
                                            type="text"
                                            id="kelurahan"
                                            name="kelurahan"
                                            value={formData.kelurahan}
                                            onChange={handleChange}
                                            className="transition-colors duration-200 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="agama">Agama</label>
                                    <Select 
                                        value={formData.agama}
                                        onValueChange={(value) => 
                                            setFormData(prev => ({ ...prev, agama: value }))
                                        }
                                    >
                                        <SelectTrigger className="transition-colors duration-200 focus:border-primary">
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
                                    {errors.agama && <p className="text-sm text-destructive">{errors.agama}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="no_hp">No HP</label>
                                    <Input
                                        type="tel"
                                        id="no_hp"
                                        name="no_hp"
                                        pattern="\d*"
                                        value={formData.no_hp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            setFormData(prev => ({ ...prev, no_hp: value }));
                                        }}
                                        placeholder="Contoh: 08123456789"
                                    />
                                    {errors.no_hp && <p className="text-sm text-destructive">{errors.no_hp}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="asal_sekolah">Asal Sekolah</label>
                                    <Input
                                        id="asal_sekolah"
                                        name="asal_sekolah"
                                        value={formData.asal_sekolah}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="tahun_lulus">Tahun Lulus</label>
                                    <Input
                                        type="number"
                                        id="tahun_lulus"
                                        name="tahun_lulus"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={formData.tahun_lulus}
                                        onChange={handleChange}
                                        placeholder="Contoh: 2023"
                                    />
                                    {errors.tahun_lulus && <p className="text-sm text-destructive">{errors.tahun_lulus}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="program_studi">Program Studi</label>
                                    <Select
                                        value={formData.program_studi}
                                        onValueChange={(value) => handleChange({ target: { name: 'program_studi', value } } as React.ChangeEvent<HTMLSelectElement>)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Program Studi" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MI">D3-Manajemen Informatika</SelectItem>
                                            <SelectItem value="SI">S1-Sistem Informasi</SelectItem>
                                            <SelectItem value="SK">S1-Sistem Komputer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="beasiswa" className="font-medium">Beasiswa</Label>
                                    <Select 
                                        value={formData.beasiswa}
                                        onValueChange={(value) => 
                                            setFormData(prev => ({ ...prev, beasiswa: value }))
                                        }
                                    >
                                        <SelectTrigger className="transition-colors duration-200 focus:border-primary">
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
                                    {errors.beasiswa && <p className="text-sm text-destructive">{errors.beasiswa}</p>}
                                </div>

                                {formData.beasiswa === 'tidak' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="kelas" className="font-medium">Kelas</Label>
                                        <Select
                                            value={formData.kelas}
                                            onValueChange={(value) =>
                                                setFormData(prev => ({ ...prev, kelas: value }))
                                            }
                                        >
                                            <SelectTrigger className="transition-colors duration-200 focus:border-primary">
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="reguler">Non Kerja</SelectItem>
                                                <SelectItem value="kerja">Kerja</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.kelas && <p className="text-sm text-destructive">{errors.kelas}</p>}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label htmlFor="foto">Foto</label>
                                    <Input
                                        type="file"
                                        id="foto"
                                        name="foto"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => router.get('/calon-mahasiswa')}
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 