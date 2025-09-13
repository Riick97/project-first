import {useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import ProductImageGallery from './ProductImageGallery';
import {ProductForm} from '../ProductForm';
import {Sparkles, Star, Music, Timer} from 'lucide-react';

const SalesPitchAstronautGalaxyProjector = ({
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}: any) => {
  // Customer review data if no reviews are provided
  const defaultReviews = [
    {
      name: 'Sophia L.',
      date: 'March 19, 2025',
      rating: 5,
      title: 'My daughter is obsessed!',
      content:
        "I bought this for my 7-year-old who's fascinated by space, and she absolutely LOVES it! The stars and nebula clouds look incredibly realistic on her ceiling. She falls asleep every night watching the gentle color transitions and says she has the 'coolest room ever.' The timer feature is perfect so it shuts off automatically after she falls asleep. Worth every penny for the magic it creates in her room!",
      helpful: 37,
    },
    {
      name: 'James K.',
      date: 'February 8, 2025',
      rating: 5,
      title: 'Perfect for my gaming setup',
      content:
        "I wanted something to enhance the vibe of my gaming room, and this astronaut projector is absolutely perfect! The nebula clouds and star effects create an immersive atmosphere that completely transforms the space. I've synced the light changes with my gaming sessions and the difference is incredible. My Twitch viewers keep asking about it in the chat. Not just for kids - this thing is seriously cool for any space enthusiast!",
      helpful: 24,
    },
    {
      name: 'Elena C.',
      date: 'April 3, 2025',
      rating: 4,
      title: 'Beautiful but some considerations',
      content:
        "The projection quality is gorgeous and the astronaut design adds such a cute touch to our nursery. The stars and nebula clouds are vibrant and really do transform the room. I'm taking off one star because the buttons are a bit confusing at first, and I wish the remote had better range. That said, once you get the hang of it, this projector creates a magical environment that both my baby and I enjoy during nighttime feedings. The gentle light transitions are perfect for a calming bedtime routine.",
      helpful: 19,
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
    'Dual projection technology: pinpoint stars + flowing nebula clouds',
    '15 color combinations with variable brightness settings',
    'Unique astronaut design adds style to any room',
    'Remote control with timing function (1-8 hours auto-shutdown)',
    'Bluetooth speaker to sync music with light patterns',
    'USB powered – works with power banks, wall adapters, or computers',
    'Adjustable projection angle for perfect ceiling or wall coverage',
    '4 animation modes: steady, breathe, flash, and fade',
    'Simple touch controls with memory function saves your favorite settings',
  ];

  // Perfect For Items
  const perfectForItems = [
    "Children's bedrooms & nurseries for magical bedtime experiences",
    'Gaming setups & streaming rooms for immersive atmospheric lighting',
    'Home theaters & entertainment spaces for next-level movie nights',
    'Yoga studios & meditation spaces for relaxation enhancement',
    'College dorm rooms & apartments for instant ambiance',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Introduction to the Solution */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            TRANSFORM YOUR SPACE INTO AN INTERSTELLAR ADVENTURE
          </h2>
          <p className="text-xl text-[#BBBBBB] max-w-3xl mx-auto">
            The Neovibe Astronaut Galaxy Projector brings the breathtaking
            wonder of the cosmos into your room with vibrant nebula clouds and
            twinkling stars.
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
                {'Astronaut Galaxy Projector'}
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
              </div>

              {/* Compelling Description - Story-focused */}
              <div className="text-[#BBBBBB] mb-6">
                <p className="mb-4">
                  <span className="text-[#F9F9F9] font-medium">
                    Bring the wonder of the universe into your home.
                  </span>{' '}
                  The Neovibe Astronaut Galaxy Projector transforms your
                  ordinary ceiling into a breathtaking cosmos of stars and
                  colorful nebula clouds that slowly drift and change.
                </p>
                <p>
                  More than just a night light, this stylish astronaut figure
                  creates an immersive atmosphere that's perfect for bedtime
                  routines, relaxation spaces, and setting the perfect vibe for
                  any room. The built-in Bluetooth speaker even lets you create
                  the ultimate multi-sensory experience by pairing your cosmic
                  light show with your favorite music.
                </p>
              </div>

              {/* Urgency Element */}
              <div className="p-3 bg-[#1A1A1A] rounded-lg text-center mb-6 border border-[#333] animate-pulse">
                <p className="text-sm font-bold">
                  VIRAL ON TIKTOK - SELLING FAST! 🌌
                </p>
                <p className="text-xs text-[#BBBBBB]">
                  Over 2.4M views this week alone
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
                    BRING THE GALAXY HOME
                  </button>
                )}
                {/* <p className="text-center text-sm mt-3 text-[#BBBBBB]">
                  <span className="text-white">Not vibing with it?</span> Send
                  it back within 30 days.
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
                      Expected delivery: 5-7 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Hero - The Problem */}
      <ProblemExperience />

      {/* The Problem Section */}
      <ProblemSection />

      {/* Product Showcase Section */}
      <ProductShowcaseSection />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Social Proof - Real Transformation Stories */}
      <SocialProofSection
        displayReviews={displayReviews}
        scrollToReviews={scrollToReviews}
      />

      {/* Who This is For Section */}
      <TargetAudienceSection perfectForItems={perfectForItems} />

      {/* Final CTA Section */}
      <CTASection />

      {/* Added FAQ Section */}
      <FAQSection />
    </div>
  );
};

