<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PembayaranDaftarUlang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PembayaranDaftarUlangController extends Controller
{
    public function index()
    {
        $pembayarans = PembayaranDaftarUlang::with('siswa')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($pembayaran) {
                return [
                    'id' => $pembayaran->id,
                    'kode_pembayaran' => $pembayaran->kode_pembayaran,
                    'nama' => $pembayaran->siswa->nama,
                    'nik' => $pembayaran->siswa->nik,
                    'bank' => $pembayaran->bank,
                    'status' => $pembayaran->status,
                    'bukti' => $pembayaran->bukti_pembayaran,
                    'keterangan' => $pembayaran->keterangan,
                    'catatan_admin' => $pembayaran->catatan_admin,
                    'tanggal' => $pembayaran->created_at->format('d/m/Y H:i'),
                ];
            });

        return Inertia::render('Admin/PembayaranDaftarUlang/Index', [
            'pembayarans' => $pembayarans,
        ]);
    }

    public function show(PembayaranDaftarUlang $pembayaranDaftarUlang)
    {
        $pembayaran = [
            'id' => $pembayaranDaftarUlang->id,
            'kode_pembayaran' => $pembayaranDaftarUlang->kode_pembayaran,
            'nama' => $pembayaranDaftarUlang->siswa->nama,
            'nik' => $pembayaranDaftarUlang->siswa->nik,
            'bank' => $pembayaranDaftarUlang->bank,
            'status' => $pembayaranDaftarUlang->status,
            'bukti' => $pembayaranDaftarUlang->bukti_pembayaran,
            'keterangan' => $pembayaranDaftarUlang->keterangan,
            'catatan_admin' => $pembayaranDaftarUlang->catatan_admin,
            'tanggal' => $pembayaranDaftarUlang->created_at->format('d/m/Y H:i'),
        ];

        return Inertia::render('Admin/PembayaranDaftarUlang/Show', [
            'pembayaran' => $pembayaran,
        ]);
    }

    public function verify(Request $request, PembayaranDaftarUlang $pembayaranDaftarUlang)
    {
        $request->validate([
            'status' => 'required|in:dibayar,ditolak',
            'catatan_admin' => 'required_if:status,ditolak|nullable|string',
        ]);

        $pembayaranDaftarUlang->update([
            'status' => $request->status,
            'catatan_admin' => $request->catatan_admin,
        ]);

        return redirect()->route('admin.daftar-ulang.index')
            ->with('success', 'Status pembayaran berhasil diperbarui');
    }
} 