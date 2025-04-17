import { useState } from 'react';
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
import successAnimation from '@/assets/images/home/done.json';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
}

export default function PembayaranDaftarUlang({ pembayaranDaftarUlang }: PembayaranDaftarUlangProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bank, setBank] = useState(pembayaranDaftarUlang?.bank || '');
  const [keterangan, setKeterangan] = useState(pembayaranDaftarUlang?.keterangan || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append('bukti_pembayaran', file);
      formData.append('bank', bank);
      formData.append('keterangan', keterangan);

      setIsUploading(true);

      if (pembayaranDaftarUlang && pembayaranDaftarUlang.id) {
        router.post(`/siswa/daftar-ulang/${pembayaranDaftarUlang.id}`, {
          _method: 'PUT',
          ...formData
        }, {
          onSuccess: () => handleSuccess(),
          onError: () => handleError(),
          preserveScroll: true
        });
      } else {
        router.post('/siswa/daftar-ulang', formData, {
          onSuccess: () => handleSuccess(),
          onError: () => handleError(),
          preserveScroll: true
        });
      }
    }
  };

  const handleSuccess = () => {
    setIsUploading(false);
    setShowSuccessModal(true);
  };

  const handleError = () => {
    setIsUploading(false);
    setPreviewUrl(null);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

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
              loop={false}
              autoplay
              className="w-full h-full"
            />
          </div>
          <h3 className="text-2xl font-bold text-green-600">
            Pembayaran Diterima!
          </h3>
          <p className="mt-2 text-gray-600">
            Selamat! Pembayaran Anda telah diverifikasi dan diterima. Anda resmi menjadi Mahasiswa Baru STMIK-AMIK Jayanusa.
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
                  {isUploading ? 'Mengupload...' : 
                   pembayaranDaftarUlang?.status === 'ditolak' ? 'Upload Ulang Bukti' : 
                   'Upload Bukti Pembayaran'}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    disabled={isUploading || !bank}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Error Message untuk status ditolak */}
            {pembayaranDaftarUlang?.status === 'ditolak' && pembayaranDaftarUlang.catatan_admin && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-800">Bukti pembayaran ditolak</p>
                    <p className="text-sm text-red-700 mt-1">{pembayaranDaftarUlang.catatan_admin}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
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
              Pembayaran Diterima!
            </h3>
            <p className="mt-2 text-gray-600">
              Selamat! Pembayaran Anda telah diverifikasi dan diterima. Anda resmi menjadi Mahasiswa Baru STMIK-AMIK Jayanusa.
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
