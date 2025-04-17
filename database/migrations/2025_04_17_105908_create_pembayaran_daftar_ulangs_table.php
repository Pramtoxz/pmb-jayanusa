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
        Schema::create('pembayaran_daftar_ulang', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pembayaran')->unique();
            $table->string('nik_siswa');
            $table->string('bank');
            $table->string('bukti_pembayaran')->nullable();
            $table->text('keterangan')->nullable();
            $table->enum('status', ['menunggu', 'dibayar', 'ditolak'])->default('menunggu');
            $table->text('catatan_admin')->nullable();
            $table->timestamps();

            $table->foreign('nik_siswa')
                  ->references('nik')
                  ->on('siswa')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_daftar_ulang');
    }
};
