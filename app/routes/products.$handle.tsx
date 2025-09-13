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
import {
  Analytics,
} from '@shopify/hydrogen';
import SalesPitchSelector from '~/components/Products/SalesPitchSelector';

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
        {/* Salespitch */}
        <SalesPitchSelector
          productId={product.id}
          product={product}
          selectedVariant={selectedVariant}
          productOptions={productOptions}
          reviews={[]}
          scrollToReviews={scrollToReviews}
        />

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
                  {/* <div className="px-4 pb-4">
                    <button className="w-full px-4 py-2 bg-[#2A2A2A] hover:bg-[#333333] text-[#F9F9F9] rounded-lg transition-colors">
                      Add to Cart
                    </button>
                  </div> */}
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
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />

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
