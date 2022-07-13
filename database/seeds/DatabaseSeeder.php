<?php

use App\Laravue\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Laravue\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@laravue.dev',
            'password' => Hash::make('laravue'),
        ]);
        

        $adminRole = Role::findByName(\App\Laravue\Acl::ROLE_ADMIN);
        $clientRole = Role::findByName(\App\Laravue\Acl::ROLE_CLIENT);
        
        $admin->syncRoles($adminRole);

        // $this->call(UsersTableSeeder::class);
    }
}
