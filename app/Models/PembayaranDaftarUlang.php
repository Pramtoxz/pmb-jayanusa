<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PembayaranDaftarUlang extends Model
{
    protected $table = 'pembayaran_daftar_ulang';

    protected $fillable = [
        'kode_pembayaran',
        'nik_siswa',
        'bank',
        'bukti_pembayaran',
        'keterangan',
        'status',
        'catatan_admin'
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'nik_siswa', 'nik');
    }
}
