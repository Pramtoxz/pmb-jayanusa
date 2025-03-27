<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ControllerSiswa;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function (\Illuminate\Http\Request $request) {
        return match ($request->user()->role) {
            'admin' => Inertia::render('dashboard'),
            'user' => redirect()->route('home'),
            default => abort(403),
        };
    })->name('dashboard');

    Route::get('/siswa/profile', [ControllerSiswa::class, 'index'])->name('siswa.profile');

    Route::post('/pendaftaran', [ControllerSiswa::class, 'store'])->name('siswa.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
