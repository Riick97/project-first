import {useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import ProductImageGallery from './ProductImageGallery';
import {ProductForm} from '../ProductForm';
import {ZapIcon, Lightbulb, Gift, Smartphone} from 'lucide-react';

const SalesPitchFloatingLEDLamp = ({
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}: any) => {
  // Customer review data if no reviews are provided
  const defaultReviews = [
    {
      name: 'Alex R.',
      date: 'March 18, 2025',
      rating: 5,
      title: 'Mind-Blowing Floating Light!',
      content:
        "I was skeptical about whether this would actually float, but wow, it really does! The levitation effect is mesmerizing and everyone who visits asks about it. The gesture controls are super intuitive and the color changing features create the perfect ambiance for my space. I got the wireless charging model and it's so convenient to just place my phone on the base while the ball floats and spins above. Definitely a conversation starter!",
      helpful: 28,
    },
    {
      name: 'Samantha T.',
      date: 'February 27, 2025',
      rating: 5,
      title: 'Perfect Gift for Space Enthusiasts',
      content:
        "Bought this for my boyfriend who's obsessed with space and technology, and he absolutely loves it! The floating ball defies gravity in the most magical way, and the RGB color options create a beautiful ambiance in his gaming room. The fact that you can control it with hand gestures makes it feel like you're using the Force. Excellent quality and the wireless charging feature is a great bonus. 10/10 would recommend!",
      helpful: 19,
    },
    {
      name: 'David L.',
      date: 'April 5, 2025',
      rating: 4,
      title: 'Great Conversation Piece',
      content:
        "This LED levitating lamp is absolutely fascinating. I have it in my office and clients are always amazed by it when they visit. The floating effect is super cool and the RGB lights create a nice atmosphere. The gesture controls take a little practice to master, but once you get the hang of it, they work well. I docked one star because the instruction manual could be clearer, but overall it's an excellent product that brings a touch of magic to any space.",
      helpful: 15,
    },
    {
      name: 'Priya M.',
      date: 'March 22, 2025',
      rating: 5,
      title: 'Amazing Tech for My Room!',
      content:
        "I'm obsessed with this levitating light! It's like having a piece of sci-fi technology in my bedroom. The floating orb creates such a calming effect as it gently rotates, and being able to change colors with just a wave of my hand feels magical. The wireless charging feature is perfect for my nightstand setup. I've had it for a month now and it still works flawlessly - definitely worth every penny!",
      helpful: 32,
    },
    {
      name: 'James W.',
      date: 'April 10, 2025',
      rating: 4,
      title: 'Cool Tech with Minor Learning Curve',
      content:
        "This floating LED lamp is definitely a showstopper! The levitation effect works perfectly and the RGB lighting creates a great ambiance. The gesture controls took me a couple of days to master - they're not quite as intuitive as I expected, but once you get used to them, they work well. I got the wireless charging version and it charges my iPhone quickly. Just be aware that if you have a very thick phone case, you might need to remove it for optimal charging.",
      helpful: 13,
    },
    {
      name: 'Olivia C.',
      date: 'March 8, 2025',
      rating: 5,
      title: 'Perfect for My Meditation Space',
      content:
        "I purchased this for my meditation room and it's absolutely perfect! The gently rotating orb creates such a peaceful focal point, and the ability to select calming blue or purple hues enhances my practice. The levitation effect never gets old - it's like a constant reminder that anything is possible. The gesture controls are so elegant and add to the mindful experience. I also appreciate how well-made the base is - substantial and stable.",
      helpful: 24,
    },
    {
      name: 'Michael T.',
      date: 'February 20, 2025',
      rating: 3,
      title: 'Cool Concept, Some Practical Issues',
      content:
        "The floating effect is definitely cool and works as advertised. The RGB lights are vibrant and create a nice atmosphere. However, I found a few practical issues - the gesture controls can be finicky at times, and the magnetic connection occasionally drops if there's a lot of vibration nearby (like if someone slams a door). For the price, I expected it to be a bit more robust. It still looks amazing and gets compliments, but be aware it requires a stable environment.",
      helpful: 17,
    },
    {
      name: 'Emma L.',
      date: 'April 2, 2025',
      rating: 5,
      title: 'Absolutely Magical!',
      content:
        "I can't stop staring at this lamp! The way the ball just floats and spins in the air is absolutely magical. I got the white wireless charging model for my minimalist apartment and it fits in perfectly while still being a standout piece. The gesture controls work beautifully - I love being able to wave my hand to change colors or start/stop the rotation. The wireless charging is fast and reliable too. This has quickly become my favorite tech purchase of the year!",
      helpful: 29,
    },
    {
      name: 'Thomas B.',
      date: 'March 15, 2025',
      rating: 4,
      title: 'Great Product, Shipping Needs Improvement',
      content:
        "The levitating lamp itself deserves 5 stars - it works perfectly, looks stunning, and the gesture controls are responsive once you learn them. The floating ball spins smoothly and the RGB lighting effects are beautiful. However, I'm giving 4 stars because the packaging could be better - my first unit arrived with a small crack in the base. Customer service was great and sent a replacement quickly, but better packaging would prevent this issue. Still very happy with the product!",
      helpful: 11,
    },
    {
      name: 'Sarah K.',
      date: 'April 7, 2025',
      rating: 5,
      title: 'My Kids Are Obsessed!',
      content:
        "Bought this for my tech-loving 12-year old's bedroom and now all the siblings want one too! They're fascinated by the floating ball and spend hours experimenting with different colors and rotation speeds. It's actually gotten them interested in learning about magnetism and levitation, so it's educational too! The lamp is very well made and has survived in a house with kids, which says a lot about its durability. The wireless charging feature is a nice bonus that keeps their devices powered.",
      helpful: 20,
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
    'Interactive rotation that creates a mesmerizing floating sensation',
    'Gesture-controlled illumination with simple hand motions',
    'Vibrant RGB color selection to match any mood',
    'Available with 15W wireless charging capabilities',
    'Standalone battery-powered model for placement anywhere',
    'Easy wave control to toggle rotation and change light modes',
    'Perfect ambient lighting for bedrooms, offices, or living spaces',
    'Makes a unique and captivating gift for tech enthusiasts',
    'ABS material construction for durability and longevity',
  ];

  // Perfect For Items
  const perfectForItems = [
    'Tech enthusiasts who appreciate innovative gadgets',
    'Anyone looking to add a magical conversation piece to their space',
    'Modern home decor lovers seeking unique ambient lighting',
    'Gift-givers wanting to surprise someone with something truly different',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Introduction to the Product */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            DEFY GRAVITY WITH FLOATING ILLUMINATION
          </h2>
          <p className="text-xl text-[#BBBBBB] max-w-3xl mx-auto">
            The 3D Levitating Ball Lamp merges cutting-edge magnetic
            levitation with mesmerizing RGB lighting for an illumination
            experience that seems to defy the laws of physics.
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
                {'3D Levitating Ball Lamp'}
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
                    Magic isn't just in fairy tales.
                  </span>{' '}
                  Your Levitating Ball Lamp creates real wonder
                  through advanced magnetic levitation that keeps the
                  illuminated orb floating and spinning in mid-air.
                </p>
                <p>
                  With simple gesture controls, you command this technological
                  marvel with a wave of your hand—changing colors, toggling
                  rotation, and creating the perfect ambiance for any space or
                  moment.
                </p>
              </div>

              {/* Urgency Element */}
              <div className="p-3 bg-[#1A1A1A] rounded-lg text-center mb-6 border border-[#333] animate-pulse">
                <p className="text-sm font-bold">
                  FEATURED ON "COOLEST TECH OF 2025" LIST 🔥
                </p>
                <p className="text-xs text-[#BBBBBB]">
                  Only 18 units remaining at this price!
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
                    ADD FLOATING MAGIC TO MY SPACE
                  </button>
                )}
                <p className="text-center text-sm mt-3 text-[#BBBBBB]">
                  <span className="text-white">Not impressed?</span> Return
                  within 30 days for a full refund.
                </p>
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

      {/* Story Hero - The Magical Experience */}
      <MagicalExperience />

      {/* The Problem Section */}
      <ProblemSection />

      {/* The Technology Section */}
      <TechnologySection />

      {/* Product Showcase Section */}
      <ProductShowcaseSection />

      {/* Features Section - The Magical Features */}
      <FeaturesSection features={features} />

      {/* Social Proof - Real User Stories */}
      <SocialProofSection displayReviews={displayReviews} />

      {/* Who This is For Section */}
      <TargetAudienceSection perfectForItems={perfectForItems} />

      {/* Final CTA Section */}
      <CTASection
        productOptions={productOptions}
        selectedVariant={selectedVariant}
      />

      {/* Added FAQ Section */}
      <FAQSection />

      {/* Final Magic Reminder */}
      <FutureResultsSection />
    </div>
  );
};

