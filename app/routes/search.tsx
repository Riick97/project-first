import {
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link} from '@remix-run/react';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {SearchForm} from '~/components/SearchForm';
import {SearchResults} from '~/components/SearchResults';
import {
  type RegularSearchReturn,
  type PredictiveSearchReturn,
  getEmptyPredictiveSearchResult,
} from '~/lib/search';

export const meta: MetaFunction = () => {
  return [{title: `SmartSphere | Search Results`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const isPredictive = url.searchParams.has('predictive');
  const searchPromise: Promise<PredictiveSearchReturn | RegularSearchReturn> =
    isPredictive
      ? predictiveSearch({request, context})
      : regularSearch({request, context});

  searchPromise.catch((error: Error) => {
    console.error(error);
    return {term: '', result: null, error: error.message};
  });

  return await searchPromise;
}

/**
 * Renders the /search route
 */
export default function SearchPage() {
  const {type, term, result, error} = useLoaderData<typeof loader>();
  if (type === 'predictive') return null;

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 60px',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          fontSize: '14px',
          color: '#3D8BFF',
          marginBottom: '32px',
        }}
      >
        <Link
          to="/"
          style={{
            color: '#3D8BFF',
            textDecoration: 'none',
            marginRight: '8px',
          }}
        >
          Home
        </Link>
        <span style={{margin: '0 8px', color: '#71C3FF'}}>/</span>
        <span style={{color: '#2B2B2B'}}>Search</span>
      </div>

      {/* Search Header */}
      <div
        style={{
          marginBottom: '32px',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2B2B2B',
            marginBottom: '16px',
          }}
        >
          Search SmartSphere
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#2B2B2B',
            maxWidth: '700px',
            lineHeight: '1.5',
          }}
        >
          Find products, articles and more using the search box below.
        </p>
      </div>

      {/* Search Form Section */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <SearchForm>
          {({inputRef}) => (
            <div
              style={{
                display: 'flex',
              }}
            >
              <input
                defaultValue={term}
                name="q"
                placeholder="Search for products, articles, and more..."
                ref={inputRef}
                type="search"
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  fontSize: '16px',
                  border: '1px solid #EAEAEA',
                  borderRadius: '6px 0 0 6px',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#3D8BFF',
                  color: 'white',
                  border: 'none',
                  padding: '0 24px',
                  borderRadius: '0 6px 6px 0',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                }}
              >
                Search
              </button>
            </div>
          )}
        </SearchForm>

        {error && (
          <div
            style={{
              color: '#DD6B55',
              backgroundColor: '#FFEEEE',
              padding: '12px 16px',
              borderRadius: '4px',
              marginTop: '16px',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Search Results Section */}
      <div>
        {/* Search Meta Data */}
        {term && result?.total > 0 && (
          <div
            style={{
              marginBottom: '24px',
              fontSize: '15px',
              color: '#2B2B2B',
            }}
          >
            Found {result.total} results for "{term}"
          </div>
        )}

        {/* Results Content */}
        {!term || !result?.total ? (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              padding: '48px 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                marginBottom: '16px',
              }}
            >
              🔍
            </div>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#2B2B2B',
                marginBottom: '16px',
              }}
            >
              {term ? 'No results found' : 'Enter a search term'}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#2B2B2B',
                maxWidth: '500px',
                margin: '0 auto 24px',
                lineHeight: '1.6',
              }}
            >
              {term
                ? `We couldn't find any matches for "${term}". Please try a different search term or browse our categories.`
                : 'Use the search box above to find products, articles, and more.'}
            </p>
            <Link
              to="/collections/all"
              style={{
                display: 'inline-block',
                backgroundColor: '#3D8BFF',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: '500',
              }}
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <SearchResults result={result} term={term}>
            {({articles, pages, products, term}: any) => (
              <div>
                {/* Products Section */}
                {products.length > 0 && (
                  <div style={{marginBottom: '48px'}}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#2B2B2B',
                          margin: 0,
                        }}
                      >
                        Products
                      </h2>
                      <span
                        style={{
                          marginLeft: '12px',
                          backgroundColor: '#F8F9FA',
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '14px',
                          color: '#2B2B2B',
                        }}
                      >
                        {products.length}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '24px',
                      }}
                    >
                      <SearchResults.Products
                        products={products}
                        term={term}
                        // customRenderer={(product: any) => (
                        //   <Link
                        //     to={`/products/${product.handle}`}
                        //     style={{
                        //       display: 'block',
                        //       backgroundColor: 'white',
                        //       borderRadius: '8px',
                        //       overflow: 'hidden',
                        //       boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        //       textDecoration: 'none',
                        //       transition:
                        //         'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        //     }}
                        //     onMouseOver={(e) => {
                        //       e.currentTarget.style.transform =
                        //         'translateY(-4px)';
                        //       e.currentTarget.style.boxShadow =
                        //         '0 8px 16px rgba(0,0,0,0.08)';
                        //     }}
                        //     onMouseOut={(e) => {
                        //       e.currentTarget.style.transform = 'translateY(0)';
                        //       e.currentTarget.style.boxShadow =
                        //         '0 2px 8px rgba(0,0,0,0.05)';
                        //     }}
                        //   >
                        //     {product.selectedOrFirstAvailableVariant?.image && (
                        //       <div
                        //         style={{
                        //           paddingBottom: '100%',
                        //           position: 'relative',
                        //           backgroundColor: '#F8F9FA',
                        //         }}
                        //       >
                        //         <img
                        //           src={
                        //             product.selectedOrFirstAvailableVariant
                        //               .image.url
                        //           }
                        //           alt={
                        //             product.selectedOrFirstAvailableVariant
                        //               .image.altText || product.title
                        //           }
                        //           style={{
                        //             position: 'absolute',
                        //             top: 0,
                        //             left: 0,
                        //             width: '100%',
                        //             height: '100%',
                        //             objectFit: 'cover',
                        //           }}
                        //         />
                        //       </div>
                        //     )}
                        //     <div style={{padding: '16px'}}>
                        //       <p
                        //         style={{
                        //           fontSize: '14px',
                        //           color: '#71C3FF',
                        //           marginBottom: '4px',
                        //         }}
                        //       >
                        //         {product.vendor}
                        //       </p>
                        //       <h3
                        //         style={{
                        //           fontSize: '16px',
                        //           fontWeight: '600',
                        //           color: '#2B2B2B',
                        //           marginBottom: '8px',
                        //           minHeight: '40px',
                        //         }}
                        //       >
                        //         {product.title}
                        //       </h3>
                        //       {product.selectedOrFirstAvailableVariant
                        //         ?.price && (
                        //         <p
                        //           style={{
                        //             fontSize: '16px',
                        //             fontWeight: '700',
                        //             color: '#2B2B2B',
                        //             margin: 0,
                        //           }}
                        //         >
                        //           {new Intl.NumberFormat('en-US', {
                        //             style: 'currency',
                        //             currency:
                        //               product.selectedOrFirstAvailableVariant
                        //                 .price.currencyCode,
                        //           }).format(
                        //             parseFloat(
                        //               product.selectedOrFirstAvailableVariant
                        //                 .price.amount,
                        //             ),
                        //           )}
                        //         </p>
                        //       )}
                        //     </div>
                        //   </Link>
                        // )}
                      />
                    </div>
                  </div>
                )}

                {/* Articles and Pages Section */}
                {(articles.length > 0 || pages.length > 0) && (
                  <div style={{marginBottom: '48px'}}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '24px',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#2B2B2B',
                          margin: 0,
                        }}
                      >
                        Pages & Articles
                      </h2>
                      <span
                        style={{
                          marginLeft: '12px',
                          backgroundColor: '#F8F9FA',
                          borderRadius: '20px',
                          padding: '4px 12px',
                          fontSize: '14px',
                          color: '#2B2B2B',
                        }}
                      >
                        {articles.length + pages.length}
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        padding: '16px',
                      }}
                    >
                      {/* Pages */}
                      {pages.length > 0 && (
                        <div
                          style={{
                            marginBottom:
                              pages.length > 0 && articles.length > 0
                                ? '24px'
                                : 0,
                          }}
                        >
                          <SearchResults.Pages
                            pages={pages}
                            term={term}
                            // customRenderer={(page) => (
                            //   <Link
                            //     to={`/pages/${page.handle}`}
                            //     style={{
                            //       display: 'block',
                            //       padding: '16px',
                            //       borderBottom: '1px solid #EAEAEA',
                            //       textDecoration: 'none',
                            //       color: '#2B2B2B',
                            //       transition: 'background-color 0.2s ease',
                            //     }}
                            //     onMouseOver={(e) => {
                            //       e.currentTarget.style.backgroundColor =
                            //         '#F8F9FA';
                            //     }}
                            //     onMouseOut={(e) => {
                            //       e.currentTarget.style.backgroundColor =
                            //         'transparent';
                            //     }}
                            //   >
                            //     <div
                            //       style={{
                            //         display: 'flex',
                            //         alignItems: 'center',
                            //       }}
                            //     >
                            //       <span
                            //         style={{
                            //           fontSize: '20px',
                            //           marginRight: '16px',
                            //           color: '#3D8BFF',
                            //         }}
                            //       >
                            //         📄
                            //       </span>
                            //       <div>
                            //         <h3
                            //           style={{
                            //             fontSize: '16px',
                            //             fontWeight: '600',
                            //             marginBottom: '4px',
                            //           }}
                            //         >
                            //           {page.title}
                            //         </h3>
                            //         <p
                            //           style={{
                            //             fontSize: '14px',
                            //             margin: 0,
                            //             color: '#71C3FF',
                            //           }}
                            //         >
                            //           Page
                            //         </p>
                            //       </div>
                            //     </div>
                            //   </Link>
                            // )}
                          />
                        </div>
                      )}

                      {/* Articles */}
                      {articles.length > 0 && (
                        <div>
                          <SearchResults.Articles
                            articles={articles}
                            term={term}
                            // customRenderer={(article: any) => (
                            //   <Link
                            //     to={`/blogs/${article.blog?.handle}/${article.handle}`}
                            //     style={{
                            //       display: 'block',
                            //       padding: '16px',
                            //       borderBottom: '1px solid #EAEAEA',
                            //       textDecoration: 'none',
                            //       color: '#2B2B2B',
                            //       transition: 'background-color 0.2s ease',
                            //     }}
                            //     onMouseOver={(e) => {
                            //       e.currentTarget.style.backgroundColor =
                            //         '#F8F9FA';
                            //     }}
                            //     onMouseOut={(e) => {
                            //       e.currentTarget.style.backgroundColor =
                            //         'transparent';
                            //     }}
                            //   >
                            //     <div
                            //       style={{
                            //         display: 'flex',
                            //         alignItems: 'center',
                            //       }}
                            //     >
                            //       <span
                            //         style={{
                            //           fontSize: '20px',
                            //           marginRight: '16px',
                            //           color: '#3D8BFF',
                            //         }}
                            //       >
                            //         📝
                            //       </span>
                            //       <div>
                            //         <h3
                            //           style={{
                            //             fontSize: '16px',
                            //             fontWeight: '600',
                            //             marginBottom: '4px',
                            //           }}
                            //         >
                            //           {article.title}
                            //         </h3>
                            //         <p
                            //           style={{
                            //             fontSize: '14px',
                            //             margin: 0,
                            //             color: '#71C3FF',
                            //           }}
                            //         >
                            //           Article
                            //         </p>
                            //       </div>
                            //     </div>
                            //   </Link>
                            // )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </SearchResults>
        )}
      </div>
      <Analytics.SearchView data={{searchTerm: term, searchResults: result}} />
    </div>
  );
}

