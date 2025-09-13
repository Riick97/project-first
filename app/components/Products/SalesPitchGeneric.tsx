import {useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import ProductImageGallery from './ProductImageGallery';
import {ProductForm} from '../ProductForm';

/**
 * SalesPitchGeneric is a versatile sales component for any Neovibe product.
 * It adapts to different product types while maintaining brand consistency.
 */
const SalesPitchGeneric = ({
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}: any) => {
  // Use provided reviews or fallback to default ones
  const defaultReviews = [
    {
      name: 'Alex K.',
      date: 'March 10, 2025',
      rating: 5,
      title: 'Incredible Vibe Upgrade',
      content:
        "This product completely transformed my space! The quality is top-notch and the colors are vivid and beautiful. Setup was surprisingly easy, and the app control is intuitive. I've already recommended it to all my friends. Definitely worth every penny for the ambiance it creates.",
      helpful: 28,
    },
    {
      name: 'Taylor M.',
      date: 'February 22, 2025',
      rating: 5,
      title: 'Best Purchase This Year',
      content:
        'I was hesitant about the price at first, but wow, what a difference this makes! The design is sleek and modern, and it works perfectly with my existing decor. The different light modes have completely changed how my room feels - I can create any mood I want. And the customer service was excellent when I had a question about setup.',
      helpful: 19,
    },
    {
      name: 'Jordan P.',
      date: 'April 5, 2025',
      rating: 4,
      title: 'Great Features, Small Learning Curve',
      content:
        "The product itself is amazing and creates beautiful lighting effects. My only reason for 4 stars instead of 5 is that it took me a bit to figure out all the settings. Once I got the hang of it though, I've been loving it. The build quality is excellent, and it pairs easily with my phone. Perfect for creating a vibe for movie nights or just relaxing.",
      helpful: 12,
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  // Calculate average review rating
  const getAverageRating = () => {
    if (displayReviews.length === 0) return '0.0';
    const sum = displayReviews.reduce(
      (total: number, review: any) => total + review.rating,
      0,
    );
    return (sum / displayReviews.length).toFixed(1);
  };

  // Generic features for any Neovibe product
  const features = [
    'Smart app control via Bluetooth and WiFi',
    'Voice assistant compatibility with Alexa and Google Home',
    'Customizable settings with up to 15 presets',
    'Energy-efficient design with automatic scheduling',
    'Premium materials and construction for long-lasting performance',
    'Multiple light modes from functional to ambient',
    'Easy setup with no special tools required',
    'Sleek, modern design that complements any decor',
  ];

  // Perfect For (target audience segments)
  const perfectForItems = [
    'Design enthusiasts looking to upgrade their space aesthetics',
    'Tech-savvy individuals who love smart home integration',
    'Content creators seeking perfect lighting and backdrops',
    'Anyone who wants their space to match their energy throughout the day',
  ];

  // Core value propositions
  const valueProps = [
    {
      title: 'Transform Your Space',
      description:
        'Instantly change the atmosphere of any room with customizable lighting options',
      icon: '✨',
    },
    {
      title: 'Smart Control',
      description:
        'Control settings from anywhere using our intuitive smartphone app',
      icon: '📱',
    },
    {
      title: 'Premium Quality',
      description:
        'Built with high-grade materials and advanced technology for superior performance',
      icon: '🔷',
    },
    {
      title: 'Easy Setup',
      description:
        'Be up and running in minutes with simple, tool-free installation',
      icon: '🔌',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Banner - Brand Statement */}
      <div className="w-full bg-gradient-to-r from-[#121212] to-[#1A1A1A] rounded-lg overflow-hidden mb-12">
        <div className="p-6 md:p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            YOUR SPACE SHOULD MATCH YOUR ENERGY
          </h2>
          <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto mb-6">
            Transform any room with the perfect lighting ambiance that adapts to
            your mood, needs, and lifestyle.
          </p>
          <div className="inline-block">
            <p className="text-lg md:text-xl text-[#00E0FF] italic">
              "Light the future of your space."
            </p>
          </div>
        </div>
      </div>

      {/* Main Product Section with Image and Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          {/* Image Gallery Component */}
          <ProductImageGallery
            images={product?.images}
            selectedVariant={selectedVariant}
          />
        </div>

        <div>
          {/* Product Details */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product?.title || 'Neovibe Smart Lighting'}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex text-[#00E0FF]">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < Math.floor(parseFloat(getAverageRating())) ? 'fill-current' : 'stroke-current fill-none'}`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
                <span className="ml-2 text-[#F9F9F9]">
                  {getAverageRating()}
                </span>
              </div>
              <button
                onClick={scrollToReviews}
                className="ml-4 text-[#00E0FF] hover:text-[#C084FC] transition-colors"
              >
                {displayReviews.length} reviews
              </button>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline mb-6">
              {selectedVariant ? (
                <div className="flex flex-wrap items-baseline">
                  <span className="text-2xl md:text-3xl font-bold">
                    <Money data={selectedVariant.price} />
                  </span>

                  {selectedVariant.compareAtPrice?.amount &&
                    parseFloat(selectedVariant.compareAtPrice.amount) > 0 && (
                      <>
                        <span className="ml-3 text-lg text-[#BBBBBB] line-through">
                          <Money data={selectedVariant.compareAtPrice} />
                        </span>
                        <span className="ml-3 px-2 py-1 bg-[#00E0FF] text-black text-sm font-medium rounded">
                          Save{' '}
                          {Math.round(
                            (1 -
                              parseFloat(selectedVariant.price.amount) /
                                parseFloat(
                                  selectedVariant.compareAtPrice.amount,
                                )) *
                              100,
                          ) || 0}
                          %
                        </span>
                      </>
                    )}
                </div>
              ) : (
                <div className="flex flex-wrap items-baseline">
                  <span className="text-2xl md:text-3xl font-bold">$59.95</span>
                  <span className="ml-3 text-lg text-[#BBBBBB] line-through">
                    $79.95
                  </span>
                  <span className="ml-3 px-2 py-1 bg-[#00E0FF] text-black text-sm font-medium rounded">
                    Save 25%
                  </span>
                </div>
              )}
            </div>

            {/* Compelling Description */}
            <div className="text-[#BBBBBB] mb-6">
              <p className="mb-4">
                <span className="text-[#F9F9F9] font-medium">
                  Transform your space
                </span>{' '}
                with this premium Neovibe lighting solution. Designed to create
                the perfect ambiance for any mood or activity with vibrant,
                customizable lighting effects.
              </p>
              <p>
                With <span className="text-[#00E0FF]">smart controls</span>,
                multiple modes, and seamless integration with your lifestyle,
                it's more than just lighting—it's an experience that evolves
                with your needs throughout the day.
              </p>
            </div>

            {/* Urgency Element */}
            <div className="p-3 bg-[#1A1A1A] rounded-lg text-center mb-6 border border-[#333] animate-pulse">
              <p className="text-sm font-bold">TRENDING NOW ON TIKTOK 👀</p>
              <p className="text-xs text-[#BBBBBB]">
                Only 15 left in stock at this price!
              </p>
            </div>

            {/* Product Form */}
            <div className="mb-6">
              {ProductForm ? (
                <ProductForm
                  productOptions={productOptions}
                  selectedVariant={selectedVariant}
                />
              ) : (
                <button className="w-full py-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
                  ADD TO CART
                </button>
              )}
              {/* <p className="text-center text-sm mt-3 text-[#BBBBBB]">
                <span className="text-white">Not vibing with it?</span> Send it
                back within 30 days.
              </p> */}
            </div>

            {/* Shipping Info */}
            <div className="mb-8 bg-[#1A1A1A] rounded-lg p-4">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#00E0FF] mt-1 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <div>
                  <p className="font-medium">Free shipping over $100</p>
                  <p className="text-sm text-[#BBBBBB]">
                    Expected delivery: 3-5 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Value Props Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          ELEVATE YOUR SPACE
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <div key={index} className="bg-[#1A1A1A] p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">{prop.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
              <p className="text-[#BBBBBB]">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Showcase with Real Images */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          SEE THE TRANSFORMATION
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product?.images?.nodes?.slice(0, 16).map((image: any, index: any) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden bg-[#1A1A1A]"
            >
              <img
                src={image.url}
                alt={`${product?.title || 'Neovibe Product'} feature ${index + 1}`}
                className="w-full h-auto object-cover aspect-square hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          JOIN THOUSANDS UPGRADING THEIR SPACE
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {displayReviews.slice(0, 3).map((review: any, index: any) => (
            <div key={index} className="bg-[#1A1A1A] p-6 rounded-xl">
              <div className="flex text-[#00E0FF] mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <h3 className="font-bold mb-2">{review.title}</h3>
              <p className="text-[#BBBBBB] mb-4">
                "
                {review.content.length > 120
                  ? review.content.substring(0, 120) + '...'
                  : review.content}
                "
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#2A2A2A] rounded-full mr-2"></div>
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-xs text-[#BBBBBB]">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={scrollToReviews}
            className="px-6 py-3 bg-transparent border border-[#333333] text-[#F9F9F9] rounded-lg hover:bg-[#1A1A1A] transition-colors"
          >
            Read All Reviews
          </button>
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          THIS IS YOUR VIBE IF...
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {perfectForItems.map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#00E0FF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-[#121212] to-[#1A1A1A] p-8 rounded-xl text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">
          READY TO TRANSFORM YOUR SPACE?
        </h2>
        <p className="text-[#BBBBBB] mb-6 max-w-2xl mx-auto">
          Join thousands who've upgraded their environment with Neovibe. Your
          space should match your energy at every moment of the day.
        </p>

        <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />

        <p className="text-sm text-[#BBBBBB] mt-4">
          <span className="text-[#00E0FF]">Free shipping</span> •{' '}
          <span className="text-[#00E0FF]">30-day returns</span> •{' '}
          <span className="text-[#00E0FF]">1-year warranty</span>
        </p>
      </div>
    </div>
  );
};

export default SalesPitchGeneric;
