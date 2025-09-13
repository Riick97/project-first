import {useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import ProductImageGallery from './ProductImageGallery';
import {ProductForm} from '../ProductForm';
import {Eye, RotateCw, BatteryCharging, Plug} from 'lucide-react';

const SalesPitchRotatingSensorLight = ({
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}: any) => {
  // Customer review data if no reviews are provided
  const defaultReviews = [
    {
      name: 'Michael R.',
      date: 'March 22, 2025',
      rating: 5,
      title: 'Perfect for my garage!',
      content:
        "I installed this in my garage and it's been a game-changer. No more fumbling for a light switch with my hands full of groceries! The motion sensing is reliable and I love that it rotates to direct light exactly where I need it. The installation was super easy with the included adhesive - no wiring needed. Great battery life too!",
      helpful: 28,
    },
    {
      name: 'Taylor J.',
      date: 'February 15, 2025',
      rating: 5,
      title: 'Solved My Closet Problem',
      content:
        'I have a walk-in closet with no built-in lighting. This little sensor light has completely solved my problem! It turns on the moment I enter and gives me perfect visibility for picking out clothes. I went with the warm yellow light which is much nicer than harsh LEDs for early mornings. The rotation feature means I can aim it exactly where needed. Super simple setup - just USB charged it and stuck it to the wall.',
      helpful: 19,
    },
    {
      name: 'Priya K.',
      date: 'April 5, 2025',
      rating: 4,
      title: 'Great for Hallways and Stairs',
      content:
        "I bought three of these for our hallway and staircase areas. They work perfectly for nighttime bathroom trips - just enough light to see where you're going without blinding yourself or waking up completely. The motion detection is responsive but not oversensitive. My only minor complaint is that I wish the AUTO mode had a darkness sensor so it wouldn't activate during daylight, but for the price, these are excellent. The 20-second timing is perfect.",
      helpful: 12,
    },
  ];

  // Use provided reviews or fallback to default ones
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

  // Key product features
  const features = [
    'Motion-activated lighting that automatically turns off 20 seconds after you leave',
    'Adjustable 360° rotating lamp cap to direct light exactly where you need it',
    'Three-mode switch: ON (always on), OFF, AUTO (motion sensing)',
    'Wide 120° sensing angle for reliable detection up to 3-5 meters away',
    'Energy-efficient design with USB rechargeability',
    'Available in yellow warm light or white bright light options',
    'Compact size (83×83×56mm) perfect for small spaces',
    'Simple installation with included double-sided adhesive - no wiring required',
    'Sleek modern design that blends with any decor',
  ];

  // Perfect For Items
  const perfectForItems = [
    'Dark hallways, staircases and corridors that need safe nighttime illumination',
    'Closets, wardrobes and storage spaces without built-in lighting',
    'Garages and utility areas where hands-free lighting is essential',
    'Entryways and porches that benefit from automatic welcome lighting',
    'Under-cabinet spaces in kitchens and workshops',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Introduction to the Solution */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            INTELLIGENT LIGHTING WHEN & WHERE YOU NEED IT
          </h2>
          <p className="text-xl text-[#BBBBBB] max-w-3xl mx-auto">
            The Rotating Motion Sensor Light detects your presence and
            illuminates your path, automatically activating when you arrive and
            shutting off when you leave.
          </p>
        </div>

        {/* Main Product Section with Image and Details */}
        <div className="grid md:grid-cols-2 gap-12">
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
                {'Rotating Motion Sensor Light'}
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
                <div className="flex flex-wrap items-baseline">
                  <span className="text-2xl md:text-3xl font-bold">
                    {selectedVariant?.price ? (
                      <Money data={selectedVariant.price} />
                    ) : (
                      '$4.39'
                    )}
                  </span>

                  {selectedVariant?.compareAtPrice?.amount &&
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
              </div>

              {/* Compelling Description - Story-focused */}
              <div className="text-[#BBBBBB] mb-6">
                <p className="mb-4">
                  <span className="text-[#F9F9F9] font-medium">
                    Never fumble in the dark again.
                  </span>{' '}
                  The Motion Sensor Light instantly detects your presence and
                  illuminates your path with either warm yellow or bright white
                  light depending on your needs.
                </p>
                <p>
                  With its unique 360° rotating design, you can direct light
                  exactly where it's needed. Perfect for hallways, closets,
                  stairs, garage entrances—anywhere you need hands-free,
                  intelligent lighting that activates only when you're present.
                </p>
              </div>

              {/* Urgency Element */}
              <div className="p-3 bg-[#1A1A1A] rounded-lg text-center mb-6 border border-[#333] animate-pulse">
                <p className="text-sm font-bold">
                  CUSTOMER FAVORITE - SELLING FAST 🔥
                </p>
                <p className="text-xs text-[#BBBBBB]">
                  Last restock sold out in under 48 hours!
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
                    LIGHT UP MY SPACE
                  </button>
                )}
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
                    <p className="font-medium">Fast shipping worldwide</p>
                    <p className="text-sm text-[#BBBBBB]">
                      Expected delivery: 5-7 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Hero - The Painful Experience */}
      <PainfulExperience />

      {/* The Problem Section */}
      <ProblemSection />

      {/* Product Showcase Section */}
      <ProductShowcaseSection />

      {/* Features Section - The Tools for Transformation */}
      <FeaturesSection features={features} />

      {/* Social Proof - Real Transformation Stories */}
      <SocialProofSection
        displayReviews={displayReviews}
        scrollToReviews={scrollToReviews}
      />

      {/* Who This is For Section */}
      <TargetAudienceSection perfectForItems={perfectForItems} />


      {/* Final CTA Section */}
      <CTASection
        productOptions={productOptions}
        selectedVariant={selectedVariant}
      />

      {/* Added FAQ Section */}
      <FAQSection />
    </div>
  );
};

