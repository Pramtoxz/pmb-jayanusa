<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\PembayaranDaftarUlang;

class LaporanController extends Controller
{
    public function index()
    {
        return Inertia::render('Laporan/Index');
    }

    public function periode(Request $request)
    {
        $request->validate([
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'status' => 'nullable|string|in:dibayar,menunggu,ditolak,all',
            'program_studi' => 'nullable|string|in:MI,SI,SK,all'
        ]);

        $tanggalAwal = $request->tanggal_awal . ' 00:00:00';
        $tanggalAkhir = $request->tanggal_akhir . ' 23:59:59';

        Log::info('Request data:', [
            'tanggal_awal' => $tanggalAwal,
            'tanggal_akhir' => $tanggalAkhir,
            'status' => $request->status,
            'program_studi' => $request->program_studi
        ]);

        $query = Pembayaran::with('siswa')
            ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir]);
        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        if ($request->has('program_studi') && $request->program_studi && $request->program_studi !== 'all') {
            $query->whereHas('siswa', function($q) use ($request) {
                $q->where('program_studi', $request->program_studi);
            });
        }

        $pembayaran = $query->get();

        Log::info('Pembayaran data:', [
            'count' => $pembayaran->count(),
            'total' => $pembayaran->sum('jumlah')
        ]);

        return Inertia::render('Laporan/Index', [
            'flash' => [
                'data' => [
                    'data' => $pembayaran,
                    'total' => $pembayaran->sum('jumlah'),
                    'total_siswa' => $pembayaran->count(),
                ]
            ]
        ]);
    }

    public function siswa(Request $request)
    {
        $query = Siswa::with(['user', 'pembayaran']);

        if ($request->has('tanggal_awal') && $request->has('tanggal_akhir')) {
            $query->whereBetween('created_at', [
                $request->tanggal_awal . ' 00:00:00',
                $request->tanggal_akhir . ' 23:59:59'
            ]);
        }
        if ($request->has('kelas') && $request->kelas && $request->kelas !== 'all') {
            $query->where('kelas', $request->kelas);
        }
        if ($request->has('program_studi') && $request->program_studi && $request->program_studi !== 'all') {
            $query->where('program_studi', $request->program_studi);
        }

        $siswa = $query->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($siswa) {
                return [
                    'nik' => $siswa->nik,
                    'nama' => $siswa->nama,
                    'program_studi' => match($siswa->program_studi) {
                        'MI' => 'D3-Manajemen Informatika',
                        'SI' => 'S1-Sistem Informasi',
                        'SK' => 'S1-Sistem Komputer',
                        default => $siswa->program_studi,
                    },
                    'kelas' => $siswa->kelas,
                    'beasiswa' => $siswa->beasiswa,
                    'status_pembayaran' => $siswa->pembayaran->first()?->status ?? 'belum ada',
                    'tanggal_daftar' => $siswa->created_at->format('d M Y'),
                ];
            });

        if ($request->isMethod('post')) {
            return Inertia::render('Laporan/Siswa', [
                'flash' => [
                    'data' => [
                        'siswa' => $siswa
                    ]
                ]
            ]);
        }

        return Inertia::render('Laporan/Siswa', [
            'siswa' => $siswa
        ]);
    }

    public function downloadPdf(Request $request)
    {
        $request->validate([
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'status' => 'nullable|string|in:dibayar,menunggu,ditolak,all',
            'program_studi' => 'nullable|string|in:MI,SI,SK,all'
        ]);

        $tanggalAwal = $request->tanggal_awal . ' 00:00:00';
        $tanggalAkhir = $request->tanggal_akhir . ' 23:59:59';

        $query = Pembayaran::with('siswa')
            ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir]);

        if ($request->has('status') && $request->status !== 'all' && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->has('program_studi') && $request->program_studi !== 'all' && $request->program_studi !== '') {
            $query->whereHas('siswa', function($q) use ($request) {
                $q->where('program_studi', $request->program_studi);
            });
        }

        $pembayaran = $query->get();
        $total = $pembayaran->sum('jumlah');
        $totalSiswa = $pembayaran->count();

        $pdf = Pdf::loadView('laporan.pdf', [
            'pembayaran' => $pembayaran,
            'total' => $total,
            'totalSiswa' => $totalSiswa,
            'tanggalAwal' => $request->tanggal_awal,
            'tanggalAkhir' => $request->tanggal_akhir,
            'status' => $request->status === 'all' ? 'Semua Status' : ucfirst($request->status),
            'program_studi' => $request->program_studi === 'all' ? 'Semua Program Studi' : match($request->program_studi) {
                'MI' => 'D3-Manajemen Informatika',
                'SI' => 'S1-Sistem Informasi',
                'SK' => 'S1-Sistem Komputer',
                default => $request->program_studi,
            }
        ]);

        return $pdf->download('laporan-pembayaran.pdf');
    }

    public function downloadPdfSiswa(Request $request)
    {
        $request->validate([
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'kelas' => 'nullable|string|in:reguler,kerja,all',
            'program_studi' => 'nullable|string|in:MI,SI,SK,all'
        ]);

        $query = Siswa::with(['user', 'pembayaran']);

        if ($request->has('tanggal_awal') && $request->has('tanggal_akhir')) {
            $query->whereBetween('created_at', [
                $request->tanggal_awal . ' 00:00:00',
                $request->tanggal_akhir . ' 23:59:59'
            ]);
        }

        if ($request->has('kelas') && $request->kelas && $request->kelas !== 'all') {
            $query->where('kelas', $request->kelas);
        }

        if ($request->has('program_studi') && $request->program_studi && $request->program_studi !== 'all') {
            $query->where('program_studi', $request->program_studi);
        }

        $siswa = $query->orderBy('created_at', 'desc')->get();

        $pdf = Pdf::loadView('laporan.siswa-pdf', [
            'siswa' => $siswa,
            'tanggalAwal' => $request->tanggal_awal,
            'tanggalAkhir' => $request->tanggal_akhir,
            'kelas' => $request->kelas === 'all' ? 'Semua Kelas' : ucfirst($request->kelas),
            'program_studi' => $request->program_studi === 'all' ? 'Semua Program Studi' : match($request->program_studi) {
                'MI' => 'D3-Manajemen Informatika',
                'SI' => 'S1-Sistem Informasi',
                'SK' => 'S1-Sistem Komputer',
                default => $request->program_studi,
            }
        ]);

        return $pdf->download('laporan-siswa.pdf');
    }

    public function daftarUlang(Request $request)
    {
        if ($request->isMethod('get') && !$request->has('tanggal_awal')) {
            return Inertia::render('Laporan/DaftarUlang');
        }

        $request->validate([
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'status' => 'nullable|string|in:dibayar,menunggu,ditolak,all',
            'program_studi' => 'nullable|string|in:MI,SI,SK,all'
        ]);

        $tanggalAwal = $request->tanggal_awal . ' 00:00:00';
        $tanggalAkhir = $request->tanggal_akhir . ' 23:59:59';

        $query = PembayaranDaftarUlang::with('siswa')
            ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir]);

        if ($request->has('status') && $request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        if ($request->has('program_studi') && $request->program_studi && $request->program_studi !== 'all') {
            $query->whereHas('siswa', function($q) use ($request) {
                $q->where('program_studi', $request->program_studi);
            });
        }

        $daftarUlang = $query->get();

        return Inertia::render('Laporan/DaftarUlang', [
            'flash' => [
                'data' => [
                    'data' => $daftarUlang,
                    'total_siswa' => $daftarUlang->count(),
                ]
            ]
        ]);
    }

    public function downloadPdfDaftarUlang(Request $request)
    {
        $request->validate([
            'tanggal_awal' => 'required|date',
            'tanggal_akhir' => 'required|date|after_or_equal:tanggal_awal',
            'status' => 'nullable|string|in:dibayar,menunggu,ditolak,all',
            'program_studi' => 'nullable|string|in:MI,SI,SK,all'
        ]);

        $tanggalAwal = $request->tanggal_awal . ' 00:00:00';
        $tanggalAkhir = $request->tanggal_akhir . ' 23:59:59';

        $query = PembayaranDaftarUlang::with('siswa')
            ->whereBetween('created_at', [$tanggalAwal, $tanggalAkhir]);

        if ($request->has('status') && $request->status !== 'all' && $request->status !== '') {
            $query->where('status', $request->status);
        }

        if ($request->has('program_studi') && $request->program_studi !== 'all' && $request->program_studi !== '') {
            $query->whereHas('siswa', function($q) use ($request) {
                $q->where('program_studi', $request->program_studi);
            });
        }

        $daftarUlang = $query->get();
        $totalSiswa = $daftarUlang->count();

        $pdf = Pdf::loadView('laporan.daftar-ulang-pdf', [
            'daftarUlang' => $daftarUlang,
            'totalSiswa' => $totalSiswa,
            'tanggalAwal' => $request->tanggal_awal,
            'tanggalAkhir' => $request->tanggal_akhir,
            'status' => $request->status === 'all' ? 'Semua Status' : ucfirst($request->status),
            'program_studi' => $request->program_studi === 'all' ? 'Semua Program Studi' : match($request->program_studi) {
                'MI' => 'D3-Manajemen Informatika',
                'SI' => 'S1-Sistem Informasi',
                'SK' => 'S1-Sistem Komputer',
                default => $request->program_studi,
            }
        ]);

        return $pdf->download('laporan-daftar-ulang.pdf');
    }
} 