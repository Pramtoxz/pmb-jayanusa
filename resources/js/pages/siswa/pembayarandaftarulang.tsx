import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Lottie from 'lottie-react';
import successAnimation from '@/assets/images/home/yey.json';
import uploadAnimation from '@/assets/images/home/success.json';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import yeySound from '@/assets/sound/yey.mp3'
import Swal from 'sweetalert2';

interface PembayaranDaftarUlang {
  id: number;
  kode_pembayaran: string;
  nik_siswa: string;
  bank: string;
  bukti_pembayaran: string | null;
  keterangan: string | null;
  status: 'menunggu' | 'dibayar' | 'ditolak';
  catatan_admin: string | null;
  created_at?: string;
  updated_at?: string;
}

interface PembayaranDaftarUlangProps {
  pembayaranDaftarUlang: PembayaranDaftarUlang | null;
  suratLulus: string | null;
}

export default function PembayaranDaftarUlang({ pembayaranDaftarUlang, suratLulus }: PembayaranDaftarUlangProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [bank, setBank] = useState(pembayaranDaftarUlang?.bank || '');
  const [keterangan, setKeterangan] = useState(pembayaranDaftarUlang?.keterangan || '');

  const playYeySound = () => {
    try {
      const sound = new Audio(yeySound)
      sound.addEventListener('canplaythrough', () => {
        sound.play().catch(e => console.error('Error playing:', e))
      })
    } catch (error) {
      console.error('Error creating audio:', error)
    }
  }

  useEffect(() => {
    if (pembayaranDaftarUlang?.status === 'dibayar') {
      setShowSuccessModal(true);
      playYeySound();
    }
  }, [pembayaranDaftarUlang?.status]);

  // Tambahkan fungsi untuk validasi form
  const validateForm = () => {
    if (!bank) {
      Swal.fire({
        icon: 'error',
        title: 'Bank Belum Dipilih',
        text: 'Silakan pilih bank pengirim terlebih dahulu',
        confirmButtonText: 'OK'
      });
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validasi form
      if (!validateForm()) {
        e.target.value = ''; // Reset input file
        return;
      }

      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        await Swal.fire({
          icon: 'error',
          title: 'Ukuran File Terlalu Besar',
          text: 'Maksimal ukuran file adalah 2MB',
          confirmButtonText: 'OK'
        });
        e.target.value = ''; // Reset input file
        return;
      }

      // Validasi tipe file
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        await Swal.fire({
          icon: 'error',
          title: 'Tipe File Tidak Didukung',
          text: 'Gunakan format JPG, JPEG, atau PNG',
          confirmButtonText: 'OK'
        });
        e.target.value = ''; // Reset input file
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append('bukti_pembayaran', file);
      formData.append('bank', bank);
      formData.append('keterangan', keterangan);
      
      // Ambil CSRF token dari meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (csrfToken) {
        formData.append('_token', csrfToken);
      }

      setIsUploading(true);

      try {
        const url = pembayaranDaftarUlang 
          ? `/siswa/daftar-ulang/upload/${pembayaranDaftarUlang.id}`
          : '/siswa/daftar-ulang/upload';
        const method = 'post';
        const headers: Record<string, string> = {};
        if (csrfToken) {
          headers['X-CSRF-TOKEN'] = csrfToken;
        }

        await router[method](url, formData, {
          onSuccess: () => {
            handleSuccess();
            setShowUploadModal(true);
            playYeySound();
            // Refresh data setelah update berhasil
            router.reload({ only: ['pembayaranDaftarUlang'] });
          },
          onError: (errors) => {
            handleError();
            console.error('Upload error:', errors);
            Swal.fire({
              icon: 'error',
              title: 'Upload Gagal',
              text: errors.message || 'Terjadi kesalahan saat mengupload file',
              confirmButtonText: 'OK'
            });
          },
          preserveState: true,
          preserveScroll: true,
          forceFormData: true,
          headers
        });
      } catch (error) {
        handleError();
        console.error('Upload error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Upload Gagal',
          text: 'Terjadi kesalahan saat mengupload file',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleSuccess = () => {
    setIsUploading(false);
    setShowUploadModal(true);
    playYeySound();
  };

  const handleError = () => {
    setIsUploading(false);
    setPreviewUrl(null);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    playYeySound();
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  // Jika surat lulus belum ada, tampilkan pesan
  if (!suratLulus) {
    return (
      <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 p-6 rounded-xl border border-blue-500/10">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-yellow-600 mb-2">
            Surat Lulus Belum Tersedia
          </h3>
          <p className="text-gray-600">
            Silakan tunggu hingga surat lulus Anda tersedia. Setelah surat lulus tersedia, Anda dapat melanjutkan ke tahap pembayaran daftar ulang.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 p-6 rounded-xl border border-blue-500/10">
      <h3 className="font-semibold text-blue-600 mb-4">Pembayaran Daftar Ulang</h3>
      
      {/* Status Badge */}
      {pembayaranDaftarUlang && (
        <div className="mb-4">
          <span className={cn(
            "inline-flex px-3 py-1 rounded-full text-xs font-medium",
            {
              "bg-yellow-100 text-yellow-800": pembayaranDaftarUlang.status === 'menunggu',
              "bg-green-100 text-green-800": pembayaranDaftarUlang.status === 'dibayar',
              "bg-red-100 text-red-800": pembayaranDaftarUlang.status === 'ditolak'
            }
          )}>
            {pembayaranDaftarUlang.status === 'menunggu' && 'Menunggu Verifikasi'}
            {pembayaranDaftarUlang.status === 'dibayar' && 'Terverifikasi'}
            {pembayaranDaftarUlang.status === 'ditolak' && 'Ditolak'}
          </span>
        </div>
      )}

      {/* Pemberitahuan untuk status dibayar */}
      {pembayaranDaftarUlang?.status === 'dibayar' && (
        <div className="mb-6 text-center bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <div className="w-24 h-24 mx-auto mb-4">
            <Lottie
              animationData={successAnimation}
              loop={true}
              autoplay
              className="w-full h-full"
            />
          </div>
          <h3 className="text-2xl font-bold text-green-600">
             Selamat Datang di STMIK-AMIK JAYANUSA!
          </h3>
          <p className="mt-2 text-gray-600">
            Yeay! Kamu resmi menjadi bagian dari Keluarga Besar STMIK-AMIK Jayanusa. Siap mengeksplorasi dunia teknologi dan menjadi talenta digital masa depan! 💻✨
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Silahkan Tunggu Admin Menginputkan Nomor HP anda ke Grup Mahasiswa Baru!
          </p>
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        {/* Bank Selection */}
        <div className="space-y-2">
          <Label htmlFor="bank">Bank Pengirim</Label>
          <Select 
            name="bank" 
            value={bank}
            onValueChange={setBank}
            disabled={isUploading || pembayaranDaftarUlang?.status === 'dibayar'}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Pilih Bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nagari">Bank Nagari</SelectItem>
              <SelectItem value="bni">BNI</SelectItem>
              <SelectItem value="bri">BRI</SelectItem>
              <SelectItem value="mandiri">Mandiri</SelectItem>
              <SelectItem value="bca">BCA</SelectItem>
              <SelectItem value="cimb">CIMB Niaga</SelectItem>
              <SelectItem value="permata">Permata Bank</SelectItem>
              <SelectItem value="danamon">Danamon</SelectItem>
              <SelectItem value="btn">BTN</SelectItem>
              <SelectItem value="bsi">BSI</SelectItem>
              <SelectItem value="mega">Bank Mega</SelectItem>
              <SelectItem value="ocbc">OCBC NISP</SelectItem>
              <SelectItem value="panin">Panin Bank</SelectItem>
              <SelectItem value="maybank">Maybank</SelectItem>
              <SelectItem value="lainnya">Lainnya (Sertakan di Keterangan)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Keterangan */}
        <div className="space-y-2">
          <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
          <Input
            type="text"
            id="keterangan"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Contoh: Transfer dari rekening a.n John Doe"
            disabled={isUploading || pembayaranDaftarUlang?.status === 'dibayar'}
            className="bg-white"
          />
        </div>

        {/* Upload Bukti */}
        <div className="space-y-2">
          <Label>Bukti Transfer</Label>
          <div className="relative">
            <div className={cn(
              "w-full h-40 rounded-lg border-2 border-dashed",
              "flex items-center justify-center overflow-hidden",
              "transition-all duration-200",
              pembayaranDaftarUlang?.status === 'ditolak' ? "border-red-300" : "border-primary/50",
              "bg-white"
            )}>
              {previewUrl || pembayaranDaftarUlang?.bukti_pembayaran ? (
                <img 
                  src={previewUrl || pembayaranDaftarUlang?.bukti_pembayaran || undefined} 
                  alt="Bukti Pembayaran" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-center p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {isUploading ? 'Mengupload...' : 'Pilih file bukti pembayaran'}
                  </p>
                </div>
              )}
            </div>

            {/* Tombol Upload */}
            {(pembayaranDaftarUlang?.status !== 'dibayar') && (
              <div className="mt-4 flex justify-center">
                <label className={cn(
                  "cursor-pointer inline-flex items-center px-4 py-2 rounded-lg",
                  "transition-colors duration-200",
                  pembayaranDaftarUlang?.status === 'ditolak' 
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-primary hover:bg-primary/90 text-white",
                  (isUploading || !bank) && "opacity-50 cursor-not-allowed"
                )}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {isUploading ? 'Sedang Mengupload...' : 
                   pembayaranDaftarUlang?.status === 'ditolak' ? 'Upload Ulang Bukti' : 
                   'Upload Bukti Pembayaran'}
                  <input
                    type="file"
                    onChange={(e) => {
                      if (validateForm()) {
                        handleFileChange(e);
                      } else {
                        e.target.value = '';
                      }
                    }}
                    accept="image/*"
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Error Message untuk status ditolak */}
            {pembayaranDaftarUlang?.status === 'ditolak' && pembayaranDaftarUlang.catatan_admin && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-semibold text-red-800">Bukti pembayaran sebelumnya ditolak</h4>
                    <p className="text-sm text-red-700 mt-1">{pembayaranDaftarUlang.catatan_admin}</p>
                    <p className="text-sm text-red-600 mt-2">
                      Silakan upload ulang bukti pembayaran yang sesuai dengan ketentuan di atas.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Upload Berhasil */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4">
              <Lottie
                animationData={uploadAnimation}
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-green-600">
              Upload Berhasil!
            </h3>
            <p className="mt-2 text-gray-600">
              Bukti pembayaran Anda telah berhasil diupload. Silakan tunggu verifikasi dari admin.
            </p>
            <Button onClick={handleCloseUploadModal} className="mt-4">
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Selamat Diterima */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4">
              <Lottie
                animationData={successAnimation}
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-green-600">
              Selamat Diterima!
            </h3>
            <p className="mt-2 text-gray-600">
              Selamat! Anda resmi menjadi Mahasiswa Baru STMIK-AMIK Jayanusa.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Silahkan Tunggu Admin Menginputkan Nomor HP anda ke Grup Mahasiswa Baru!
            </p>
            <Button onClick={handleCloseModal} className="mt-4">
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
