<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
class SiswaSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'nik' => '1234567890',
            'id_user' => '1',
            'nama' => 'User',
            'alamat' => 'Jl. User',
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '2000-01-01',
            'jenis_kelamin' => 'Laki-laki',
            'agama' => 'Islam',
            'no_hp' => '081234567890',
            'asal_sekolah' => 'SMA Negeri 1',
            'tahun_lulus' => '2020',
            'program_studi' => 'MI',
        ]);

        User::factory()->create([
            'nik' => '1234567890',
            'id_user' => '2',
            'nama' => 'Admin',
            'alamat' => 'Jl. Admin',
            'tempat_lahir' => 'Jakarta',
            'tanggal_lahir' => '2000-01-01',
            'jenis_kelamin' => 'Laki-laki',
            'agama' => 'Islam',
            'no_hp' => '081234567890',
            'asal_sekolah' => 'SMA Negeri 1',
            'tahun_lulus' => '2020',
            'program_studi' => 'SI',
        ]);
    }
}
