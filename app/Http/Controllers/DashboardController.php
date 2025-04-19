<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Pembayaran;
use App\Models\PembayaranDaftarUlang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return redirect()->route('home');
        }

        $totalPendaftar = Siswa::count();
        $pembayaranPending = Pembayaran::where('status', 'menunggu')->count();
        $pembayaranDiterima = Pembayaran::where('status', 'dibayar')->count();
        $daftarUlangPending = PembayaranDaftarUlang::where('status', 'menunggu')->count();
        $daftarUlangDiterima = PembayaranDaftarUlang::where('status', 'dibayar')->count();

        $siswaTerbaru = Siswa::latest()
            ->take(5)
            ->get(['nik', 'nama', 'asal_sekolah', 'program_studi', 'created_at']);

        $pembayaranTerbaru = Pembayaran::with('siswa')
            ->latest()
            ->take(5)
            ->get()
            ->map(function($pembayaran) {
                return [
                    'kode_pembayaran' => $pembayaran->kode_pembayaran,
                    'jumlah' => $pembayaran->jumlah,
                    'status' => $pembayaran->status,
                    'nama_siswa' => $pembayaran->siswa->nama,
                    'created_at' => $pembayaran->created_at
                ];
            });

        $daftarUlangTerbaru = PembayaranDaftarUlang::with('siswa')
            ->latest()
            ->take(5)
            ->get()
            ->map(function($daftarUlang) {
                return [
                    'kode_pembayaran' => $daftarUlang->kode_pembayaran,
                    'bank' => $daftarUlang->bank,
                    'status' => $daftarUlang->status,
                    'nama_siswa' => $daftarUlang->siswa->nama,
                    'created_at' => $daftarUlang->created_at
                ];
            });

        $statistikProdi = Siswa::select('program_studi', DB::raw('count(*) as total'))
            ->groupBy('program_studi')
            ->get();

        $statistikPembayaran = [
            'labels' => ['Diterima', 'Pending', 'Ditolak'],
            'data' => [
                Pembayaran::where('status', 'dibayar')->count(),
                Pembayaran::where('status', 'menunggu')->count(),
                Pembayaran::where('status', 'ditolak')->count()
            ]
        ];

        $statistikDaftarUlang = [
            'labels' => ['Diterima', 'Pending', 'Ditolak'],
            'data' => [
                PembayaranDaftarUlang::where('status', 'dibayar')->count(),
                PembayaranDaftarUlang::where('status', 'menunggu')->count(),
                PembayaranDaftarUlang::where('status', 'ditolak')->count()
            ]
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'total_pendaftar' => $totalPendaftar,
                'pembayaran_pending' => $pembayaranPending,
                'pembayaran_diterima' => $pembayaranDiterima,
                'daftar_ulang_pending' => $daftarUlangPending,
                'daftar_ulang_diterima' => $daftarUlangDiterima,
                'siswa_terbaru' => $siswaTerbaru,
                'pembayaran_terbaru' => $pembayaranTerbaru,
                'daftar_ulang_terbaru' => $daftarUlangTerbaru,
                'statistik_prodi' => $statistikProdi,
                'statistik_pembayaran' => $statistikPembayaran,
                'statistik_daftar_ulang' => $statistikDaftarUlang
            ]
        ]);
    }
} 