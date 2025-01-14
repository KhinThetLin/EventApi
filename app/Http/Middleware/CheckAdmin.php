<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //return $next($request);
        if (auth()->check()) {
	        $user = auth()->user();
	        if ($user->role === 'admin') {
	            return $next($request);
	        }
	        return response()->json(['error' => ['message' => 'User is not an admin']], 403);
	    }

	    return response()->json(['error' => ['message' => 'Unauthenticated']], 401);
    }
}
