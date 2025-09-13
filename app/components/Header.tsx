import {MdOutlineEmail} from 'react-icons/md';

function ChevronIcon({direction = 'down'}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === 'up' ? 'rotate-180 transform' : ''}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Create an API route in your app/routes/api/collections.tsx to serve this data
export async function action() {
  return null;
}

import {Suspense, useState, useEffect, useRef} from 'react';
import {
  Await,
  NavLink,
  useAsyncValue,
  Link,
  useFetcher,
} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const collectionsFetcher = useFetcher();

  // Add scroll event listener to add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate if cart has free shipping
  const calculateFreeShipping = (cart: CartApiQueryFragment | null) => {
    const FREE_SHIPPING_THRESHOLD = 99; // $99 threshold
    if (!cart?.cost?.subtotalAmount?.amount)
      return {
        hasFreeshipping: false,
        amountLeft: FREE_SHIPPING_THRESHOLD,
      };

    const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
    const amountLeft = FREE_SHIPPING_THRESHOLD - subtotal;

    return {
      hasFreeshipping: amountLeft <= 0,
      amountLeft: Math.max(0, amountLeft),
    };
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#00E0FF] text-[#121212] py-2 text-center text-sm font-medium">
        <div className="container mx-auto px-4">
          30 DAY MONEY BACK GUARANTEE ● LIGHT THE FUTURE
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 bg-[#121212] transition-shadow duration-300 ${isScrolled ? 'shadow-md shadow-[#00E0FF]/20' : ''}`}
      >
        {/* Top Bar with Contact, Reviews and Account */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <a
                  href="tel:+18005555555"
                  className="hidden md:flex items-center text-sm text-gray-300 hover:text-[#00E0FF]"
                >
                  <EmailIcon />
                  <span className="ml-2">support@neovibe.com</span>
                </a>
                <div className="hidden md:flex items-center text-sm text-gray-300">
                  <StarRating rating={5} />
                  <span className="ml-2">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
              {false && (
                <div className="flex items-center space-x-4 text-sm">
                  <NavLink
                    prefetch="intent"
                    to="/account"
                    className={({isActive}) =>
                      `text-gray-300 hover:text-[#00E0FF] transition-colors ${isActive ? 'text-[#00E0FF]' : ''}`
                    }
                  >
                    <Suspense fallback={<span>Sign in</span>}>
                      <Await
                        resolve={isLoggedIn}
                        errorElement={<span>Sign in</span>}
                      >
                        {(isLoggedIn) => (
                          <span>{isLoggedIn ? 'My Account' : 'Sign in'}</span>
                        )}
                      </Await>
                    </Suspense>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink prefetch="intent" to="/" className="flex items-center">
              <div className="flex items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="18" cy="18" r="18" fill="#1E1E1E" />
                  <path
                    d="M18 7C14.7418 7 11.6164 8.26428 9.3017 10.5786C6.98705 12.8929 5.72222 16.0178 5.72222 19.2778C5.72222 22.5377 6.98705 25.6626 9.3017 27.9769C11.6164 30.2912 14.7418 31.5556 18 31.5556C21.2582 31.5556 24.3836 30.2912 26.6983 27.9769C29.0129 25.6626 30.2778 22.5377 30.2778 19.2778C30.2778 16.0178 29.0129 12.8929 26.6983 10.5786C24.3836 8.26428 21.2582 7 18 7Z"
                    stroke="#00E0FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.72222 19.2778H30.2778"
                    stroke="#00E0FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 7C15.3243 10.1485 13.8843 14.066 13.8889 18.1111C13.8843 22.1562 15.3243 26.0737 18 29.2222"
                    stroke="#C084FC"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 7C20.6757 10.1485 22.1157 14.066 22.1111 18.1111C22.1157 22.1562 20.6757 26.0737 18 29.2222"
                    stroke="#C084FC"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="ml-2 text-[#F9F9F9] text-xl font-bold">
                  Neovibe
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:block flex-1 mx-4">
              <HeaderMenu
                menu={menu}
                viewport="desktop"
                primaryDomainUrl={header.shop.primaryDomain.url}
                publicStoreDomain={publicStoreDomain}
                collections={[]}
                isLoadingCollections={collectionsFetcher.state !== 'idle'}
              />
            </div>

            {/* CTAs (Search, Cart, Mobile Menu) */}
            <div className="flex items-center space-x-4">
              {/* Add Search Button */}
              <button
                className="text-gray-300 hover:text-[#00E0FF] transition-colors"
                aria-label="Search"
                onClick={() => {}}
              >
                <SearchIcon />
              </button>

              <CartToggle cart={cart} />

              <HeaderMenuMobileToggle />
            </div>
          </div>
        </div>

        {/* Free Shipping Progress */}
        <Suspense fallback={<FreeShippingIndicator loading={true} />}>
          <Await resolve={cart}>
            {(resolvedCart) => (
              <FreeShippingIndicator
                shippingInfo={calculateFreeShipping(resolvedCart)}
                loading={false}
              />
            )}
          </Await>
        </Suspense>
      </header>
    </>
  );
}

export function HeaderMenu({
  menu,
  viewport,
  primaryDomainUrl,
  publicStoreDomain,
  collections = [],
  isLoadingCollections = false,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
  collections?: Array<{handle: string; title: string}>;
  isLoadingCollections?: boolean;
}) {
  const {close} = useAside();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Product categories dropdown
  const productCategories = [
    {id: 'catalog', name: 'Catalog', url: '/catalog'},
    // {id: 'room-vibes', name: 'Room Vibes', url: '/collections/room-vibes'},
    // {id: 'sleep-chill', name: 'Sleep & Chill', url: '/collections/sleep-chill'},
    // {
    //   id: 'productivity',
    //   name: 'Productivity Glow',
    //   url: '/collections/productivity-glow',
    // },
  ];

  // Customer service dropdown
  const customerServiceLinks = [
    {id: 'faq', name: 'FAQ', url: '/faq'},
    {id: 'contact', name: 'Contact Us', url: '/contact'},
    {id: 'about', name: 'About Us', url: '/about'},
    {id: 'policies', name: 'Policies', url: '/policies'},
  ];

  const handleDropdownToggle = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (viewport === 'mobile') {
    return (
      <nav className="mobile-menu py-2" role="navigation">
        <div className="px-4 pb-2 mb-2 border-b border-gray-800">
          <a
            href="tel:+18005555555"
            className="flex items-center text-gray-300 py-2"
          >
            <EmailIcon />
            <span className="ml-2">support@neovibe.com</span>
          </a>
        </div>

        <NavLink
          end
          onClick={close}
          prefetch="intent"
          className={({isActive}) =>
            `block py-2 px-4 font-medium ${isActive ? 'text-[#00E0FF]' : 'text-gray-300 hover:text-[#00E0FF]'}`
          }
          to="/"
        >
          Home
        </NavLink>

        {/* Products Dropdown */}
        <div className="py-2 px-4 dropdown-container">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-300 hover:text-[#00E0FF]"
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle('products');
            }}
          >
            <span>Shop</span>
            <ChevronIcon
              direction={openDropdown === 'products' ? 'up' : 'down'}
            />
          </button>
          {openDropdown === 'products' && (
            <div className="pl-4 mt-2 border-l-2 border-gray-800">
              {productCategories.map((category) => (
                <Link
                  key={category.id}
                  className="block py-2 text-gray-400 hover:text-[#00E0FF]"
                  to={category.url}
                  onClick={close}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Customer Service Dropdown */}
        <div className="py-2 px-4 dropdown-container">
          <button
            className="flex items-center justify-between w-full text-left font-medium text-gray-300 hover:text-[#00E0FF]"
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle('service');
            }}
          >
            <span>Customer Service</span>
            <ChevronIcon
              direction={openDropdown === 'service' ? 'up' : 'down'}
            />
          </button>
          {openDropdown === 'service' && (
            <div className="pl-4 mt-2 border-l-2 border-gray-800">
              {customerServiceLinks.map((link) => (
                <Link
                  key={link.id}
                  className="block py-2 text-gray-400 hover:text-[#00E0FF]"
                  to={link.url}
                  onClick={close}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-center" role="navigation">
      <div className="flex items-center space-x-1">
        <NavLink
          to="/"
          end
          className={({isActive}) =>
            `relative px-3 py-2 font-medium text-gray-300 hover:text-[#00E0FF] transition-colors ${
              isActive ? 'text-[#00E0FF]' : ''
            }`
          }
        >
          Home
        </NavLink>

        {/* Products Dropdown */}
        <div
          className="relative dropdown-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={`flex items-center px-3 py-2 font-medium text-gray-300 hover:text-[#00E0FF] transition-colors ${openDropdown === 'products' ? 'text-[#00E0FF]' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle('products');
            }}
          >
            Shop{' '}
            <ChevronIcon
              direction={openDropdown === 'products' ? 'up' : 'down'}
            />
          </button>
          {openDropdown === 'products' && (
            <div className="absolute top-full left-0 w-64 bg-[#1A1A1A] rounded-md shadow-lg py-2 z-50">
              {productCategories.map((category) => (
                <Link
                  key={category.id}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-[#00E0FF]"
                  to={category.url}
                  onClick={() => setOpenDropdown(null)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Customer Service Dropdown */}
        <div
          className="relative dropdown-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={`flex items-center px-3 py-2 font-medium text-gray-300 hover:text-[#00E0FF] transition-colors ${openDropdown === 'service' ? 'text-[#00E0FF]' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleDropdownToggle('service');
            }}
          >
            Customer Service{' '}
            <ChevronIcon
              direction={openDropdown === 'service' ? 'up' : 'down'}
            />
          </button>
          {openDropdown === 'service' && (
            <div className="absolute top-full left-0 w-64 bg-[#1A1A1A] rounded-md shadow-lg py-2 z-50">
              {customerServiceLinks.map((link) => (
                <Link
                  key={link.id}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-[#00E0FF]"
                  to={link.url}
                  onClick={() => setOpenDropdown(null)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function StarRating({rating}: {rating: number}) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-600'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="block lg:hidden text-gray-300 hover:text-[#00E0FF] transition-colors"
      onClick={() => open('mobile')}
      aria-label="Menu"
    >
      <MenuIcon />
    </button>
  );
}

function EmailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 7L13.03 13.2C12.7213 13.3934 12.3643 13.4952 12 13.4952C11.6357 13.4952 11.2787 13.3934 10.97 13.2L2 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Cart toggle component that can be imported into Header
export function CartToggle({cart}: any) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        {(resolvedCart) => <CartBanner cart={resolvedCart} />}
      </Await>
    </Suspense>
  );
}

function CartBanner({cart}: any) {
  const optimisticCart = useOptimisticCart(cart);
  return <CartBadge count={optimisticCart?.totalQuantity ?? 0} />;
}

function CartBadge({count}: any) {
  const {open} = useAside();
  const {publish, shop}: any = useAnalytics();

  return (
    <button
      className="relative flex items-center text-gray-300 hover:text-[#00E0FF] transition-colors z-40"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart: count > 0 ? {totalQuantity: count} : null,
          prevCart: null,
          shop,
          url: window.location.href || '',
        });
      }}
      aria-label="Cart"
    >
      <CartIcon />
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-[#121212] bg-[#00E0FF] rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}

// Cart icon component
function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
// Free shipping indicator component
export function FreeShippingIndicator({shippingInfo, loading}: any) {
  if (loading) {
    return (
      <div className="bg-[#1A1A1A] py-2 text-center text-sm">
        <div className="container mx-auto px-4">
          <div className="animate-pulse bg-gray-700 h-4 w-64 mx-auto rounded"></div>
        </div>
      </div>
    );
  }

  if (!shippingInfo) return null;

  return (
    <div className="bg-[#1A1A1A] py-2 text-center text-sm font-medium">
      <div className="container mx-auto px-4">
        {shippingInfo.hasFreeshipping ? (
          <span className="text-[#00E0FF]">
            🎉 You've unlocked FREE SHIPPING on your order!
          </span>
        ) : (
          <span className="text-[#F9F9F9]">
            Add ${shippingInfo.amountLeft.toFixed(2)} more to your cart for FREE
            SHIPPING
          </span>
        )}
        {!shippingInfo.hasFreeshipping && (
          <div className="w-full max-w-xs mx-auto mt-1 bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-[#00E0FF] h-1.5 rounded-full"
              style={{
                width: `${Math.min(100, ((99 - shippingInfo.amountLeft) / 99) * 100)}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function for free shipping calculation
export function calculateFreeShipping(cart: any) {
  const FREE_SHIPPING_THRESHOLD = 99; // $99 threshold
  if (!cart?.cost?.subtotalAmount?.amount)
    return {
      hasFreeshipping: false,
      amountLeft: FREE_SHIPPING_THRESHOLD,
    };

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const amountLeft = FREE_SHIPPING_THRESHOLD - subtotal;

  return {
    hasFreeshipping: amountLeft <= 0,
    amountLeft: Math.max(0, amountLeft),
  };
}
