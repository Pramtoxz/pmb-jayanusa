<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat User Admin dan User Biasa Dulu
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'role' => 'admin',
                'password' => Hash::make('1234'), // Ganti password default jika perlu
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
             ['email' => 'user@example.com'],
             [
                'name' => 'User',
                'role' => 'user',
                'password' => Hash::make('1234'), // Ganti password default jika perlu
                'email_verified_at' => now(),
            ]
        );


        // Panggil seeder lain
        $this->call([
            SiswaSeeder::class, // Jalankan ini dulu untuk membuat siswa dan pembayaran pendaftaran
            PembayaranDaftarUlangSeeder::class, // Baru jalankan ini setelah siswa ada
        ]);
    }
}
