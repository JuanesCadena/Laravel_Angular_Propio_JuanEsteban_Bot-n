<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{

    protected $table = 'perfiles';



    protected $fillable = [
        'foto_perfil',
        'alias',

    ];


    public function dilemas(){
        return $this->hasMany('App\Models\Dilema');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }





}
