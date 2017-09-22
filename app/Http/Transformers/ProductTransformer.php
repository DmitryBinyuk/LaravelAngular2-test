<?php

namespace App\Http\Transformers;

use App\Models\Product;
use League\Fractal\TransformerAbstract;

class ProductTransformer extends TransformerAbstract
{
//    protected $availableIncludes = [
//        'brand'
//    ];

    protected $detailed;

    public function __construct($detailed = false)
    {
        $this->detailed = $detailed;
    }

    public function transform(Product $product)
    {

        $data = [
            'id' => (int) $product->id,
            'name' => $product->name,
            'processor' => $product->price,
            'description' => $product->description,
            'image' => $product->image,
        ];

        return $data;
    }
}