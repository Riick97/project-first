import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Link,
  Form,
  useNavigate,
  useLocation,
} from '@remix-run/react';
import {
  Image,
  Money,
  Pagination,
  getPaginationVariables,
  // type ProductSortKeys, (Removed as it's not exported)
} from '@shopify/hydrogen';
import {useState, useEffect, useRef} from 'react';

export const meta = () => {
  return [{title: 'Neovibe | Shop All Products'}];
};

export async function loader({context, request}: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');
  const sort = searchParams.get('sort') || 'BEST_SELLING';
  const colorFilter = searchParams.get('color');
  const typeFilter = searchParams.get('type');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const paginationVariables = getPaginationVariables(request, {
    pageBy: 12,
  });

  // Prepare filter conditions for GraphQL
  const filters = [];
  if (colorFilter) {
    filters.push({
      productMetafield: {
        namespace: 'custom',
        key: 'color',
        value: colorFilter,
      },
    });
  }

  if (typeFilter) {
    filters.push({
      productType: typeFilter,
    });
  }

  if (minPrice || maxPrice) {
    const priceFilter: any = {price: {}};
    if (minPrice) priceFilter.price.min = parseFloat(minPrice);
    if (maxPrice) priceFilter.price.max = parseFloat(maxPrice);
    filters.push(priceFilter);
  }

  const {products} = await context.storefront.query(PRODUCTS_QUERY, {
    variables: {
      ...paginationVariables,
      // filters: filters.length > 0 ? filters : null,
      sortKey: sort as any, // Updated to use string type
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // Fetch available product types for filter
  const {productTypes} = await context.storefront.query(PRODUCT_TYPES_QUERY, {
    variables: {
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // For demo purposes, let's add some mock colors
  const availableColors = [
    {value: 'blue', label: 'Blue', hex: '#00E0FF'},
    {value: 'purple', label: 'Purple', hex: '#C084FC'},
    {value: 'red', label: 'Red', hex: '#EF4444'},
    {value: 'green', label: 'Green', hex: '#10B981'},
    {value: 'pink', label: 'Pink', hex: '#EC4899'},
    {value: 'orange', label: 'Orange', hex: '#F97316'},
    {value: 'white', label: 'White', hex: '#F9F9F9'},
    {
      value: 'multi',
      label: 'Multicolor',
      hex: 'linear-gradient(90deg, #00E0FF, #C084FC, #EF4444)',
    },
  ];

  return json({
    products,
    productTypes: productTypes?.nodes,
    availableColors,
    appliedFilters: {
      color: colorFilter,
      type: typeFilter,
      minPrice,
      maxPrice,
      sort,
    },
  });
}

export default function Catalog() {
  const {products, productTypes, availableColors, appliedFilters} =
    useLoaderData<typeof loader>();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLFormElement>(null);

  const sortOptions = [
    {value: 'BEST_SELLING', label: 'Best Selling'},
    {value: 'PRICE', label: 'Price: Low to High'},
    {value: 'PRICE_DESC', label: 'Price: High to Low'},
    {value: 'TITLE', label: 'Alphabetically: A-Z'},
    {value: 'TITLE_DESC', label: 'Alphabetically: Z-A'},
    {value: 'CREATED_AT', label: 'Date: Old to New'},
    {value: 'CREATED_DESC', label: 'Date: New to Old'},
  ];

  // Get the applied filter count for mobile button label
  const getAppliedFilterCount = () => {
    let count = 0;
    if (appliedFilters.color) count++;
    if (appliedFilters.type) count++;
    if (appliedFilters.minPrice || appliedFilters.maxPrice) count++;
    return count;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(location.search);
    params.set('sort', e.target.value);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const params = new URLSearchParams();

    // Append current sort value if it exists
    if (appliedFilters.sort) {
      params.set('sort', appliedFilters.sort);
    }

    // Add filter values
    const color = formData.get('color');
    const type = formData.get('type');
    const minPrice = formData.get('minPrice');
    const maxPrice = formData.get('maxPrice');

    if (color) params.set('color', color as string);
    if (type) params.set('type', type as string);
    if (minPrice) params.set('minPrice', minPrice as string);
    if (maxPrice) params.set('maxPrice', maxPrice as string);

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
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Shop All Products
        </h1>
        <div className="flex items-center text-[#BBBBBB]">
          <Link to="/" className="hover:text-[#00E0FF]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>All Products</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
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
              <p className="text-[#BBBBBB]">{products.nodes.length} products</p>

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
                          (c) => c.value === appliedFilters.color,
                        )?.label
                      }
                    </span>
                    <Link
                      to={`?${new URLSearchParams({
                        ...(appliedFilters.type && {type: appliedFilters.type}),
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

                {appliedFilters.type && (
                  <div className="flex items-center bg-[#1A1A1A] px-3 py-1 rounded-full text-sm">
                    <span>Type: {appliedFilters.type}</span>
                    <Link
                      to={`?${new URLSearchParams({
                        ...(appliedFilters.color && {
                          color: appliedFilters.color,
                        }),
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
                        ...(appliedFilters.type && {type: appliedFilters.type}),
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
            {products.nodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.nodes.map((product: any) => {
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
            {/* {(products.pageInfo.hasNextPage ||
              products.pageInfo.hasPreviousPage) && (
              <div className="flex justify-center mt-12">
                <Pagination connection={products} />
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
                {/* Product Type Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Product Type</h4>
                  <div className="space-y-2">
                    {productTypes.map((type: any) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          defaultChecked={appliedFilters.type === type}
                          className="form-radio text-[#00E0FF] rounded-full focus:ring-[#00E0FF] focus:ring-offset-[#1A1A1A]"
                        />
                        <span className="ml-2 text-[#F9F9F9]">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
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
              </Form>
            </div>
          </div>
        </div>
      )}

      {/* Product Suggestions */}
      {/* <div className="bg-[#1A1A1A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/collections/galaxy-projectors" className="group">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
                <img
                  src="/api/placeholder/400/400"
                  alt="Galaxy Projectors"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-bold text-center">Galaxy Projectors</h3>
                </div>
              </div>
            </Link>

            <Link to="/collections/led-strips" className="group">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
                <img
                  src="/api/placeholder/400/400"
                  alt="LED Strips"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-bold text-center">LED Strips</h3>
                </div>
              </div>
            </Link>

            <Link to="/collections/ambient-orbs" className="group">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
                <img
                  src="/api/placeholder/400/400"
                  alt="Ambient Orbs"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-bold text-center">Ambient Orbs</h3>
                </div>
              </div>
            </Link>

            <Link to="/collections/smart-panels" className="group">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10"></div>
                <img
                  src="/api/placeholder/400/400"
                  alt="Smart Panels"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-bold text-center">Smart Panels</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              How do I connect my lights to the app?
            </h3>
            <p className="text-[#BBBBBB]">
              Download the Neovibe app from the App Store or Google Play. Once
              installed, create an account and follow the in-app instructions to
              connect your device via Bluetooth or WiFi. Most products require
              you to put them in pairing mode by holding the power button for 5
              seconds.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              Are your lights compatible with smart home systems?
            </h3>
            <p className="text-[#BBBBBB]">
              Yes! Most of our products are compatible with Google Home, Amazon
              Alexa, and Apple HomeKit. Check the individual product
              specifications for compatibility details. Our LED strips and smart
              panels offer the most integration options.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              What's your shipping and return policy?
            </h3>
            <p className="text-[#BBBBBB]">
              We offer free shipping on orders over $50. Standard shipping takes
              3-5 business days, while express takes 1-2 days. Not vibing with
              your purchase? Return it within 30 days for a full refund, no
              questions asked. We just ask that you keep the original packaging.
            </p>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl">
            <h3 className="text-lg font-medium mb-3 text-[#00E0FF]">
              Do you offer installation services?
            </h3>
            <p className="text-[#BBBBBB]">
              All our products are designed for easy DIY installation. We
              provide detailed instructions and tutorial videos in our app and
              on our YouTube channel. For complex setups or custom
              installations, contact our customer support for recommendations on
              local installation partners.
            </p>
          </div>
        </div>
      </div>

      {/* Instagram Feed */}
      {/* <div className="bg-[#1A1A1A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold">@neovibe</h2>
          </div>

          <p className="text-center text-[#BBBBBB] max-w-2xl mx-auto mb-10">
            Tag us with #NeovibeGlow to be featured in our gallery and for a
            chance to win monthly giveaways
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden group"
              >
                <img
                  src={`/api/placeholder/300/300?text=Instagram ${index}`}
                  alt={`Instagram post ${index}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>
      </div> */}

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Get 10% Off Your First Order
          </h2>
          <p className="text-black opacity-80 mb-8">
            Sign up for our newsletter to receive exclusive deals, lighting
            inspiration, and first access to new drops.
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

export function FiltersDesktop({
  formRef,
  handleFilterSubmit,
  productTypes,
  appliedFilters,
  availableColors,
  resetFilters,
}: {
  formRef: any;
  handleFilterSubmit: any;
  productTypes: any;
  appliedFilters: any;
  availableColors: any;
  resetFilters: any;
}) {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <Form ref={formRef} method="get" onSubmit={handleFilterSubmit}>
        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Filters</h3>

          {/* Product Type Filter */}
          {/* <div className="mb-6">
            <h4 className="font-medium mb-3">Product Type</h4>
            <div className="space-y-2">
              {productTypes.map((type: any) => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    defaultChecked={appliedFilters.type === type}
                    className="form-radio text-[#00E0FF] rounded-full focus:ring-[#00E0FF] focus:ring-offset-[#1A1A1A]"
                  />
                  <span className="ml-2 text-[#F9F9F9]">{type}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Color Filter */}
          {/* <div className="mb-6">
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
                        color.value === 'white' ? '1px solid #333333' : 'none',
                    }}
                  ></span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Price Range Filter */}
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
          </div>
        </div>
      </Form>
    </div>
  );
}

const PRODUCTS_QUERY = `#graphql
  query Products(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String

    $sortKey: ProductSortKeys!
  ) @inContext(country: $country, language: $language) {
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,

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
`;

const PRODUCT_TYPES_QUERY = `#graphql
  query ProductTypes(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    productTypes(first: 10) {
      nodes
    }
  }
`;
