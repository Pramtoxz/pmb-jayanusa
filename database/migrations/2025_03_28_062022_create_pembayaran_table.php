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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pembayaran')->unique();
            $table->decimal('jumlah', 10, 2);
            $table->enum('status', ['menunggu', 'dibayar', 'ditolak'])->default('menunggu');
            $table->string('bukti_pembayaran')->nullable();
            $table->string('skl')->nullable();
            $table->string('rapor')->nullable();
            $table->string('suratlulus')->nullable();
            $table->text('keterangan')->nullable();
            $table->string('nik_siswa');
            $table->foreign('nik_siswa')
                  ->references('nik')
                  ->on('siswa')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};
