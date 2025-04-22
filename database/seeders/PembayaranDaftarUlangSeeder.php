<?php

namespace Database\Seeders;

use App\Models\PembayaranDaftarUlang;
use App\Models\Siswa;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents; // Komentar ini bisa dihapus jika tidak digunakan
use Illuminate\Database\Seeder;
use Illuminate\Support\Str; // Pastikan Str facade di-import

class PembayaranDaftarUlangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil beberapa siswa yang pembayaran pendaftarannya 'dibayar'
        // Kita perlu join atau filter berdasarkan status pembayaran pendaftaran
        $siswasLulus = Siswa::whereHas('pembayaran', function ($query) {
            $query->where('status', 'dibayar');
        })->take(5)->get(); // Ambil 5 siswa pertama yang 'lulus'

        $banks = ['BRI', 'BNI', 'Mandiri', 'BCA'];
        $statuses = ['menunggu', 'dibayar', 'ditolak'];

        if ($siswasLulus->isEmpty()) {
            $this->command->warn('Tidak ada data siswa yang lulus (pembayaran "dibayar") untuk membuat data pembayaran daftar ulang. Jalankan SiswaSeeder terlebih dahulu dan pastikan ada siswa dengan status pembayaran "dibayar".');
            return;
        }

        foreach ($siswasLulus as $index => $siswa) {
            PembayaranDaftarUlang::create([
                'kode_pembayaran' => 'DU-' . date('Y') . '-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT) . Str::upper(Str::random(3)), // Buat kode unik dengan tambahan random string
                'nik_siswa' => $siswa->nik,
                'bank' => $banks[array_rand($banks)], // Bank random
                'bukti_pembayaran' => null, // Atau path ke bukti default
                'keterangan' => 'Pembayaran Daftar Ulang untuk ' . $siswa->nama,
                'status' => $statuses[array_rand($statuses)], // Status random
                'catatan_admin' => null,
            ]);
        }
    }
} 