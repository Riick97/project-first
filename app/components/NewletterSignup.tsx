import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {useEffect, useState, useRef} from 'react';

export function NewsletterSignup() {
  return (
    <section className="newsletter-signup bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">Stay Connected</h2>
        <div className="flex justify-center items-center mb-6 mt-6">
          <p className="mx-auto mb-8 max-w-xl">
            Subscribe to our newsletter for the latest product updates, smart
            home tips, and exclusive offers.
          </p>
        </div>
        <form className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-full bg-blue-500 px-6 py-3 text-white placeholder-blue-200 focus:bg-blue-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

function FeaturedCollections({collections}: any) {
  // Collection presets with custom styling and content
  const collectionsData = [
    {
      collection: collections[0],
      preset: {
        title: 'Room Vibes',
        tagline: 'Transform your walls',
        description: 'LED strips, wall panels & smart ambient systems',
        position: 'left-0 top-0',
        size: 'lg:col-span-2 lg:row-span-1',
        height: 'h-64 lg:h-72',
        iconBg: 'bg-cyan-500',
        gradient: 'bg-gradient-to-r from-cyan-500/80 to-blue-500/80',
        hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]',
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            ></path>
          </svg>
        ),
      },
    },
    {
      collection: collections[1],
      preset: {
        title: 'Sleep & Chill',
        tagline: 'Dream in technicolor',
        description: 'Galaxy projectors, ambient orbs & mood lighting',
        position: 'right-0 top-0',
        size: 'lg:col-span-1 lg:row-span-2',
        height: 'h-64 lg:h-full',
        iconBg: 'bg-purple-500',
        gradient: 'bg-gradient-to-b from-purple-500/80 to-indigo-500/80',
        hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]',
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        ),
      },
    },
    {
      collection: collections[2],
      preset: {
        title: 'Productivity Glow',
        tagline: 'Focus & create',
        description: 'Desk lights, work stations & concentration enhancers',
        position: 'left-0 bottom-0',
        size: 'lg:col-span-2 lg:row-span-1',
        height: 'h-64 lg:h-72',
        iconBg: 'bg-amber-500',
        gradient: 'bg-gradient-to-r from-amber-500/80 to-orange-500/80',
        hoverGlow: 'group-hover:shadow-[0_0_30px_rgba(251,191,36,0.5)]',
        icon: (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
        ),
      },
    },
  ];

  // Filter out any missing collections
  const availableCollections = collectionsData.filter(
    (item) => item.collection,
  );

  // If no collections are available, show a loading or empty state
  if (availableCollections.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-[#121212] text-[#F9F9F9]">
        <p className="text-xl">Loading collections...</p>
      </div>
    );
  }

  return (
    <section className="w-full py-16 bg-[#121212] text-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-center mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00E0FF] mr-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-center">
              <span className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text">
                Light Your Space
              </span>
            </h2>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C084FC] ml-4"></div>
          </div>
          <p className="text-lg md:text-xl max-w-2xl text-center opacity-90 mb-4">
            Find your perfect lighting aesthetic for every mood
          </p>

          {/* Pulsing dots for futuristic effect */}
          <div className="flex space-x-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse"></div>
            <div
              className="w-2 h-2 rounded-full bg-[#C084FC] animate-pulse"
              style={{animationDelay: '0.5s'}}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse"
              style={{animationDelay: '1s'}}
            ></div>
          </div>
        </div>

        {/* Grid layout with special sizing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 h-full">
          {availableCollections.map(({collection, preset}) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.handle}`}
              className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${preset.height} ${preset.size} ${preset.hoverGlow}`}
            >
              {/* Collection Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                {collection.image ? (
                  <img
                    src={collection.image.url}
                    alt={
                      collection.image.altText ||
                      collection.title ||
                      preset.title
                    }
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  // Fallback gradient background if no image
                  <div className={`h-full w-full ${preset.gradient}`}></div>
                )}

                {/* Themed gradient overlay */}
                <div
                  className={`absolute inset-0 ${preset.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                ></div>

                {/* Additional decorative elements */}
                <div className="absolute inset-0 bg-[#121212] opacity-20"></div>

                {/* Animated light beam - visible on hover */}
                <div className="absolute -inset-full h-full w-full opacity-0 group-hover:opacity-20 bg-white rotate-45 group-hover:translate-x-full group-hover:-translate-y-full transition-all duration-1000 ease-out pointer-events-none"></div>
              </div>

              {/* Collection Content with improved layout */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div>
                  {/* Icon with glowing effect */}
                  <div
                    className={`mb-3 w-12 h-12 rounded-full ${preset.iconBg} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300`}
                  >
                    {preset.icon}
                  </div>

                  {/* Tagline with pill design */}
                  <div className="inline-block px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs font-medium text-white mb-2">
                    {preset.tagline}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-1 text-white drop-shadow-md">
                    {collection.title || preset.title}
                  </h3>

                  <p className="text-sm text-white/90 mb-4 max-w-xs backdrop-blur-sm bg-black/10 p-2 rounded-md">
                    {preset.description}
                  </p>

                  {/* Shop button with animation */}
                  <div className="inline-flex items-center text-sm font-bold bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 group-hover:pl-5">
                    <span>Explore</span>
                    <svg
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* Decorative elements positioned absolutely */}
                <div className="absolute top-6 right-6">
                  <div className="w-20 h-20 border border-white/20 rounded-full"></div>
                </div>
                <div className="absolute bottom-4 right-20 w-2 h-2 bg-white rounded-full opacity-70"></div>
                <div className="absolute top-20 right-12 w-1 h-1 bg-white rounded-full opacity-70"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all collections button */}
        <div className="flex justify-center mt-10">
          <Link
            to="/collections"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full bg-[#171717] border border-[#333] text-white hover:bg-[#232323] hover:border-[#00E0FF] transition-all duration-300 group"
          >
            View All Collections
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}



interface CollectionCardProps {
  title?: string;
  description?: string;
  image?: string;
  handle?: string;
  index: number;
}

// Separate CollectionCard component
const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  image,
  handle,
  index,
}) => {
  // Default values if not provided
  const cardTitle = title || `Collection ${index + 1}`;
  const cardDescription =
    description ||
    'Smart devices that make everyday life easier and more exciting.';
  const cardHandle = handle || 'all';

  // Function to handle click on the card
  const handleCardClick = () => {
    window.location.href = `/collections/${cardHandle}`;
  };

  // Default title based on index if no image and title are provided
  const getDefaultTitle = () => {
    if (index === 0) return 'Smart Home';
    if (index === 1) return 'Wearables';
    if (index === 2) return 'Audio';
    return 'Tech Devices';
  };

  return (
    <div
      className="bg-[#F8F9FA] rounded-lg overflow-hidden border border-[#EAEAEA] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={handleCardClick}
    >
      {image ? (
        <div className="aspect-[16/16] relative overflow-hidden">
          {/* Clean, grid-based overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0VBRUFFQSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30 z-0 pointer-events-none"></div>

          <img
            src={image}
            alt={cardTitle}
            className="h-full w-full object-cover z-10 relative transition-transform duration-300"
          />

          {/* Collection badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
            <span className="font-montserrat text-xs font-medium text-[#2B2B2B]">
              Collection
            </span>
          </div>
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-r from-[#F8F9FA] to-[#EAEAEA] flex items-center justify-center relative">
          {/* Clean grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0VBRUFFQSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-20 z-0 pointer-events-none"></div>

          <div className="text-center z-10">
            <div className="text-4xl mb-2">
              {index === 0 && '🏠'}
              {index === 1 && '⌚'}
              {index === 2 && '🎧'}
              {index > 2 && '📱'}
            </div>
            <span className="text-[#3D8BFF] font-montserrat font-semibold text-xl">
              {getDefaultTitle()}
            </span>
          </div>

          {/* Collection badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
            <span className="font-montserrat text-xs font-medium text-[#2B2B2B]">
              Collection
            </span>
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-montserrat font-semibold text-[#2B2B2B] text-lg mb-2">
          {cardTitle}
        </h3>

        <p className="font-montserrat text-sm text-[#2B2B2B]/80 mb-4 line-clamp-2 flex-grow">
          {cardDescription}
        </p>

        {/* Product count badge */}
        <div className="mb-3">
          <span className="bg-[#EAEAEA] text-[#2B2B2B] font-montserrat text-xs font-medium px-3 py-1 rounded-full">
            {10 + index * 5} Products
          </span>
        </div>

        <span className="font-montserrat text-sm font-medium text-[#3D8BFF] inline-flex items-center self-start hover:text-[#71C3FF] transition-colors duration-300">
          Shop Collection
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 ml-1"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};
  


export function TrustIndicators() {
  // Trust indicators data
  const trustIndicators = [
    {
      id: 'fast-shipping',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          ></path>
        </svg>
      ),
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50',
    },
    {
      id: 'returns',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
          ></path>
        </svg>
      ),
      title: '30-Day Returns',
      description: 'Not vibing with it? Send it back',
    },
    {
      id: 'app-control',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          ></path>
        </svg>
      ),
      title: 'App Control',
      description: 'Control your lights from your phone',
    },
    {
      id: 'support',
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          ></path>
        </svg>
      ),
      title: '24/7 Support',
      description: `We'll help you get glowing soon`,
    },
  ];

  return (
    <section className="w-full py-12 bg-gradient-to-b from-[#121212] to-[#1A1A1A] text-[#F9F9F9]">
      <div className="container mx-auto px-4">
        {/* Header (Optional) */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text">
              Why Choose Neovibe
            </span>
          </h2>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.id}
              className="relative flex flex-col items-center text-center p-5 rounded-lg transition-all duration-300 hover:bg-black/30 backdrop-blur-sm"
            >
              {/* Decorative background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00E0FF]/10 to-[#C084FC]/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

              {/* Icon with glowing effect on hover */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#1D1D1D] mb-4 text-[#00E0FF] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,224,255,0.4)]">
                {indicator.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-1 text-white">
                {indicator.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#F9F9F9]/80">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        {/* Customer Testimonial Counter or Trust Badges */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-10 p-4 bg-black/30 backdrop-blur-sm rounded-xl">
          {/* Join thousands counter */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm uppercase tracking-wider text-[#F9F9F9]/70">
              Join
            </p>
            <p className="text-3xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text">
              10,000+ Glowing Homes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({testimonials}: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If testimonials data is loading or empty, show placeholder testimonials
  const placeholderTestimonials = [
    {
      id: 'testimonial-1',
      name: 'Skylar J.',
      location: 'Los Angeles, CA',
      image: '/api/placeholder/80/80', // Placeholder for profile image
      rating: 5,
      text: 'Completely transformed my bedroom setup. The RGB strips sync perfectly with my music and the app is so intuitive. Every friend who visits asks about my lighting!',
      productImage: '/Hero2.png', // Placeholder for product image
      productName: 'NeoSync LED Strip Kit',
      verifiedBuyer: true,
    },
    {
      id: 'testimonial-2',
      name: 'Jordan T.',
      location: 'Brooklyn, NY',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'My WFH space needed something special for video calls. This lighting setup makes me look professional while still showing off my personal style. Best purchase of the year!',
      productImage: '/Hero2.png',
      productName: 'Content Creator Light Bundle',
      verifiedBuyer: true,
    },
    {
      id: 'testimonial-3',
      name: 'Alex M.',
      location: 'Austin, TX',
      image: '/api/placeholder/80/80',
      rating: 5,
      text: 'The galaxy projector is INSANE. I use it for meditation, sleep, and just vibing. The remote control makes it easy to switch between modes without getting up.',
      productImage: '/Hero2.png',
      productName: 'NeoVerse Galaxy Projector',
      verifiedBuyer: true,
    },
  ];

  // Use provided testimonials or fallback to placeholders
  const displayTestimonials =
    testimonials?.length > 0
      ? processTestimonials(testimonials)
      : placeholderTestimonials;

  // Function to format testimonial data from Shopify's metaobject structure
  function processTestimonials(rawTestimonials: any) {
    if (!rawTestimonials || !rawTestimonials.nodes)
      return placeholderTestimonials;

    return rawTestimonials.nodes.map((testimonial: any) => {
      const fieldMap: any = {};

      // Convert the fields array to an object for easier access
      testimonial.fields.forEach((field: any) => {
        fieldMap[field.key] = field.value;

        // Handle reference fields like images
        if (field.reference && field.reference.image) {
          fieldMap[`${field.key}_image`] = field.reference.image;
        }
      });

      return {
        id: testimonial.id,
        name: fieldMap.customer_name || 'Happy Customer',
        location: fieldMap.location || '',
        image: fieldMap.customer_image?.url || '/api/placeholder/80/80',
        rating: parseInt(fieldMap.rating || '5', 10),
        text: fieldMap.testimonial_text || '',
        productImage: fieldMap.product_image?.url || '/api/placeholder/300/300',
        productName: fieldMap.product_name || 'Neovibe Product',
        verifiedBuyer: fieldMap.verified_buyer === 'true',
      };
    });
  }

  // Navigate to previous testimonial
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? displayTestimonials.length - 1 : prevIndex - 1,
    );
  };

  // Navigate to next testimonial
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === displayTestimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Generate stars for rating
  const renderStars = (rating: any) => {
    return Array.from({length: 5}).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-[#00E0FF]' : 'text-gray-400'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    ));
  };

  return (
    <section className="w-full py-16 bg-[#121212] text-[#F9F9F9] overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#00E0FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#C084FC]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Section Header */}
        <div className="relative flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            <span className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text">
              Vibing Customers
            </span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-center opacity-90">
            See how Neovibe is transforming spaces and moods
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto px-4">
          {/* Main Testimonial Card */}
          <div className="relative bg-gradient-to-b from-[#1A1A1A] to-[#121212] rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_-15px_rgba(0,224,255,0.3)] mt-16 md:mt-20">
            {/* Product Image (Floating) */}
            <div className="absolute -top-12 right-4 md:-top-12 md:-right-12 hidden md:block">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden transform rotate-6 shadow-lg">
                {displayTestimonials[activeIndex].productImage && (
                  <img
                    src={displayTestimonials[activeIndex].productImage}
                    alt={displayTestimonials[activeIndex].productName}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white text-center truncate">
                  {displayTestimonials[activeIndex].productName}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-0">
              {/* Customer Info Column */}
              <div className="flex flex-col items-center md:items-start md:border-r md:border-white/10 pr-0 md:pr-6">
                {/* Profile Section */}
                <div className="flex flex-col items-center md:items-start mb-4">
                  {/* Profile Image */}
                  {/* <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-[#00E0FF]/30">
                      <img
                        src={displayTestimonials[activeIndex].image}
                        alt={displayTestimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div> */}

                  {/* Customer Name & Location */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {displayTestimonials[activeIndex].name}
                    </h3>
                    <p className="text-sm text-[#F9F9F9]/60">
                      {displayTestimonials[activeIndex].location}
                    </p>
                  </div>
                </div>

                {/* Rating & Verified Badge */}
                <div className="flex flex-col items-center md:items-start space-y-3">
                  {/* Star Rating */}
                  <div className="flex">
                    {renderStars(displayTestimonials[activeIndex].rating)}
                  </div>

                  {/* Verified Buyer Badge */}
                  {displayTestimonials[activeIndex].verifiedBuyer && (
                    <div className="flex items-center text-xs font-medium text-[#00E0FF]">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Verified Buyer
                    </div>
                  )}
                </div>
              </div>

              {/* Testimonial Text Column */}
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  {/* Mobile Product Image */}
                  {/* <div className="md:hidden mb-4 w-full">
                      <div className="relative w-full h-36 rounded-lg overflow-hidden">
                        {displayTestimonials[activeIndex].productImage && (
                          <img
                            src={displayTestimonials[activeIndex].productImage}
                            alt={displayTestimonials[activeIndex].productName}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-sm font-medium text-white text-center">
                          {displayTestimonials[activeIndex].productName}
                        </div>
                      </div>
                    </div> */}

                  {/* Testimonial Text */}
                  <p className="text-base md:text-lg leading-relaxed text-[#F9F9F9]/90 mb-6">
                    "{displayTestimonials[activeIndex].text}"
                  </p>

                  {/* Social Icons (Optional) */}
                  <div className="flex items-center space-x-3 text-[#F9F9F9]/40">
                    <span className="text-xs">As seen on</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.157 1.204 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows - Repositioned to avoid content overlap */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 md:px-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto hover:bg-[#00E0FF]/20 transition-all duration-300 -ml-5 md:-ml-5 z-10"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center pointer-events-auto hover:bg-[#00E0FF]/20 transition-all duration-300 -mr-5 md:-mr-5 z-10"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {displayTestimonials.map((_: any, index: any) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#00E0FF] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// New Arrivals Collection Component for Neovibe smart lighting store
export function NewArrivalsCollection({products}: any) {
  // Handle case when products are still loading or empty
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-16 text-center bg-[#121212] text-[#F9F9F9]">
        <p className="text-xl">Loading new arrivals...</p>
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-16 bg-[#121212] text-[#F9F9F9]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text">
            Just Dropped
          </h2>
          <p className="text-lg md:text-xl max-w-2xl text-center opacity-90">
            Light up your space with our newest tech-forward glow essentials
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product: any) => {
            const firstVariant = product.variants?.nodes[0];
            const isOnSale =
              firstVariant?.compareAtPrice &&
              parseFloat(firstVariant.compareAtPrice.amount) >
                parseFloat(firstVariant.price.amount);

            return (
              <Link
                key={product.id}
                to={`/products/${product.handle}`}
                className="group relative flex flex-col overflow-hidden rounded-lg bg-[#1A1A1A] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,224,255,0.3)]"
              >
                {/* Product Image with glow effect on hover */}
                <div className="relative overflow-hidden aspect-square">
                  {product.featuredImage && (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* New badge */}
                  <div className="absolute top-2 left-2 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] px-3 py-1 text-xs font-semibold rounded-full text-black">
                    NEW
                  </div>

                  {/* Quick view button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <span className="bg-[#00E0FF] text-black px-4 py-2 rounded-full font-medium text-sm">
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Product details */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold mb-1 text-[#F9F9F9] truncate">
                    {product.title}
                  </h3>

                  {/* Product tags as chips */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.slice(0, 2).map((tag: any, index: any) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-[#1D1D1D] text-[#C084FC] border border-[#C084FC]/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price section */}
                  <div className="mt-auto pt-2 flex items-baseline">
                    {isOnSale ? (
                      <>
                        <span className="text-[#00E0FF] font-bold text-lg">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: firstVariant.price.currencyCode,
                          }).format(firstVariant.price.amount)}
                        </span>
                        <span className="ml-2 text-sm text-[#F9F9F9]/60 line-through">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: firstVariant.compareAtPrice.currencyCode,
                          }).format(firstVariant.compareAtPrice.amount)}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#F9F9F9] font-bold text-lg">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: firstVariant.price.currencyCode,
                        }).format(firstVariant.price.amount)}
                      </span>
                    )}

                    {/* Availability indicator */}
                    {!product.availableForSale && (
                      <span className="ml-auto text-xs uppercase tracking-wider px-2 py-1 rounded bg-[#F9F9F9]/10 text-[#F9F9F9]/70">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all button with glow effect */}
        <div className="flex justify-center mt-10">
          <Link
            to="/catalog"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full bg-[#00E0FF] text-black hover:shadow-[0_0_20px_rgba(0,224,255,0.5)] transition-all duration-300"
          >
            View All New Arrivals
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
  