function MagicalExperience() {
  return (
    <div className="w-full bg-gradient-to-r from-[#121212] to-[#1A1A1A] rounded-lg overflow-hidden mb-12">
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-[#BBBBBB] mb-2">
          Imagine showing your friends something they've never seen before...
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          "WAIT, HOW IS THAT <span className="text-[#00E0FF]">FLOATING</span>?"
        </h3>
        <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto mb-6">
          That's the reaction everyone has when they first see your
          Levitating Ball Lamp. A glowing orb that defies gravity, floating and
          spinning with no visible support.
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto">
          This isn't just lighting—it's a{' '}
          <span className="text-[#00E0FF] font-bold">technological marvel</span>{' '}
          that transforms your space.
        </p>
      </div>
    </div>
  );
}

function ProblemSection() {
  const showcaseData = {
    transformation: {
      before: {
        image: '/products/SalesPitchFloatingLEDLamp/before.png',
        alt: 'Boring traditional lamp on a table creating ordinary lighting with nothing special about the design or functionality',
        points: [
          'Ordinary lamps that blend into the background',
          "Static lighting that doesn't evoke any emotion",
          "Tech that serves a function but doesn't inspire",
        ],
      },
      after: {
        image: '/products/SalesPitchFloatingLEDLamp/after.png',
        alt:  'Levitating Ball Lamp with floating orb suspended in air glowing with vibrant RGB colors, creating a magical atmosphere in the room',
        points: [
          'Mesmerizing floating orb that captivates attention',
          'Dynamic RGB lighting that transforms the mood of any space',
          'Conversation-starting technology that amazes everyone who sees it',
        ],
      },
    },
  };

  return (
    <div className="mb-16 bg-[#1A1A1A] p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ORDINARY LIGHTING VS. FLOATING MAGIC
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#BBBBBB]">
            Your current lighting experience:
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
                Stationary lamps that just sit there, doing nothing interesting
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
              <p>
                Standard lighting that doesn't enhance your space's personality
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
              <p>Decor items that fail to spark conversation or interest</p>
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
              <p>Technology that merely functions rather than amazes</p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#00E0FF]">
            Experience the difference:
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
              <p>
                A mesmerizing orb that actually floats and rotates in mid-air
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
              <p>Gesture-controlled RGB lighting that adjusts to your mood</p>
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
              <p>A conversation piece that instantly draws attention</p>
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
                Advanced technology that feels like you're living in the future
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
        <p className="text-lg font-medium mb-2">
          This isn't just lighting—it's an experience.
        </p>
        <p className="text-[#00E0FF] text-xl font-bold">
          It's the 3D Levitating Ball Lamp difference.
        </p>
      </div>
    </div>
  );
}

function TechnologySection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        CUTTING-EDGE TECHNOLOGY MEETS MAGICAL DESIGN
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <ZapIcon size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Magnetic Levitation</h3>
          <p className="text-[#BBBBBB]">
            Precisely calibrated electromagnetic fields create a stable
            levitation zone, allowing the illuminated sphere to float perfectly
            in mid-air without any physical support.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <Lightbulb size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Gesture Control System</h3>
          <p className="text-[#BBBBBB]">
            Advanced sensors detect precise hand movements, allowing you to
            control the lamp with simple gestures. Wave to toggle lighting
            modes, swipe to change colors, and hover to control rotation—all
            without touching the device.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <Smartphone size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Wireless Charging</h3>
          <p className="text-[#BBBBBB]">
            Selected models feature built-in 15W wireless charging that's
            compatible with all Qi-enabled devices. The perfect combination of
            form and function—power your phone while enjoying the mesmerizing
            floating light show.
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
        src: '/products/SalesPitchFloatingLEDLamp/main1.png',
        alt:  '3D Levitating Ball Lamp floating and rotating in a living room with purple lighting creating a magical atmosphere',
        caption: 'Transform any space with floating magic',
        size: 'large', // For the 2x2 image
      },
      {
        id: 2,
        src: '/products/SalesPitchFloatingLEDLamp/main2.png',
        alt: 'Close-up of the Levitating Ball Lamp on a side table with blue lighting in a modern bedroom setup',
        caption: 'Perfect bedside companion',
        size: 'small',
      },
      {
        id: 3,
        src: '/products/SalesPitchFloatingLEDLamp/main3.png',
        alt:  'floating lamp in red color mode being controlled by hand gesture in a darkened room',
        caption: 'Control with a wave',
        size: 'small',
      },
      {
        id: 4,
        src: '/products/SalesPitchFloatingLEDLamp/main4.png',
        alt: 'Home office desk with floating lamp creating a green ambient glow while a smartphone charges on its base',
        caption: 'Charge while you work',
        size: 'small',
      },
      {
        id: 5,
        src: '/products/SalesPitchFloatingLEDLamp/main5.png',
        alt: 'Person showing friends the floating lamp at a small gathering, with everyone looking amazed',
        caption: 'Instant conversation starter',
        size: 'small',
      },
    ],

    // Customer Moments
    customerMoments: [
      {
        id: 1,
        title: 'Gaming Setup Revolution',
        image: '/products/SalesPitchFloatingLEDLamp/moments1.png',
        alt: 'Gaming setup with multiple monitors and Levitating Lamp creating ambient purple lighting that matches the gaming peripherals',
        content:
          'The floating ball lamp completes my gaming setup perfectly. I sync the RGB colors with my game lighting and everyone who joins my streams asks about it!',
        customer: 'Marcus G., Verified Customer',
      },
      {
        id: 2,
        title: 'Meditation Space Enhancer',
        image: '/products/SalesPitchFloatingLEDLamp/moments2.png',
        alt: 'Peaceful meditation space with lamp producing calming blue light while a person meditates in the background',
        content:
          'I set my to a gentle blue rotation during meditation. The floating motion creates a perfect focal point for mindfulness practice.',
        customer: 'Aisha T., Verified Customer',
      },
      {
        id: 3,
        title: 'Perfect Gift Moment',
        image: '/products/SalesPitchFloatingLEDLamp/moments3.png',
        alt: 'Person unwrapping the Levitating Lamp as a gift with an expression of awe and excitement',
        content:
          'I gave this to my tech-obsessed husband for his birthday and captured the moment of pure joy when he saw it floating for the first time. Best gift reaction ever!',
        customer: 'Jennifer R., Verified Customer',
      },
    ],
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        SEE THE IN ACTION
      </h2>

      <div className="mb-8">
        <p className="text-lg text-center text-[#BBBBBB] max-w-3xl mx-auto mb-8">
          Join thousands of people who've brought floating illumination and
          magical ambiance into their homes with the Levitating Ball
          Lamp.
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
          Love your Levitating Lamp? Share your magical moments with
          us!
        </p>
        <p className="text-[#00E0FF] font-medium">
          Tag  and #FloatingMagic on Instagram for a chance to be
          featured
        </p>
      </div>
    </div>
  );
}