function PainfulExperience() {
  return (
    <div className="w-full bg-gradient-to-r from-[#121212] to-[#1A1A1A] rounded-lg overflow-hidden mb-12">
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-[#BBBBBB] mb-2">
          We've all been there...
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          STUMBLING THROUGH <span className="text-[#00E0FF]">DARK SPACES</span>{' '}
          EVERY NIGHT
        </h3>
        <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto mb-6">
          You're carrying groceries into your dark garage. Navigating a dim
          hallway at 2AM. Trying to find clothes in an unlit closet. Fumbling
          for a light switch that seems impossible to locate.
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto">
          What if your spaces could{' '}
          <span className="text-[#00E0FF] font-bold">
            intelligently light themselves
          </span>{' '}
          exactly when and where you need it?
        </p>
      </div>
    </div>
  );
}

function ProblemSection() {
  const showcaseData = {
    transformation: {
      before: {
        image: '/products/SensorLight/before.png',
        alt: 'Person struggling to find items in a dark closet while using phone flashlight',
        points: [
          'Fumbling for switches in the dark',
          'Wasted electricity from lights left on',
          'Dark spots even with overhead lighting',
          'Waking others with bright lights at night',
        ],
      },
      after: {
        image: '/products/SensorLight/after.png',
        alt: 'Person entering a closet as motion sensor light activates automatically, illuminating the space perfectly',
        points: [
          'Instant hands-free illumination',
          'Precisely directed light where needed',
          'Automatic shut-off to save energy',
          'Perfect gentle lighting for nighttime',
        ],
      },
    },
  };

  return (
    <div className="mb-16 bg-[#1A1A1A] p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        THE LIGHTING STRUGGLE IS REAL
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#BBBBBB]">
            This is your experience right now:
          </h3>
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={showcaseData.transformation.before.image}
              alt={showcaseData.transformation.before.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                You fumble for light switches in the dark, often with your hands
                full
              </p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p>You leave lights on unnecessarily, wasting electricity</p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                You blind yourself (and others) with harsh overhead lights at
                night
              </p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Many spaces in your home still remain frustratingly dark</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#00E0FF]">
            Imagine if your lighting worked like this:
          </h3>
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={showcaseData.transformation.after.image}
              alt={showcaseData.transformation.after.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Lights automatically turn on the moment you enter a space</p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Precisely aimed illumination exactly where you need it</p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                Lights automatically turn off when you're done, saving energy
              </p>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                Perfect gentle illumination that doesn't disturb others at night
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
        <p className="text-lg font-medium mb-2">
          This isn't complicated technology.
        </p>
        <p className="text-[#00E0FF] text-xl font-bold">
          This is the Rotating Motion Sensor Light.
        </p>
      </div>
    </div>
  );
}

// Feature data structure
const featureData = {
  basicFeatures: [
    {
      icon: 'eye',
      name: 'Motion Sensing',
      description: 'Advanced sensors detect movement up to 15 feet away',
    },
    {
      icon: 'rotate-3d',
      name: '360° Rotation',
      description:
        'Adjustable head rotates in any direction for perfect lighting',
    },
    {
      icon: 'battery-charging',
      name: 'USB Rechargeable',
      description: 'Built-in battery lasts up to 2 weeks on a single charge',
    },
    {
      icon: 'plug',
      name: 'No Wiring Needed',
      description: 'Install anywhere without electrical expertise or tools',
    },
  ],
  premiumFeatures: [
    {
      id: 'motion',
      name: 'Smart Motion Detection',
      image: '/products/SensorLight/features1.png',
      alt: 'Person walking into a dark hallway as motion sensor lights automatically illuminate their path, showing the 15-foot detection range and immediate activation without any manual interaction.',
      description:
        'Advanced PIR motion sensors detect movement up to 15 feet away and light up instantly, giving you hands-free illumination exactly when you need it.',
      tagline: 'Hands-free convenience',
    },
    {
      id: 'brightness',
      name: '3 Brightness Modes',
      image: '/products/SensorLight/features2.png',
      alt: 'Demonstration of the three brightness settings from low ambient light for nighttime navigation to maximum brightness for detailed tasks, showing how users can select the perfect lighting level for any situation.',
      description:
        'Choose between low, medium, and high settings to get the perfect amount of light for any situation, from gentle nighttime navigation to bright task lighting.',
      tagline: 'Perfect light every time',
    },
    {
      id: 'installation',
      name: 'Tool-Free Installation',
      image: '/products/SensorLight/features3.png',
      alt: 'Person easily mounting the motion light using the strong adhesive backing and magnetic base, demonstrating how it can be installed in under 30 seconds without any tools or wiring on various surfaces.',
      description:
        'Strong adhesive backing and magnetic mount options let you install in under 30 seconds with no tools required. Move and reposition whenever needed.',
      tagline: 'Set up in seconds',
    },
    {
      id: 'battery',
      name: 'Long-Lasting Battery',
      image: '/products/SensorLight/features4.png',
      alt: 'Visualization of the battery life showing the light working for two full weeks on a single charge with regular use, and the convenient USB charging process.',
      description:
        'Energy-efficient LEDs and smart power management provide up to 2 weeks of illumination on a single charge with standard usage patterns.',
      tagline: 'Reliable power for weeks',
    },
  ],
};

function FeaturesSection({features}: {features: string[]}) {
  return (
    <div className="mb-16">
      <div className="bg-[#1A1A1A] p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          YOUR TOOLKIT FOR PERFECT ILLUMINATION
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p>{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureData.basicFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-[#2A2A2A] rounded-lg"
            >
              <div className="w-16 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center mb-3">
                {feature.icon === 'eye' && (
                  <Eye size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'rotate-3d' && (
                  <RotateCw size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'battery-charging' && (
                  <BatteryCharging size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'plug' && (
                  <Plug size={32} className="text-[#00E0FF]" />
                )}
              </div>
              <p className="text-center text-sm">{feature.name}</p>
            </div>
          ))}
        </div>

        {/* Premium Features Showcase Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-[#00E0FF]">
            EXPLORE OUR PREMIUM FEATURES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureData.premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-[#2A2A2A] rounded-lg overflow-hidden"
              >
                <div className=" bg-[#1A1A1A] relative">
                  {/* Image for premium features */}
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#1A1A1A] bg-opacity-70 px-3 py-1 rounded text-xs">
                    {feature.tagline}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold mb-2">{feature.name}</h4>
                  <p className="text-sm text-[#BBBBBB]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Import statements that would be needed at the top of the file
// import { Eye, RotateCw, BatteryCharging, Plug } from 'lucide-react';
// import { useState } from 'react';

function SocialProofSection({
  displayReviews,
  scrollToReviews,
}: {
  displayReviews: any;
  scrollToReviews: () => void;
}) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        LIGHTING TRANSFORMATIONS FROM REAL CUSTOMERS
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
          Read All Customer Reviews
        </button>
      </div>
    </div>
  );
}

function TargetAudienceSection({perfectForItems}: {perfectForItems: any}) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        WHERE WILL YOU USE YOUR MOTION SENSOR LIGHT?
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {perfectForItems.map((item: any, index: any) => (
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
  );
}

function CTASection({
  productOptions,
  selectedVariant,
}: {
  productOptions: any;
  selectedVariant: any;
}) {
  return (
    <div className="bg-gradient-to-r from-[#121212] to-[#1A1A1A] p-8 rounded-xl text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">
        LIGHT UP THE DARK SPACES IN YOUR HOME
      </h2>
      <p className="text-[#BBBBBB] mb-6 max-w-2xl mx-auto">
        Imagine never fumbling for a light switch again. Your Neovibe Rotating
        Motion Sensor Light arrives ready to transform any space with
        intelligent, hands-free illumination.
      </p>

      {ProductForm ? (
        <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />
      ) : (
        <button className="w-full max-w-md mx-auto py-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
          GET MY SENSOR LIGHT NOW
        </button>
      )}

      <p className="text-sm text-[#BBBBBB] mt-4">
        <span className="text-[#00E0FF]">Fast shipping</span> •{' '}
        <span className="text-[#00E0FF]">30-day money back</span> •{' '}
        <span className="text-[#00E0FF]">USB cable included</span>
      </p>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div className="space-y-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">How is the light powered?</h3>
          <p className="text-[#BBBBBB]">
            The Neovibe Rotating Motion Sensor Light is rechargeable via the
            included USB cable. A full charge typically lasts 1-2 months with
            normal use in AUTO mode. There's no need for batteries or wiring
            into your electrical system.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            How does the AUTO mode work?
          </h3>
          <p className="text-[#BBBBBB]">
            In AUTO mode, the sensor detects motion within a 120° angle up to
            3-5 meters away. When motion is detected, the light turns on
            automatically and stays on for 20 seconds after the last detected
            movement. This ensures your space is lit exactly when you need it
            and saves energy when you leave.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            What's the difference between yellow and white light?
          </h3>
          <p className="text-[#BBBBBB]">
            The yellow light option provides a warm, soft glow (about 3000K)
            that's gentle on the eyes and perfect for nighttime use or creating
            a cozy atmosphere. The white light option delivers a brighter,
            daylight-type illumination (about 6000K) ideal for task lighting or
            areas where you need maximum visibility.
          </p>
        </div>
      </div>
    </div>
  );
}


// Note: If product images aren't available, update the image paths in the JSON:
// image: "/api/placeholder/240/240",

function ProductShowcaseSection() {
  // JSON data for all imagery and showcase content
  const showcaseData = {
    // Main Grid Images
    gridImages: [
      {
        id: 1,
        src: '/products/SensorLight/main1.png',
        alt: 'Rotating Motion Sensor Light illuminating a dark hallway as someone walks through at night',
        caption: 'Never stumble in a dark hallway again',
        size: 'large', // For the 2x2 image
      },
      {
        id: 2,
        src: '/products/SensorLight/main2.png',
        alt: 'Rotating Motion Sensor Light mounted inside a closet, automatically illuminating clothes and shelves',
        caption: 'Perfect closet lighting',
        size: 'small',
      },
      {
        id: 3,
        src: '/products/SensorLight/main3.png',
        alt: 'Rotating Motion Sensor Light in a garage, illuminating the area around a car door as someone opens it',
        caption: 'Hassle-free garage lighting',
        size: 'small',
      },
      {
        id: 4,
        src: '/products/SensorLight/main4.png',
        alt: 'Rotating Motion Sensor Light under kitchen cabinets providing countertop task lighting that activates when someone approaches',
        caption: 'Under-cabinet convenience',
        size: 'small',
      },
      {
        id: 5,
        src: '/products/SensorLight/main5.png',
        alt: 'Rotating Motion Sensor Light illuminating a staircase at night with a soft glow for safe navigation',
        caption: 'Staircase safety lighting',
        size: 'small',
      },
    ],
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        SEE THE NEOVIBE IN ACTION
      </h2>

      <div className="mb-8">
        <p className="text-lg text-center text-[#BBBBBB] max-w-3xl mx-auto mb-8">
          Join thousands of customers who've transformed their dark, frustrating
          spaces with the Rotating Motion Sensor Light.
        </p>
      </div>

      {/* Image Grid - using JSON data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {showcaseData.gridImages.map((image) => (
          <div
            key={image.id}
            className={`${
              image.size === 'large' ? 'col-span-2 row-span-2' : ''
            } rounded-lg overflow-hidden bg-[#1A1A1A]`}
          >
            <div className="relative h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute bottom-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent w-full">
                <p
                  className={`text-white ${image.size === 'large' ? 'text-sm' : 'text-xs'}`}
                >
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Generated Content Call */}
      <div className="mt-8 text-center">
        <p className="text-[#BBBBBB] mb-3">
          Love your Motion Sensor Light? Share your creative lighting solutions
          with us!
        </p>
        <p className="text-[#00E0FF] font-medium">
          Tag @NeovibeLight and #SmartSpaceSolutions on Instagram for a chance
          to be featured
        </p>
      </div>
    </div>
  );
}

export default SalesPitchRotatingSensorLight;
