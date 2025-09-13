import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {useState, useRef, useEffect} from 'react';

export const meta = () => {
  return [{title: 'Neovibe | FAQ'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  return json({});
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions]: any = useState({});
  const searchInputRef: any = useRef(null);

  // Define FAQ categories
  const categories = [
    {id: 'general', label: 'General'},
    {id: 'products', label: 'Products'},
    {id: 'orders', label: 'Orders & Shipping'},
    {id: 'setup', label: 'Setup & Installation'},
    {id: 'app', label: 'App & Controls'},
    {id: 'troubleshooting', label: 'Troubleshooting'},
  ];

  // Define FAQ items
  const faqItems: any = {
    general: [
      {
        question: 'What is Neovibe?',
        answer:
          "Neovibe is a smart lighting brand focused on creating immersive lighting experiences that transform any space. We specialize in LED strip lights, galaxy projectors, smart light panels, ambient mood lighting, and more. Our products combine aesthetic design with smart technology to give you complete control over your environment's vibe.",
      },
      {
        question: 'Do your products work with smart home systems?',
        answer:
          'Yes! Most of our products are compatible with major smart home ecosystems including Google Home, Amazon Alexa, and Apple HomeKit. Each product page specifies compatibility details. Our LED strips and smart panels offer the most comprehensive integration options.',
      },
      {
        question: 'How can I contact customer support?',
        answer:
          'You can reach our support team through several channels: (1) Email us at support@neovibe.com, (2) Use the live chat feature on our website during business hours (9AM-8PM EST), (3) Text us at (800) 123-4567, or (4) Fill out the contact form on our Contact page.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer financing options through Affirm on orders over $50.',
      },
    ],
    products: [
      {
        question: 'How long do your LED lights last?',
        answer:
          'Our LED products are designed for longevity. Most products have a rated lifespan of 30,000 to 50,000 hours of use, which translates to many years of regular use. All our products come with a 2-year warranty against manufacturing defects.',
      },
      {
        question: 'Are your lights bright enough to serve as main lighting?',
        answer:
          "Most of our products are designed as accent or ambient lighting rather than primary lighting sources. Our LED strips and panels can provide substantial illumination when set to white at full brightness, but they're optimized for creating atmosphere rather than task lighting. For best results, we recommend combining our products with traditional lighting sources.",
      },
      {
        question: 'Can I connect multiple light products together?',
        answer:
          'Yes! While the physical products might not connect directly to each other (except for our modular panels), all Neovibe products can be grouped and controlled together through our app. You can create different zones, synchronize colors and effects, or create scene presets that activate multiple products simultaneously.',
      },
      {
        question: 'Are your products waterproof?',
        answer:
          'We offer both indoor and outdoor product variants. Our standard LED strips and most other products are splash-resistant (IP44) but not fully waterproof. For outdoor use, look for our IP65 or IP67 rated products which provide protection against dust and water jets or temporary immersion.',
      },
    ],
    orders: [
      {
        question: 'How long does shipping take?',
        answer:
          'We offer several shipping options: (1) Standard Shipping (3-5 business days): Free on orders over $50, otherwise $4.99, (2) Express Shipping (1-2 business days): $9.99, (3) International Shipping (7-14 business days): Calculated at checkout based on destination. All orders are processed within 1-2 business days.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to most countries worldwide. International shipping times typically range from 7-14 business days depending on the destination. Please note that import duties, taxes, and customs fees are not included in the product price or shipping cost and are the responsibility of the recipient.',
      },
      {
        question: 'What is your return policy?',
        answer:
          "We offer a 30-day satisfaction guarantee on all products. If you're not completely satisfied, you can return your items within 30 days of receipt for a full refund of the product price (shipping costs are non-refundable). Products must be returned in their original packaging when possible. For detailed instructions, please see our Returns Policy page.",
      },
      {
        question: 'How do I track my order?',
        answer:
          "Once your order ships, you'll receive a shipping confirmation email with tracking information. You can also track your order by logging into your account on our website and viewing your order history. Please allow up to 24 hours after receiving the shipping confirmation for the tracking information to become active.",
      },
    ],
    setup: [
      {
        question: 'How do I install LED strip lights?',
        answer:
          'Our LED strips come with a strong adhesive backing for easy installation. (1) Plan your layout and clean the surface thoroughly, (2) Peel the backing off a small section at a time, (3) Press firmly as you go, avoiding sharp bends, (4) Connect to the power supply, (5) Download our app to set up your device. For detailed instructions with visuals, check the installation guide included with your product or visit our YouTube channel.',
      },
      {
        question: 'Can I cut the LED strips?',
        answer:
          'Yes, our LED strips can be cut to fit your space. Look for the marked cutting lines (usually every 3-6 LEDs, depending on the product). Make sure to cut only on these designated lines and always cut with the power off. Note that once cut, that section becomes a separate unit and cannot be reconnected to the main strip without additional connectors.',
      },
      {
        question: 'How do I mount the galaxy projector?',
        answer:
          'The galaxy projector works best when placed on a flat surface 5-10 feet away from the projection area (wall or ceiling). For ceiling projection, place it on a shelf or table. For wall projection, place it on the floor or a low table. The projector has a tilting base that allows you to adjust the angle. For permanent installation, some models include mounting brackets or can be attached to standard camera tripods.',
      },
      {
        question: 'Can I install the light panels without damaging my walls?',
        answer:
          "Absolutely! Our light panels come with both mounting tape for damage-free installation and optional screw mounts for more permanent setups. The mounting tape is specially designed to hold securely but remove cleanly from most wall surfaces. For rental spaces, we recommend the mounting tape option. Always test a small area first if you're concerned about a particular wall finish.",
      },
    ],
    app: [
      {
        question: 'How do I connect my lights to the app?',
        answer:
          "To connect your Neovibe products to the app: (1) Download the Neovibe app from the App Store or Google Play, (2) Create an account and verify your email, (3) Power on your lighting product and put it in pairing mode (usually by holding the power button for 5 seconds until it flashes), (4) In the app, tap the '+' icon and follow the on-screen instructions to connect via Bluetooth or Wi-Fi. For video tutorials, visit our YouTube channel.",
      },
      {
        question: 'Can I control multiple products at once?',
        answer:
          'Yes! The Neovibe app allows you to group multiple products together for synchronized control. You can create different rooms or zones, control them all simultaneously, or create custom scenes that activate specific settings across multiple products with a single tap. This makes it easy to transform your entire space with one command.',
      },
      {
        question: 'Do I need Wi-Fi to use the app?',
        answer:
          "Our products can work via both Wi-Fi and Bluetooth. Wi-Fi connection gives you full functionality including remote control from anywhere, voice assistant integration, and advanced features. Bluetooth allows basic control when you're within range of the device, even without Wi-Fi. Some features like music syncing and certain effects are available in Bluetooth mode, but remote access requires Wi-Fi.",
      },
      {
        question: 'How does the music sync feature work?',
        answer:
          "Our music sync feature uses your device's microphone to detect music and ambient sounds, then translates them into dynamic lighting effects. To use it: (1) Open the Neovibe app, (2) Select your device, (3) Tap the 'Music' or 'Rhythm' mode, (4) Allow microphone access when prompted, (5) Choose your preferred music reaction pattern and sensitivity. The lights will now pulse and change with the beat of your music.",
      },
    ],
    troubleshooting: [
      {
        question: "My lights won't connect to the app. What should I do?",
        answer:
          "If you're having trouble connecting your lights to the app, try these steps: (1) Ensure your device is powered on and in pairing mode (usually flashing), (2) Make sure your phone's Bluetooth is turned on and you're connected to a 2.4GHz Wi-Fi network (5GHz is not supported by most smart devices), (3) Close and reopen the app, (4) Try resetting the device by turning it off, waiting 10 seconds, then holding the power button for 10 seconds until you see a different flash pattern, (5) If problems persist, contact our support team.",
      },
      {
        question:
          "My LED strip has a section that's not lighting up or showing the wrong color. How can I fix it?",
        answer:
          "A section not lighting up could indicate a few issues: (1) Check for physical damage to the strip at that point, (2) Ensure all connections are secure if using connectors, (3) For color issues, try resetting the strip through the app or power cycling (turn off for 10 seconds, then back on), (4) If the problem is at a cut point, make sure you've cut exactly on the marked cutting line, (5) If these steps don't work, the strip may have a defect—contact our support team for warranty service.",
      },
      {
        question:
          "The app shows my device is offline even though it's powered on. What's happening?",
        answer:
          "This typically indicates a connection issue between your device and your home network. Try these solutions: (1) Check that your Wi-Fi is working by testing another device, (2) Make sure the device hasn't been moved out of Wi-Fi range, (3) Power cycle both your router and the lighting device, (4) Remove the device from the app and set it up again, (5) Check if your router has too many connected devices and consider a Wi-Fi extender if signal strength is low in the device's location.",
      },
      {
        question: 'How do I reset my device to factory settings?',
        answer:
          "To reset most Neovibe products to factory settings: (1) Turn off the device, (2) Wait 10 seconds, (3) Press and hold the power button for 10-15 seconds until you see a specific flash pattern (usually quick flashing), (4) Release the button and wait for the device to restart. Note that this will remove all custom settings and you'll need to set up the device in the app again. Specific reset procedures may vary by product—check your user manual for exact instructions.",
      },
    ],
  };

  // Toggle question open/closed
  const toggleQuestion = (questionId: any) => {
    setOpenQuestions((prev: any) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Filter FAQ items based on search term
  const getFilteredFAQs = () => {
    if (!searchTerm) {
      return activeCategory === 'all'
        ? Object.values(faqItems).flat()
        : faqItems[activeCategory] || [];
    }

    const lowercasedSearch = searchTerm.toLowerCase();

    if (activeCategory === 'all') {
      return Object.values(faqItems)
        .flat()
        .filter(
          (item: any) =>
            item.question.toLowerCase().includes(lowercasedSearch) ||
            item.answer.toLowerCase().includes(lowercasedSearch),
        );
    }

    return (faqItems[activeCategory] || []).filter(
      (item: any) =>
        item.question.toLowerCase().includes(lowercasedSearch) ||
        item.answer.toLowerCase().includes(lowercasedSearch),
    );
  };

  // Focus search input on page load
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const filteredFAQs = getFilteredFAQs();

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00E0FF] to-[#C084FC]"></div>
          <div className="absolute inset-0 bg-[#121212] opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl">
                Find answers to common questions about our products and services
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm">
        <div className="flex items-center text-[#BBBBBB]">
          <Link to="/" className="hover:text-[#00E0FF]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#F9F9F9]">FAQ</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative">
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for answers..."
            className="w-full px-4 py-3 pl-12 bg-[#1A1A1A] border border-[#333333] rounded-lg text-[#F9F9F9] placeholder-[#777777] focus:outline-none focus:border-[#00E0FF]"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#777777]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#777777] hover:text-[#F9F9F9]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-b border-[#333333] overflow-x-auto no-scrollbar">
          <div className="flex whitespace-nowrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeCategory === 'all'
                  ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                  : 'text-[#BBBBBB] hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                    : 'text-[#BBBBBB] hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFAQs.length > 0 ? (
          <div className="space-y-6">
            {filteredFAQs.map((item: any, index: any) => {
              const questionId = `faq-${index}`;
              const isOpen = openQuestions[questionId];

              return (
                <div
                  key={index}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleQuestion(questionId)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <h3 className="text-lg font-medium pr-8">
                      {item.question}
                    </h3>
                    <span
                      className={`text-[#00E0FF] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-[#BBBBBB] whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#1A1A1A] rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-[#BBBBBB] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">
              No matching questions found
            </h3>
            <p className="text-[#BBBBBB] mb-4">
              Try adjusting your search terms or browsing a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('general');
              }}
              className="px-4 py-2 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-16 bg-[#1A1A1A] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-[#BBBBBB] mb-6 max-w-xl mx-auto">
            Our support team is here to help you with any questions or concerns
            you may have about our products or services.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] hover:from-[#00C0E0] hover:to-[#A064DC] text-black font-medium rounded-lg transition-all duration-300 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Contact Support
          </Link>
        </div>
      </div>

      {/* Product Categories */}
      {/* <div className="bg-[#1A1A1A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Browse Our Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                name: 'LED Strips',
                icon: '💡',
                url: '/collections/led-strip-lights',
              },
              {
                name: 'Galaxy Projectors',
                icon: '✨',
                url: '/collections/galaxy-projectors',
              },
              {
                name: 'Light Panels',
                icon: '🔲',
                url: '/collections/smart-panels',
              },
              {
                name: 'Mood Orbs',
                icon: '🔮',
                url: '/collections/ambient-mood-lights',
              },
              {
                name: 'Music Reactive',
                icon: '🎵',
                url: '/collections/music-reactive',
              },
              {
                name: 'Smart Bulbs',
                icon: '💡',
                url: '/collections/smart-bulbs',
              },
            ].map((category, index) => (
              <Link
                key={index}
                to={category.url}
                className="bg-[#2A2A2A] rounded-xl p-6 text-center transition-transform hover:scale-105 hover:shadow-lg hover:shadow-[#00E0FF]/10"
              >
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-[#F9F9F9]">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

      {/* Newsletter */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              Get the Latest Updates
            </h2>
            <p className="text-black opacity-80 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for product news, lighting tips, and
              exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-opacity-80 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
