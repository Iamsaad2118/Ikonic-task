<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = Carbon::now();
        Category::insert([
            ['name' => 'Bug Report', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Feature Request', 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Improvement', 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
