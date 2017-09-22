<?php

namespace App\API1\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Transformers\ProductTransformer;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::all();

        $data = fractal()
            ->collection($products)
            ->transformWith(new ProductTransformer())
            ->toArray();

        return response()->json($data);
    }
}