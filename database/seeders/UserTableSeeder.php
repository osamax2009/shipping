<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UserTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        User::create([
            'username' => 'admin2',
                'name' => 'admin2',
                'contact_number' => '9876543210',
                'address' => NULL,
                'email' => 'admi@admin2.com',
                'password' => bcrypt('12345678'),
                'email_verified_at' => NULL,
                'user_type' => 'admin',
                'player_id' => NULL,
                'remember_token' => NULL,
                'last_notification_seen' => NULL,
                'status' => 1,
                'current_team_id' => NULL,
                'profile_photo_path' => NULL,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => NULL,
                'deleted_at' => NULL,
           
        ]);

/* 
        
        User::create([
            'username' => 'user',
                'name' => 'user',
                'contact_number' => '9876543210',
                'address' => NULL,
                'email' => 'user@user.com',
                'password' => bcrypt('12345678'),
                'email_verified_at' => NULL,
                'user_type' => 'user',
                'player_id' => NULL,
                'remember_token' => NULL,
                'last_notification_seen' => NULL,
                'status' => 1,
                'current_team_id' => NULL,
                'profile_photo_path' => NULL,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => NULL,
                'deleted_at' => NULL,
           
        ]); */
        
        
    }
}