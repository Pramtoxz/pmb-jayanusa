<?php

namespace App\Http\Controllers;

use App\Models\PembayaranDaftarUlang;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PembayaranDaftarUlangController extends Controller
{
    public function __construct()
    {
        // Buat folder jika belum ada
        if (!Storage::disk('public')->exists('bukti_daftar_ulang')) {
            Storage::disk('public')->makeDirectory('bukti_daftar_ulang');
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'bank' => 'required|in:nagari,bni,bri,mandiri',
            'keterangan' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();
            
            $siswa = Auth::user()->siswa;

            if (!$siswa) {
                throw new \Exception('Data siswa tidak ditemukan');
            }

            // Generate kode pembayaran
            $kodePembayaran = 'DU-' . date('Y') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);

            // Upload bukti pembayaran
            $file = $request->file('bukti_pembayaran');
            $filename = 'daftar_ulang_' . time() . '_' . $kodePembayaran . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->makeDirectory('bukti_daftar_ulang');
            $path = $file->storeAs('bukti_daftar_ulang', $filename, 'public');

            // Buat record pembayaran daftar ulang
            $pembayaranDaftarUlang = PembayaranDaftarUlang::create([
                'kode_pembayaran' => $kodePembayaran,
                'nik_siswa' => $siswa->nik,
                'bank' => $request->bank,
                'bukti_pembayaran' => '/storage/' . $path,
                'keterangan' => $request->keterangan,
                'status' => 'menunggu'
            ]);

            // Kirim notifikasi ke Telegram
            $chatId = env('TELEGRAM_CHAT_ID', '');
            $message = "⚠️ KAK LEN ADA NOTIFIKASI PEMBAYARAN DAFTAR ULANG CEK SEKARANG JUGA!!! ⚠️\n\n" .
                    "Nama Calon: {$siswa->nama}\n" .
                    "NIK: {$siswa->nik}\n" .
                    "Kode Pembayaran: {$pembayaranDaftarUlang->kode_pembayaran}\n" .
                    "Bank: " . strtoupper($request->bank) . "\n" .
                    "Status: Menunggu Verifikasi\n" .
                    "Waktu Upload: " . now()->format('d-m-Y H:i:s');

            \Telegram\Bot\Laravel\Facades\Telegram::sendMessage([
                'chat_id' => $chatId,
                'text' => $message,
            ]);

            DB::commit();
            return back()->with('message', 'Bukti pembayaran daftar ulang berhasil diupload');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function update(Request $request, PembayaranDaftarUlang $pembayaranDaftarUlang)
    {
        $request->validate([
            'bukti_pembayaran' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'bank' => 'required|in:nagari,bni,bri,mandiri',
            'keterangan' => 'nullable|string'
        ]);

        try {
            DB::beginTransaction();

            if ($pembayaranDaftarUlang->bukti_pembayaran) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pembayaranDaftarUlang->bukti_pembayaran));
            }

            $file = $request->file('bukti_pembayaran');
            $filename = 'daftar_ulang_' . time() . '_' . $pembayaranDaftarUlang->kode_pembayaran . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('bukti_daftar_ulang', $filename, 'public');

            $pembayaranDaftarUlang->update([
                'bank' => $request->bank,
                'bukti_pembayaran' => '/storage/' . $path,
                'keterangan' => $request->keterangan,
                'status' => 'menunggu',
                'catatan_admin' => null
            ]);

            DB::commit();
            return back()->with('message', 'Bukti pembayaran daftar ulang berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function create()
    {
        $siswa = Auth::user()->siswa;
        // Ambil data pembayaran daftar ulang berdasarkan nik siswa
        $pembayaranDaftarUlang = PembayaranDaftarUlang::where('nik_siswa', $siswa->nik)->first();

        return Inertia::render('siswa/daftarulang', [
            'siswa' => $siswa,
            'pembayaranDaftarUlang' => $pembayaranDaftarUlang
        ]);
    }
}