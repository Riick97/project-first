import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, Form, useNavigate, useLocation} from '@remix-run/react';
import {Image, Money, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {useState, useEffect, useRef} from 'react';
import { FiltersDesktop } from './catalog';

export const meta = ({data}: any) => {
  return [{title: `Neovibe | ${data?.collection?.title || 'Collection'}`}];
};

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const sort = searchParams.get('sort') || 'BEST_SELLING';
  const colorFilter = searchParams.get('color');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  if (!handle) {
    throw new Response('No collection handle provided', {status: 404});
  }

  // Prepare filter conditions for GraphQL
  const filters = [];
  if (colorFilter) {
    filters.push({
      productMetafield: {
        namespace: "custom",
        key: "color",
        value: colorFilter
      }
    });
  }
  
  if (minPrice || maxPrice) {
    const priceFilter: any = {price: {}};
    if (minPrice) priceFilter.price.min = parseFloat(minPrice);
    if (maxPrice) priceFilter.price.max = parseFloat(maxPrice);
    filters.push(priceFilter);
  }

  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      ...paginationVariables,
      filters: filters.length > 0 ? filters : null,
      sortKey: sort as any,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!collection) {
    throw new Response('Collection not found', {status: 404});
  }

  // For demo purposes, let's add some mock colors
  const availableColors = [
    { value: 'blue', label: 'Blue', hex: '#00E0FF' },
    { value: 'purple', label: 'Purple', hex: '#C084FC' },
    { value: 'red', label: 'Red', hex: '#EF4444' },
    { value: 'green', label: 'Green', hex: '#10B981' },
    { value: 'pink', label: 'Pink', hex: '#EC4899' },
    { value: 'orange', label: 'Orange', hex: '#F97316' },
    { value: 'white', label: 'White', hex: '#F9F9F9' },
    { value: 'multi', label: 'Multicolor', hex: 'linear-gradient(90deg, #00E0FF, #C084FC, #EF4444)' },
  ];

  // Get featured products from this collection
  let featuredProducts = collection.products.nodes.filter(
    (product: any) =>
      product.tags &&
      product.tags.some(
        (tag: any) =>
          tag.toLowerCase() === 'featured' ||
          tag.toLowerCase() === 'bestseller',
      ),
  );
  
  // If no products are tagged as featured, just take the first 3
  if (featuredProducts.length === 0) {
    featuredProducts = collection.products.nodes.slice(0, 3);
  } else if (featuredProducts.length > 3) {
    featuredProducts = featuredProducts.slice(0, 3);
  }

  return json({
    collection,
    featuredProducts,
    availableColors,
    appliedFilters: {
      color: colorFilter,
      minPrice,
      maxPrice,
      sort
    }
  });
}

