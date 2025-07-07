import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "MinecraftBuilder_YT",
      platform: "YouTube Gaming",
      subscribers: "150K",
      rating: 5,
      text: "ThumbnailPro completely transformed my Minecraft channel! My click-through rate increased by 60% within the first month. The designs perfectly capture the creativity of my builds.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      game: "Minecraft"
    },
    {
      id: 2,
      name: "CraftingQueen_",
      platform: "YouTube",
      subscribers: "89K",
      rating: 5,
      text: "Working with ThumbnailPro has been amazing. The attention to detail and understanding of Minecraft aesthetics is incredible. My tutorial videos get 3x more views now!",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100",
      game: "Minecraft"
    },
    {
      id: 3,
      name: "RedstoneExpert",
      platform: "YouTube",
      subscribers: "67K",
      rating: 5,
      text: "The thumbnails are not just visually appealing, they're strategically designed to drive clicks. My redstone tutorials have skyrocketed since I started using these designs.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100",
      game: "Minecraft"
    },
    {
      id: 4,
      name: "SurvivalMaster_MC",
      platform: "YouTube Gaming",
      subscribers: "45K",
      rating: 5,
      text: "Fast delivery, amazing quality, and excellent communication. ThumbnailPro understands exactly what Minecraft creators need. Highly recommend!",
      avatar: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=100",
      game: "Minecraft"
    },
    {
      id: 5,
      name: "BlockCrafter_IN",
      platform: "YouTube",
      subscribers: "78K",
      rating: 5,
      text: "Best Minecraft thumbnail designer! The pricing is very reasonable and the quality is top-notch. My building videos now get double the views thanks to these amazing thumbnails.",
      avatar: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=100",
      game: "Minecraft"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what successful Minecraft content creators have to say about working with me.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 p-8 md:p-12 transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Avatar and Info */}
                  <div className="flex-shrink-0 text-center lg:text-left">
                    <div className="relative mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-green-500 mx-auto lg:mx-0"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        ⛏️ MC
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-1">{testimonial.name}</h4>
                    <p className="text-green-400 font-semibold mb-1">{testimonial.platform}</p>
                    <p className="text-gray-400 text-sm mb-4">{testimonial.subscribers} subscribers</p>
                    
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Testimonial Content */}
                  <div className="flex-1">
                    <Quote className="w-12 h-12 text-green-400/30 mb-4" />
                    <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm border border-gray-600"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-colors shadow-lg backdrop-blur-sm border border-gray-600"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-green-500 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">5+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">12+</div>
              <div className="text-gray-400">Thumbnails Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4.9★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24h</div>
              <div className="text-gray-400">Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;