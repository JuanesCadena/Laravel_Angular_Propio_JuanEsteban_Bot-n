<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use App\Http\Controllers\AuthController;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function dilemasCreados()
    {
        return $this->hasMany(Dilema::class);
    }


    public function dilemasInteractuados(): BelongsToMany
    {
        return $this->belongsToMany(Dilema::class, 'dilema_user')
            ->withTimestamps(); // If you need to manage timestamps in the pivot table
    }


    public function perfil()
    {
        return $this->hasOne(Perfil::class)->withDefault([
            'alias' => $this->name,
            'foto_perfil' => 'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200&d=mp',
        ]);
    }


    protected static function boot()
    {
        parent::boot();

        static::created(function ($user) {
            $user->perfil()->create([
                'alias' => $user->name,
                'foto_perfil' => 'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200&d=mp',
            ]);
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

}