function FeaturesSection({features}: {features: string[]}) {
  // Feature data structure specific to the floating lamp
  const featureData = {
    basicFeatures: [
      {
        icon: 'gesture',
        name: 'Gesture Control',
        description: 'Control with hand movements',
      },
      {
        icon: 'wireless',
        name: 'Wireless Charging',
        description: '15W fast charging for devices',
      },
      {
        icon: 'rgb',
        name: 'RGB Colors',
        description: 'Full spectrum color selection',
      },
      {
        icon: 'battery',
        name: 'Battery Option',
        description: '600mAh built-in battery',
      },
    ],
    premiumFeatures: [
      {
        id: 'levitation',
        name: 'Floating Magnetic Levitation',
        image: '/products/SalesPitchFloatingLEDLamp/features1.png',
        alt: 'Close-up of the lamp with the orb floating and spinning in mid-air, demonstrating the magnetic levitation technology with soft purple lighting',
        description:
          'Advanced electromagnetic technology creates a stable magnetic field, allowing the illuminated orb to float and rotate in mid-air without any physical support.',
        tagline: 'Defies gravity',
      },
      {
        id: 'gestures',
        name: 'Advanced Gesture Controls',
        image: '/products/SalesPitchFloatingLEDLamp/features2.png',
        alt: 'Person controlling the lamp with hand gestures - waving to change colors and hovering to control rotation speed of the floating orb',
        description:
          'Intuitive hand gestures allow complete control of your lamp. Wave to toggle lighting modes, sway to change colors, and hover to control rotation speed.',
        tagline: 'Control with a wave',
      },
      {
        id: 'charging',
        name: 'Qi Wireless Charging',
        image: '/products/SalesPitchFloatingLEDLamp/features3.png',
        alt: 'Smartphone charging wirelessly on the lamp base while the orb continues floating and illuminating the space with ambient light',
        description:
          'Selected models feature a built-in 15W wireless charging pad compatible with all Qi-enabled devices. Power your phone while enjoying the floating light show.',
        tagline: 'Power while you glow',
      },
      {
        id: 'colors',
        name: 'Dynamic RGB Lighting',
        image: '/products/SalesPitchFloatingLEDLamp/features4.png',
        alt: 'Series of images showing the lamp cycling through different vibrant RGB colors, creating distinct moods and atmospheres',
        description:
          'Create the perfect ambiance with a full spectrum of vibrant RGB colors. Choose solid colors for focus or dynamic color-changing effects for entertainment.',
        tagline: 'Your mood, your color',
      },
    ],
  };

  return (
    <div className="mb-16">
      <div className="bg-[#1A1A1A] p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          MAGICAL FEATURES THAT CAPTIVATE
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

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6 text-[#00E0FF]">
            MAGICAL EXPERIENCES POWERED BY TECHNOLOGY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureData.premiumFeatures.map((feature) => (
              <div
                key={feature.id}
                className="bg-[#2A2A2A] rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-[#1A1A1A] relative">
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


function SocialProofSection({displayReviews}: {displayReviews: any}) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleLoadMore = () => {
    // Load 3 more reviews at a time
    setVisibleReviews((prev) => Math.min(prev + 3, displayReviews.length));
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        REAL PEOPLE, REAL MAGICAL EXPERIENCES
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {displayReviews
          .slice(0, visibleReviews)
          .map((review: any, index: any) => (
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
                <div>
                  <p className="text-sm font-medium">{review.name}</p>
                  <p className="text-xs text-[#BBBBBB]">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 text-center flex flex-col items-center space-y-4">
        {visibleReviews < displayReviews.length && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-transparent border border-[#333333] text-[#F9F9F9] rounded-lg hover:bg-[#1A1A1A] transition-colors"
          >
            Load More Magical Experiences
          </button>
        )}
      </div>
    </div>
  );
}


function TargetAudienceSection({perfectForItems}: {perfectForItems: any}) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        WHO NEEDS THIS FLOATING MAGIC?
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
        BRING FLOATING MAGIC INTO YOUR SPACE TODAY
      </h2>
      <p className="text-[#BBBBBB] mb-6 max-w-2xl mx-auto">
        Imagine having a conversation piece that captivates everyone who enters
        your space. A magical floating orb that combines cutting-edge technology
        with mesmerizing lighting. The future of ambient illumination is here.
      </p>

      {ProductForm ? (
        <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />
      ) : (
        <button className="w-full max-w-md mx-auto py-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
          ADD FLOATING MAGIC TO MY CART
        </button>
      )}

      <p className="text-sm text-[#BBBBBB] mt-4">
        <span className="text-[#00E0FF]">Fast worldwide shipping</span> •{' '}
        <span className="text-[#00E0FF]">30-day money-back guarantee</span> •{' '}
        <span className="text-[#00E0FF]">1-year warranty</span>
      </p>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        QUESTIONS ABOUT YOUR FLOATING LAMP
      </h2>

      <div className="space-y-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            How does the levitation technology actually work?
          </h3>
          <p className="text-[#BBBBBB]">
            The uses electromagnetic levitation technology. The base
            contains precisely calibrated electromagnets that create a stable
            magnetic field, while the floating orb contains a permanent magnet.
            When positioned correctly, these opposing magnetic forces achieve
            perfect balance, allowing the orb to float. The rotation is achieved
            through a separate electromagnetic system.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Is it difficult to set up the floating orb?
          </h3>
          <p className="text-[#BBBBBB]">
            Not at all! We've designed the to be incredibly
            user-friendly. The base creates a magnetic "sweet spot" where you'll
            feel the orb being gently pulled into position. Once you feel the
            magnetic pull, slowly release the orb and it will stabilize in its
            floating position automatically. Most users master this in under a
            minute.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Will the floating orb fall if someone bumps the table?
          </h3>
          <p className="text-[#BBBBBB]">
            The features stabilization technology that can handle
            mild vibrations and small bumps. However, significant impacts might
            cause the orb to fall. The good news is that the orb is made from
            durable ABS material that won't break easily, and re-establishing
            the levitation is quick and simple. Just position it back in the
            magnetic sweet spot.
          </p>
        </div>
      </div>
    </div>
  );
}

function FutureResultsSection() {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-xl text-center mb-16">
      <h3 className="text-xl font-bold mb-4">
        REMEMBER WHEN LIGHTING WAS JUST... ORDINARY?
      </h3>
      <p className="text-[#BBBBBB] mb-4">
        That changes today. The Levitating Ball Lamp isn't just a
        light source—it's a conversation piece, a technological marvel, and a
        magical experience that transforms your space and captivates everyone
        who sees it.
      </p>
      <p className="text-[#00E0FF] font-bold">
        Bring home the magic of floating light and watch your space transform.
      </p>
    </div>
  );
}

















export default SalesPitchFloatingLEDLamp;