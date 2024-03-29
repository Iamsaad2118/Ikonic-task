<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
