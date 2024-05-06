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
        Schema::create('dilema_user', function (Blueprint $table) {
// $table‐>id();
            $table->primary(['user_id','dilema_id']);
            $table->unsignedBigInteger('user_id')->unsigned();
            $table->unsignedBigInteger('dilema_id')->unsigned();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('dilema_id')->references('id')->on('dilemas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dilema_user');
    }
};
