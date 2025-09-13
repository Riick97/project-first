import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';

export const meta: MetaFunction = () => {
  return [{title: 'Neovibe | All Collections'}];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: {
      ...paginationVariables,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // For demo purposes, adding featured collections that would be set in the admin
  const featuredCollectionHandles = [
    'led-strip-lights',
    'galaxy-projectors',
    'smart-panels',
    'ambient-mood-lights',
  ];
  const featuredCollections = collections.nodes.filter((collection: any) =>
    featuredCollectionHandles.includes(collection.handle),
  );

  return json({
    collections,
    featuredCollections: featuredCollections.length
      ? featuredCollections
      : collections.nodes.slice(0, 4),
  });
}

export default function Collections() {
  const {collections, featuredCollections} = useLoaderData<typeof loader>();
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCollections, setFilteredCollections] = useState(
    collections.nodes,
  );

  const filters = [
    {id: 'all', label: 'All'},
    {id: 'room', label: 'Room Vibes'},
    {id: 'sleep', label: 'Sleep & Chill'},
    {id: 'productivity', label: 'Productivity'},
    {id: 'content', label: 'Content Creator'},
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCollections(collections.nodes);
    } else {
      // In a real implementation, we would filter based on collection tags or metafields
      // For demo, we'll just limit the number
      setFilteredCollections(
        collections.nodes.slice(
          0,
          activeFilter === 'room'
            ? 5
            : activeFilter === 'sleep'
              ? 3
              : activeFilter === 'productivity'
                ? 4
                : 2,
        ),
      );
    }
  }, [activeFilter, collections.nodes]);

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-80 md:h-96 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] overflow-hidden relative">
          <div className="absolute inset-0 bg-[#121212] opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lighting That Matches Your Mood
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Explore our curated collections of smart lighting designed to
                transform your space
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#collections"
                  className="px-6 py-3 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
                >
                  Shop Collections
                </a>
                <a
                  href="/catalog"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Featured Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCollections.map((collection: any) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.handle}`}
              className="group block relative rounded-xl overflow-hidden aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
              {collection.image ? (
                <img
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                  <span className="text-2xl text-[#333333]">
                    {collection.title}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
                <div className="flex items-center text-[#00E0FF]">
                  <span>Shop Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Collection Categories Filters */}
      <div id="collections" className="max-w-7xl mx-auto px-4 pt-10 pb-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">All Collections</h2>
          <div className="hidden md:flex gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#00E0FF] text-black'
                    : 'bg-[#1A1A1A] text-[#F9F9F9] hover:bg-[#2A2A2A]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Mobile Filter Dropdown */}
          <div className="md:hidden">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-[#333333] text-[#F9F9F9] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00E0FF]"
            >
              {filters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection: any) => (
            <div
              key={collection.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#00E0FF]/10"
            >
              <Link to={`/collections/${collection.handle}`} className="block">
                <div className="aspect-[4/3] overflow-hidden">
                  {collection.image ? (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText || collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
                      <span className="text-xl text-[#444444]">
                        {collection.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#00E0FF] transition-colors">
                    {collection.title}
                  </h3>
                  {collection.description && (
                    <p className="text-[#BBBBBB] text-sm line-clamp-2 mb-4">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#00E0FF]">
                      Shop Collection
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center group-hover:bg-[#00E0FF] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {collections.pageInfo.hasNextPage ||
        collections.pageInfo.hasPreviousPage ? (
          <div className="flex justify-center mt-16">
            {/* <Pagination connection={collections} /> */}
          </div>
        ) : null}
      </div>

      {/* Collection Highlights */}
      <div className="bg-[#1A1A1A] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <span className="bg-[#00E0FF] text-black px-3 py-1 text-sm rounded-full mb-4 inline-block">
                Popular Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Galaxy Projectors
              </h2>
              <p className="text-[#BBBBBB] mb-8">
                Transform your ceiling into a mesmerizing galaxy. Our projectors
                create stunning nebula effects that are perfect for relaxation,
                sleep aid, or creating content that stands out.
              </p>
              <Link
                to="/collections/galaxy-projectors"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-medium rounded-lg transition-all duration-300"
              >
                Explore Collection
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/api/placeholder/800/600"
                alt="Galaxy projector creating starry night on ceiling"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collection Usage Cards */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          Find Your Perfect Vibe
        </h2>
        <p className="text-[#BBBBBB] text-center max-w-2xl mx-auto mb-12">
          Our smart lighting collections are designed for different moods and
          spaces. Find the perfect match for your needs.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1A1A1A] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2A2A2A] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00E0FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sleep & Relaxation</h3>
            <p className="text-[#BBBBBB] mb-4">
              Gentle lights and projectors that create a calming atmosphere to
              help you unwind and get better sleep.
            </p>
            <Link
              to="/collections/sleep-chill"
              className="text-[#00E0FF] hover:underline inline-flex items-center"
            >
              Shop Sleep & Chill
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2A2A2A] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00E0FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Focus & Productivity</h3>
            <p className="text-[#BBBBBB] mb-4">
              Smart lighting solutions designed to boost concentration and
              create the perfect workspace vibe.
            </p>
            <Link
              to="/collections/productivity"
              className="text-[#00E0FF] hover:underline inline-flex items-center"
            >
              Shop Productivity
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2A2A2A] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#00E0FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Content Creation</h3>
            <p className="text-[#BBBBBB] mb-4">
              Stand out on social media with eye-catching lighting effects that
              make your content pop.
            </p>
            <Link
              to="/collections/content-creator"
              className="text-[#00E0FF] hover:underline inline-flex items-center"
            >
              Shop Creator Lights
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Join the Glow Gang
          </h2>
          <p className="text-black opacity-80 mb-8">
            Subscribe to our newsletter for exclusive deals, new product drops,
            and lighting inspiration for your space.
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
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        id
        title
        description
        handle
        image {
          id
          url
          width
          height
          altText
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
