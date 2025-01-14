<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class Eventcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $event = Event::all();
        return view('event.index',compact('event'));

    }
    public function search(Request $request)
    {
        $query = Event::select('*');
        if ($request->start_date) {
            $query->where('date', '>=', $request->start_date);
        }
        if ($request->end_date) {
            $query->where('date', '<=', $request->end_date);
        }
        if ($request->category) {
            $query->where('category', $request->category);
        }
        $event = $query->get();
        return view("event.event_list",compact('event'));
    }
    public function create()
    {
        return view('event.create');
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
           'date' => 'required|date',
           'title' => 'required|string|max:255',
           'description' => 'required',
           'category' => 'required|string|max:255',
           
        ]);
        $event = new Event();
        $event->fill($request->all());
        $event->save();

        return redirect()->route('event.index')->with('success', 'Event have been created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $event = Event::find($id);
        return view('event.edit',compact('event'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
           'date' => 'required|date',
           'title' => 'required|string|max:255',
           'description' => 'required',
           'category' => 'required|string|max:255',
           
        ]);
        $event = Event::find($id);
        $event->fill($request->all());
        $event->save();

        return redirect()->route('event.index')->with('success', 'Event have been updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);        
        $event->delete();
        return redirect()->route('event.index')->with('success', 'Event have been deleted successfully.');
    }
}
