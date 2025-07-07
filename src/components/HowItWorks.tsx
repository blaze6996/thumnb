import React from 'react';
import { MessageSquare, Palette, Zap, CheckCircle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Tell Us Your Needs",
      description: "Share your game, style preferences, and any specific requirements via Discord or our contact form.",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Palette className="h-8 w-8" />,
      title: "We Design Magic",
      description: "Our team creates eye-catching thumbnails optimized for maximum clicks and engagement.",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Receive your high-quality thumbnails within 24-48 hours, ready to boost your content.",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Revisions & Success",
      description: "Free revisions until perfect, then watch your views and engagement skyrocket!",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our simple 4-step process ensures you get professional gaming thumbnails that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent z-0"></div>
              )}
              
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2 text-center">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.id}
                  </div>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white mb-6 mt-4`}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">Join hundreds of successful gaming creators who trust us with their thumbnails.</p>
            <a 
              href="https://discord.gg/wP7wFKES"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your Order Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;