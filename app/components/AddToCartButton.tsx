import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {useState, useEffect} from 'react';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className = '',
  showQuantity = false,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  className?: string;
  showQuantity?: boolean;
}) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);

  // Add animation for success feedback
  useEffect(() => {
    if (addingToCart) {
      const timer = setTimeout(() => {
        setAddingToCart(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [addingToCart]);

  // Pulse animation on hover
  useEffect(() => {
    if (animateButton) {
      const timer = setTimeout(() => {
        setAnimateButton(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [animateButton]);

  // Update lines with current quantity
  const cartLines = lines.map((line) => ({
    ...line,
    quantity: quantity,
  }));

  return (
    <CartForm
      route="/cart"
      inputs={{lines: cartLines}}
      action={CartForm.ACTIONS.LinesAdd}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const isSubmitting = fetcher.state !== 'idle';

        // Set success state when form submission completes
        useEffect(() => {
          if (fetcher.state === 'submitting') {
            setAddingToCart(true);
          }
        }, [fetcher.state]);

        return (
          <div className={`flex flex-col space-y-4 ${className}`}>
            {showQuantity && (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-[#BBBBBB] font-medium">
                  Quantity:
                </span>
                <div className="flex items-center bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-[#F9F9F9] hover:text-[#00E0FF] disabled:opacity-50 transition-colors duration-200"
                    disabled={isSubmitting || disabled || quantity <= 1}
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    aria-label="Decrease quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium text-[#F9F9F9]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-[#F9F9F9] hover:text-[#00E0FF] disabled:opacity-50 transition-colors duration-200"
                    disabled={isSubmitting || disabled}
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                      setAnimateButton(true);
                    }}
                    aria-label="Increase quantity"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              type="submit"
              onClick={(e) => {
                if (onClick) onClick();
              }}
              disabled={disabled || isSubmitting}
              className={`relative w-full overflow-hidden flex items-center justify-center rounded-lg py-4 text-base font-bold transition-all duration-300 ${
                disabled
                  ? 'bg-[#2A2A2A] text-[#666666] cursor-not-allowed'
                  : addingToCart
                    ? 'bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-[#121212]'
                    : 'bg-gradient-to-r from-[#00E0FF] to-[#00E0FF] hover:from-[#00E0FF] hover:to-[#C084FC] text-[#121212] transform hover:-translate-y-1 shadow-lg hover:shadow-xl shadow-[#00E0FF]/10 hover:shadow-[#00E0FF]/30'
              } ${animateButton ? 'animate-pulse' : ''}`}
            >
              {/* Success check animation */}
              {addingToCart && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#121212] animate-scale-up"
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
                    <span className="ml-2 font-bold">Added!</span>
                  </div>
                </div>
              )}

              {/* Button content with glow effect */}
              <span
                className={`${
                  addingToCart ? 'opacity-0' : 'opacity-100'
                } relative z-10 flex items-center justify-center`}
                style={{
                  textShadow: disabled
                    ? 'none'
                    : '0 0 10px rgba(0, 224, 255, 0.5)',
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#121212]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding to Cart
                  </span>
                ) : (
                  <>
                    {children}
                    {quantity > 1 && (
                      <span className="ml-2 px-2 py-1 text-xs bg-[#121212] text-[#00E0FF] rounded-full">
                        {quantity}
                      </span>
                    )}
                  </>
                )}
              </span>

              {/* Animated glow effect */}
              {!disabled && !addingToCart && (
                <>
                  <span className="absolute inset-0 opacity-30 mix-blend-overlay bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></span>
                  <span className="absolute -inset-[1px] rounded-lg opacity-50 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] blur-sm transition-opacity group-hover:opacity-100"></span>
                </>
              )}
            </button>

            {/* Stock indicator */}
            <div className="flex items-center justify-center text-sm">
              <span className="flex items-center text-green-400">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                In Stock
              </span>
              <span className="mx-2 text-[#666666]">•</span>
              <span className="text-[#BBBBBB]">Ships in 3-5 days</span>
            </div>
          </div>
        );
      }}
    </CartForm>
  );
}

// Add these to your global CSS file:
/* 
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes scale-up {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-scale-up {
  animation: scale-up 0.3s ease-out forwards;
}
*/
