<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Endpoints extends Model
{
    //
    protected $fillable = ['lambda1_url', 'lambda2_url', 'lambda3_url', 'aws_connect_url','user_id'];
}
