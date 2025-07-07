import React from 'react';
import { Check, Star, Zap, Crown, Gift } from 'lucide-react';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '₹100',
      originalPrice: null,
      icon: <Zap className="h-8 w-8" />,
      description: 'Perfect for testing our quality',
      features: [
        '1 Professional Thumbnail',
        'HD Quality (1920x1080)',
        '24-48 Hour Delivery',
        '1 Free Revision',
        'Commercial License',
        'Discord Support'
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500/50',
      buttonText: 'Order Basic',
      discordText: 'Hi! I want to order the Basic Package (₹100) for 1 gaming thumbnail.'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: '₹399',
      originalPrice: '₹500',
      icon: <Star className="h-8 w-8" />,
      description: 'Most popular choice for creators',
      features: [
        '5 Professional Thumbnails',
        'HD Quality (1920x1080)',
        '24-48 Hour Delivery',
        '2 Free Revisions per thumbnail',
        'Commercial License',
        'Priority Discord Support',
        'Source Files Included',
        'Style Consistency'
      ],
      popular: true,
      gradient: 'from-green-500 to-green-600',
      borderColor: 'border-green-500',
      buttonText: 'Order Standard',
      discordText: 'Hi! I want to order the Standard Package (₹399) for 5 gaming thumbnails.'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '₹999',
      originalPrice: '₹1300',
      icon: <Crown className="h-8 w-8" />,
      description: 'Best value with bonus thumbnail',
      features: [
        '12 Professional Thumbnails',
        '+ 1 FREE Bonus Thumbnail',
        'HD Quality (1920x1080)',
        '12-24 Hour Rush Delivery',
        'Unlimited Revisions',
        'Commercial License',
        'VIP Discord Support',
        'Source Files + PSD',
        'Custom Brand Elements',
        'YouTube SEO Tips'
      ],
      popular: false,
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/50',
      buttonText: 'Order Premium',
      discordText: 'Hi! I want to order the Premium Package (₹999) for 12+1 gaming thumbnails.'
    }
  ];

  const handleOrderClick = (discordText: string) => {
    window.open('https://discord.gg/wP7wFKES', '_blank');
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">Power-Up!</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional gaming thumbnails at unbeatable prices. All packages include commercial license and fast delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular 
                  ? `${plan.borderColor} shadow-2xl shadow-green-500/20` 
                  : `${plan.borderColor} hover:border-opacity-100`
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.gradient} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  {plan.originalPrice && (
                    <span className="text-gray-500 line-through text-xl mr-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>
                {plan.originalPrice && (
                  <div className="inline-flex items-center bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                    <Gift className="h-4 w-4 mr-1" />
                    Save ₹{parseInt(plan.originalPrice.replace('₹', '')) - parseInt(plan.price.replace('₹', ''))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleOrderClick(plan.discordText)}
                className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Thumbnails?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-green-400 text-3xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-2">Fast Delivery</h4>
                <p className="text-gray-400 text-sm">Get your thumbnails within 24-48 hours</p>
              </div>
              <div>
                <div className="text-blue-400 text-3xl mb-2">🎯</div>
                <h4 className="text-white font-semibold mb-2">High CTR Design</h4>
                <p className="text-gray-400 text-sm">Designed to maximize clicks and views</p>
              </div>
              <div>
                <div className="text-purple-400 text-3xl mb-2">🔄</div>
                <h4 className="text-white font-semibold mb-2">Free Revisions</h4>
                <p className="text-gray-400 text-sm">We'll perfect it until you're 100% happy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Rate Card */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Need detailed pricing information?</p>
          <button className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-gray-600">
            📄 Download Rate Card (PDF)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;