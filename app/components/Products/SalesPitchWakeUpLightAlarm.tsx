import {useState} from 'react';
import {Money} from '@shopify/hydrogen-react';
import ProductImageGallery from './ProductImageGallery';
import {ProductForm} from '../ProductForm';
import {Radio, Moon, Usb, Sun} from 'lucide-react';
import {Brain, Lightbulb, AlarmClock} from 'lucide-react';

const SalesPitchWakeUpLightAlarm = ({
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}: any) => {
  // Customer review data if no reviews are provided
  const defaultReviews = [
    {
      name: 'Jamie L.',
      date: 'March 15, 2025',
      rating: 5,
      title: 'Best Morning Upgrade Ever!',
      content:
        "I was skeptical at first, but this sunrise alarm has completely transformed my mornings. No more jarring alarms that make me want to throw my phone across the room! The gradual sunrise simulation actually helps me wake up feeling refreshed instead of groggy. I've set mine to the birds chirping sound and it's so peaceful. The different color options are perfect for setting the right vibe in my bedroom at night too.",
      helpful: 24,
    },
    {
      name: 'Alex T.',
      date: 'February 28, 2025',
      rating: 5,
      title: 'Perfect for Heavy Sleepers',
      content:
        "As someone who could sleep through a hurricane, this alarm clock is a game-changer. The light gradually gets brighter until it's literally like having the sun in your room. I've never been able to consistently wake up with traditional alarms, but the combination of light + nature sounds actually works! Love that I can set different schedules for weekdays vs weekends too. The mood lighting feature is an awesome bonus for my evening wind-down routine.",
      helpful: 18,
    },
    {
      name: 'Morgan K.',
      date: 'April 2, 2025',
      rating: 4,
      title: 'Great Features, Slight Learning Curve',
      content:
        "The sunrise simulation works beautifully and has definitely improved my morning mood. The FM radio is clear and I appreciate all the sound options. My only complaint is that setting up all the features took some getting used to - the manual could be clearer. Once I figured it out though, it's been amazing! The USB charging port is super convenient and the night light feature is perfect for midnight bathroom trips without disrupting my sleep cycle. Would recommend!",
      helpful: 7,
    },
    {
      name: 'Sarah M.',
      date: 'March 27, 2025',
      rating: 5,
      title: 'Life-Changing for Winter Mornings',
      content:
        "Living in Seattle where winter mornings are dark until 8am, this sunrise clock has been life-changing! I used to feel so depressed dragging myself out of bed in pitch darkness, but now I wake up gradually with the simulated sunrise. The light quality is excellent - warm and natural, not harsh like some LED products. I've been using the gentle rainfall sound and it's so much nicer than being jolted awake by my phone. My mood has improved dramatically since purchasing!",
      helpful: 32,
    },
    {
      name: 'David W.',
      date: 'April 8, 2025',
      rating: 4,
      title: 'Solid Product with Great Features',
      content:
        "I've been using this alarm clock for about a month now and I'm impressed with the quality for the price. The sunrise simulation works well, and I like having 15 different colors to choose from for the night light function. The dual alarm feature is perfect since my partner and I wake up at different times. Only giving 4 stars because the buttons aren't very intuitive - took me a while to figure out how to program everything correctly. The FM radio reception is decent but not amazing in my area.",
      helpful: 15,
    },
    {
      name: 'Priya J.',
      date: 'March 5, 2025',
      rating: 5,
      title: 'Perfect for My Teenager',
      content:
        "Bought this for my 16-year-old who struggles terribly with waking up for school. After two weeks of using this clock, mornings are SO much easier! The gradual light really helps her body wake up naturally, and she's much less grumpy. I love that I can set it differently for weekends so she can sleep in. The sunset function is great too - she uses it as part of her bedtime routine and it helps signal to her brain that it's time to wind down. Wish I had discovered this years ago!",
      helpful: 29,
    },
    {
      name: 'Michael R.',
      date: 'February 17, 2025',
      rating: 3,
      title: 'Good Concept, Some Design Flaws',
      content:
        "The sunrise feature works as advertised and has helped me wake up more naturally. I also appreciate the various sound options and color choices. However, the clock display is too bright even on the lowest setting and there's no way to dim it completely without turning it off. The instruction manual was confusing and I had to look up YouTube videos to figure out how to set the dual alarms properly. It's a good product overall but could use some refinement in the user interface department.",
      helpful: 21,
    },
    {
      name: 'Emma L.',
      date: 'April 5, 2025',
      rating: 5,
      title: 'Excellent for Shift Workers',
      content:
        "As a nurse who works rotating shifts, maintaining a healthy sleep schedule is challenging. This alarm clock has been a game-changer! I use the sunset simulation when I need to sleep during daylight hours, and the sunrise feature helps me wake up when it's still dark outside. The ability to set different alarms for different days is perfect for my variable schedule. The FM radio is a nice bonus for my getting-ready routine. The quality is excellent and it looks stylish on my nightstand too!",
      helpful: 27,
    },
    {
      name: 'Jason T.',
      date: 'March 19, 2025',
      rating: 5,
      title: 'Worth Every Penny',
      content:
        'After years of being startled awake by blaring alarms, this sunrise clock has completely changed my morning experience. The gradual light increase is so effective that most days I wake up naturally before the sound alarm even activates. The range of brightness settings is impressive, and I love that I can completely customize the experience. The USB charging port is perfectly positioned and keeps my nightstand tidy. Definitely one of my best purchases this year!',
      helpful: 16,
    },
    {
      name: 'Olivia C.',
      date: 'April 1, 2025',
      rating: 4,
      title: 'Nice Features but Limited Volume Range',
      content:
        "I'm really enjoying the sunrise simulation and the variety of light colors. The clock looks sleek and modern on my nightstand and was fairly easy to set up. My only complaint is that even at the lowest volume setting, the alarm sounds are still a bit too loud for my preference. I wish there was a way to make them even softer. Otherwise, it's been great for helping me establish a more consistent sleep schedule. The sunset function is particularly helpful for winding down at night.",
      helpful: 9,
    },
    {
      name: 'Robert K.',
      date: 'March 10, 2025',
      rating: 5,
      title: 'Great for the Whole Family',
      content:
        "We now have three of these clocks in our house - one for each bedroom! Our kids (ages 8 and 11) love the color options and being able to choose their own wake-up sounds. As parents, we love that mornings are no longer a struggle of having to repeatedly wake them up. The half-screen version works perfectly in the kids' rooms while we have the full-screen in our master bedroom. The ability to completely turn off the display at night is essential for me as I'm sensitive to light while sleeping.",
      helpful: 19,
    },
    {
      name: 'Grace H.',
      date: 'February 25, 2025',
      rating: 3,
      title: 'Nice But Not Perfect',
      content:
        "The sunrise feature works well and has definitely made waking up more pleasant. I like the various sound options and the mood lighting for evenings. However, I'm giving it 3 stars because the buttons are quite small and not very responsive - sometimes I have to press them multiple times. Also, the power adapter cord is shorter than I'd prefer. On the positive side, the build quality seems good and the clock function is accurate. It's a decent product that could be great with some minor improvements.",
      helpful: 11,
    },
    {
      name: 'Thomas B.',
      date: 'April 7, 2025',
      rating: 5,
      title: 'Perfect Bedroom Upgrade',
      content:
        'After reading about how blue light from phones disrupts sleep, I decided to try this clock instead of using my phone alarm. What a difference! The sunset feature helps me fall asleep faster, and the sunrise simulation wakes me gently without reaching for my phone first thing. I appreciate that I can set the brightness levels exactly how I want them. The FM radio sounds surprisingly good, and I use it every morning while getting ready. One of my smartest purchases in a long time!',
      helpful: 23,
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
    'Sunrise simulation gradually brightens from 10% to 100% over 30 minutes before your alarm',
    '15 customizable color options including 8 solid colors and 7 dynamic mood lights',
    '20 brightness levels for perfect customization for any use',
    'Dual alarm capability with Weekday/Weekend programming options',
    'Smart 9-minute snooze function for when you need a bit more rest',
    'Built-in FM radio with auto-scanning function (76.0-108.0 MHz)',
    '8 natural wake-up sounds including rainfall, birds, and gentle piano',
    'USB charging port to keep your devices powered while you sleep',
    'Night light function perfect for midnight needs without disrupting sleep',
  ];

  // Perfect For Items
  const perfectForItems = [
    'Heavy sleepers who struggle to feel energized in the morning',
    'Night shift workers who need to regulate their sleep cycle naturally',
    'Parents looking to create gentle, positive wake-up routines for kids',
    'Anyone wanting their space to match their energy throughout the day',
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Introduction to the Solution */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            MEET YOUR MORNING TRANSFORMATION
          </h2>
          <p className="text-xl text-[#BBBBBB] max-w-3xl mx-auto">
            The Neovibe Sunrise Wake Up Light works with your body's natural
            rhythms to transform how you wake up—and how you feel all day long.
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
                {'Sunrise Wake Up Light'}
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
                    The morning struggle ends today.
                  </span>{' '}
                  Your Neovibe Sunrise Wake Up Light gradually brightens 30
                  minutes before your alarm time, simulating a natural sunrise
                  that gently prepares your body to wake up.
                </p>
                <p>
                  When the light reaches full brightness, gentle nature sounds
                  complete your peaceful transition from sleep to wakefulness—no
                  jarring beeps, no stress hormones, just a calm, energized
                  start to your day.
                </p>
              </div>

              {/* Urgency Element */}
              <div className="p-3 bg-[#1A1A1A] rounded-lg text-center mb-6 border border-[#333] animate-pulse">
                <p className="text-sm font-bold">
                  THIS PRODUCT IS TRENDING ON TIKTOK RIGHT NOW 👀
                </p>
                <p className="text-xs text-[#BBBBBB]">
                  Only 12 left in stock at this price!
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
                    TRANSFORM MY MORNINGS
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
      </div>

      {/* Story Hero - The Painful Experience */}
      <PainfullExperience />

      {/* The Problem Section */}
      <ProblemSection />

      {/* The Science Section */}
      <ScienceSection />

      {/* Product Showcase Section */}
      <ProductShowcaseSection />

      {/* Product Showcase with Real Images */}
      {/* <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          SEE THE TRANSFORMATION
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product?.images?.nodes
            ?.slice(0, 16)
            .map((image: any, index: any) => (
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
      </div> */}

      {/* Features Section - The Tools for Transformation */}
      <FeaturesSection features={features} />

      {/* Social Proof - Real Transformation Stories */}
      <SocialProofSection
        displayReviews={displayReviews}
      />

      {/* Who This is For Section */}
      <TargetAudienceSection perfectForItems={perfectForItems} />

      {/* Final CTA Section - The Transformation Awaits */}
      <CTASection
        productOptions={productOptions}
        selectedVariant={selectedVariant}
      />

      {/* Added FAQ Section */}
      <FAQSection />

      {/* Final Reminder of Transformation */}
      <FutureResultsSection />
    </div>
  );
};

function PainfullExperience() {
  return (
    <div className="w-full bg-gradient-to-r from-[#121212] to-[#1A1A1A] rounded-lg overflow-hidden mb-12">
      <div className="p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-medium text-[#BBBBBB] mb-2">
          Every morning starts the same way...
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-6">
          BEEP. BEEP. BEEP. <span className="text-[#00E0FF]">*SLAM*</span>
        </h3>
        <p className="text-xl text-[#BBBBBB] max-w-2xl mx-auto mb-6">
          Another day begins with the jarring sound of your alarm. You reach
          over, half-asleep, desperately searching for the snooze button. Your
          day starts with stress before you've even opened your eyes.
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto">
          But what if your mornings could feel{' '}
          <span className="text-[#00E0FF] font-bold">completely different</span>
          ?
        </p>
      </div>
    </div>
  );
}

function ProblemSection() {
  const showcaseData = {
    transformation: {
      before: {
        image: '/products/SalesPitchWakeUpLightAlarm/before.png',
        alt: 'Person grimacing and looking stressed while reaching to turn off a loud traditional alarm clock in a dark bedroom with harsh overhead light',
        points: [
          'Abrupt, jarring wake-up with blaring alarm',
          'Dark bedroom to sudden bright overhead light',
          'Rushing through morning routine feeling stressed',
        ],
      },
      after: {
        image: '/products/SalesPitchWakeUpLightAlarm/after.png',
        alt: 'Person waking up refreshed and smiling as the Neovibe Sunrise Wake Up Light creates a gentle sunrise effect in their bedroom with nature sounds playing',
        points: [
          'Natural, gradual awakening with sunrise simulation',
          'Peaceful bird sounds instead of harsh beeping',
          'Calm morning ritual with time for meditation or stretching',
        ],
      },
    },
  };

  return (
    <div className="mb-16 bg-[#1A1A1A] p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        THE MORNING STRUGGLE IS REAL
      </h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#BBBBBB]">
            This is your morning right now:
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
                Your alarm shocks you awake, sending your heart racing and
                cortisol levels spiking
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
                You hit snooze 2-3 times, fragmenting your last precious minutes
                of sleep
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
              <p>You drag yourself out of bed feeling groggy and disoriented</p>
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
                It takes you hours to feel fully awake and ready for the day
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#00E0FF]">
            Imagine if your mornings felt like this:
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
                Gentle light gradually fills your room, mimicking a natural
                sunrise
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
                Your body naturally responds to the light, gradually preparing
                to wake
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
              <p>Soft nature sounds ease you from sleep to wakefulness</p>
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
                You open your eyes feeling refreshed, alert, and ready for the
                day
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#2A2A2A] p-6 rounded-lg text-center">
        <p className="text-lg font-medium mb-2">This isn't a fantasy.</p>
        <p className="text-[#00E0FF] text-xl font-bold">
          This is waking up with the Neovibe Sunrise Wake Up Light.
        </p>
      </div>
    </div>
  );
}

function ScienceSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        THE SCIENCE OF BETTER MORNINGS
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <Brain size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">Your Body's Natural Clock</h3>
          <p className="text-[#BBBBBB]">
            Your circadian rhythm responds to light cues. Traditional alarms
            force you awake regardless of where you are in your sleep cycle,
            causing that groggy, disoriented feeling.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <Lightbulb size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">The Light Solution</h3>
          <p className="text-[#BBBBBB]">
            When light gradually increases, your body naturally reduces
            melatonin (the sleep hormone) and increases cortisol at the right
            pace—helping you wake up the way nature intended.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <div className="w-12 h-12 bg-[#2A2A2A] rounded-full flex items-center justify-center mb-4">
            <AlarmClock size={28} className="text-[#00E0FF]" />
          </div>
          <h3 className="text-xl font-bold mb-2">The Result</h3>
          <p className="text-[#BBBBBB]">
            A smoother transition from sleep to wakefulness means you start your
            day with more energy, better mood, improved concentration, and none
            of the usual morning stress response.
          </p>
        </div>
      </div>
    </div>
  );
}

