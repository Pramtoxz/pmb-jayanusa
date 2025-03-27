<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    protected $table = 'siswa';
    protected $primaryKey = 'nik';
    protected $fillable = [
        'nik', 'id_user', 'nama', 'alamat', 'tempat_lahir', 'tanggal_lahir', 
        'jenis_kelamin', 'kota', 'kecamatan', 'kelurahan', 'provinsi', 
        'agama', 'no_hp', 'asal_sekolah', 'tahun_lulus', 'foto', 
        'program_studi', 'beasiswa', 'kelas'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