function ProblemExperience() {
  return (
    <div className="w-full bg-gradient-to-r from-[#121212] to-[#1A1A1A] rounded-lg overflow-hidden mb-12">
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-[#BBBBBB] mb-2">
          Your room right now...
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          BLANK WALLS. ORDINARY CEILINGS.{' '}
          <span className="text-[#00E0FF]">ZERO VIBE.</span>
        </h3>
        <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto mb-6">
          We spend 1/3 of our lives in our bedrooms. Yet we settle for boring
          white walls, harsh lighting, and spaces that do nothing to inspire our
          imagination or help us unwind.
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto">
          What if your room could become a{' '}
          <span className="text-[#00E0FF] font-bold">
            gateway to the cosmos
          </span>{' '}
          at the touch of a button?
        </p>
      </div>
    </div>
  );
}

function ProblemSection() {
  const showcaseData = {
    transformation: {
      before: {
        image: '/products/GalaxyProjector/before.png',
        alt: 'Person looking bored in a plain bedroom with white walls and harsh overhead lighting',
        points: [
          'Plain, uninspiring room environment',
          'Harsh lighting that interrupts sleep cycles',
          'Difficulty unwinding at the end of the day',
          'Blank walls that do nothing for your mood',
        ],
      },
      after: {
        image: '/products/GalaxyProjector/after.png',
        alt: 'Person relaxing in a bedroom transformed by the Astronaut Galaxy Projector with stars and colorful nebula clouds on walls and ceiling',
        points: [
          'Immersive cosmic experience that transforms any space',
          'Gentle, colorful lighting perfect for relaxation',
          'Creates a magical environment that inspires wonder',
          'Sets the mood for sleep, meditation, or socializing',
        ],
      },
    },
  };

  return (
    <div className="mb-16 bg-[#1A1A1A] p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        REIMAGINE YOUR SPACE
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#BBBBBB]">
            Your room right now:
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
                Basic lighting that does nothing for your mood or atmosphere
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
              <p>Children who struggle to calm down at bedtime</p>
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
              <p>Environments that fail to inspire creativity or wonder</p>
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
              <p>Spaces that look ordinary and forgettable</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#00E0FF]">
            Your room with the Astronaut Galaxy Projector:
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
              <p>Immersive cosmos of stars and swirling nebula clouds</p>
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
                Calming environment that helps children fall asleep peacefully
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
              <p>Space that sparks imagination and creates wonder</p>
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
              <p>Instagram-worthy environment your friends will envy</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
        <p className="text-lg font-medium mb-2">
          This isn't just mood lighting.
        </p>
        <p className="text-[#00E0FF] text-xl font-bold">
          This is the Neovibe Astronaut Galaxy Projector—your portal to the
          cosmos.
        </p>
      </div>
    </div>
  );
}
// Feature data structure
const featureData = {
  basicFeatures: [
    {
      icon: 'sparkles',
      name: 'Nebula Effects',
      description: 'Vibrant cloud-like projections that mimic colorful space nebulae',
    },
    {
      icon: 'star',
      name: 'Starry Sky',
      description: 'Thousands of pinpoint stars create an authentic night sky experience',
    },
    {
      icon: 'music',
      name: 'Bluetooth Speaker',
      description: 'High-quality integrated speaker for immersive audio experiences',
    },
    {
      icon: 'timer',
      name: 'Timer Function',
      description: 'Set auto-shutdown from 1-12 hours for worry-free sleep',
    },
  ],
  premiumFeatures: [
    {
      id: 'nebula',
      name: 'Dynamic Nebula Effects',
      image: '/products/GalaxyProjector/features1.png',
      alt: 'Bedroom ceiling and walls transformed with vibrant, swirling nebula projections in blue, purple, and pink hues, creating an immersive space-like environment that completely transforms the room.',
      description:
        'Cutting-edge LED technology creates stunning cloud-like nebula projections that slowly rotate and transform, bringing the majesty of deep space into your room.',
      tagline: 'Experience cosmic wonder',
    },
    {
      id: 'stars',
      name: 'Ultra-Precise Star Field',
      image: '/products/GalaxyProjector/features2.png',
      alt: 'Close-up view of the incredibly detailed star projection showing thousands of individual pinpoint stars of varying brightness, accurately depicting constellations and creating a realistic night sky experience.',
      description:
        'Over 10,000 precisely engineered pinpoint stars create an astonishingly realistic night sky. The specialized optics ensure sharp definition and authentic stellar brightness variations.',
      tagline: 'Authentic stargazing',
    },
    {
      id: 'audio',
      name: 'Immersive Audio System',
      image: '/products/GalaxyProjector/features3.png',
      alt: 'Visualization of the sound system working with the visual effects, showing sound waves synchronized with the nebula patterns while a person relaxes beneath the projection, highlighting the multi-sensory experience.',
      description:
        'Premium 5W Bluetooth speaker with enhanced bass delivers rich, room-filling audio. Pair with your devices to enjoy music, ambient sounds, or guided meditations while experiencing the visual display.',
      tagline: 'Multi-sensory relaxation',
    },
    {
      id: 'control',
      name: 'Smart Control Options',
      image: '/products/GalaxyProjector/features4.png',
      alt: 'Demonstration of the multiple control options: smartphone app interface, voice control with smart home systems, and the included remote control, showing how users can easily customize their experience.',
      description:
        'Control your cosmic experience via smartphone app, included remote, or voice commands through Alexa and Google Home. Create custom scenes and schedules for the perfect ambiance anytime.',
      tagline: 'Effortless customization',
    },
  ],
};

function FeaturesSection({features}: {features: string[]}) {
  return (
    <div className="mb-16">
      <div className="bg-[#1A1A1A] p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          OUT-OF-THIS-WORLD FEATURES
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#00E0FF] mr-3 mt-1 flex-shrink-0"
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
                {feature.icon === 'sparkles' && (
                  <Sparkles size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'star' && (
                  <Star size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'music' && (
                  <Music size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'timer' && (
                  <Timer size={32} className="text-[#00E0FF]" />
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
// import { Sparkles, Star, Music, Timer } from 'lucide-react';
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
        COSMIC EXPERIENCES FROM REAL CUSTOMERS
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
        WHO NEEDS A GALAXY IN THEIR ROOM?
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

function CTASection() {
  return (
    <div className="bg-gradient-to-r from-[#121212] to-[#1A1A1A] p-8 rounded-xl text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">
        BRING THE UNIVERSE INTO YOUR HOME TONIGHT
      </h2>
      <p className="text-[#BBBBBB] mb-6 max-w-2xl mx-auto">
        Imagine turning off your lights tonight and watching as your ceiling
        transforms into a breathtaking cosmic wonderland. The Neovibe Astronaut
        Galaxy Projector creates an immersive experience that has to be seen to
        be believed.
      </p>

      <button className="w-full max-w-md mx-auto py-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
        GET MY GALAXY PROJECTOR NOW
      </button>

      <p className="text-sm text-[#BBBBBB] mt-4">
        <span className="text-[#00E0FF]">Free shipping over $100</span> •{' '}
        <span className="text-[#00E0FF]">30-day money back</span> •{' '}
        <span className="text-[#00E0FF]">1-year warranty</span>
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
          <h3 className="text-xl font-bold mb-2">
            How large of an area does the projector cover?
          </h3>
          <p className="text-[#BBBBBB]">
            The Neovibe Astronaut Galaxy Projector effectively covers areas up
            to 260 square feet (about 16' x 16'). For optimal results, we
            recommend placing it 5-10 feet away from the surface you're
            projecting onto. The projection angle is adjustable, allowing you to
            find the perfect position for your space.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            How do I connect to the Bluetooth speaker?
          </h3>
          <p className="text-[#BBBBBB]">
            Simply turn on the projector, enable Bluetooth on your smartphone or
            tablet, and search for "Neovibe Galaxy" in your Bluetooth devices
            list. Once connected, you can stream music or ambient sounds to
            enhance your cosmic experience. The speaker has a range of
            approximately 33 feet (10 meters).
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Is this suitable for children?
          </h3>
          <p className="text-[#BBBBBB]">
            Absolutely! The Astronaut Galaxy Projector is perfect for children's
            rooms. The gentle, colorful lighting creates a calming environment
            perfect for bedtime routines. The timer function lets you set it to
            automatically turn off after your child falls asleep. The projector
            has no small detachable parts and stays cool to the touch during
            operation.
          </p>
        </div>
      </div>
    </div>
  );
}


function ProductShowcaseSection() {
  // JSON data for all imagery and showcase content
  const showcaseData = {
    // Main Grid Images
    gridImages: [
      {
        id: 1,
        src: '/products/GalaxyProjector/main1.png',
        alt: 'Room transformed with blue and purple nebula cloud projections on the ceiling while a child looks up in wonder',
        caption: 'Transform any room into a cosmic wonderland',
        size: 'large', // For the 2x2 image
      },
      {
        id: 2,
        src: '/products/GalaxyProjector/main2.png',
        alt: 'Close-up of the Astronaut Galaxy Projector showing design details and light emission',
        caption: 'Stylish astronaut design',
        size: 'small',
      },
      {
        id: 3,
        src: '/products/GalaxyProjector/main3.png',
        alt: 'Bedroom with green and blue galaxy projections creating a peaceful sleep environment',
        caption: 'Perfect for bedtime',
        size: 'small',
      },
      {
        id: 4,
        src: '/products/GalaxyProjector/main4.png',
        alt: 'Living room with friends enjoying red and purple nebula projections during a social gathering',
        caption: 'Set the mood for gatherings',
        size: 'small',
      },
      {
        id: 5,
        src: '/products/GalaxyProjector/main5.png',
        alt: 'Yoga or meditation space with calming blue galaxy projections creating a serene atmosphere',
        caption: 'Enhance your relaxation space',
        size: 'small',
      },
    ],

  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        SEE THE COSMIC TRANSFORMATION
      </h2>

      <div className="mb-8">
        <p className="text-lg text-center text-[#BBBBBB] max-w-3xl mx-auto mb-8">
          Join thousands of customers who've brought the wonder of the cosmos
          into their everyday lives with the Neovibe Astronaut Galaxy Projector.
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
          Love your Neovibe Astronaut Galaxy Projector? Share your cosmic space
          with us!
        </p>
        <p className="text-[#00E0FF] font-medium">
          Tag @NeovibeLight and #MyCosmicSpace on Instagram for a chance to be
          featured
        </p>
      </div>
    </div>
  );
}

export default SalesPitchAstronautGalaxyProjector;
