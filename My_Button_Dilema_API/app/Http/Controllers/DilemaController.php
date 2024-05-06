<?php

namespace App\Http\Controllers;

use App\Models\Perfil;
use Illuminate\Support\Facades\Validator;

use App\Models\Dilema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class DilemaController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except([ 'showRandomDilema','handleResponse']);


    }

    public function destroy($id)
    {
        $dilema = Dilema::find($id);

        if (!$dilema) {
            return response()->json(['error' => 'Dilema no encontrado'], 404);
        }

        // Eliminar registros relacionados en la tabla intermedia
        $dilema->users()->detach();

        // Luego, eliminar el dilema
        $dilema->delete();

        return response()->json(['mensaje' => 'El dilema se ha eliminado correctamente'], 200);
    }







    public function listMine(Request $request)
    {
        try {
            $user = Auth::user();
            $dilemas = Dilema::where('user_id', $user->id)->simplePaginate(5);

            return response()->json($dilemas, 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }




    public function create(Request $request)
    {
        try {
            $categorias = Perfil::orderBy("nombre", "asc")->get();
            return response()->json(['categorias' => $categorias], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario
        $request->validate([
            'texto_situacion' => 'required|string|max:255',
            'texto_problema' => 'required|string|max:255',
        ]);

        // Crear el dilema
        $dilema = new Dilema([
            'texto_situacion' => $request->input('texto_situacion'),
            'texto_problema' => $request->input('texto_problema'),
            'contador_aceptada' => 0,
            'contador_denegada' => 0,
            'respuestas' => null,
        ]);

        // Guardar el dilema asociado al usuario logueado
        Auth::user()->dilemasCreados()->save($dilema);

        // Asociar automáticamente el dilema con el usuario actual en la tabla intermedia
        Auth::user()->dilemasInteractuados()->attach($dilema);


        // Redireccionar con un mensaje
        return back()->with('mensaje', 'El dilema se ha creado correctamente. Podrás ver tus dilemas
        creados en tu perfil.');
    }

    public function indexAdmin()
    {
        // Obtener todos los dilemas
        $dilemas = Dilema::all();

        // Devolver los dilemas en una vista o en formato JSON, dependiendo de tu aplicación
        return response()->json($dilemas);
    }


    public function showRandomDilema()
    {
        $dilema = Dilema::inRandomOrder()->first();
        return response()->json($dilema);
    }

    public function myindex()
    {
        // Obtener el usuario autenticado
        $user = Auth::user();

        // Obtener los dilemas del usuario autenticado
        $dilemas = Dilema::where('user_id', $user->id)->get();

        // Devolver los dilemas en una vista o en formato JSON, dependiendo de tu aplicación
        return response()->json($dilemas);
    }


    public function delete(Request $request, $id)
    {
        $dilema = Dilema::findOrFail($id);
        $res = $dilema->delete();

        if ($res) {
            return response()->json(['message' => '$dilema creada satisfactoriamente'], 201);
        }
        return response()->json(['message' => 'Error eliminando la $dilema'], 500);
    }





    public function handleResponse(Request $request, $dilemaId, $respuesta)
    {

        $dilema = Dilema::find($dilemaId);


        if ($respuesta === 'aceptada') {

            $dilema->contador_aceptada += 1;
        } elseif ($respuesta === 'denegada') {

            $dilema->contador_denegada += 1;
        } else {

            return response()->json(['error' => 'Respuesta no válida'], 400);
        }


        $dilema->save();


        return redirect()->route('mostrar.resultados', ['id' => $dilemaId]);
    }













}
