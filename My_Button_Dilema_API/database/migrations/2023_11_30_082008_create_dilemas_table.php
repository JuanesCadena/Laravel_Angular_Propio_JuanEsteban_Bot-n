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
        Schema::create('dilemas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('texto_situacion', 255);
            $table->string('texto_problema', 255);
            $table->integer('contador_aceptada')->default(0); // Establecer valor predeterminado
            $table->integer('contador_denegada')->default(0);
            $table->foreignId('user_id')->references('id')->on('users');
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dilemas');
    }
};
