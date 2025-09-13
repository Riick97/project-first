import React, {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {useLoaderData} from '@remix-run/react';
import {NewArrivalsCollection} from '~/components/NewletterSignup';
import {TrustIndicators} from '~/components/NewletterSignup';
import {TestimonialsSection} from '~/components/NewletterSignup';

// types.ts
type CountryCode = string;
type LanguageCode = string;

type LoaderFunctionArgs = {
  context: {
    storefront: {
      query: (query: string) => Promise<any>;
    };
  };
  request: Request;
};

type Image = {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
};

type Money = {
  amount: string;
  currencyCode: string;
};

type ProductVariant = {
  id: string;
  availableForSale: boolean;
  compareAtPrice: Money | null;
  price: Money;
  selectedOptions: {name: string; value: string}[];
};

type Product = {
  id: string;
  title: string;
  handle: string;
  tags: string[];
  featuredImage: Image;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money;
  };
  images: {
    nodes: Image[];
  };
  variants: {
    nodes: ProductVariant[];
  };
  selectedOrFirstAvailableVariant: ProductVariant;
  options: {
    name: string;
    values: string[];
  }[];
};

type Collection = {
  id: string;
  title: string;
  handle: string;
  image: Image;
};

type Testimonial = {
  id: string;
  fields: {
    key: string;
    value: string;
    reference: {
      id: string;
      image: Image;
    } | null;
  }[];
};

type HomepageData = {
  featuredProducts: Product[];
  featuredCollections: Collection[];
  recommendedProducts: Promise<{products: {nodes: Product[]}}>;
  testimonials: Promise<{testimonials: {nodes: Testimonial[]}}>;
};

// GraphQL Queries
const HOMEPAGE_CRITICAL_DATA_QUERY = `#graphql  
  fragment FeaturedCollection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  fragment FeaturedProducts on Product {
    id
    title
    handle
    tags
    featuredImage {
      id
      altText
      url
      width
      height
    }
    availableForSale
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
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
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
    options {
      name
      values
    }
  }
  
  query HomepageCriticalData($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
    products(first: 4, sortKey: CREATED_AT, reverse: true) {
      nodes {
        ...FeaturedProducts
      }
    }
    newArrivals: collection(handle: "new-arrivals") {
      ...FeaturedCollection
    }
    roomVibes: collection(handle: "room-vibes") {
      ...FeaturedCollection
    }
    sleepChill: collection(handle: "sleep-chill") {
      ...FeaturedCollection
    }
    productivityGlow: collection(handle: "productivity-glow") {
      ...FeaturedCollection
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProductFragment on Product {
    id
    title
    handle
    availableForSale
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
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
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
    options {
      name
      values
    }
  }
  
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: BEST_SELLING, reverse: true) {
      nodes {
        ...RecommendedProductFragment
      }
    }
  }
`;

const TESTIMONIALS_QUERY = `#graphql
  fragment TestimonialFragment on Metaobject {
    id
    fields {
      key
      value
      reference {
        ... on MediaImage {
          id
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
  
  query Testimonials($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    testimonials: metaobjects(type: "testimonial", first: 3) {
      nodes {
        ...TestimonialFragment
      }
    }
  }
`;

// 1. Energizer - Prepare and validate incoming props
type EnergizerSlot = {
  queries: {
    homepageCriticalDataQuery: string;
    recommendedProductsQuery: string;
    testimonialsQuery: string;
  };
};

function useEnergizerState(): EnergizerSlot {
  return React.useMemo(
    () => ({
      queries: {
        homepageCriticalDataQuery: HOMEPAGE_CRITICAL_DATA_QUERY,
        recommendedProductsQuery: RECOMMENDED_PRODUCTS_QUERY,
        testimonialsQuery: TESTIMONIALS_QUERY,
      },
    }),
    [],
  );
}

// 2. Router - Handling navigation
type RouterSlot = {
  navigateTo: (path: string) => void;
  currentPath: string;
};

function useRouter(): RouterSlot {
  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  return React.useMemo(
    () => ({
      navigateTo: navigate,
      currentPath:
        typeof window !== 'undefined' ? window.location.pathname : '',
    }),
    [],
  );
}

// 3. Performer - Manage local state
type PerformerSlot = EnergizerSlot &
  RouterSlot & {
    homepageData: HomepageData | null;
    isLoading: boolean;
    error: Error | null;
  };