/**
 * Regular search query and fragments
 * (adjust as needed)
 */
const SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment SearchProduct on Product {
    __typename
    handle
    id
    publishedAt
    title
    trackingParameters
    vendor
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
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
        handle
        title
      }
    }
  }
` as const;

const SEARCH_PAGE_FRAGMENT = `#graphql
  fragment SearchPage on Page {
     __typename
     handle
    id
    title
    trackingParameters
  }
` as const;

const SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment SearchArticle on Article {
    __typename
    handle
    id
    title
    trackingParameters
    blog {
      handle
    }
  }
` as const;

const PAGE_INFO_FRAGMENT = `#graphql
  fragment PageInfoFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/search
export const SEARCH_QUERY = `#graphql
  query RegularSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $term: String!
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    articles: search(
      query: $term,
      types: [ARTICLE],
      first: $first,
    ) {
      nodes {
        ...on Article {
          ...SearchArticle
        }
      }
    }
    pages: search(
      query: $term,
      types: [PAGE],
      first: $first,
    ) {
      nodes {
        ...on Page {
          ...SearchPage
        }
      }
    }
    products: search(
      after: $endCursor,
      before: $startCursor,
      first: $first,
      last: $last,
      query: $term,
      sortKey: RELEVANCE,
      types: [PRODUCT],
      unavailableProducts: HIDE,
    ) {
      nodes {
        ...on Product {
          ...SearchProduct
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  ${SEARCH_PRODUCT_FRAGMENT}
  ${SEARCH_PAGE_FRAGMENT}
  ${SEARCH_ARTICLE_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
` as const;

/**
 * Regular search fetcher
 */
async function regularSearch({
  request,
  context,
}: Pick<
  LoaderFunctionArgs,
  'request' | 'context'
>): Promise<RegularSearchReturn> {
  const {storefront} = context;
  const url = new URL(request.url);
  const variables = getPaginationVariables(request, {pageBy: 8});
  const term = String(url.searchParams.get('q') || '');

  // Search articles, pages, and products for the `q` term
  const {errors, ...items} = await storefront.query(SEARCH_QUERY, {
    variables: {...variables, term},
  });

  if (!items) {
    throw new Error('No search data returned from Shopify API');
  }

  const total: any = Object.values(items).reduce(
    (acc: any, {nodes}: any) => acc + nodes.length,
    0,
  );

  const error = errors
    ? errors.map(({message}: any) => message).join(', ')
    : undefined;

  return {type: 'regular', term, error, result: {total, items}};
}

/**
 * Predictive search query and fragments
 * (adjust as needed)
 */
const PREDICTIVE_SEARCH_ARTICLE_FRAGMENT = `#graphql
  fragment PredictiveArticle on Article {
    __typename
    id
    title
    handle
    blog {
      handle
    }
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_COLLECTION_FRAGMENT = `#graphql
  fragment PredictiveCollection on Collection {
    __typename
    id
    title
    handle
    image {
      url
      altText
      width
      height
    }
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PAGE_FRAGMENT = `#graphql
  fragment PredictivePage on Page {
    __typename
    id
    title
    handle
    trackingParameters
  }
` as const;

const PREDICTIVE_SEARCH_PRODUCT_FRAGMENT = `#graphql
  fragment PredictiveProduct on Product {
    __typename
    id
    title
    handle
    trackingParameters
    selectedOrFirstAvailableVariant(
      selectedOptions: []
      ignoreUnknownOptions: true
      caseInsensitiveMatch: true
    ) {
      id
      image {
        url
        altText
        width
        height
      }
      price {
        amount
        currencyCode
      }
    }
  }
` as const;

const PREDICTIVE_SEARCH_QUERY_FRAGMENT = `#graphql
  fragment PredictiveQuery on SearchQuerySuggestion {
    __typename
    text
    styledText
    trackingParameters
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/queries/predictiveSearch
const PREDICTIVE_SEARCH_QUERY = `#graphql
  query PredictiveSearch(
    $country: CountryCode
    $language: LanguageCode
    $limit: Int!
    $limitScope: PredictiveSearchLimitScope!
    $term: String!
    $types: [PredictiveSearchType!]
  ) @inContext(country: $country, language: $language) {
    predictiveSearch(
      limit: $limit,
      limitScope: $limitScope,
      query: $term,
      types: $types,
    ) {
      articles {
        ...PredictiveArticle
      }
      collections {
        ...PredictiveCollection
      }
      pages {
        ...PredictivePage
      }
      products {
        ...PredictiveProduct
      }
      queries {
        ...PredictiveQuery
      }
    }
  }
  ${PREDICTIVE_SEARCH_ARTICLE_FRAGMENT}
  ${PREDICTIVE_SEARCH_COLLECTION_FRAGMENT}
  ${PREDICTIVE_SEARCH_PAGE_FRAGMENT}
  ${PREDICTIVE_SEARCH_PRODUCT_FRAGMENT}
  ${PREDICTIVE_SEARCH_QUERY_FRAGMENT}
` as const;

/**
 * Predictive search fetcher
 */
async function predictiveSearch({
  request,
  context,
}: Pick<
  ActionFunctionArgs,
  'request' | 'context'
>): Promise<PredictiveSearchReturn> {
  const {storefront} = context;
  const url = new URL(request.url);
  const term = String(url.searchParams.get('q') || '').trim();
  const limit = Number(url.searchParams.get('limit') || 10);
  const type = 'predictive';

  if (!term) return {type, term, result: getEmptyPredictiveSearchResult()};

  // Predictively search articles, collections, pages, products, and queries (suggestions)
  const {predictiveSearch: items, errors} = await storefront.query(
    PREDICTIVE_SEARCH_QUERY,
    {
      variables: {
        // customize search options as needed
        limit,
        limitScope: 'EACH',
        term,
      },
    },
  );

  if (errors) {
    throw new Error(
      `Shopify API errors: ${errors.map(({message}) => message).join(', ')}`,
    );
  }

  if (!items) {
    throw new Error('No predictive search data returned from Shopify API');
  }

  const total = Object.values(items).reduce(
    (acc, item) => acc + item.length,
    0,
  );

  return {type, term, result: {items, total}};
}
