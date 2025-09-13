import {type MetaFunction, useLoaderData} from '@remix-run/react';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {
  data,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type HeadersFunction,
} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';


export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Cart`}];
};

export const headers: HeadersFunction = ({actionHeaders}) => actionHeaders;

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      // Facebook Conversions API: AddToCart event
      try {
        const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
        const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
        if (
          FB_PIXEL_ID &&
          FB_ACCESS_TOKEN &&
          inputs.lines &&
          Array.isArray(inputs.lines)
        ) {
          const now = Math.floor(Date.now() / 1000);
          for (const line of inputs.lines) {
            const fbPayload = {
              data: [
                {
                  event_name: 'AddToCart',
                  event_time: now,
                  action_source: 'website',
                  event_source_url: request.headers.get('referer') || '',
                  user_data: {}, // Optionally add hashed user data
                  custom_data: {
                    content_ids: [line.merchandiseId],
                    content_type: 'product',
                  },
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
            ).catch(() => {});
          }
        }
      } catch (e) {
        // Ignore errors
      }
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;

      // User inputted gift card code
      const giftCardCodes = (
        formGiftCardCode ? [formGiftCardCode] : []
      ) as string[];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      // Facebook Conversions API: InitiateCheckout event
      try {
        const FB_PIXEL_ID = process.env.FB_PIXEL_ID;
        const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
        if (FB_PIXEL_ID && FB_ACCESS_TOKEN && result?.cart) {
          const now = Math.floor(Date.now() / 1000);
          const cartLines = result.cart.lines?.nodes || [];
          const content_ids = cartLines.map((line: any) => line.merchandise.id);
          const value = result.cart.cost?.subtotalAmount?.amount || 0;
          const currency =
            result.cart.cost?.subtotalAmount?.currencyCode || 'USD';
          const fbPayload = {
            data: [
              {
                event_name: 'InitiateCheckout',
                event_time: now,
                action_source: 'website',
                event_source_url: request.headers.get('referer') || '',
                user_data: {}, // Optionally add hashed user data
                custom_data: {
                  content_ids,
                  content_type: 'product',
                  value,
                  currency,
                },
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
          ).catch(() => {});
        }
      } catch (e) {
        // Ignore errors
      }
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export async function loader({context}: LoaderFunctionArgs) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
  const cart = useLoaderData<typeof loader>();

  return (
    <div className="cart">
      <CartMain layout="page" cart={cart} />
    </div>
  );
}