function usePerformer(
  energizer: EnergizerSlot,
  router: RouterSlot,
): PerformerSlot {
  const [homepageData, setHomepageData] = React.useState<HomepageData | null>(
    null,
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  const data = useLoaderData<any>();

  React.useEffect(() => {
    if (data) {
      setHomepageData(data);
      setIsLoading(false);
    }
  }, [data]);

  return React.useMemo(
    () => ({
      ...energizer,
      ...router,
      homepageData,
      isLoading,
      error,
    }),
    [energizer, router, homepageData, isLoading, error],
  );
}

// 4. Observer - Handle side effects
function useObserver(performer: PerformerSlot): void {
  React.useEffect(() => {
    console.log('Homepage data:', performer.homepageData);
  }, [performer.homepageData]);
}

// 5. Archivist - Persist state (not needed for this component)
type ArchivistSlot = PerformerSlot;

function useArchivist(performer: PerformerSlot): ArchivistSlot {
  return React.useMemo(
    () => ({
      ...performer,
    }),
    [performer],
  );
}

// 6. Director - Business logic
type DirectorSlot = ArchivistSlot & {
  hasTestimonials: boolean;
  hasFeaturedProducts: boolean;
  hasFeaturedCollections: boolean;
};

function useDirector(archivist: ArchivistSlot): DirectorSlot {
  const hasTestimonials = React.useMemo(
    () => !!archivist.homepageData?.testimonials,
    [archivist.homepageData],
  );

  const hasFeaturedProducts = React.useMemo(
    () => !!archivist.homepageData?.featuredProducts?.length,
    [archivist.homepageData],
  );

  const hasFeaturedCollections = React.useMemo(
    () => !!archivist.homepageData?.featuredCollections?.length,
    [archivist.homepageData],
  );

  return React.useMemo(
    () => ({
      ...archivist,
      hasTestimonials,
      hasFeaturedProducts,
      hasFeaturedCollections,
    }),
    [archivist, hasTestimonials, hasFeaturedProducts, hasFeaturedCollections],
  );
}

// 7. Diplomat - Internal communication
type DiplomatSlot = DirectorSlot;

function useDiplomat(director: DirectorSlot): DiplomatSlot {
  return React.useMemo(
    () => ({
      ...director,
    }),
    [director],
  );
}

// 8. Ambassador - External communication
type AmbassadorSlot = DiplomatSlot;

function useAmbassador(diplomat: DiplomatSlot): AmbassadorSlot {
  return React.useMemo(
    () => ({
      ...diplomat,
    }),
    [diplomat],
  );
}

// 9. Deliverer - UI preparation
type DelivererSlot = AmbassadorSlot & {
  heroSubtitle: string;
  ctaLabel: string;
  logoAlt: string;
  pageTitle: string;
};

function useDeliverer(ambassador: AmbassadorSlot): DelivererSlot {
  return React.useMemo(
    () => ({
      ...ambassador,
      heroSubtitle: 'Transform your room with vibrant mood lights projectors',
      ctaLabel: 'Shop Now',
      logoAlt: 'Neovibe Logo',
      pageTitle: 'Neovibe | Illuminate Your Space',
    }),
    [ambassador],
  );
}

// 10. Explorer - Manage mode/phase
type ExplorerSlot = DelivererSlot & {
  isReady: boolean;
};

function useExplorer(deliverer: DelivererSlot): ExplorerSlot {
  const isReady = !deliverer.isLoading && !deliverer.error;

  return React.useMemo(
    () => ({
      ...deliverer,
      isReady,
    }),
    [deliverer, isReady],
  );
}

// Composite hook
function useHomepage(): ExplorerSlot {
  const energizer = useEnergizerState();
  const router = useRouter();
  const performer = usePerformer(energizer, router);
  useObserver(performer);
  const archivist = useArchivist(performer);
  const director = useDirector(archivist);
  const diplomat = useDiplomat(director);
  const ambassador = useAmbassador(diplomat);
  const deliverer = useDeliverer(ambassador);
  const explorer = useExplorer(deliverer);

  return explorer;
}

// 11. Architect - Render UI
function HeroBackground({
  subtitle,
  ctaLabel,
  logoAlt,
  navigateTo,
}: {
  subtitle: string;
  ctaLabel: string;
  logoAlt: string;
  navigateTo: (path: string) => void;
}) {
  return (
    <div
      className="relative bg-cover bg-center flex items-center"
      style={{
        backgroundImage: 'url("/Hero2.png")',
        minHeight: '600px',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute top-6 left-6 z-20">
        <img src="/logo_white_2.png" alt={logoAlt} className="h-28" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
          Illuminate <br /> Your Space
        </h1>
        <p className="mt-4 mb-6 text-lg md:text-xl drop-shadow">
          {subtitle.split('<br />').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <button
          onClick={() => navigateTo('/catalog')}
          className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full bg-[#00E0FF] text-black hover:shadow-[0_0_20px_rgba(0,224,255,0.5)] transition-all duration-300"
        >
          {ctaLabel}
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
        </button>
      </div>
    </div>
  );
}

// Meta export
export const meta = () => {
  return [{title: 'Neovibe | Illuminate Your Space'}];
};

// Loader function
export async function loader(args: LoaderFunctionArgs) {
  // Facebook Conversions API: Send ViewContent event on homepage load
  const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
  const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
  if (FB_PIXEL_ID && FB_ACCESS_TOKEN) {
    const fbPayload = {
      data: [
        {
          event_name: 'ViewContent',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: args.request.url,
          user_data: {},
          custom_data: {},
        },
      ],
    };
    fetch(
      `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(fbPayload),
      },
    ).catch((err) => {
      console.error('FB CAPI error:', err);
    });
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const data = await context.storefront.query(HOMEPAGE_CRITICAL_DATA_QUERY);

  const result = {
    featuredProducts: data.products?.nodes || [],
    featuredCollections: [
      data.roomVibes,
      data.sleepChill,
      data.productivityGlow,
    ].filter(Boolean), // Filter out any null collections
  };

  console.log('Critical data:', data);

  return result;
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  const testimonials = context.storefront
    .query(TESTIMONIALS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
    testimonials,
  };
}

// Main Component
export default function Homepage() {
  const vm = useHomepage();

  if (!vm.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <HeroBackground
        subtitle={vm.heroSubtitle}
        ctaLabel={vm.ctaLabel}
        logoAlt={vm.logoAlt}
        navigateTo={vm.navigateTo}
      />

      {vm.hasFeaturedProducts && (
        <NewArrivalsCollection
          products={vm.homepageData?.featuredProducts || []}
        />
      )}

      <TrustIndicators />

      {vm.hasTestimonials && (
        <Suspense fallback={<div>Loading testimonials...</div>}>
          <Await resolve={vm.homepageData?.testimonials}>
            {(resolved) => <TestimonialsSection testimonials={resolved} />}
          </Await>
        </Suspense>
      )}
    </div>
  );
}
