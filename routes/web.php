<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ControllerSiswa;
use App\Http\Controllers\CalonMahasiswaController;
use App\Http\Controllers\PembayaranController;
use Telegram\Bot\Laravel\Facades\Telegram;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (\Illuminate\Http\Request $request) {
        return match ($request->user()->role) {
            'admin' => Inertia::render('dashboard', [
                'stats' => [
                    'total_pendaftar' => \App\Models\Siswa::count(),
                    'pembayaran_pending' => \App\Models\Pembayaran::where('status', 'menunggu')->count(),
                    'pembayaran_diterima' => \App\Models\Pembayaran::where('status', 'dibayar')->count(),
                ]
            ]),
            'user' => redirect()->route('home'),
            default => abort(403),
        };
    })->name('dashboard');
    
    Route::get('/siswa/profile', [ControllerSiswa::class, 'index'])->name('siswa.profile');

    Route::post('/pendaftaran', [ControllerSiswa::class, 'store'])->name('siswa.store');

    Route::get('/siswa/pembayaran', [ControllerSiswa::class, 'pembayaran'])->name('siswa.pembayaran');

    Route::post('/siswa/pembayaran/upload', [ControllerSiswa::class, 'uploadBuktiPembayaran'])->name('siswa.pembayaran.upload');

    // Menambahkan route untuk upload SKL
    Route::post('/siswa/skl/upload', [ControllerSiswa::class, 'uploadSKL'])->name('siswa.skl.upload');

    // Menambahkan route untuk upload Rapor
    Route::post('/siswa/rapor/upload', [ControllerSiswa::class, 'uploadRapor'])->name('siswa.rapor.upload');

    // Admin Routes
    Route::middleware('admin')->group(function () {
        Route::resource('calon-mahasiswa', CalonMahasiswaController::class);
        Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran.index');
        Route::get('/pembayaran/{pembayaran}', [PembayaranController::class, 'show'])->name('pembayaran.show');
        Route::put('/pembayaran/{pembayaran}', [PembayaranController::class, 'update'])->name('pembayaran.update');
        Route::post('/pembayaran/{pembayaran}/suratlulus', [PembayaranController::class, 'uploadSuratLulus'])->name('pembayaran.uploadSuratLulus');
    });

    // Route untuk Telegram
    Route::get("/get-telegram-updates", function () {
        $updates = Telegram::getUpdates();
        return $updates;
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
