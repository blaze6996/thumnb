import React from 'react';
import { Play, TrendingUp, Users, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-sm font-bold uppercase tracking-wider mb-4">
                Professional Minecraft Designer
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Pro Minecraft
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                Thumbnails
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-gray-300">
                That Drive Clicks & Views!
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Boost your Minecraft YouTube & Twitch engagement with eye-catching thumbnails. 
              Professional designs that make viewers click, watch, and subscribe to your builds, tutorials, and adventures.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Portfolio
              </button>
              <a 
                href="https://discord.gg/wP7wFKES"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
              >
                Order Now
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-2xl font-bold text-white">5+</span>
                </div>
                <p className="text-gray-400 text-sm">Happy Creators</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Play className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-2xl font-bold text-white">12+</span>
                </div>
                <p className="text-gray-400 text-sm">Thumbnails Made</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-2xl font-bold text-white">+60%</span>
                </div>
                <p className="text-gray-400 text-sm">CTR Boost</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold text-white">24h</span>
                </div>
                <p className="text-gray-400 text-sm">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Thumbnails */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main Featured Thumbnail */}
              <div className="relative w-80 h-48 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">EPIC MINECRAFT</h3>
                    <p className="text-gray-200 text-lg drop-shadow-lg">THUMBNAIL DESIGN</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ⛏️ CRAFT
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <span className="text-2xl">⛏️</span>
              </div>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <span className="text-xl">🧱</span>
              </div>

              {/* Background Thumbnails */}
              <div className="absolute -z-10 top-8 -left-8 w-64 h-36 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg opacity-30 transform -rotate-6"></div>
              <div className="absolute -z-20 top-16 -right-8 w-64 h-36 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg opacity-20 transform rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;