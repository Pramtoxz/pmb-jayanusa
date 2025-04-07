<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with('siswa')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pembayaran) {
                return [
                    'id' => $pembayaran->id,
                    'kode' => $pembayaran->kode_pembayaran,
                    'nama' => $pembayaran->siswa->nama,
                    'nik' => $pembayaran->nik_siswa,
                    'jumlah' => $pembayaran->jumlah,
                    'status' => $pembayaran->status,
                    'bukti' => $pembayaran->bukti_pembayaran,
                    'skl' => $pembayaran->skl,
                    'rapor' => $pembayaran->rapor,
                    'keterangan' => $pembayaran->keterangan,
                    'tanggal' => $pembayaran->created_at->format('d M Y'),
                ];
            });

        return Inertia::render('Pembayaran/index', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function update(Request $request, Pembayaran $pembayaran)
    {
        $request->validate([
            'status' => 'required|in:dibayar,menunggu,ditolak',
            'keterangan' => $request->status === 'ditolak' ? 'required|string' : 'nullable|string'
        ]);

        $pembayaran->update([
            'status' => $request->status,
            'keterangan' => $request->keterangan
        ]);

        return back()->with('message', 'Status pembayaran berhasil diperbarui');
    }

    public function show(Pembayaran $pembayaran)
    {
        $paymentData = [
            'id' => $pembayaran->id,
            'kode' => $pembayaran->kode_pembayaran,
            'nama' => $pembayaran->siswa->nama,
            'nik' => $pembayaran->nik_siswa,
            'jumlah' => $pembayaran->jumlah,
            'status' => $pembayaran->status,
            'bukti' => $pembayaran->bukti_pembayaran,
            'skl' => $pembayaran->skl,
            'rapor' => $pembayaran->rapor,
            'keterangan' => $pembayaran->keterangan,
            'tanggal' => $pembayaran->created_at->format('d M Y'),
        ];

        return Inertia::render('Pembayaran/Show', [
            'pembayaran' => $paymentData
        ]);
    }

    public function uploadSuratLulus(Request $request, Pembayaran $pembayaran)
    {
        $request->validate([
            'suratlulus' => 'required|file|mimes:pdf|max:5120', // Max 5MB
        ]);

        // Hapus file lama jika ada
        if ($pembayaran->suratlulus) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $pembayaran->suratlulus));
        }

        // Upload file baru
        $path = $request->file('suratlulus')->store('surat_lulus', 'public');
        
        // Update database
        $pembayaran->update([
            'suratlulus' => '/storage/' . $path
        ]);

        return back()->with('message', 'Surat Lulus berhasil diupload');
    }
} 