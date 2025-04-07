<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Pembayaran;
use Illuminate\Support\Facades\DB;

class ControllerSiswa extends Controller
{
    public function index(Request $request)
    {
        $siswa = Siswa::where('id_user', $request->user()->id)->first();
        
        return Inertia::render('siswa/siswaprofil', [
            'siswa' => $siswa
        ]);
    }

    public function store(Request $request)
    {
        $siswa = Siswa::where('id_user', $request->user()->id)->first();
        
        $validator = Validator::make($request->all(), [
            'nik' => 'required|string|size:16|' . ($siswa ? 'unique:siswa,nik,'.$siswa->nik.',nik' : 'unique:siswa,nik'),
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:L,P',
            'kota' => 'required|string',
            'kecamatan' => 'required|string',
            'kelurahan' => 'required|string',
            'provinsi' => 'required|string',
            'agama' => 'required|string',
            'no_hp' => 'required|string',
            'asal_sekolah' => 'required|string',
            'tahun_lulus' => 'required|string',
            'program_studi' => 'required|in:MI,SI,SK',
            'foto' => $siswa ? 'nullable|image|mimes:jpeg,png,jpg|max:2048' : 'required|image|mimes:jpeg,png,jpg|max:2048',
            'beasiswa' => 'required|in:iya,tidak',
            'kelas' => 'required_if:beasiswa,tidak|in:reguler,kerja',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();

            $data = $request->except('foto');
            $data['id_user'] = $request->user()->id;

            // Handle foto
            if ($request->hasFile('foto')) {
                $foto = $request->file('foto');
                $fotoPath = $foto->store('foto_siswa', 'public');
                $data['foto'] = '/storage/' . $fotoPath;

                if ($siswa && $siswa->foto) {
                    $oldPath = str_replace('/storage/', '', $siswa->foto);
                    Storage::disk('public')->delete($oldPath);
                }
            }

            if ($siswa) {
                // Update
                $siswa->update($data);
            } else {
                // Create siswa terlebih dahulu
                $siswa = Siswa::create($data);

                // Buat satu pembayaran untuk biaya pendaftaran
                Pembayaran::create([
                    'kode_pembayaran' => 'PMB-' . date('Y') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),
                    'jumlah' => 200000, // Biaya pendaftaran 200rb
                    'status' => 'menunggu',
                    'nik_siswa' => $request->nik,
                    'keterangan' => 'Biaya Pendaftaran Mahasiswa Baru'
                ]);
            }

            DB::commit();
            return redirect()->route('siswa.profile')->with('message', 'Data berhasil disimpan');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }
            return response()->json(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()], 500);
        }
    }

    public function pembayaran(Request $request)
    {
        $siswa = Siswa::where('id_user', $request->user()->id)->first();
        $pembayarans = [];
        
        if ($siswa) {
            $pembayarans = Pembayaran::where('nik_siswa', $siswa->nik)
                ->orderBy('created_at', 'desc')
                ->get();
        }
        
        return Inertia::render('siswa/pembayaran', [
            'siswa' => $siswa,
            'pembayarans' => $pembayarans
        ]);
    }

    public function uploadBuktiPembayaran(Request $request)
    {
        $request->validate([
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'pembayaran_id' => 'required|exists:pembayaran,id'
        ]);

        try {
            DB::beginTransaction();
            
            $pembayaran = Pembayaran::findOrFail($request->pembayaran_id);
            
            // Verifikasi bahwa pembayaran ini milik siswa yang sedang login
            $siswa = Siswa::where('id_user', $request->user()->id)->first();

            if (!$siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            if ($pembayaran->nik_siswa != $siswa->nik) {
                throw new \Exception('Data pembayaran tidak sesuai');
            }
            
            // Hapus file lama jika ada
            if ($pembayaran->bukti_pembayaran) {
                $oldPath = str_replace('/storage/', '', $pembayaran->bukti_pembayaran);
                Storage::disk('public')->delete($oldPath);
            }

            // Upload file baru
            $file = $request->file('bukti_pembayaran');
            $filename = 'bukti_' . time() . '_' . $pembayaran->kode_pembayaran . '.' . $file->getClientOriginalExtension();
            
            // Pastikan folder exists
            Storage::disk('public')->makeDirectory('bukti_pembayaran');
            
            // Simpan file
            $path = $file->storeAs('bukti_pembayaran', $filename, 'public');
            
            // Update database
            $pembayaran->update([
                'bukti_pembayaran' => '/storage/' . $path,
                'status' => 'menunggu',
                'keterangan' => null
            ]);

            // Kirim notifikasi ke Telegram
            $chatId = env('TELEGRAM_CHAT_ID', ''); // Tambahkan TELEGRAM_CHAT_ID di .env
            $message = "⚠️ KAK LEN ADA NOTIFIKASI PEMBAYARAN CEK SEKARANG JUGA!!! ⚠️\n\n" .
                    "Nama Calon: {$siswa->nama}\n" .
                    "NIK: {$siswa->nik}\n" .
                    "Kode Pembayaran: {$pembayaran->kode_pembayaran}\n" .
                    "Jumlah: Rp " . number_format($pembayaran->jumlah, 0, ',', '.') . "\n" .
                    "Status: Menunggu Verifikasi\n" .
                    "Waktu Upload: " . now()->format('d-m-Y H:i:s');

            \Telegram\Bot\Laravel\Facades\Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => $message,
            ]);

            DB::commit();
            return back()->with('message', 'Bukti pembayaran berhasil diupload');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Upload SKL dalam bentuk PDF
     */
    public function uploadSKL(Request $request)
    {
        $request->validate([
            'skl' => 'required|mimes:pdf|max:5120', // Maksimal 5MB
            'pembayaran_id' => 'required|exists:pembayaran,id'
        ]);

        try {
            DB::beginTransaction();
            
            $pembayaran = Pembayaran::findOrFail($request->pembayaran_id);
            
            // Verifikasi bahwa pembayaran ini milik siswa yang sedang login
            $siswa = Siswa::where('id_user', $request->user()->id)->first();

            if (!$siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            if ($pembayaran->nik_siswa != $siswa->nik) {
                throw new \Exception('Data pembayaran tidak sesuai');
            }
            
            // Hapus file lama jika ada
            if ($pembayaran->skl) {
                $oldPath = str_replace('/storage/', '', $pembayaran->skl);
                Storage::disk('public')->delete($oldPath);
            }

            // Upload file SKL baru
            $file = $request->file('skl');
            $filename = 'skl_' . time() . '_' . $siswa->nik . '.' . $file->getClientOriginalExtension();
            
            // Pastikan folder exists
            Storage::disk('public')->makeDirectory('dokumen_siswa');
            
            // Simpan file
            $path = $file->storeAs('dokumen_siswa', $filename, 'public');
            
            // Update database
            $pembayaran->update([
                'skl' => '/storage/' . $path
            ]);

            // Notifikasi Telegram dihapus

            DB::commit();
            return back()->with('message', 'Dokumen SKL berhasil diupload');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Upload Rapor dalam bentuk PDF
     */
    public function uploadRapor(Request $request)
    {
        $request->validate([
            'rapor' => 'required|mimes:pdf|max:5120', // Maksimal 5MB
            'pembayaran_id' => 'required|exists:pembayaran,id'
        ]);

        try {
            DB::beginTransaction();
            
            $pembayaran = Pembayaran::findOrFail($request->pembayaran_id);
            
            // Verifikasi bahwa pembayaran ini milik siswa yang sedang login
            $siswa = Siswa::where('id_user', $request->user()->id)->first();

            if (!$siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            if ($pembayaran->nik_siswa != $siswa->nik) {
                throw new \Exception('Data pembayaran tidak sesuai');
            }
            
            // Hapus file lama jika ada
            if ($pembayaran->rapor) {
                $oldPath = str_replace('/storage/', '', $pembayaran->rapor);
                Storage::disk('public')->delete($oldPath);
            }

            // Upload file Rapor baru
            $file = $request->file('rapor');
            $filename = 'rapor_' . time() . '_' . $siswa->nik . '.' . $file->getClientOriginalExtension();
            
            // Pastikan folder exists
            Storage::disk('public')->makeDirectory('dokumen_siswa');
            
            // Simpan file
            $path = $file->storeAs('dokumen_siswa', $filename, 'public');
            
            // Update database
            $pembayaran->update([
                'rapor' => '/storage/' . $path
            ]);

            // Notifikasi Telegram dihapus

            DB::commit();
            return back()->with('message', 'Dokumen Rapor berhasil diupload');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
