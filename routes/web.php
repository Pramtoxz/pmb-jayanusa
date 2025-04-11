<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ControllerSiswa;
use App\Http\Controllers\CalonMahasiswaController;
use App\Http\Controllers\PembayaranController;
use Telegram\Bot\Laravel\Facades\Telegram;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LaporanController;

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
    });

    // Route untuk Telegram
    Route::get("/get-telegram-updates", function () {
        $updates = Telegram::getUpdates();
        return $updates;
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
