<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Muhammad',
            'last_name' => 'Saad',
            'email'    => 'saad@yopmail.com',
            'password' => bcrypt('1234567890'),
            'is_admin' => 1,
        ]);
    }
}
