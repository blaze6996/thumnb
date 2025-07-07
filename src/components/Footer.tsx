import React from 'react';
import { Gamepad2, Instagram, Twitter, Youtube, Mail, MessageSquare, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">ThumbnailPro</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Professional Minecraft thumbnail designer helping content creators level up their click-through rates 
              and boost engagement with eye-catching designs at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="mailto:sab889899@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Minecraft Thumbnails</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Build Showcases</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Tutorial Graphics</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Survival Series</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Custom Designs</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="text-gray-400 hover:text-green-400 transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-green-400 transition-colors">Pricing</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-green-400 transition-colors">Reviews</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
              <li>
                <a 
                  href="https://discord.gg/wP7wFKES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Discord Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">Discord</p>
                <a 
                  href="https://discord.gg/wP7wFKES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Join Our Server
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-white font-medium">Email</p>
                <a 
                  href="mailto:sab889899@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  sab889899@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-white font-medium">Location</p>
                <p className="text-gray-400">India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400">
            © 2024 ThumbnailPro. All rights reserved. Designed to level up Minecraft content.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Professional Minecraft thumbnail designer • Fast delivery • Affordable pricing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;