import { useState } from 'react';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import LogoJayanusa from "@/assets/images/home/jayanusa.webp";
import { PROVINCES, CITIES } from "@/data/indonesia";

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

interface Props {
  initialData?: FormData;
  onSuccess?: () => void;
}

export default function FormPendaftaran({ initialData, onSuccess }: Props) {
  const [formData, setFormData] = useState<FormData>(initialData || {
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
      kota: '' // Reset kota ketika provinsi berubah
    }));
    setAvailableCities(CITIES[value] || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const url = initialData ? `/pendaftaran/${initialData.nik}` : '/pendaftaran';
      const method = initialData ? 'put' : 'post';
      
      await router[method](url, formDataToSend);
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bagian Header/Profil */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4">
            <img 
              src={LogoJayanusa} 
              alt="Logo STMIK Jayanusa"
              className="h-12 sm:h-16 w-auto"
            />
            <h3 className="text-xl sm:text-2xl font-bold text-center text-[#02188B] dark:text-[#FF4433]">
              STMIK-AMIK JAYANUSA
            </h3>
            <h2 className="text-xl sm:text-2xl font-bold text-center">
              Formulir Pendaftaran Mahasiswa Baru
            </h2>
          </div>
        </div>
      </div>

      {/* Bagian Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="pb-4 border-b">
                <h3 className="text-lg font-semibold text-primary">Data Pribadi</h3>
                <p className="text-sm text-muted-foreground">Silakan lengkapi data pribadi Anda dengan benar</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <Label htmlFor="nik" className="font-medium">NIK <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      id="nik"
                      name="nik"
                      value={formData.nik}
                      onChange={handleChange}
                      maxLength={16}
                      placeholder="Masukkan NIK (16 digit)"
                      className={cn(
                        "transition-colors duration-200",
                        errors.nik ? "border-destructive" : "focus:border-primary"
                      )}
                    />
                    <div className="flex justify-between text-xs">
                      <p className="text-muted-foreground">Format: 16 digit angka</p>
                      <p className="text-muted-foreground">{formData.nik.length}/16</p>
                    </div>
                    {errors.nik && <p className="text-sm text-destructive">{errors.nik}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nama" className="font-medium">Nama Lengkap <span className="text-destructive">*</span></Label>
                    <Input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className={cn(
                        "transition-colors duration-200",
                        errors.nama ? "border-destructive" : "focus:border-primary"
                      )}
                    />
                    {errors.nama && <p className="text-sm text-destructive">{errors.nama}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jenis_kelamin" className="font-medium">Jenis Kelamin <span className="text-destructive">*</span></Label>
                    <Select 
                      name="jenis_kelamin" 
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
                </div>

                <div className="w-full sm:w-1/3 space-y-2">
                  <Label htmlFor="foto" className="italic font-medium">Foto 3x4</Label>
                  <div className="relative flex flex-col items-center p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors duration-200">
                    {formData.fotoPreview ? (
                      <>
                        <img 
                          src={formData.fotoPreview} 
                          alt="Preview" 
                          className="w-full h-[200px] object-cover rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                          <p className="text-white text-sm">Klik untuk mengganti foto</p>
                        </div>
                        <Input
                          type="file"
                          id="foto"
                          name="foto"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center justify-center w-full h-[200px] bg-muted/30 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm text-muted-foreground">Klik untuk upload foto</p>
                          <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG (Max. 2MB)</p>
                        </div>
                        <Input
                          type="file"
                          id="foto"
                          name="foto"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                      </>
                    )}
                  </div>
                  {errors.foto && <p className="text-sm text-destructive">{errors.foto}</p>}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tempat_lahir" className="font-medium">Tempat Lahir <span className="text-destructive">*</span></Label>
                  <Input
                    type="text"
                    id="tempat_lahir"
                    name="tempat_lahir"
                    value={formData.tempat_lahir}
                    onChange={handleChange}
                    placeholder="Masukkan tempat lahir"
                    className="transition-colors duration-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal_lahir" className="font-medium">Tanggal Lahir <span className="text-destructive">*</span></Label>
                  <Input
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    value={formData.tanggal_lahir}
                    onChange={handleChange}
                    className="transition-colors duration-200 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alamat" className="font-medium">Alamat Lengkap <span className="text-destructive">*</span></Label>
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
                    <Label htmlFor="provinsi" className="font-medium">Provinsi</Label>
                    <Select 
                      name="provinsi" 
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
                    <Label htmlFor="kota" className="font-medium">Kota/Kabupaten</Label>
                    <Select
                      name="kota"
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
                    <Label htmlFor="kecamatan" className="font-medium">Kecamatan</Label>
                    <Input
                      type="text"
                      id="kecamatan"
                      name="kecamatan"
                      value={formData.kecamatan}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kelurahan" className="font-medium">Kelurahan</Label>
                    <Input
                      type="text"
                      id="kelurahan"
                      name="kelurahan"
                      value={formData.kelurahan}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="agama" className="font-medium">Agama</Label>
                    <Select 
                      name="agama" 
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="no_hp" className="font-medium">Nomor HP</Label>
                    <Input
                      type="tel"
                      id="no_hp"
                      name="no_hp"
                      value={formData.no_hp}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="pb-4 border-b">
                <h3 className="text-lg font-semibold text-primary">Data Pendidikan</h3>
                <p className="text-sm text-muted-foreground">Informasi mengenai riwayat pendidikan Anda</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="asal_sekolah" className="font-medium">Asal Sekolah</Label>
                  <Input
                    type="text"
                    id="asal_sekolah"
                    name="asal_sekolah"
                    value={formData.asal_sekolah}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tahun_lulus" className="font-medium">Tahun Lulus</Label>
                  <Input
                    type="text"
                    id="tahun_lulus"
                    name="tahun_lulus"
                    value={formData.tahun_lulus}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="program_studi" className="font-medium">Program Studi</Label>
                <Select 
                  name="program_studi" 
                  value={formData.program_studi}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, program_studi: value }))
                  }
                >
                  <SelectTrigger className="transition-colors duration-200 focus:border-primary">
                    <SelectValue placeholder="Pilih Program Studi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MI">
                      <div className="flex items-center justify-between">
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">D3-Manajemen Informatika</span>                   
                        </div>
                    </SelectItem>
                    <SelectItem value="SI">
                      <div className="flex items-center justify-between">
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">S1-Sistem Informasi</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="SK">
                      <div className="flex items-center justify-between">
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">S1-Sistem Komputer</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beasiswa" className="font-medium">Beasiswa</Label>
                <Select 
                  name="beasiswa" 
                  value={formData.beasiswa}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, beasiswa: value }))
                  }
                >
                  <SelectTrigger className="transition-colors duration-200 focus:border-primary">
                    <SelectValue placeholder="Penerima Beasiswa KIP-Kuliah (Isi Tidak Jika Tidak Penerima)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iya"><div className="flex items-center justify-between">
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Ya (KIP-Kuliah)</span>
                      </div></SelectItem>
                    <SelectItem value="tidak"><div className="flex items-center justify-between">
                      <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Tidak</span>
                      </div></SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.beasiswa === 'tidak' && (
                <div className="space-y-2">
                  <Label htmlFor="kelas" className="font-medium">Kelas</Label>
                  <Select
                    name="kelas"
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
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[200px] transition-all duration-200 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan...</span>
                  </div>
                ) : (
                  'Simpan Data'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 