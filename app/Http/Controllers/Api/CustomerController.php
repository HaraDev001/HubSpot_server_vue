<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Customer;
use Stripe;
use \Stripe\StripeClient;
use Validator;
use Auth;
use Illuminate\Support\Facades\Hash;
use App\Laravue\JsonResponse;
use Illuminate\Http\Response;
use App\User;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
        try {
            $customerData = \Stripe\Customer::create([
                'name' => $request->business_name,
                'description' => $request->description,
            ]);
            $customer = Customer::where('user_id', \Auth::id())->first();
            if(!$customer) {
                $customer = new Customer;
            }
            $customer->business_name = $request->business_name;
            $customer->website_link = $request->website_link;
            $customer->description = $request->description;
            $customer->user_id = \Auth::id();
            $customer->current_step = $request->current_step;
            $customer->cust_id = $customerData->id;
            $customer->save();
        } catch (\Throwable $th) {
            dd($th);
        }
        return response()->json(['status'=>'success']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id - user id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = Customer::where('user_id', $id)->first();

        return $customer;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function setupDone(Request $request)
    {
        $customer = Customer::where('user_id', $request->user_id)->first();
        $customer->current_step = $request->current_step;
        $customer->save();
    }
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required',
            'newPassword' => 'required',
            'confirmPassword' => 'required|same:newPassword', 
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $current_password = Auth::User()->password;  
        if(Hash::check($request['oldPassword'], $current_password))
        {           
            $user_id = Auth::User()->id;                       
            $user = User::find($user_id);
            $user->password = Hash::make($request['newPassword']);
            $user->save(); 
            return response()->json(['success' => 'Password changed successfully'], 200);
        }
        else
        {           
            $error = array('current_password' => 'Please enter correct current password');
            return response()->json(['error' => $error], 400);
        }
        
    }
    public function createSubscription(Request $request)
    {

        try {
            // $customer = \Stripe\Customer::retrieve(config('services.stripe.cust_id'));
            // $subscription = \Stripe\Subscription::create([
            // "customer" => $customer->id,
            // "items" => [
            //     ["price" => config('services.stripe.price_id')],
            // ],
            // "default_payment_method" => config('services.stripe.payment_id')
            // ]);
            $customer = Customer::where('user_id', \Auth::id())->first();
            // $customer->subscribe_id = $subscription->id;
            $customer->subscribe_status = 1;
            $customer->save();
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
        }
        return response()->json(['status'=>'success']);
    }
    public function cancelSubscription(Request $request)
    {
        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
            $customer = Customer::where('user_id', $request->user_id)->first();
            $subscription = \Stripe\Subscription::retrieve($customer->subscribe_id);
            \Stripe\Subscription::update(
                $customer->subscribe_id,
                [
                  'cancel_at_period_end' => true,
                ]
              );
            $customer->subscribe_status = 3;
            $customer->save();
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
        }
        return response()->json(['status'=>'success','subscribe_status'=>$customer->subscribe_status]);
    }
    public function getSubscription(Request $request)
    {
        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

            // $customer = \Stripe\Customer::create([
            //     'email' => 'jenny.rosen@example.com',
                
            // ]);
            //     dd($customer);



            $customer = Customer::where('user_id', $request->user_id)->first();
            if(isset($customer->subscribe_id)){
                $subscription = \Stripe\Subscription::retrieve($customer->subscribe_id);
                return response()->json(['status'=>'success','subscribe_status'=>$customer->subscribe_status]);
            }else{
                return response()->json(['status'=>'subscription not available']);
            }
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
        }
        return response()->json(['status'=>'error']);
    }
    public function reSubscription(Request $request)
    {
        
        try {
            \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
            $customer = Customer::where('user_id', $request->user_id)->first();
            $subscription = \Stripe\Subscription::retrieve($customer->subscribe_id);
           
            \Stripe\Subscription::update($customer->subscribe_id, [
            'cancel_at_period_end' => false,
            'items' => [
                [
                'id' => $subscription->items->data[0]->id,
                'price' => config('services.stripe.price_id'),
                ],
            ],
            ]);
            $customer = Customer::where('user_id', $request->user_id)->first();

            $customer->subscribe_status = 2;
            $customer->save();
        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
        }
        return response()->json(['status'=>'success','subscribe_status'=>$customer->subscribe_status]);
    }
}
