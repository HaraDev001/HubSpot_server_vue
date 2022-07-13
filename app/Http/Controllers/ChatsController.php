<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\MessageSent;
use Pusher\Pusher;

class ChatsController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function fetchMessages()
    {
        $user = Auth::user();
        return Message::where('user_id', $user->id)->get();
        // return Message::with('user')->get();
    }
    public function fetchMessagesByUserId(Request $request)
    {
        return Message::where('user_id', $request->input('user_id'))->get();
    }
    public function sendMessage(Request $request)
    {
        // var_dump($request->input('message'));
        $user = Auth::user();
        $message = Message::create([
            'user_id' => $user->id,
            'sender' => $request->input('sender'),
            'clientSeen' => true,
            'adminSeen' => false,
            'message' => $request->input('message'),
        ]);
        
        $options = array(
            'cluster' => config('broadcasting.connections.pusher.options.cluster'),
            'encrypted' => false
        );

        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'), $options
        );

        //Send a message to chat channel with an event name of MessageSent
        $pusher->trigger('chat', 'MessageSent', $message);
    }
    public function sendMessageToUser(Request $request)
    {
        $user = Auth::user();
        $message = Message::create([
            'user_id' => $request->input('user_id'),
            'sender' => $request->input('sender'),
            'clientSeen' => false,
            'adminSeen' => true,
            'message' => $request->input('message'),
        ]);

        $options = array(
            'cluster' => config('broadcasting.connections.pusher.options.cluster'),
            'encrypted' => false
        );

        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'), $options
        );

        //Send a message to chat channel with an event name of MessageSent
        $pusher->trigger('chat', 'MessageSent', $message);
    }
    public function getAllClients(Request $request) {
        $user = Auth::user();
        return User::where('id', '!=', $user->id)->get();
        // return User::where('user_id', $user->id)->get();
    }
    public function setMessagesReaded(Request $request) {
        if ($request->input('type') == 'admin') {
            Message::where('user_id', $request->input('room_id'))->update(['adminSeen' => true]);
        }
        else if ($request->input('type') == 'client') {
            Message::where('user_id', $request->input('room_id'))->update(['clientSeen' => true]);
        }
    }
    public function getNumberUnreaded(Request $request) {
        if ($request->input('type') == 'admin') {
            return Message::where('user_id', $request->input('room_id'))->where('adminSeen', false)->get()->count();
            // return Message::where('user_id', $request->input('room_id'))->get();
        }
        else if ($request->input('type') == 'client') {
            return Message::where('user_id', $request->input('room_id'))->where('clientSeen', false)->get()->count();
        }
    }
}
