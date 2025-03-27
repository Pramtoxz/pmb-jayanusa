<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->string('nik')->primary();
            $table->foreignId('id_user')->constrained('users');
            $table->string('nama');
            $table->string('alamat');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('kota');
            $table->string('kecamatan');
            $table->string('kelurahan');
            $table->string('provinsi');
            $table->string('agama');
            $table->string('no_hp');
            $table->string('asal_sekolah');
            $table->string('tahun_lulus');
            $table->string('foto');
            $table->enum('program_studi', ['MI', 'SI', 'SK']);
            $table->enum('beasiswa', ['iya', 'tidak']);
            $table->enum('kelas', ['reguler', 'kerja']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
