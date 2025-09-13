import {Link, useNavigate} from '@remix-run/react';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
// import type {ProductFragment} from 'storefrontapi.generated';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: any['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  return (
    <div className="product-form bg-[#121212] text-[#F9F9F9] p-6 rounded-lg shadow-lg">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options mb-6" key={option.name}>
            <h5 className="text-xl font-bold mb-3">{option.name}</h5>
            <div className="product-options-grid grid grid-cols-4 gap-3">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className="product-options-item flex items-center justify-center p-2 rounded-lg transition-all duration-200"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        border: selected
                          ? '2px solid #00E0FF'
                          : '2px solid transparent',
                        boxShadow: selected
                          ? '0 0 10px rgba(0, 224, 255, 0.4)'
                          : 'none',
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item flex items-center justify-center p-2 rounded-lg transition-all duration-200${
                        exists && !selected ? ' hover:border-[#00E0FF]' : ''
                      }`}
                      key={option.name + name}
                      style={{
                        border: selected
                          ? '2px solid #00E0FF'
                          : '2px solid transparent',
                        boxShadow: selected
                          ? '0 0 10px rgba(0, 224, 255, 0.4)'
                          : 'none',
                        opacity: available ? 1 : 0.3,
                      }}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return <span className="text-sm">{name}</span>;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch w-10 h-10 rounded-full flex items-center justify-center border border-[#2A2A2A]"
      style={{
        backgroundColor: color || 'transparent',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.4)',
      }}
    >
      {!!image && (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      )}
    </div>
  );
}
