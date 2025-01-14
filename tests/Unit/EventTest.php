<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Event;
use Illuminate\Support\Facades\Hash;

class EventTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_index_event()
	{
	    $event1 = Event::create(['title' => 'Event 1', 'date' => '2025-01-01','description' => 'Description 1', 'category' => 'Music']);
	    $event2 = Event::create(['title' => 'Event 3', 'date' => '2025-01-05','description' => 'Description 2', 'category' => 'Music']);
	    $event3 = Event::create(['title' => 'Event 2', 'date' => '2025-01-10','description' => 'Description 3', 'category' => 'Sports']);

	    $response = $this->getJson('/api/event?start_date=2025-01-01&end_date=2025-01-10&category=Music');
	   
	    $response->assertStatus(200);
        $response->assertJsonFragment(['date' => '2025-01-05']);
        $response->assertJsonCount(2); 

	} 
    public function test_create_event()
	{
	    $data = [
	        'date' => '2025-01-14',
	        'title' => 'Event Title',
	        'description' => 'Event Description',
	        'category' => 'Event Category',
	    ];

	    $user = \App\Models\User::first();  
	    if (!$user) {
	        $user = \App\Models\User::factory()->create(['email' =>'admin@gmail.com','password' => Hash::make('admin12345'),'role' => 'admin']);
	    }

	    $token = $user->createToken('TestToken')->plainTextToken; 

	    $response = $this->postJson('/api/event/store/', $data, [
	        'Authorization' => 'Bearer ' . $token, 
	    ]);

	    //$event = \App\Models\Event::create($data);
	    $response->assertStatus(201);
	    $this->assertDatabaseHas('events', $data);
	} 
	
	public function test_read_event()
	{
	    $event = \App\Models\Event::create([
	        'date' => '2025-01-14',
	        'title' => 'Event Title Show',
	        'description' => 'Event Description Show',
	        'category' => 'Event Category Show',
	    ]);

	    $response = $this->getJson('/api/event/show/'.$event->id);

	    $response->assertStatus(200);

	    $response->assertJson([
	        'id' => $event->id,
	        'date' => $event->date,
	        'title' => $event->title,
	        'description' => $event->description,
	        'category' => $event->category,
	    ]);
	}
	public function test_update_event()
	{
	    $event = Event::factory()->create();

	    $updatedData = ['title' => 'Updated Title'];

	    $user = \App\Models\User::first();  
	    if (!$user) {
	        $user = \App\Models\User::factory()->create(['password' => Hash::make('admin12345'),'role' => 'admin']);
	    }

	    $token = $user->createToken('TestToken')->plainTextToken; 

	    $response = $this->putJson('/api/event/update/'.$event->id, $updatedData, [
	        'Authorization' => 'Bearer ' . $token, 
	    ]);

	    $response->assertStatus(200);

	    $this->assertDatabaseHas('events', $updatedData);
	}
	public function test_delete_event()
    {
        $event = Event::factory()->create();

        $user = \App\Models\User::first();  
	    if (!$user) {
	       $user = \App\Models\User::factory()->create(['password' => Hash::make('admin12345'),'role' => 'admin']);
	    }
        $token = $user->createToken('TestToken')->plainTextToken; 

    	$response = $this->deleteJson('/api/event/delete/'.$event->id, [], [
        	'Authorization' => 'Bearer ' . $token,  
    	]);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

}
