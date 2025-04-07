<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pembayaran extends Model
{
    protected $table = 'pembayaran';

    protected $fillable = [
        'kode_pembayaran',
        'jumlah',
        'status',
        'bukti_pembayaran',
        'keterangan',
        'nik_siswa',
        'skl',
        'rapor',
        'suratlulus'
    ];

    public function siswa(): BelongsTo
    {
        return $this->belongsTo(Siswa::class, 'nik_siswa', 'nik');
    }
}
