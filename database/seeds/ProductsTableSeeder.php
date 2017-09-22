<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'name'.str_random(10),
            'price' => str_random(10),
            'description' => 'description'.str_random(10),
            'image' => 'image'.str_random(10),
        ]);
    }
}
