import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from '@/components/Siswa/Sidebar';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Rekening from '@/assets/images/home/rekening.png';
import Lottie from 'lottie-react';
import successAnimation from '@/assets/images/home/success.json';

interface SiswaData {
  nik: string;
  nama: string;
  program_studi: string;
  beasiswa: string;
  kelas: string;
  asal_sekolah: string;
  tahun_lulus: string;
}

interface PembayaranData {
  id: number;
  kode_pembayaran: string;
  jumlah: number;
  status: 'menunggu' | 'dibayar' | 'ditolak';
  bukti_pembayaran: string | null;
  skl: string | null;
  rapor: string | null;
  suratlulus: string | null;
  keterangan: string | null;
  created_at: string;
}

interface PageProps {
  siswa: SiswaData | null;
  pembayarans: PembayaranData[];
}

const UploadComponent = ({ pembayaran }: { pembayaran: PembayaranData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, pembayaranId: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('bukti_pembayaran', file);
      formData.append('pembayaran_id', String(pembayaranId));

      router.post('/siswa/pembayaran/upload', formData, {
        onSuccess: () => {
          setIsUploading(false);
          setShowSuccess(true);
          // Animasi akan berjalan selama 2 detik
          setTimeout(() => setShowSuccess(false), 2000);
        },
        onError: () => {
          setIsUploading(false);
          setPreviewUrl(null);
        },
        preserveScroll: true
      });
    }
  };

  // Fungsi untuk mengupload ulang bukti pembayaran
  const handleReupload = () => {
    // Reset state untuk preview dan mengaktifkan input file
    setPreviewUrl(null);
    // Trigger klik pada input file tersembunyi
    document.getElementById(`reupload-bukti-${pembayaran.id}`)?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl transform transition-all">
            <div className="w-48 h-48">
              <Lottie
                animationData={successAnimation}
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-lg font-medium text-primary mt-4">
              Upload Berhasil!
            </p>
          </div>
        </div>
      )}
      
      {/* Tampilkan pesan penolakan jika status ditolak */}
      {pembayaran.status === 'ditolak' && pembayaran.keterangan && (
        <div className="w-full mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">Bukti pembayaran ditolak</p>
              <p className="text-xs text-red-700 mt-1">{pembayaran.keterangan}</p>
              <p className="text-xs font-medium text-red-700 mt-2">Silakan upload ulang bukti pembayaran</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Preview area - bisa menampilkan bukti yang sudah ada atau preview upload baru */}
        <div className="w-full">
          <div className={cn(
            "w-full h-40 sm:h-32 sm:w-32 rounded-lg border-2 border-dashed mx-auto",
          "flex items-center justify-center overflow-hidden",
          "transition-all duration-200 hover:border-primary",
          pembayaran.status === 'ditolak' ? "border-red-300" : ""
          )}>
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
          ) : pembayaran.bukti_pembayaran ? (
            <img 
              src={pembayaran.bukti_pembayaran} 
              alt="Bukti Pembayaran"
              className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
              />
            ) : (
              <div className="text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-muted-foreground">
                  Belum ada bukti
                </p>
              </div>
            )}
          </div>
        
        {/* Dialog untuk melihat gambar dalam ukuran besar */}
        {pembayaran.bukti_pembayaran && !previewUrl && (
          <Dialog>
            <div className="flex mt-2 justify-center gap-2">
              <DialogTrigger asChild>
                <button className="text-xs text-blue-600 hover:text-blue-800 underline">
                  Lihat Bukti
                </button>
              </DialogTrigger>
              
              {/* Tombol untuk upload ulang jika status ditolak */}
              {pembayaran.status === 'ditolak' && (
                <button 
                  onClick={handleReupload}
                  className="text-xs text-red-600 hover:text-red-800 underline"
                >
                  Upload Ulang
                </button>
              )}
            </div>
            
            <DialogContent className="w-[90vw] max-w-3xl p-0">
              <img 
                src={pembayaran.bukti_pembayaran} 
                alt="Bukti Pembayaran" 
                className="w-full h-auto rounded-lg"
              />
            </DialogContent>
          </Dialog>
        )}
        
        {/* Input file dan tombol upload */}
        {(!pembayaran.bukti_pembayaran || previewUrl || pembayaran.status === 'ditolak') && (
          <label className={cn(
            "mt-4 flex justify-center",
            "cursor-pointer bg-primary text-white px-4 py-2 rounded-lg w-full sm:w-32 mx-auto",
            "hover:bg-primary/90 transition-colors text-center",
            (isUploading) && "opacity-50 cursor-not-allowed",
            pembayaran.status === 'ditolak' && !previewUrl && "bg-red-600 hover:bg-red-700"
          )}>
            {isUploading ? 'Mengupload...' : (previewUrl ? 'Upload Ulang' : 
              (pembayaran.status === 'ditolak' ? 'Upload Ulang' : 'Upload Bukti'))}
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, pembayaran.id)}
              accept="image/*"
              disabled={isUploading}
            />
          </label>
        )}
        
        {/* Input file tersembunyi untuk re-upload */}
        <input
          id={`reupload-bukti-${pembayaran.id}`}
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e, pembayaran.id)}
          accept="image/*"
        />
      </div>
    </div>
  );
};

