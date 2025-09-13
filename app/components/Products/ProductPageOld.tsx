import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {useState, useRef} from 'react';
import {
  Image,
  Money,
  Pagination,
  getPaginationVariables,
  parseGid,
} from '@shopify/hydrogen';
import {
  getSelectedProductOptions,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {ProductForm} from '~/components/ProductForm';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Neovibe | ${data?.product.title ?? 'Product'}`}];
};

export async function loader({params, request, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any[] = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  if (!handle) {
    throw new Response('No handle provided', {status: 404});
  }

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Ensure option values are correctly structured
  if (product.options) {
    product.options = product.options.map((option: any) => {
      // Ensure optionValues is an array of objects with name property
      if (!option.optionValues || !Array.isArray(option.optionValues)) {
        const uniqueValues = new Set();

        // Extract values from variants
        if (product.variants?.nodes) {
          product.variants.nodes.forEach((variant: any) => {
            const selectedOption = variant.selectedOptions.find(
              (opt: any) => opt.name === option.name,
            );
            if (selectedOption) {
              uniqueValues.add(selectedOption.value);
            }
          });
        }

        option.optionValues = Array.from(uniqueValues).map((value: any) => ({
          name: value,
        }));
      }

      return option;
    });
  }

  // Get recommended products
  const {recommendations} = await context.storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
    {
      variables: {
        productId: product.id,
        count: 3,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  // const {collection} =
  //   await context.storefront.query(OTHER_PRODUCTS_QUERY, {
  //     variables: {
  //       first: 3, // This matches the parameter name in the query (not "count")
  //       collectionHandle: product.collection?.edges[0]?.node.handle, // Assuming you have access to the product's collection
  //       country: context.storefront.i18n.country,
  //       language: context.storefront.i18n.language,
  //     },
  //   });

  const {products} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {
      first: 3,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // For demo purposes - adding predefined features and specs
  const productEnhancements = {
    features: [
      'Nebula cloud effects with 16 million colors',
      'Bluetooth music sync technology',
      'Timer function (30min - 8 hours)',
      'Smart app control via NeoVibe app',
      'Voice assistant compatibility',
      'Adjustable brightness and rotation speed',
    ],
    specs: {
      dimensions: '6.3" x 6.3" x 3.0"',
      weight: '1.2 lbs',
      powerSource: 'AC adapter (included) or USB-C',
      connectivity: 'Bluetooth 5.0, 2.4GHz WiFi',
      noiseLevel: 'Ultra-quiet (<20dB)',
      warranty: '2-year limited',
    },
    reviews: [
      {
        name: 'Alex K.',
        date: '2 weeks ago',
        rating: 5,
        title: 'Total game changer for my space',
        content:
          'This projector is EVERYTHING! The colors are so vibrant and the app makes it super easy to control. My TikToks look amazing with this in the background - already got comments asking where I got it from.',
        helpful: 24,
      },
      {
        name: 'Jamie T.',
        date: '1 month ago',
        rating: 4,
        title: 'Great vibes, app could be better',
        content:
          'Love the galaxy effect and how it syncs to music. The app is a little glitchy sometimes but overall this projector creates an amazing atmosphere. Perfect for movie nights!',
        helpful: 16,
      },
      {
        name: 'Morgan L.',
        date: '2 months ago',
        rating: 5,
        title: 'Sleep game upgrade!',
        content:
          'Been using this as a night light and its so relaxing. The timer function is perfect so it turns off after I fall asleep. The stars and clouds are much more realistic than I expected.',
        helpful: 38,
      },
    ],
  };

  const results = {
    shop,
    product,
    recommendations,
    products,
    productEnhancements,
  };

  return json(results);
}

export default function Product() {
  const {product, recommendations, productEnhancements, products} =
    useLoaderData<typeof loader>();
  console.log('Product data:', {
    product,
    recommendations,
    productEnhancements,
    products,
  });

  const {features, specs, reviews} = productEnhancements;
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showNotification, setShowNotification] = useState(false);

  // At the top of your component, add these states and hooks
  const [searchParams] = useSearchParams();

  const options = getProductOptions(product);

  const selectedVariant = product.selectedOrFirstAvailableVariant;
  const reviewsRef = useRef<HTMLDivElement>(null);

  // const selectedVariant = product.selectedOrFirstAvailableVariant;
  const images = selectedVariant?.image ? [selectedVariant.image] : [];

  // For products with multiple images (from product.images.nodes)
  if (product.images?.nodes && product.images.nodes.length > 0) {
    // Add any product images that aren't already in the list
    for (const image of product.images.nodes) {
      if (!images.some((img) => img.id === image.id)) {
        images.push(image);
      }
    }
  }

  // Update main image when variant changes
  useEffect(() => {
    // If the selected variant has an image, find its index in the images array
    if (selectedVariant?.image) {
      const variantImageIndex = images.findIndex(
        (img) => img.id === selectedVariant.image?.id,
      );
      if (variantImageIndex >= 0) {
        setMainImageIndex(variantImageIndex);
      }
    }
  }, [selectedVariant, images]);

  const scrollToReviews = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({behavior: 'smooth'});
      setActiveTab('reviews');
    }
  };

  const handleAddToCart = () => {
    // In a real implementation, this would add to cart
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const getAverageRating = () => {
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-[#00E0FF] text-black p-4 rounded-lg shadow-lg z-50 animate-fade-in-out flex items-center">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Added to cart! Continue shopping or{' '}
            <Link to="/cart" className="underline font-bold">
              view cart
            </Link>
          </span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-sm">
        <div className="flex items-center text-[#BBBBBB]">
          <Link to="/" className="hover:text-[#00E0FF]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/collections" className="hover:text-[#00E0FF]">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#F9F9F9]">{product.title}</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="bg-[#1A1A1A] rounded-xl overflow-hidden mb-4">
              {images.length > 0 && (
                <img
                  src={images[mainImageIndex]?.url || ''}
                  alt={images[mainImageIndex]?.altText || product.title}
                  className="w-full h-auto object-cover aspect-square"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={image.id || index}
                    className={`rounded-lg overflow-hidden border-2 ${mainImageIndex === index ? 'border-[#00E0FF]' : 'border-transparent'}`}
                    onClick={() => setMainImageIndex(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `Product image ${index + 1}`}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.title}
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
                  {reviews.length} reviews
                </button>
              </div>

              <div className="flex items-baseline mb-6">
                {selectedVariant && (
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
                )}
              </div>

              <p className="text-[#BBBBBB] mb-6">{product.description}</p>
            </div>

            <ProductForm
              productOptions={productOptions}
              selectedVariant={selectedVariant}
            />

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

            {/* Features Icons */}
            {/* <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#00E0FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm">App Control</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#00E0FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                </div>
                <p className="text-sm">Music Sync</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#00E0FF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm">Timer Function</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-[#333333]">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                    : 'text-[#BBBBBB] hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'features'
                    ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                    : 'text-[#BBBBBB] hover:text-white'
                }`}
              >
                Features
              </button>
              {/* <button
                onClick={() => setActiveTab('specs')}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'specs'
                    ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                    : 'text-[#BBBBBB] hover:text-white'
                }`}
              >
                Specifications
              </button> */}
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-[#00E0FF] text-[#00E0FF]'
                    : 'text-[#BBBBBB] hover:text-white'
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <div
                  dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
                  className="prose prose-invert max-w-none mb-8"
                />

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">Perfect For</h3>
                    <ul className="space-y-2 text-[#BBBBBB]">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Bedrooms and relaxation spaces
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Home theater setups
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Content creation backdrops
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Meditation and yoga spaces
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <h3 className="text-xl font-medium mb-4">
                      What's in the Box
                    </h3>
                    <ul className="space-y-2 text-[#BBBBBB]">
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        {product.title}
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Remote control
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        AC power adapter
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        USB-C charging cable
                      </li>
                      <li className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#00E0FF] mr-2 mt-0.5"
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
                        Quick start guide
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="max-w-3xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
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
                        <p>{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <div className="mt-12">
                  <h3 className="text-xl font-medium mb-6">
                    The Neovibe App Experience
                  </h3>
                  <div className="bg-[#1A1A1A] p-6 rounded-xl">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
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
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                            />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">
                          Custom Color Themes
                        </h4>
                        <p className="text-sm text-[#BBBBBB]">
                          Create and save your favorite color combinations
                        </p>
                      </div>
                      <div className="text-center">
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
                              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                            />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">
                          Music Visualization
                        </h4>
                        <p className="text-sm text-[#BBBBBB]">
                          Multiple patterns that react to your music
                        </p>
                      </div>
                      <div className="text-center">
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
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                          </svg>
                        </div>
                        <h4 className="font-medium mb-2">
                          Adjustable Settings
                        </h4>
                        <p className="text-sm text-[#BBBBBB]">
                          Control brightness, speed, and pattern density
                        </p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                <div className="bg-[#1A1A1A] p-6 rounded-xl">
                  <h3 className="text-xl font-medium mb-6">
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-y-4">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="w-1/2 text-[#BBBBBB] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="w-1/2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-6">Compatibility</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#1A1A1A] p-4 rounded-lg text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto mb-2 text-[#BBBBBB]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v18m0 0h6m-6 0H5.5a2 2 0 01-2-2v-4.18a2 2 0 01.25-.98l5.62-9.92A2 2 0 0111.38 3H12"
                        />
                      </svg>
                      <span className="text-sm">iOS 12+</span>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto mb-2 text-[#BBBBBB]"
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
                      <span className="text-sm">Android 8+</span>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto mb-2 text-[#BBBBBB]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">Google Home</span>
                    </div>
                    <div className="bg-[#1A1A1A] p-4 rounded-lg text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mx-auto mb-2 text-[#BBBBBB]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      <span className="text-sm">Amazon Alexa</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div ref={reviewsRef} className="max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <ProductReviews product={product} />
                    review here
                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                    <div className="flex items-center mt-2">
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
                      </div>
                      <span className="ml-2 text-lg font-medium">
                        {getAverageRating()} out of 5
                      </span>
                      <span className="ml-2 text-sm text-[#BBBBBB]">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors text-[#F9F9F9] rounded-lg">
                    Write a Review
                  </button>
                </div>

                {/* Reviews */}
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-[#1A1A1A] p-6 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-[#BBBBBB]">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex text-[#00E0FF] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'stroke-current fill-none'}`}
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
                      <h5 className="text-lg font-medium mb-2">
                        {review.title}
                      </h5>
                      <p className="text-[#BBBBBB] mb-4">{review.content}</p>
                      <div className="flex items-center text-sm">
                        <button className="flex items-center text-[#BBBBBB] hover:text-[#00E0FF] transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          Helpful ({review.helpful})
                        </button>
                        <span className="mx-4">|</span>
                        <button className="text-[#BBBBBB] hover:text-[#00E0FF] transition-colors">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="px-6 py-3 bg-transparent border border-[#333333] text-[#F9F9F9] rounded-lg hover:bg-[#1A1A1A] transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Complete Your Vibe</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {products.nodes &&
              products.nodes.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-xl overflow-hidden transition-transform hover:scale-105"
                >
                  <Link to={`/products/${item.handle}`} className="block">
                    {item.featuredImage && (
                      <img
                        src={item.featuredImage.url}
                        alt={item.featuredImage.altText || item.title}
                        className="w-full h-auto object-cover aspect-square"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{item.title}</h3>
                      <p className="text-[#00E0FF] font-medium">
                        <Money data={item.priceRange.minVariantPrice} />
                      </p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <button className="w-full px-4 py-2 bg-[#2A2A2A] hover:bg-[#333333] text-[#F9F9F9] rounded-lg transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Featured In Section */}
        <div className="mt-20 mb-12">
          <h3 className="text-lg text-center mb-6 text-[#BBBBBB]">
            As Featured In
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              'TikTok',
              'Apartment Therapy',
              'CNET',
              'Mashable',
              'Tech Insider',
            ].map((name, index) => (
              <div key={index} className="text-[#777777] text-lg font-medium">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Viewed - Sticky Bottom Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333333] py-3 px-4 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#BBBBBB]">Recently Viewed</div>
            <div className="flex space-x-4">
              <img src="/api/placeholder/40/40" alt="Recently viewed product" className="w-10 h-10 rounded-md" />
              <img src="/api/placeholder/40/40" alt="Recently viewed product" className="w-10 h-10 rounded-md" />
              <img src="/api/placeholder/40/40" alt="Recently viewed product" className="w-10 h-10 rounded-md" />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function ProductReviews({product}: {product: any}) {
  useEffect(() => {
    // Load the Judge.me review widget script
    const script = document.createElement('script');
    script.src = 'https://cdn.judge.me/widget.js'; // or their updated loader
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* This is where Judge.me will inject the reviews */}
      <div
        className="jdgm-widget"
        data-id={product.id}
        data-product-title={product.title}
        data-product-handle={product.handle}
      />
    </div>
  );
}

// GraphQL fragments and queries
const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    shop {
      name
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      availableForSale
      encodedVariantExistence
      encodedVariantAvailability
      adjacentVariants {
          id
          title
          availableForSale
          sku
          quantityAvailable
          selectedOptions {
            name
            value
          }
             product {
              title
              handle
            }
          image {
            id
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }

      }
      
      # Get all variants to properly handle variant selection
      variants(first: 250) {
        nodes {
          id
          title
          availableForSale
          sku
          quantityAvailable
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
      
      # Options and their values for creating variant selectors
      options {
        name
        optionValues {
          name
          firstSelectableVariant {
            id
            availableForSale
            sku
            title
            image {
              id
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            product {
              title
              handle
            }
          }
        }
      }
      
      # Currently selected or first available variant
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions) {
        id
        availableForSale
        quantityAvailable
        compareAtPrice {
          amount
          currencyCode
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
        selectedOptions {
          name
          value
        }
        sku
        title
      }
      
      # Get all images for the product gallery
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      
      seo {
        description
        title
      }
    }
  }
`;

const PRODUCTS_QUERY = `#graphql
  query Products(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
    ) {
      nodes {
        id
        title
        handle
        vendor
        tags
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        selectedOrFirstAvailableVariant {
          id
          availableForSale
          compareAtPrice {
            amount
            currencyCode
          }
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            compareAtPrice {
              amount
              currencyCode
            }
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query ProductRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommendations: productRecommendations(productId: $productId) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
    }
  }
`;

const OTHER_PRODUCTS_QUERY = `#graphql
  query OtherProducts(
    $country: CountryCode
    $language: LanguageCode
    $collectionHandle: String
    $first: Int = 4
  ) @inContext(country: $country, language: $language) {
    # Products from the same collection if a collection handle is provided
    collection: collection(handle: $collectionHandle) {
      title
      handle
      products(first: $first) {
        nodes {
          id
          title
          handle
          availableForSale
          vendor
          tags
          featuredImage {
            id
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          selectedOrFirstAvailableVariant {
            id
            availableForSale
            compareAtPrice {
              amount
              currencyCode
            }
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

import {useEffect} from 'react';
import {useSearchParams} from '@remix-run/react';
