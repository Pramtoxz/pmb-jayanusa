<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Siswa;
use App\Models\Pembayaran;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class SiswaSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $programStudi = ['MI', 'SI', 'SK'];
        $agama = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];
        $kota = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Yogyakarta'];
        
        for ($i = 1; $i <= 20; $i++) {
            DB::transaction(function () use ($i, $programStudi, $agama, $kota) {
                // Buat user
                $user = User::create([
                    'name' => "Siswa Test {$i}",
                    'email' => "siswa{$i}@example.com",
                    'password' => Hash::make('1234'),
                    'role' => 'user'
                ]);

                // Generate NIK unik 16 digit
                $nik = date('ymd') . str_pad($i, 10, '0', STR_PAD_LEFT);
                
                // Status beasiswa random
                $beasiswa = rand(0, 1) ? 'iya' : 'tidak';
                $kelas = null;

                if ($beasiswa === 'tidak') {
                    $kelas = rand(0, 1) ? 'reguler' : 'kerja';
                }
                
                // Buat data siswa
                $siswa = Siswa::create([
                    'nik' => $nik,
                    'id_user' => $user->id,
                    'nama' => "Siswa Test {$i}",
                    'alamat' => "Jl. Test No. {$i}, " . $kota[array_rand($kota)],
                    'tempat_lahir' => $kota[array_rand($kota)],
                    'tanggal_lahir' => date('Y-m-d', strtotime("-" . rand(18, 25) . " years")),
                    'jenis_kelamin' => rand(0, 1) ? 'L' : 'P',
                    'kota' => $kota[array_rand($kota)],
                    'kecamatan' => 'Kecamatan ' . rand(1, 5),
                    'kelurahan' => 'Kelurahan ' . rand(1, 5),
                    'provinsi' => 'Provinsi ' . $kota[array_rand($kota)],
                    'agama' => $agama[array_rand($agama)],
                    'no_hp' => '08' . rand(100000000, 999999999),
                    'asal_sekolah' => "SMAN " . rand(1, 20) . " " . $kota[array_rand($kota)],
                    'tahun_lulus' => (string)rand(2020, 2023),
                    'program_studi' => $programStudi[array_rand($programStudi)],
                    'foto' => null,
                    'beasiswa' => $beasiswa,
                    'kelas' => $kelas,
                ]);

                // Buat data pembayaran
                Pembayaran::create([
                    'kode_pembayaran' => 'PMB-' . date('Y') . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'jumlah' => 200000,
                    'status' => ['menunggu', 'dibayar', 'ditolak'][rand(0, 2)],
                    'nik_siswa' => $nik,
                    'keterangan' => 'Biaya Pendaftaran Mahasiswa Baru',
                    'bukti_pembayaran' => null
                ]);
            });
        }
    }
}
