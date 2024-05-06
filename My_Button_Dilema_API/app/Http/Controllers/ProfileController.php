<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Dilema;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\View\View;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Obtener los dilemas del usuario actual
            $dilemas = Auth::user()->dilemasCreados;

            // Obtener el perfil del usuario actual
            $perfil = Auth::user()->perfil;

            return response()->json(['dilemas' => $dilemas, 'perfil' => $perfil], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function edit(Request $request)
    {
        return response()->json(['user' => $request->user()], 200);
    }

    public function update(ProfileUpdateRequest $request)
    {
        try {
            $user = $request->user();
            $user->fill($request->validated());

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            return response()->json(['message' => 'Perfil actualizado correctamente.'], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function destroy(Request $request)
    {
        try {
            $request->validate([
                'password' => ['required', 'current_password'],
            ]);

            $user = $request->user();

            Auth::logout();

            $user->delete();

            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Cuenta eliminada correctamente.'], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function fileUpload(Request $request)
    {
        try {
            $user = auth()->user();

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('dilemas', $fileName, 'public');

                // Actualiza la foto_perfil del perfil del usuario
                $user->perfil->update(['foto_perfil' => $filePath]);

                return response()->json(['success' => 'Imagen de perfil actualizada correctamente.'], 200);
            }

            return response()->json(['error' => 'No se ha proporcionado ningún archivo.'], 400);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
}
