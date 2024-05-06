<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany; // Agrega esta línea para importar BelongsToMany

class Dilema extends Model
{
    use HasFactory;

    protected $fillable = [
        'texto_situacion',
        'texto_problema',
    ];

    public function creador()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    // Corregir la declaración de la función usuariosInteractuados
    public function usuariosInteractuados(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'dilema_user')
            ->withTimestamps(); // Si necesitas gestionar las marcas de tiempo en la tabla intermedia
    }

    public function perfil()
    {
        return $this->belongsTo('App\Models\Perfil');
    }
}