export default function Collection() {
  const {collection, featuredProducts, productTypes, availableColors, appliedFilters}: any =
    useLoaderData();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  
  const sortOptions = [
    { value: 'BEST_SELLING', label: 'Best Selling' },
    { value: 'PRICE', label: 'Price: Low to High' },
    { value: 'PRICE_DESC', label: 'Price: High to Low' },
    { value: 'TITLE', label: 'Alphabetically: A-Z' },
    { value: 'TITLE_DESC', label: 'Alphabetically: Z-A' },
    { value: 'CREATED_AT', label: 'Date: Old to New' },
    { value: 'CREATED_DESC', label: 'Date: New to Old' },
  ];

  // Get the applied filter count for mobile button label
  const getAppliedFilterCount = () => {
    let count = 0;
    if (appliedFilters.color) count++;
    if (appliedFilters.minPrice || appliedFilters.maxPrice) count++;
    return count;
  };

  const handleSortChange = (e: any) => {
    const params = new URLSearchParams(location.search);
    params.set('sort', e.target.value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const params = new URLSearchParams();

    // Append current sort value if it exists
    if (appliedFilters.sort) {
      params.set('sort', appliedFilters.sort);
    }

    // Add filter values
    const color: any = formData.get('color');
    const minPrice: any = formData.get('minPrice');
    const maxPrice: any = formData.get('maxPrice');

    if (color) params.set('color', color);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate(`${location.pathname}?${params.toString()}`);
    setMobileFiltersOpen(false);
  };

  const resetFilters = () => {
    const params = new URLSearchParams();
    if (appliedFilters.sort) {
      params.set('sort', appliedFilters.sort);
    }
    navigate(`${location.pathname}?${params.toString()}`);
    setMobileFiltersOpen(false);
  };

  return (
    <div className="bg-[#121212] text-[#F9F9F9] min-h-screen">
      {/* Collection Hero */}
      <div className="relative">
        <div className="h-72 md:h-96 overflow-hidden relative">
          {collection.image ? (
            <img
              src={collection.image.url}
              alt={collection.image.altText || collection.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#00E0FF] to-[#C084FC]"></div>
          )}
          <div className="absolute inset-0 bg-[#121212] opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-3xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                  {collection.description}
                </p>
              )}
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
          <Link to="/collections" className="hover:text-[#00E0FF]">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#F9F9F9]">{collection.title}</span>
        </div>
      </div>

      {/* Featured Products (if any) */}
      {featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product: any) => {
              const firstVariant = product.variants.nodes[0];
              const selectedVariant =
                product.selectedOrFirstAvailableVariant || firstVariant;

              return (
                <div
                  key={product.id}
                  className="group relative bg-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#00E0FF]/10"
                >
                  <Link to={`/products/${product.handle}`} className="block">
                    <div className="relative aspect-square overflow-hidden">
                      {product.featuredImage ? (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
                          <span className="text-lg text-[#444444]">
                            {product.title}
                          </span>
                        </div>
                      )}

                      {/* Sale badge */}
                      {selectedVariant && selectedVariant.compareAtPrice && (
                        <div className="absolute top-2 right-2 bg-[#00E0FF] text-black text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </div>
                      )}

                      {/* Featured badge */}
                      <div className="absolute top-2 left-2 bg-[#C084FC] text-black text-xs font-bold px-2 py-1 rounded">
                        FEATURED
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-1 group-hover:text-[#00E0FF] transition-colors">
                        {product.title}
                      </h3>

                      {/* Price display */}
                      {selectedVariant && (
                        <div className="flex items-baseline mb-2">
                          <span className="text-lg font-bold">
                            <Money data={selectedVariant.price} />
                          </span>

                          {selectedVariant.compareAtPrice && (
                            <span className="ml-2 text-sm text-[#BBBBBB] line-through">
                              <Money data={selectedVariant.compareAtPrice} />
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Quick add button */}
                  {/* <div className="px-4 pb-4">
                    <button className="w-full py-2 bg-[#2A2A2A] text-[#F9F9F9] rounded-lg hover:bg-[#00E0FF] hover:text-black transition-colors duration-300">
                      Quick Add
                    </button>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <FiltersDesktop
            formRef={formRef}
            handleFilterSubmit={handleFilterSubmit}
            productTypes={productTypes}
            appliedFilters={appliedFilters}
            availableColors={availableColors}
            resetFilters={resetFilters}
          />

          {/* Products Section */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden px-4 py-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-lg flex items-center transition-colors"
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filters
                {getAppliedFilterCount() > 0 && (
                  <span className="ml-2 bg-[#00E0FF] text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {getAppliedFilterCount()}
                  </span>
                )}
              </button>

              {/* Product Count */}
              <p className="text-[#BBBBBB]">
                {collection.products.nodes.length} products
              </p>

              {/* Sort Dropdown */}
              <div className="flex items-center ml-auto">
                <label htmlFor="sort-by" className="mr-2 text-[#BBBBBB]">
                  Sort by:
                </label>
                <select
                  id="sort-by"
                  value={appliedFilters.sort || 'BEST_SELLING'}
                  onChange={handleSortChange}
                  className="bg-[#1A1A1A] border border-[#333333] text-[#F9F9F9] rounded-lg p-2 focus:outline-none focus:border-[#00E0FF]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Applied Filters Pills */}
            {getAppliedFilterCount() > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {appliedFilters.color && (
                  <div className="flex items-center bg-[#1A1A1A] px-3 py-1 rounded-full text-sm">
                    <span>
                      Color:{' '}
                      {
                        availableColors.find(
                          (c: any) => c.value === appliedFilters.color,
                        )?.label
                      }
                    </span>
                    <Link
                      to={`?${new URLSearchParams({
                        ...(appliedFilters.minPrice && {
                          minPrice: appliedFilters.minPrice,
                        }),
                        ...(appliedFilters.maxPrice && {
                          maxPrice: appliedFilters.maxPrice,
                        }),
                        ...(appliedFilters.sort && {sort: appliedFilters.sort}),
                      }).toString()}`}
                      className="ml-2 text-[#00E0FF]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </Link>
                  </div>
                )}

                {(appliedFilters.minPrice || appliedFilters.maxPrice) && (
                  <div className="flex items-center bg-[#1A1A1A] px-3 py-1 rounded-full text-sm">
                    <span>
                      Price:
                      {appliedFilters.minPrice
                        ? ` $${appliedFilters.minPrice}`
                        : ' $0'}
                      {' - '}
                      {appliedFilters.maxPrice
                        ? `$${appliedFilters.maxPrice}`
                        : 'Any'}
                    </span>
                    <Link
                      to={`?${new URLSearchParams({
                        ...(appliedFilters.color && {
                          color: appliedFilters.color,
                        }),
                        ...(appliedFilters.sort && {sort: appliedFilters.sort}),
                      }).toString()}`}
                      className="ml-2 text-[#00E0FF]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </Link>
                  </div>
                )}

                <button
                  onClick={resetFilters}
                  className="text-[#00E0FF] text-sm hover:underline flex items-center"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Product Grid */}
            {collection.products.nodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.products.nodes.map((product: any) => {
                  const firstVariant = product.variants.nodes[0];
                  const selectedVariant =
                    product.selectedOrFirstAvailableVariant || firstVariant;

                  return (
                    <div
                      key={product.id}
                      className="group bg-[#1A1A1A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#00E0FF]/10"
                    >
                      <Link
                        to={`/products/${product.handle}`}
                        className="block"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          {product.featuredImage ? (
                            <img
                              src={product.featuredImage.url}
                              alt={
                                product.featuredImage.altText || product.title
                              }
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
                              <span className="text-lg text-[#444444]">
                                {product.title}
                              </span>
                            </div>
                          )}

                          {/* Sale badge */}
                          {selectedVariant &&
                            selectedVariant.compareAtPrice && (
                              <div className="absolute top-2 right-2 bg-[#00E0FF] text-black text-xs font-bold px-2 py-1 rounded">
                                SALE
                              </div>
                            )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-medium mb-1 group-hover:text-[#00E0FF] transition-colors">
                            {product.title}
                          </h3>

                          {/* Price display */}
                          {selectedVariant && (
                            <div className="flex items-baseline mb-2">
                              <span className="text-lg font-bold">
                                <Money data={selectedVariant.price} />
                              </span>

                              {selectedVariant.compareAtPrice && (
                                <span className="ml-2 text-sm text-[#BBBBBB] line-through">
                                  <Money
                                    data={selectedVariant.compareAtPrice}
                                  />
                                </span>
                              )}
                            </div>
                          )}

                          {/* Tags if available */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.tags
                                .slice(0, 2)
                                .map((tag: any, index: any) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-[#2A2A2A] px-2 py-0.5 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Quick add button */}
                      {/* <div className="px-4 pb-4">
                        <button className="w-full py-2 bg-[#2A2A2A] text-[#F9F9F9] rounded-lg hover:bg-[#00E0FF] hover:text-black transition-colors duration-300">
                          Quick Add
                        </button>
                      </div> */}
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
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-[#BBBBBB] mb-4">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {/* {(collection.products.pageInfo.hasNextPage || collection.products.pageInfo.hasPreviousPage) && (
              <div className="flex justify-center mt-12">
                <Pagination connection={collection.products} />
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>

          {/* Filter Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#121212] shadow-xl overflow-y-auto z-50 transform transition-transform">
            <div className="p-4 border-b border-[#333333]">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-[#BBBBBB] hover:text-[#F9F9F9]"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4">
              <Form ref={formRef} method="get" onSubmit={handleFilterSubmit}>
                {/* Color Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color: any) => (
                      <label
                        key={color.value}
                        className={`relative w-8 h-8 rounded-full cursor-pointer p-0.5 ${
                          appliedFilters.color === color.value
                            ? 'ring-2 ring-[#00E0FF]'
                            : ''
                        }`}
                        title={color.label}
                      >
                        <input
                          type="radio"
                          name="color"
                          value={color.value}
                          defaultChecked={appliedFilters.color === color.value}
                          className="sr-only"
                        />
                        <span
                          className="block w-full h-full rounded-full"
                          style={{
                            background: color.hex,
                            border:
                              color.value === 'white'
                                ? '1px solid #333333'
                                : 'none',
                          }}
                        ></span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="flex">
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Price Range</h4>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          name="minPrice"
                          placeholder="Min"
                          defaultValue={appliedFilters.minPrice || ''}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg p-2 text-[#F9F9F9] placeholder-[#777777] focus:outline-none focus:border-[#00E0FF]"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          name="maxPrice"
                          placeholder="Max"
                          defaultValue={appliedFilters.maxPrice || ''}
                          className="w-full bg-[#2A2A2A] border border-[#333333] rounded-lg p-2 text-[#F9F9F9] placeholder-[#777777] focus:outline-none focus:border-[#00E0FF]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 mt-8">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#00E0FF] hover:bg-[#00C0E0] text-black font-medium rounded-lg transition-all duration-300"
                      >
                        Apply Filters
                      </button>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="px-4 py-2 bg-transparent border border-[#333333] text-[#F9F9F9] hover:bg-[#1F1F1F] rounded-lg transition-all duration-300"
                      >
                        Reset Filters
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileFiltersOpen(false)}
                        className="px-4 py-2 bg-transparent text-[#BBBBBB] hover:text-[#F9F9F9] rounded-lg transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}

      {/* More From This Collection Banner */}
      {/* <div className="bg-[#1A1A1A] py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to Use {collection.title}
            </h2>
            <p className="text-[#BBBBBB]">
              Get inspired by these creative ways our customers are using the
              products from this collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'For Bedrooms',
                desc: 'Create a relaxing atmosphere for better sleep',
                image: 'Hero2.png',
              },
              {
                title: 'For Content Creation',
                desc: 'Level up your social media presence',
                image: 'Hero2.png',
              },
              {
                title: 'For Home Theater',
                desc: 'Enhance your movie and gaming experience',
                image: 'Hero2.png',
              },
              {
                title: 'For Parties',
                desc: 'Set the perfect vibe for any celebration',
                image: 'Hero2.png',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#121212] rounded-xl overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={`/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-[#BBBBBB] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* FAQs for this Collection */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              How do I set up my {collection.title.toLowerCase()}?
            </h3>
            <p className="text-[#BBBBBB]">
              Our products are designed for easy installation. Most items come
              with a quick start guide, but you can also find detailed setup
              videos in our app or on our YouTube channel. If you're having any
              issues, our support team is just a click away!
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              Can I control multiple products together?
            </h3>
            <p className="text-[#BBBBBB]">
              Absolutely! All Neovibe products can be grouped and controlled
              together through our app. Create zones for different rooms or sync
              everything for a whole-home lighting experience. You can even
              create custom scenes that activate multiple products with a single
              tap.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              What's the power consumption like?
            </h3>
            <p className="text-[#BBBBBB]">
              Our products are designed to be energy-efficient. Most of our
              LED-based lighting uses up to 80% less energy than traditional
              bulbs. The exact consumption varies by product, but you can find
              detailed specifications on each product page. Many products also
              include energy-saving features like timers and scheduling.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              Do you offer warranty for these products?
            </h3>
            <p className="text-[#BBBBBB]">
              Yes, all Neovibe products come with a 2-year warranty. This covers
              any manufacturing defects or failures under normal use. We also
              offer a 30-day satisfaction guarantee, so if you're not completely
              happy with your purchase, you can return it for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      {/* <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-lg overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={`/api/placeholder/200/200?text=Product ${index}`}
                  alt={`Recently viewed product ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium truncate">
                  Product Name {index}
                </h3>
                <p className="text-[#00E0FF] text-sm font-bold">$59.99</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Join the Glow Gang
          </h2>
          <p className="text-black opacity-80 mb-8">
            Subscribe to our newsletter for exclusive deals, lighting
            inspiration, and first access to new products.
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

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
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
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey
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
  }
`;