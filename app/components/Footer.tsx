import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-[#121212] text-[#F9F9F9] pt-16 pb-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] opacity-80"></div>
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00E0FF]/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C084FC]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
              {/* Main Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                {/* Brand Information */}
                <div className="lg:col-span-1">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-transparent bg-clip-text mb-2">
                      Neovibe
                    </h2>
                    <p className="text-[#F9F9F9]/70 text-sm leading-relaxed">
                      Redefining modern living through immersive lighting
                      experiences — combining smart tech with aesthetic design
                      to transform every room into a vibe.
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-6">
                    <p className="text-[#F9F9F9] font-medium mb-3">Follow Us</p>
                    <div className="flex space-x-3">
                      <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1A1A1A] hover:bg-[#00E0FF]/20 text-[#F9F9F9] p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,224,255,0.3)]"
                        aria-label="TikTok"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1A1A1A] hover:bg-[#00E0FF]/20 text-[#F9F9F9] p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,224,255,0.3)]"
                        aria-label="Instagram"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1A1A1A] hover:bg-[#00E0FF]/20 text-[#F9F9F9] p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,224,255,0.3)]"
                        aria-label="Facebook"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1A1A1A] hover:bg-[#00E0FF]/20 text-[#F9F9F9] p-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,224,255,0.3)]"
                        aria-label="Twitter"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Shop Categories */}
                <div>
                  <h3 className="text-[#F9F9F9] font-semibold text-lg mb-5">
                    Shop By Vibe
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <NavLink
                        to="/collections/room-vibes"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Room Vibes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/collections/sleep-chill"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Sleep & Chill
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/collections/productivity-glow"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Productivity Glow
                      </NavLink>
                    </li>
                   
                  </ul>
                </div>

                {/* Help & Support */}
                <div>
                  <h3 className="text-[#F9F9F9] font-semibold text-lg mb-5">
                    Help & Support
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <NavLink
                        to="/faq"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        FAQs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/faq"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Shipping Info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/faq"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Returns & Refunds
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contact"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200 flex items-center"
                        end
                        prefetch="intent"
                      >
                        <span className="mr-2 text-[#00E0FF]">›</span>
                        Contact Us
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Get in Touch */}
                <div>
                  <h3 className="text-[#F9F9F9] font-semibold text-lg mb-5">
                    Get In Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00E0FF] mr-3">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <a
                        href="mailto:support@neovibe.com"
                        className="text-[#F9F9F9]/70 hover:text-[#00E0FF] transition-colors duration-200"
                      >
                        support@neovibe.com
                      </a>
                    </div>


                    <div>
                      <form className="mt-4">
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Join our newsletter"
                            className="w-full bg-[#1A1A1A] border border-[#333333] text-[#F9F9F9] px-4 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00E0FF] focus:border-transparent"
                          />
                          <button
                            type="submit"
                            className="absolute right-1 top-1 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-medium px-4 py-1.5 rounded-full hover:shadow-[0_0_10px_rgba(0,224,255,0.5)] transition-all duration-300"
                          >
                            Subscribe
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Elements */}
              <div className="border-t border-[#333333] pt-8 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00E0FF] mb-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-[#F9F9F9]/70">
                        Free Shipping
                      </span>
                      <span className="text-xs text-[#F9F9F9]/70">
                        On orders over $50
                      </span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00E0FF] mb-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-[#F9F9F9]/70">
                        Secure Checkout
                      </span>
                      <span className="text-xs text-[#F9F9F9]/70">
                        100% Protected
                      </span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00E0FF] mb-2">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs text-[#F9F9F9]/70">
                        30-Day Returns
                      </span>
                      <span className="text-xs text-[#F9F9F9]/70">
                        Not vibing with it? Send it back
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <img
                      src="/visa.png"
                      alt="Visa"
                      className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/mastercard.png"
                      alt="Mastercard"
                      className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/american.png"
                      alt="American Express"
                      className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <img
                      src="/paypal.png"
                      alt="PayPal"
                      className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                    />
                    {/* <img
                      src="/api/placeholder/40/25"
                      alt="Apple Pay"
                      className="h-6 opacity-70 hover:opacity-100 transition-opacity"
                    /> */}
                  </div>
                </div>
              </div>

              {/* Legal Section */}
              <div className="border-t border-[#333333] pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-[#F9F9F9]/50 text-sm">
                      &copy; {new Date().getFullYear()} Neovibe. All rights
                      reserved.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
                    {(footer?.menu || FALLBACK_FOOTER_MENU).items.map(
                      (item) => {
                        if (!item.url) return null;
                        // if the url is internal, we strip the domain
                        const url =
                          item.url.includes('myshopify.com') ||
                          item.url.includes(publicStoreDomain) ||
                          item.url.includes(
                            header.shop.primaryDomain?.url || '',
                          )
                            ? new URL(item.url).pathname
                            : item.url;
                        const isExternal = !url.startsWith('/');
                        return isExternal ? (
                          <a
                            href={url}
                            key={item.id}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-[#F9F9F9]/50 text-xs hover:text-[#00E0FF] transition-colors duration-200"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <NavLink
                            end
                            key={item.id}
                            prefetch="intent"
                            to={url}
                            className="text-[#F9F9F9]/50 text-xs hover:text-[#00E0FF] transition-colors duration-200"
                          >
                            {item.title}
                          </NavLink>
                        );
                      },
                    )}
                    <NavLink
                      to="/policies"
                      className="text-[#F9F9F9]/50 text-xs hover:text-[#00E0FF] transition-colors duration-200"
                      end
                      prefetch="intent"
                    >
                      Policies
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
