import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import './feedback.css';

const services = [
  {
    id: 1,
    name: "Pawsome Veterinary Clinic",
    type: "Veterinarian",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: "Downtown, San Francisco",
    tags: ["Emergency Care", "Surgery", "Dental"]
  },
  {
    id: 2,
    name: "Fluffy Tails Grooming",
    type: "Groomer",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: "Marina District, San Francisco",
    tags: ["Full Service", "Cat Friendly", "Mobile"]
  },
  {
    id: 3,
    name: "Bark Academy",
    type: "Trainer",
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: "Mission District, San Francisco",
    tags: ["Obedience", "Puppy Training", "Behavior"]
  },
  {
    id: 4,
    name: "Happy Paws Boarding",
    type: "Boarding",
    rating: 4.6,
    reviews: 78,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: "Richmond District, San Francisco",
    tags: ["24/7 Care", "Webcams", "Large Play Area"]
  }
];

const feedback = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Pet Services</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">View All</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300">
              <div className="relative h-48">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white py-1 px-3 rounded-full text-sm font-medium text-gray-700">
                  {service.type}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <span className="ml-1 text-sm font-medium">{service.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{service.reviews} reviews</span>
                </div>
                <div className="flex items-center text-gray-500 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{service.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Rate & Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Your Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer ${
                (hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
          </span>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
        Submit Review
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <feedback />
      <div className="container mx-auto px-4 md:px-8 mt-10">
        <RatingForm />
      </div>
    </div>
  );
};

export default App;
