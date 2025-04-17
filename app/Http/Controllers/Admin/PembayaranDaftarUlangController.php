<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PembayaranDaftarUlang;
use App\Models\Siswa;
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
                    'nik' => $pembayaran->nik_siswa,
                    'bank' => $pembayaran->bank,
                    'status' => $pembayaran->status,
                    'bukti' => $pembayaran->bukti_pembayaran,
                    'keterangan' => $pembayaran->keterangan,
                    'catatan_admin' => $pembayaran->catatan_admin,
                    'tanggal' => $pembayaran->created_at->format('d-m-Y H:i:s'),
                ];
            });

        return Inertia::render('Admin/PembayaranDaftarUlang/Index', [
            'pembayarans' => $pembayarans
        ]);
    }

    public function show(PembayaranDaftarUlang $pembayaranDaftarUlang)
    {
        $pembayaran = [
            'id' => $pembayaranDaftarUlang->id,
            'kode_pembayaran' => $pembayaranDaftarUlang->kode_pembayaran,
            'nama' => $pembayaranDaftarUlang->siswa->nama,
            'nik' => $pembayaranDaftarUlang->nik_siswa,
            'bank' => $pembayaranDaftarUlang->bank,
            'status' => $pembayaranDaftarUlang->status,
            'bukti' => $pembayaranDaftarUlang->bukti_pembayaran,
            'keterangan' => $pembayaranDaftarUlang->keterangan,
            'catatan_admin' => $pembayaranDaftarUlang->catatan_admin,
            'tanggal' => $pembayaranDaftarUlang->created_at->format('d-m-Y H:i:s'),
        ];

        return Inertia::render('Admin/PembayaranDaftarUlang/Show', [
            'pembayaran' => $pembayaran
        ]);
    }

    public function update(Request $request, PembayaranDaftarUlang $pembayaranDaftarUlang)
    {
        $request->validate([
            'status' => 'required|in:menunggu,dibayar,ditolak',
            'catatan_admin' => 'required_if:status,ditolak|nullable|string'
        ]);

        $pembayaranDaftarUlang->update([
            'status' => $request->status,
            'catatan_admin' => $request->catatan_admin
        ]);

        return back()->with('message', 'Status pembayaran berhasil diperbarui');
    }
} 