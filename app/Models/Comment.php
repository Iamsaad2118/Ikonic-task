<?php

namespace App\Models;

use App\Models\User;
use App\Models\Feedback;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
