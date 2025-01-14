<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;

class EventFactory extends Factory
{
    
    protected $model = Event::class;

    public function definition(): array
    {
        return [
            //'date' => $this->faker->date('Y-m-d', 'now'),
            'date' => \Faker\Factory::create()->date('Y-m-d', 'now'),  
            'title' => \Faker\Factory::create()->word,
            'description' => \Faker\Factory::create()->text(200),
            'category' => \Faker\Factory::create()->word,
        ];
    }
}
