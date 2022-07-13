<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    //
    protected $fillable = ['business_name', 'website_link', 'description', 'user_id','current_step','subscribe_id','cust_id','subscribe_status'];
}
