<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dilema;


class PagesController extends Controller
{


    public function home(Request $request)
    {
        try {
            // Obtener un dilema aleatorio
            $randomDilema = Dilema::inRandomOrder()->first();

            return response()->json(['randomDilema' => $randomDilema], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
}
