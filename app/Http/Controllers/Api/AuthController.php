<?php
/**
 * File AuthController.php
 *
 * @author Tuan Duong <bacduong@gmail.com>
 * @package Laravue
 * @version 1.0
 */
namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\Laravue\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Laravue\Models\User;
use App\Laravue\Models\Role;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Laravue\Acl;

/**
 * Class AuthController
 *
 * @package App\Http\Controllers\Api
 */
class AuthController extends BaseController
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            // return response()->json(new JsonResponse([], 'login_error'), Response::HTTP_UNAUTHORIZED);
            return response('Login failed! Email or password is incorrect!', Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();

        return response()->json(new JsonResponse(new UserResource($user)), Response::HTTP_OK);
    }

    public function register(Request $request)
    {
        //validate email if user is not already registered

        $credentials = $request->only('name', 'email', 'password');
        $rules = array('email' => 'unique:users,email');
        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {
            return response('This user is already registered!', 401);
        }
        else {
            // register client
            $client = User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
            ]);

            $clientRole = Role::findByName(Acl::ROLE_CLIENT);
            $client->syncRoles($clientRole);
            $user = $request->user();
            return response('Successfully Registered', 200);
        }
    }
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        return response()->json((new JsonResponse())->success([]), Response::HTTP_OK);
    }

}