// Feature data structure
const featureData = {
  basicFeatures: [
    {
      icon: 'radio',
      name: 'FM Radio',
      description: 'Built-in FM radio with auto-scan and 20 presets',
    },
    {
      icon: 'moon',
      name: 'Night Light',
      description: 'Soft amber glow perfect for nighttime navigation',
    },
    {
      icon: 'usb',
      name: 'USB Charging',
      description: 'Fast 2.4A USB port to charge your devices overnight',
    },
    {
      icon: 'sun',
      name: 'Brightness Control',
      description: '20 levels of display and light brightness',
    },
  ],
  premiumFeatures: [
    {
      id: 'sunrise',
      name: 'Sunrise Simulation',
      image: '/products/SalesPitchWakeUpLightAlarm/features1.png',
      alt: 'A dark bedroom gradually brightening with sunrise simulation over 30 minutes, transitioning from darkness to gentle orange-yellow light, helping a person wake up naturally and peacefully instead of being startled by a traditional alarm.',
      description:
        'Gradual light that increases in brightness over 30 minutes before your alarm, mimicking a natural sunrise to wake you gently and naturally.',
      tagline: 'Wake naturally with light',
    },
    {
      id: 'brightness',
      name: '20 Brightness Levels',
      image: '/products/SalesPitchWakeUpLightAlarm/features2.png',
      alt: 'Demonstrating the 20 different brightness levels available, from a subtle dim blue glow for nighttime navigation to a bright vibrant light for morning wake-up, showing how users can adjust lighting to their exact preference.',
      description:
        'Perfect lighting for any situation, from gentle night glow to bright morning light. Customize with precision using the intuitive touch slider.',
      tagline: 'Personalize your experience',
    },
    {
      id: 'ambient',
      name: 'Ambient Sound Library',
      image: '/products/SalesPitchWakeUpLightAlarm/features3.png',
      alt: 'Showcasing the 12 different ambient sounds helping a person fall asleep, with visual representations of rainfall, ocean waves, white noise, and forest sounds creating a peaceful sleeping environment. The sound fills the bedroom space to mask disturbances and promote deeper sleep.',
      description:
        'Choose from 12 soothing sounds including rainfall, ocean waves, and white noise to help you fall asleep faster and stay asleep longer.',
      tagline: 'Sleep soundly with nature',
    },
    {
      id: 'smart-home',
      name: 'Smart Home Integration',
      image: '/products/SalesPitchWakeUpLightAlarm/features4.png',
      alt: 'Demonstrating smart home integration in action: as the alarm triggers, smart blinds automatically open, lights gradually turn on, a coffee maker starts brewing, and a smartphone receives a notification - all controlled by the alarm clock through connections with Alexa, Google Home, and Apple HomeKit systems.',
      description:
        'Connect with Alexa, Google Home, and Apple HomeKit to control lights, blinds, and other smart devices when your alarm triggers.',
      tagline: 'Connect your whole home',
    },
  ],
};

