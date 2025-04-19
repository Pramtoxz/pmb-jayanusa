<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ControllerSiswa;
use App\Http\Controllers\CalonMahasiswaController;
use App\Http\Controllers\PembayaranController;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PembayaranDaftarUlangController;
use App\Http\Controllers\Admin\PembayaranDaftarUlangController as AdminPembayaranDaftarUlangController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/siswa/profile', [ControllerSiswa::class, 'index'])->name('siswa.profile');
    Route::post('/pendaftaran', [ControllerSiswa::class, 'store'])->name('siswa.store');
    Route::get('/siswa/pembayaran', [ControllerSiswa::class, 'pembayaran'])->name('siswa.pembayaran');
    Route::post('/siswa/pembayaran/upload', [ControllerSiswa::class, 'uploadBuktiPembayaran'])->name('siswa.pembayaran.upload');
    Route::post('/siswa/skl/upload', [ControllerSiswa::class, 'uploadSKL'])->name('siswa.skl.upload');
    Route::post('/siswa/rapor/upload', [ControllerSiswa::class, 'uploadRapor'])->name('siswa.rapor.upload');
    Route::post('/siswa/daftar-ulang', [PembayaranDaftarUlangController::class, 'store'])->name('siswa.daftar-ulang.store');
    Route::put('/siswa/daftar-ulang/{pembayaranDaftarUlang}', [PembayaranDaftarUlangController::class, 'update'])->name('siswa.daftar-ulang.update');
    Route::get('/siswa/daftar-ulang', [PembayaranDaftarUlangController::class, 'create'])->name('siswa.daftar-ulang');
    Route::post('/siswa/daftar-ulang/upload', [PembayaranDaftarUlangController::class, 'upload'])->name('siswa.daftar-ulang.upload');
    Route::post('/siswa/daftar-ulang/upload/{pembayaranDaftarUlang}', [PembayaranDaftarUlangController::class, 'upload'])->name('siswa.daftar-ulang.upload.update');

    Route::middleware('admin')->group(function () {
        Route::resource('calon-mahasiswa', CalonMahasiswaController::class);
        Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran.index');
        Route::get('/pembayaran/{pembayaran}', [PembayaranController::class, 'show'])->name('pembayaran.show');
        Route::put('/pembayaran/{pembayaran}', [PembayaranController::class, 'update'])->name('pembayaran.update');
        Route::post('/pembayaran/{pembayaran}/suratlulus', [PembayaranController::class, 'uploadSuratLulus'])->name('pembayaran.uploadSuratLulus');
        Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
        Route::get('/laporan/periode', [LaporanController::class, 'index'])->name('laporan.index');
        Route::post('/laporan/periode', [LaporanController::class, 'periode'])->name('laporan.periode');
        Route::post('/laporan/download-pdf', [LaporanController::class, 'downloadPdf'])->name('laporan.download-pdf');
        Route::get('/laporan/siswa', [LaporanController::class, 'siswa'])->name('laporan.siswa');
        Route::post('/laporan/siswa', [LaporanController::class, 'siswa'])->name('laporan.siswa.filter');
        Route::post('/laporan/siswa/download-pdf', [LaporanController::class, 'downloadPdfSiswa'])->name('laporan.siswa.download-pdf');
        
        // Route untuk admin daftar ulang
        Route::get('/admin/daftar-ulang', [AdminPembayaranDaftarUlangController::class, 'index'])->name('admin.daftar-ulang.index');
        Route::get('/admin/daftar-ulang/{pembayaranDaftarUlang}', [AdminPembayaranDaftarUlangController::class, 'show'])->name('admin.daftar-ulang.show');
        Route::put('/admin/daftar-ulang/{pembayaranDaftarUlang}', [AdminPembayaranDaftarUlangController::class, 'verify'])->name('admin.daftar-ulang.verify');
        
        // Route alternatif untuk kompatibilitas
        Route::get('/admin/pembayaran-daftar-ulang', [AdminPembayaranDaftarUlangController::class, 'index'])->name('admin.pembayaran-daftar-ulang.index');
        Route::get('/admin/pembayaran-daftar-ulang/{pembayaranDaftarUlang}', [AdminPembayaranDaftarUlangController::class, 'show'])->name('admin.pembayaran-daftar-ulang.show');
        Route::put('/admin/pembayaran-daftar-ulang/{pembayaranDaftarUlang}', [AdminPembayaranDaftarUlangController::class, 'verify'])->name('admin.pembayaran-daftar-ulang.verify');
    });

    // Route untuk Telegram
    Route::get("/get-telegram-updates", function () {
        $updates = Telegram::getUpdates();
        return $updates;
    });

    Route::get('/laporan/daftar-ulang', [LaporanController::class, 'daftarUlang'])->name('laporan.daftar-ulang');
    Route::post('/laporan/daftar-ulang', [LaporanController::class, 'daftarUlang'])->name('laporan.daftar-ulang.filter');
    Route::post('/laporan/daftar-ulang/download-pdf', [LaporanController::class, 'downloadPdfDaftarUlang'])->name('laporan.daftar-ulang.download-pdf');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
