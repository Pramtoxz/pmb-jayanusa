<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
