<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            if (Schema::hasColumn('customers', 'price_id'))
                $table->dropColumn('price_id');
            if (!Schema::hasColumn('customers', 'subscribe_id'))
                $table->string('subscribe_id')->nullable();
            if (!Schema::hasColumn('customers', 'cust_id'))
                $table->string('cust_id')->nullable();
            if (!Schema::hasColumn('customers', 'subscribe_status'))
                $table->integer('subscribe_status')->comment('1: active 2: cancel 3: reactive')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
