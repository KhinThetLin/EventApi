<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
   
    public function index(Request $request)
    {
        $query = Event::query();

        /*if ($request->has(['start_date', 'end_date'])) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }*/

        if ($request->has('start_date')) {
            $query->where('date', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->where('date', '<=', $request->end_date);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        $event = $query->get();
        $count = $query->count();

        return response()->json(['count' => $count,'data'=> $event], 200);
    }

    public function create()
    {
        //
    }
 
    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
        ];

        $validator = \Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $event = new Event();
        $event->fill($request->all());
        $event->save();
        return response()->json(['message' => 'Event created successfully','data'=> $event], 201);

    }

    public function show($id)
    {
        $event = Event::find($id);
        return response()->json($event, 200);
    }

    public function edit($id)
    {
        
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'nullable|date',
            'category' => 'nullable|string|max:255',
        ];

        $validator = \Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $event = Event::find($id);
        $event->fill($request->all());
        $event->save();

        return response()->json(['message' => 'Event Updated successfully','data'=> $event], 200);
    }

    public function destroy($id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully'], 200);
    }
}