function FeaturesSection({features}: {features: string[]}) {
  return (
    <div className="mb-16">
      <div className="bg-[#1A1A1A] p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-8 text-center">
          YOUR TOOLKIT FOR PERFECT MORNINGS
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
                {feature.icon === 'radio' && (
                  <Radio size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'moon' && (
                  <Moon size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'usb' && (
                  <Usb size={32} className="text-[#00E0FF]" />
                )}
                {feature.icon === 'sun' && (
                  <Sun size={32} className="text-[#00E0FF]" />
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

function SocialProofSection({displayReviews}: {displayReviews: any}) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleLoadMore = () => {
    // Load 3 more reviews at a time
    setVisibleReviews((prev) => Math.min(prev + 3, displayReviews.length));
  };

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        REAL PEOPLE, REAL MORNING TRANSFORMATIONS
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
            Load More Transformations
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
        WHO NEEDS THIS MORNING TRANSFORMATION?
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
        YOUR MORNING TRANSFORMATION BEGINS TOMORROW
      </h2>
      <p className="text-[#BBBBBB] mb-6 max-w-2xl mx-auto">
        Imagine waking up tomorrow feeling refreshed, energized, and ready to
        conquer your day. No more jarring alarms. No more morning dread. Just
        the natural, peaceful awakening you deserve.
      </p>

      {ProductForm ? (
        <ProductForm
          productOptions={productOptions}
          selectedVariant={selectedVariant}
        />
      ) : (
        <button className="w-full max-w-md mx-auto py-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
          START MY MORNING TRANSFORMATION
        </button>
      )}

      <p className="text-sm text-[#BBBBBB] mt-4">
        <span className="text-[#00E0FF]">Free shipping</span> •{' '}
        <span className="text-[#00E0FF]">30-day risk-free trial</span> •{' '}
        <span className="text-[#00E0FF]">1-year warranty</span>
      </p>
    </div>
  );
}

function FAQSection() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">
        QUESTIONS ABOUT YOUR NEW MORNING
      </h2>

      <div className="space-y-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            How long does it take to adjust to waking up with light?
          </h3>
          <p className="text-[#BBBBBB]">
            Most people notice a difference on the very first morning! Your body
            naturally responds to light cues, so there's minimal adjustment
            period. Within a week, you'll likely find yourself waking up more
            naturally, often even before your scheduled sound alarm.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            What if I share a bed with someone who wakes up at a different time?
          </h3>
          <p className="text-[#BBBBBB]">
            The Neovibe Sunrise light is designed to wake only the person on the
            side of the bed where it's placed. The light is directional enough
            that it won't disturb your partner if placed on your nightstand, and
            the gradual nature makes it less disruptive than traditional alarms.
          </p>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">
            Will this work for heavy sleepers?
          </h3>
          <p className="text-[#BBBBBB]">
            Absolutely! The combination of gradual brightening light plus nature
            sounds is exceptionally effective for heavy sleepers. The light
            begins preparing your body to wake up 30 minutes before the sound
            alarm, making the transition from deep sleep much smoother than with
            traditional alarms.
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
        REMEMBER WHEN MORNINGS USED TO BE THE WORST PART OF YOUR DAY?
      </h3>
      <p className="text-[#BBBBBB] mb-4">
        That changes tomorrow. The Neovibe Sunrise Wake Up Light isn't just an
        alarm clock—it's a complete transformation of how you start your day,
        how you feel all day, and ultimately, how you experience life.
      </p>
      <p className="text-[#00E0FF] font-bold">
        Your future self will thank you for the gift of better mornings.
      </p>
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
        src: '/products/SalesPitchWakeUpLightAlarm/main1.png',
        alt: 'Woman waking up peacefully in bed with the Neovibe Sunrise light gradually illuminating her bedroom with a warm orange glow similar to sunrise',
        caption: 'The peaceful morning I never knew I needed',
        size: 'large', // For the 2x2 image
      },
      {
        id: 2,
        src: '/products/SalesPitchWakeUpLightAlarm/main2.png',
        alt: 'Neovibe Sunrise Wake Up Light on wooden nightstand next to a bed with white linens, displaying a soft yellow light in a minimalist bedroom',
        caption: 'Perfect bedroom setup',
        size: 'small',
      },
      {
        id: 3,
        src: '/products/SalesPitchWakeUpLightAlarm/main3.png',
        alt: 'Neovibe Sunrise Wake Up Light set to purple mood lighting mode in a dark bedroom, creating an ambient glow throughout the room',
        caption: 'Evening purple glow',
        size: 'small',
      },
      {
        id: 4,
        src: '/products/SalesPitchWakeUpLightAlarm/main4.png',
        alt: "Child's bedroom with Neovibe Sunrise Wake Up Light using gentle blue lighting while a parent sits with a child reading a bedtime story",
        caption: 'Kid-friendly wake up',
        size: 'small',
      },
      {
        id: 5,
        src: '/products/SalesPitchWakeUpLightAlarm/main5.png',
        alt: 'Person reading a book in bed with the Neovibe Sunrise Wake Up Light providing directional amber reading light without disturbing their partner',
        caption: 'Perfect reading light',
        size: 'small',
      },
    ],

    // Customer Moments
    customerMoments: [
      {
        id: 1,
        title: 'Morning Yoga Ritual',
        image: '/products/SalesPitchWakeUpLightAlarm/moments1.png',
        alt: 'Woman doing a morning yoga pose on a mat in her living room as the Neovibe Sunrise Wake Up Light creates a warm sunrise glow in the background',
        content:
          'I set my Neovibe to brighten gradually at 6:15 AM, giving me the perfect natural light for my morning yoga. No more jarring phone alarms!',
        customer: 'Samantha K., Verified Customer',
      },
      {
        id: 2,
        title: 'Home Office Ambiance',
        image: '/products/SalesPitchWakeUpLightAlarm/moments2.png',
        alt: 'Home office workspace with a laptop, desk plants, and Neovibe Sunrise Wake Up Light using blue-toned light to create an energizing workspace atmosphere',
        content:
          "During the day, I use the Neovibe's blue light setting in my home office to help me stay focused and energized during long work sessions.",
        customer: 'Marcus T., Verified Customer',
      },
      {
        id: 3,
        title: 'Bedtime Wind-Down',
        image: '/products/SalesPitchWakeUpLightAlarm/moments3.png',
        alt: "Parent reading bedtime story to toddler in child's bedroom with Neovibe Sunrise Wake Up Light providing soft amber lighting that's gradually dimming",
        content:
          'The soft amber glow helps my toddler transition to bedtime. We read stories together with just enough light, and then dim it gradually as she falls asleep.',
        customer: 'Jessica R., Verified Customer',
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
          Join thousands of people who've transformed their mornings and bedtime
          rituals with the Neovibe Sunrise Wake Up Light.
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

      {/* Real Customer Scenes - using JSON data */}

      {/* User Generated Content Call */}
      <div className="mt-8 text-center">
        <p className="text-[#BBBBBB] mb-3">
          Love your Neovibe Sunrise Wake Up Light? Share your morning moments
          with us!
        </p>
        <p className="text-[#00E0FF] font-medium">
          Tag @NeovibeLight and #MyMorningGlow on Instagram for a chance to be
          featured
        </p>
      </div>
    </div>
  );
}

export default SalesPitchWakeUpLightAlarm;