const UploadSKLComponent = ({ pembayaran }: { pembayaran: PembayaranData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, pembayaranId: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('skl', file);
      formData.append('pembayaran_id', String(pembayaranId));

      router.post('/siswa/skl/upload', formData, {
        onSuccess: () => {
          setIsUploading(false);
          setShowSuccess(true);
          // Animasi akan berjalan selama 2 detik
          setTimeout(() => setShowSuccess(false), 2000);
        },
        onError: () => {
          setIsUploading(false);
          setFileName(null);
        },
        preserveScroll: true
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl transform transition-all">
            <div className="w-48 h-48">
              <Lottie
                animationData={successAnimation}
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-lg font-medium text-primary mt-4">
              Upload SKL Berhasil!
            </p>
          </div>
        </div>
      )}
      
      {/* Tampilkan keterangan/alasan penolakan jika status ditolak */}
      {pembayaran.status === 'ditolak' && pembayaran.keterangan && (
        <div className="w-full mb-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mt-0.5 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <p className="text-xs font-medium text-red-800">Dokumen ditolak</p>
              <p className="text-xs text-red-700 mt-0.5">{pembayaran.keterangan}</p>
            </div>
          </div>
        </div>
      )}
      
      {pembayaran.skl ? (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer w-full">
              <div className={cn(
                "w-full h-12 rounded-lg border-2 border-dashed mx-auto",
                "flex items-center justify-center",
                "transition-all duration-200 hover:border-primary",
                pembayaran.status === 'ditolak' ? "border-red-300" : ""
              )}>
                <div className="flex items-center space-x-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium truncate">SKL Terupload</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-center text-muted-foreground w-full">
                Klik untuk membuka dokumen
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-3xl p-0">
            <iframe 
              src={pembayaran.skl} 
              className="w-full h-[80vh]" 
              title="SKL Document"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full">
          <div className={cn(
            "w-full h-12 rounded-lg border-2 border-dashed mx-auto",
            "flex items-center justify-center",
            "transition-all duration-200 hover:border-primary",
            pembayaran.status === 'ditolak' ? "border-red-300" : ""
          )}>
            {fileName ? (
              <div className="flex items-center space-x-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm truncate">{fileName}</span>
              </div>
            ) : (
              <div className="text-center p-2">
                <p className="text-sm text-muted-foreground">
                  SKL belum diupload
                </p>
              </div>
            )}
          </div>
          <label className={cn(
            "mt-2 flex justify-center",
            "cursor-pointer bg-blue-600 text-white px-3 py-1.5 rounded-lg w-full text-xs",
            "hover:bg-blue-700 transition-colors text-center",
            (isUploading) && "opacity-50 cursor-not-allowed",
            pembayaran.status === 'ditolak' && "bg-red-600 hover:bg-red-700"
          )}>
            {isUploading ? 'Mengupload...' : (pembayaran.status === 'ditolak' ? 'Upload Ulang SKL' : 'Upload SKL (PDF)')}
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, pembayaran.id)}
              accept="application/pdf"
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

const UploadRaporComponent = ({ pembayaran }: { pembayaran: PembayaranData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, pembayaranId: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('rapor', file);
      formData.append('pembayaran_id', String(pembayaranId));

      router.post('/siswa/rapor/upload', formData, {
        onSuccess: () => {
          setIsUploading(false);
          setShowSuccess(true);
          // Animasi akan berjalan selama 2 detik
          setTimeout(() => setShowSuccess(false), 2000);
        },
        onError: () => {
          setIsUploading(false);
          setFileName(null);
        },
        preserveScroll: true
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 relative">
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl transform transition-all">
            <div className="w-48 h-48">
              <Lottie
                animationData={successAnimation}
                loop={false}
                autoplay
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-lg font-medium text-primary mt-4">
              Upload Rapor Berhasil!
            </p>
          </div>
        </div>
      )}
      
      {/* Tampilkan keterangan/alasan penolakan jika status ditolak */}
      {pembayaran.status === 'ditolak' && pembayaran.keterangan && (
        <div className="w-full mb-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600 mt-0.5 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <p className="text-xs font-medium text-red-800">Dokumen ditolak</p>
              <p className="text-xs text-red-700 mt-0.5">{pembayaran.keterangan}</p>
            </div>
          </div>
        </div>
      )}
      
      {pembayaran.rapor ? (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer w-full">
              <div className={cn(
                "w-full h-12 rounded-lg border-2 border-dashed mx-auto",
                "flex items-center justify-center",
                "transition-all duration-200 hover:border-primary",
                pembayaran.status === 'ditolak' ? "border-red-300" : ""
              )}>
                <div className="flex items-center space-x-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium truncate">Rapor Terupload</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-center text-muted-foreground w-full">
                Klik untuk membuka dokumen
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-3xl p-0">
            <iframe 
              src={pembayaran.rapor} 
              className="w-full h-[80vh]" 
              title="Rapor Document"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full">
          <div className={cn(
            "w-full h-12 rounded-lg border-2 border-dashed mx-auto",
            "flex items-center justify-center",
            "transition-all duration-200 hover:border-primary",
            pembayaran.status === 'ditolak' ? "border-red-300" : ""
          )}>
            {fileName ? (
              <div className="flex items-center space-x-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm truncate">{fileName}</span>
              </div>
            ) : (
              <div className="text-center p-2">
                <p className="text-sm text-muted-foreground">
                  Rapor belum diupload
                </p>
              </div>
            )}
          </div>
          <label className={cn(
            "mt-2 flex justify-center",
            "cursor-pointer bg-green-600 text-white px-3 py-1.5 rounded-lg w-full text-xs",
            "hover:bg-green-700 transition-colors text-center",
            (isUploading) && "opacity-50 cursor-not-allowed",
            pembayaran.status === 'ditolak' && "bg-red-600 hover:bg-red-700"
          )}>
            {isUploading ? 'Mengupload...' : (pembayaran.status === 'ditolak' ? 'Upload Ulang Rapor' : 'Upload Rapor (PDF)')}
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFileChange(e, pembayaran.id)}
              accept="application/pdf"
              disabled={isUploading}
            />
          </label>
        </div>
      )}
    </div>
  );
};

const SuratLulusComponent = ({ pembayaran }: { pembayaran: PembayaranData }) => {
  if (pembayaran.status !== 'dibayar') return null;
  
  return (
    <div className="w-full">
      {pembayaran.suratlulus ? (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative group cursor-pointer w-full">
              <div className="w-full h-12 rounded-lg border-2 border-dashed mx-auto
                flex items-center justify-center
                transition-all duration-200 hover:border-primary bg-green-50">
                <div className="flex items-center space-x-2 px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium truncate text-green-700">Surat Lulus Tersedia!</span>
                </div>
              </div>
              <p className="mt-2 text-xs text-center text-green-600 w-full">
                Klik untuk membuka dan mengunduh surat lulus Anda
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-3xl p-0">
            <div className="p-4 bg-white flex justify-between items-center">
              <h3 className="font-medium text-primary">Surat Lulus Anda</h3>
              <div className="flex gap-2">
                <a
                  href={pembayaran.suratlulus}
                  target="_blank"
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Buka di Tab Baru
                </a>
                <a
                  href={pembayaran.suratlulus}
                  download
                  className="inline-flex items-center justify-center px-3 py-1.5 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Unduh PDF
                </a>
              </div>
            </div>
            <iframe 
              src={pembayaran.suratlulus} 
              className="w-full h-[80vh]" 
              title="Surat Lulus"
            />
          </DialogContent>
        </Dialog>
      ) : (
        <div>
          <div className="w-full h-12 rounded-lg border-2 border-dashed mx-auto
            flex items-center justify-center bg-yellow-50 border-yellow-300">
            <div className="flex items-center space-x-2 px-3 text-yellow-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Surat Lulus sedang diproses</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-center text-yellow-600 w-full">
            Surat lulus akan tersedia segera setelah diproses oleh admin
          </p>
        </div>
      )}
    </div>
  );
};

const CongratulationsModal = ({ 
  isOpen, 
  onClose, 
  hasLulusCertificate, 
  certificateUrl 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  hasLulusCertificate: boolean; 
  certificateUrl: string | null; 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 shadow-xl transform transition-all max-w-md w-full">
        <div className="mb-6 text-center">
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
            Selamat! Pembayaran Anda telah diverifikasi dan diterima. Anda resmi menjadi Calon mahasiswa baru STMIK-AMIK Jayanusa.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <h4 className="text-sm font-medium text-green-800">Informasi Surat Lulus</h4>
              <p className="text-xs text-green-700 mt-1">
                {hasLulusCertificate 
                  ? "Surat Lulus Anda sudah tersedia dan dapat diunduh dari dashboard."
                  : "Surat Lulus Anda sedang diproses dan akan tersedia segera."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Tutup
          </button>
          {hasLulusCertificate && certificateUrl && (
            <a
              href={certificateUrl}
              download
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-center transition-colors"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Unduh Surat Lulus
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Pembayaran({ siswa, pembayarans }: PageProps) {
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);

  const acceptedPayment = pembayarans.find(payment => payment.status === 'dibayar');
  const hasSuratLulus = acceptedPayment?.suratlulus !== null && acceptedPayment?.suratlulus !== undefined;

  useEffect(() => {
    if (acceptedPayment) {
      setShowCongratulationsModal(true);
    }
  }, [acceptedPayment]);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Head title="Pembayaran" />
      
      <CongratulationsModal
        isOpen={showCongratulationsModal}
        onClose={() => setShowCongratulationsModal(false)}
        hasLulusCertificate={hasSuratLulus}
        certificateUrl={acceptedPayment?.suratlulus || null}
      />
      
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-64">
            <Sidebar activePage="pembayaran" />
          </div>

          <div className="flex-1 p-4 lg:p-8">
            <Card className="max-w-[1200px] mx-auto">
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Header Section */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Informasi Pembayaran
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Detail pembayaran pendaftaran mahasiswa baru
                    </p>
                  </div>

                  {siswa ? (
                    <div className="space-y-8">
                      {/* Info Mahasiswa dengan animasi */}
                      <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 rounded-xl border border-primary/10">
                        <h3 className="font-semibold text-primary mb-4">Data Mahasiswa</h3>
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

                      {/* Dokumen Pendaftaran */}
                      <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 p-6 rounded-xl border border-blue-500/10">
                        <h3 className="font-semibold text-blue-600 mb-4">Dokumen Pendaftaran</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              Surat Keterangan Lulus (SKL) Format PDF
                            </p>
                            {pembayarans.length > 0 && (
                              <UploadSKLComponent pembayaran={pembayarans[0]} />
                            )}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              Rapor Terakhir Format PDF
                            </p>
                            {pembayarans.length > 0 && (
                              <UploadRaporComponent pembayaran={pembayarans[0]} />
                            )}
                          </div>
                          
                          {acceptedPayment && (
                            <div className="space-y-2 sm:col-span-2">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-green-700">
                                  Surat Lulus (Bukti Penerimaan)
                                </p>
                                {hasSuratLulus && (
                                  <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                    Tersedia
                                  </span>
                                )}
                              </div>
                              {pembayarans.length > 0 && (
                                <SuratLulusComponent pembayaran={pembayarans[0]} />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="lg:hidden space-y-4">
                        {pembayarans.map((pembayaran) => (
                          <div key={pembayaran.id} 
                            className="bg-white rounded-xl shadow-lg p-6 
                                     transform transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex flex-col space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-muted-foreground">Kode Pembayaran</p>
                                  <p className="font-medium font-mono">{pembayaran.kode_pembayaran}</p>
                                </div>
                                <span className={cn(
                                  "px-4 py-1.5 rounded-full text-xs font-medium",
                                  {
                                    "bg-yellow-100 text-yellow-800": pembayaran.status === 'menunggu',
                                    "bg-green-100 text-green-800": pembayaran.status === 'dibayar',
                                    "bg-red-100 text-red-800": pembayaran.status === 'ditolak'
                                  }
                                )}>
                                  {pembayaran.status.charAt(0).toUpperCase() + pembayaran.status.slice(1)}
                                </span>
                              </div>
                              
                              <div>
                                <p className="text-sm text-muted-foreground">Jumlah</p>
                                <p className="font-bold text-xl text-primary">
                                  {formatRupiah(pembayaran.jumlah)}
                                </p>
                              </div>

                              <div className="pt-2">
                                <UploadComponent pembayaran={pembayaran} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Desktop View */}
                      <div className="hidden lg:block">
                        <div className="rounded-xl overflow-hidden border border-primary/10">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-primary/5">
                              <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                  Kode Pembayaran
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                  Jumlah
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                  Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                                  Bukti
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {pembayarans.map((pembayaran) => (
                                <tr key={pembayaran.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 text-sm">
                                    {pembayaran.kode_pembayaran}
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="font-semibold text-primary">
                                      {formatRupiah(pembayaran.jumlah)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className={cn(
                                      "inline-flex px-3 py-1 rounded-full text-xs font-medium",
                                      {
                                        "bg-yellow-100 text-yellow-800": pembayaran.status === 'menunggu',
                                        "bg-green-100 text-green-800": pembayaran.status === 'dibayar',
                                        "bg-red-100 text-red-800": pembayaran.status === 'ditolak'
                                      }
                                    )}>
                                      {pembayaran.status.charAt(0).toUpperCase() + pembayaran.status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <UploadComponent pembayaran={pembayaran} />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Petunjuk Pembayaran */}
                      <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-xl p-6 border border-primary/10">
                        <h3 className="text-xl font-semibold text-primary mb-6">
                          Petunjuk Pembayaran
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <img 
                            src={Rekening} 
                            alt="Rekening Bank" 
                            className="w-full max-w-[300px] h-auto rounded-xl shadow-lg mx-auto 
                                     transform transition-all duration-300 hover:scale-105"
                          />
                          <div className="prose prose-sm max-w-none">
                            <ol className="list-decimal list-inside space-y-4">
                              <li className="flex items-center space-x-2">
                                <span className="text-primary font-semibold">Transfer ke rekening Bank Nagari:</span>
                                <span className="font-mono">21000-10500-3997</span>
                              </li>
                              <li className="text-muted-foreground">
                                A/N Yayasan Bina Manajemen Informatika
                              </li>
                              <li className="text-muted-foreground">
                                Upload bukti pembayaran
                              </li>
                              <li className="text-muted-foreground">
                                Tunggu konfirmasi dari admin
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="animate-bounce mb-4">
                        <svg className="w-16 h-16 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        Silakan lengkapi data pendaftaran terlebih dahulu
                      </p>
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