import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';


export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);
  const {close} = useAside();

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const cartHasItems = cart?.totalQuantity && cart?.totalQuantity > 0;

  return (
    <div
      className={`cart-main ${withDiscount ? 'with-discount' : ''} p-4 h-full flex flex-col bg-[#121212] text-[#F9F9F9]`}
    >
      <div className="flex justify-between items-center mb-6 border-b border-[#333333] pb-4">
        <h2 className="text-xl font-bold text-[#F9F9F9]">Your Cart</h2>
        {layout === 'aside' && (
          <button
            onClick={close}
            className="text-[#BBBBBB] hover:text-[#00E0FF] transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <CartEmpty hidden={linesCount} layout={layout} />

      {cartHasItems && (
        <div className="cart-details flex-grow flex flex-col">
          <div
            className="flex-grow overflow-auto mb-4"
            aria-labelledby="cart-lines"
          >
            <ul className="divide-y divide-[#333333]">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
          <CartSummary cart={cart} layout={layout} />
        </div>
      )}

      {cartHasItems && layout === 'aside' && (
        <div className="mt-4 grid grid-cols-1 gap-3">
          <Link
            to="/cart"
            className="flex justify-center items-center py-3 px-4 border border-[#00E0FF] rounded-lg text-[#00E0FF] hover:bg-[#00E0FF] hover:bg-opacity-10 transition-colors text-sm font-medium"
            onClick={close}
          >
            View Cart
          </Link>
          {/* <Link
            to="/checkout"
            className="flex justify-center items-center py-3 px-4 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] rounded-lg text-black hover:from-[#00C0E0] hover:to-[#A064DC] transition-all duration-300 text-sm font-medium"
            onClick={close}
          >
            Checkout
          </Link> */}
        </div>
      )}

      {/* Free shipping progress indicator */}
      {cartHasItems && <FreeShippingIndicator cart={cart} />}
    </div>
  );
}

function FreeShippingIndicator({cart}: {cart: any}) {
  const FREE_SHIPPING_THRESHOLD = 50; // $50 threshold (changed from $99 to match Neovibe free shipping)
  if (!cart?.cost?.subtotalAmount?.amount) return null;

  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
  const amountLeft = FREE_SHIPPING_THRESHOLD - subtotal;
  const hasFreeshipping = amountLeft <= 0;

  return (
    <div className="mt-4 p-3 bg-[#1A1A1A] rounded-lg">
      {hasFreeshipping ? (
        <div className="text-center">
          <p className="text-sm text-[#00E0FF] font-medium">
            ✨ You've unlocked FREE SHIPPING on your order!
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm text-center mb-2 text-[#BBBBBB]">
            Add{' '}
            <span className="font-medium text-[#F9F9F9]">
              ${amountLeft.toFixed(2)}
            </span>{' '}
            more to your cart for{' '}
            <span className="font-medium text-[#00E0FF]">FREE SHIPPING</span>
          </p>
          <div className="w-full bg-[#2A2A2A] rounded-full h-1.5">
            <div
              className="bg-gradient-to-r from-[#00E0FF] to-[#C084FC] h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, ((50 - amountLeft) / 50) * 100)}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

function CartEmpty({
  hidden = false,
  layout = 'aside',
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();

  if (hidden) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center flex-grow">
      <CartEmptyIcon />
      <h3 className="mt-6 text-lg font-medium text-[#F9F9F9]">
        Your cart is empty
      </h3>
      <p className="mt-2 text-[#BBBBBB] max-w-md">
        Ready to elevate your space with some amazing lighting vibes?
      </p>
      <Link
        to="/catalog"
        onClick={close}
        prefetch="viewport"
        className="mt-8 py-3 px-6 bg-gradient-to-r from-[#00E0FF] to-[#C084FC] rounded-lg text-black hover:from-[#00C0E0] hover:to-[#A064DC] transition-all duration-300 text-sm font-medium"
      >
        Shop the Glow
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartEmptyIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="32" fill="#1A1A1A" />
      <path
        d="M20 20H24L24.8 24M24.8 24H48L40 40H24M24.8 24L24 40M24 40L19.414 44.586C18.154 45.846 19.046 48 20.828 48H40M40 48C38.9391 48 37.9217 48.4214 37.1716 49.1716C36.4214 49.9217 36 50.9391 36 52C36 53.0609 36.4214 54.0783 37.1716 54.8284C37.9217 55.5786 38.9391 56 40 56C41.0609 56 42.0783 55.5786 42.8284 54.8284C43.5786 54.0783 44 53.0609 44 52C44 50.9391 43.5786 49.9217 42.8284 49.1716C42.0783 48.4214 41.0609 48 40 48ZM28 52C28 53.0609 27.5786 54.0783 26.8284 54.8284C26.0783 55.5786 25.0609 56 24 56C22.9391 56 21.9217 55.5786 21.1716 54.8284C20.4214 54.0783 20 53.0609 20 52C20 50.9391 20.4214 49.9217 21.1716 49.1716C21.9217 48.4214 22.9391 48 24 48C25.0609 48 26.0783 48.4214 26.8284 49.1716C27.5786 49.9217 28 50.9391 28 52Z"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="20"
          y1="20"
          x2="44"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00E0FF" />
          <stop offset="1" stopColor="#C084FC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';

import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';

import {ProductPrice} from './ProductPrice';


type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({layout, line}: {layout: CartLayout; line: any}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  // Determine if this is a sale item
  const isOnSale =
    line.cost?.compareAtAmount &&
    parseFloat(line.cost.totalAmount.amount) <
      parseFloat(line.cost.compareAtAmount.amount);

  return (
    <li
      key={id}
      className="flex p-4 mb-4 bg-[#1A1A1A] rounded-xl border border-[#333333]"
    >
      {/* Product Image with Border */}
      <div className="flex-shrink-0 rounded-lg overflow-hidden border border-[#333333] w-20 h-20 mr-4">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={80}
            loading="lazy"
            width={80}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          {/* Product Title */}
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="no-underline text-[#F9F9F9] hover:text-[#00E0FF] transition-colors"
          >
            <p className="font-semibold text-[15px] mb-1">{product.title}</p>
          </Link>

          {/* Price */}
          <div className="flex flex-col items-end">
            <ProductPrice
              price={line?.cost?.totalAmount}
            />
            {isOnSale && line.cost?.compareAtAmount && (
              <span className="line-through text-xs text-[#00E0FF]">
                {`${line.cost.compareAtAmount.currencyCode} ${parseFloat(line.cost.compareAtAmount.amount).toFixed(2)}`}
              </span>
            )}
          </div>
        </div>

        {/* Selected Options */}
        {selectedOptions && selectedOptions.length > 0 && (
          <div className="mt-1 mb-1">
            {selectedOptions.map((option: any) => (
              <span
                key={option.name}
                className="inline-block bg-[#2A2A2A] rounded-md px-2 py-1 mr-2 mb-1 text-xs text-[#BBBBBB]"
              >
                {option.name}: {option.value}
              </span>
            ))}
          </div>
        )}

        {/* Quantity Controls */}
        <CartLineQuantity line={line} />
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center mt-2">
      {/* Quantity Label */}
      <span className="text-sm mr-2 text-[#BBBBBB]">Quantity:</span>

      {/* Quantity Control Group */}
      <div className="flex items-center bg-[#2A2A2A] rounded-lg p-[2px]">
        {/* Decrease Button */}
        <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className={`w-7 h-7 border-none ${
              quantity <= 1
                ? 'bg-[#333333] text-[#777777]'
                : 'bg-[#00E0FF] text-black'
            } rounded-md ${
              quantity <= 1
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:bg-[#00C0E0]'
            } text-base flex items-center justify-center p-0 transition-colors`}
          >
            <span>−</span>
          </button>
        </CartLineUpdateButton>

        {/* Quantity Display */}
        <span className="mx-2 font-semibold text-sm min-w-[20px] text-center text-[#F9F9F9]">
          {quantity}
        </span>

        {/* Increase Button */}
        <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className={`w-7 h-7 border-none ${
              isOptimistic
                ? 'bg-[#333333] text-[#777777]'
                : 'bg-[#00E0FF] text-black'
            } rounded-md ${
              isOptimistic
                ? 'cursor-not-allowed'
                : 'cursor-pointer hover:bg-[#00C0E0]'
            } text-base flex items-center justify-center p-0 transition-colors`}
          >
            <span>+</span>
          </button>
        </CartLineUpdateButton>
      </div>

      {/* Remove Button */}
      <div className="ml-auto">
        <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
      </div>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        className={`bg-transparent border border-[#333333] text-[#00E0FF] text-xs rounded-lg px-2 py-1 ${
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:bg-[#00E0FF] hover:bg-opacity-10 transition-colors'
        }`}
      >
        Remove
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}



import {Money, type OptimisticCart} from '@shopify/hydrogen';
import {useRef} from 'react';
import {FetcherWithComponents} from '@remix-run/react';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  // Determine if we're in the cart page or the slide-out cart
  const isPage = layout === 'page';

  return (
    <div
      aria-labelledby="cart-summary"
      className={`bg-[#1A1A1A] rounded-xl border border-[#333333] p-6 sticky ${isPage ? 'top-6' : 'top-0'}`}
    >
      <h4
        className={`${isPage ? 'text-xl' : 'text-lg'} font-bold text-[#F9F9F9] mt-0 mb-4 border-b border-[#333333] pb-3`}
      >
        Order Summary
      </h4>

      {/* Subtotal */}
      <dl className="flex justify-between my-3 text-[15px]">
        <dt className="text-[#BBBBBB] font-medium">Subtotal</dt>
        <dd className="text-[#F9F9F9] font-semibold m-0">
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      {/* Shipping - this is just an estimate placeholder */}
      <dl className="flex justify-between my-3 text-[15px]">
        <dt className="text-[#BBBBBB] font-medium">Shipping</dt>
        <dd className="text-[#F9F9F9] font-semibold m-0">
          Calculated at checkout
        </dd>
      </dl>

      {/* Discounts Section */}
      {/* <CartDiscounts discountCodes={cart.discountCodes} /> */}

      {/* Gift Card Section */}
      {/* <CartGiftCard giftCardCodes={cart.appliedGiftCards} /> */}

      {/* Total */}
      <dl className="flex justify-between my-5 py-4 border-t border-b border-[#333333] text-base">
        <dt className="text-[#F9F9F9] font-bold">Estimated Total</dt>
        <dd className="text-[#F9F9F9] font-bold m-0">
          {cart.cost?.totalAmount?.amount ? (
            <Money data={cart.cost?.totalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      {/* Checkout Button */}
      <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />

      {/* Trust elements */}
      <div className="mt-5 p-3 bg-[#2A2A2A] rounded-lg text-sm text-[#BBBBBB] text-center">
        <div className="mb-2 flex justify-center gap-4">
          <span>✨ Secure Checkout</span>
          <span>🚚 Fast Shipping</span>
        </div>
        <div>30-day satisfaction guarantee</div>
      </div>
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a
        href={checkoutUrl}
        target="_self"
        className="block bg-gradient-to-r from-[#00E0FF] to-[#C084FC] text-black font-semibold text-base py-4 text-center rounded-lg no-underline transition-all duration-300 hover:from-[#00C0E0] hover:to-[#A064DC]"
      >
        Proceed to Checkout
      </a>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="my-4">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="my-3">
        <div className="flex justify-between items-center text-[15px]">
          <dt className="text-[#BBBBBB] font-medium">Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="flex items-center">
              <code className="bg-[#2A2A2A] px-2 py-1 rounded text-xs m-0 text-[#F9F9F9]">
                {codes?.join(', ')}
              </code>
              &nbsp;
              <button className="bg-transparent border-none text-[#00E0FF] cursor-pointer text-xs px-1 hover:text-[#C084FC] transition-colors">
                Remove
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="my-3 flex gap-2">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 py-[10px] px-3 rounded-lg border border-[#333333] bg-[#2A2A2A] text-[#F9F9F9] text-sm placeholder-[#777777] focus:outline-none focus:border-[#00E0FF]"
          />
          <button
            type="submit"
            className="bg-[#00E0FF] text-black border-none rounded-lg py-[10px] px-4 text-sm font-medium cursor-pointer hover:bg-[#00C0E0] transition-colors"
          >
            Apply
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const codes: string[] =
    giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
    giftCardCodeInput.current!.value = '';
  }

  function removeAppliedCode() {
    appliedGiftCardCodes.current = [];
  }

  return (
    <div className="my-4">
      {/* Have existing gift card applied, display it with a remove option */}
      <dl hidden={!codes.length} className="my-3">
        <div className="flex justify-between items-center text-[15px]">
          <dt className="text-[#BBBBBB] font-medium">Gift Card(s)</dt>
          <UpdateGiftCardForm>
            <div className="flex items-center">
              <code className="bg-[#2A2A2A] px-2 py-1 rounded text-xs m-0 text-[#F9F9F9]">
                {codes?.join(', ')}
              </code>
              &nbsp;
              <button
                onSubmit={() => removeAppliedCode}
                className="bg-transparent border-none text-[#00E0FF] cursor-pointer text-xs px-1 hover:text-[#C084FC] transition-colors"
              >
                Remove
              </button>
            </div>
          </UpdateGiftCardForm>
        </div>
      </dl>

      {/* Show an input to apply a gift card */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
      >
        <div className="my-3 flex gap-2">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="flex-1 py-[10px] px-3 rounded-lg border border-[#333333] bg-[#2A2A2A] text-[#F9F9F9] text-sm placeholder-[#777777] focus:outline-none focus:border-[#00E0FF]"
          />
          <button
            type="submit"
            className="bg-[#00E0FF] text-black border-none rounded-lg py-[10px] px-4 text-sm font-medium cursor-pointer hover:bg-[#00C0E0] transition-colors"
          >
            Apply
          </button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  removeAppliedCode?: () => void;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}
