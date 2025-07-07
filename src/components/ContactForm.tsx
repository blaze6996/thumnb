import React, { useState } from 'react';
import { Mail, MessageSquare, User, Send, Clock, DollarSign, Youtube, Twitch } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channel: '',
    projectType: '',
    message: '',
    budget: '',
    deadline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create email body
    const emailBody = `Hi! I'm interested in gaming thumbnails.

Name: ${formData.name}
Email: ${formData.email}
Channel/Platform: ${formData.channel}
Project Type: ${formData.projectType}
Budget: ${formData.budget}
Deadline: ${formData.deadline}

Details: ${formData.message}`;

    const encodedBody = encodeURIComponent(emailBody);
    window.location.href = `mailto:sab889899@gmail.com?subject=Gaming Thumbnail Order Request&body=${encodedBody}`;
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        channel: '',
        projectType: '',
        message: '',
        budget: '',
        deadline: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Work Together</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to boost your gaming content? Let's discuss your project and create thumbnails that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Discord</h4>
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
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <a 
                      href="mailto:sab889899@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      sab889899@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Response Time</h4>
                    <p className="text-gray-400">Within 2-4 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Pricing */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Basic Package (1 Thumbnail)</span>
                  <span className="text-green-400 font-bold">₹100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Standard Package (5 Thumbnails)</span>
                  <span className="text-green-400 font-bold">₹399</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Premium Package (12+1 Free)</span>
                  <span className="text-green-400 font-bold">₹999</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                  <span className="text-gray-300">Rush Delivery (12-24h)</span>
                  <span className="text-yellow-400 font-bold">+₹200</span>
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">We Design For</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Youtube className="w-6 h-6 text-red-500" />
                  <span className="text-gray-300">YouTube</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Twitch className="w-6 h-6 text-purple-500" />
                  <span className="text-gray-300">Twitch</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded"></div>
                  <span className="text-gray-300">Instagram</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                  <span className="text-gray-300">Facebook</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  <User className="w-5 h-5 inline mr-2" />
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  <Mail className="w-5 h-5 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="channel" className="block text-white font-semibold mb-2">
                  Your Channel/Platform
                </label>
                <input
                  type="text"
                  id="channel"
                  name="channel"
                  value={formData.channel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  placeholder="YouTube channel name, Twitch handle, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-white font-semibold mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  >
                    <option value="">Select package</option>
                    <option value="basic">Basic Package (₹100)</option>
                    <option value="standard">Standard Package (₹399)</option>
                    <option value="premium">Premium Package (₹999)</option>
                    <option value="custom">Custom Package</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-white font-semibold mb-2">
                    <DollarSign className="w-5 h-5 inline mr-2" />
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                  >
                    <option value="">Select budget</option>
                    <option value="100-500">₹100 - ₹500</option>
                    <option value="500-1000">₹500 - ₹1000</option>
                    <option value="1000-2000">₹1000 - ₹2000</option>
                    <option value="2000+">₹2000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-white font-semibold mb-2">
                  <Clock className="w-5 h-5 inline mr-2" />
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors resize-none"
                  placeholder="Tell me about your gaming content, preferred style, games you play, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message via Email
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Prefer Discord? Join our server for faster response
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://discord.gg/wP7wFKES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join Discord Server
                </a>
                <a 
                  href="mailto:sab889899@gmail.com"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;