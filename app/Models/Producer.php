<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    protected $table = 'producers';

    protected $fillable = array('id', 'name', 'country', 'description', 'image');

}
