import React from 'react';
import SalesPitchGeneric from './SalesPitchGeneric';
import SalesPitchWakeUpLightAlarm from './SalesPitchWakeUpLightAlarm';
import SalesPitchRotatingSensorLight from './SalesPitchRotatingSensorLight.tsx';
import SalesPitchAstronautGalaxyProjector from './SalesPitchAstronautGalaxyProjector';
import SalesPitchFloatingLEDLamp from './SalesPitchFloatingLEDLamp';

type SalesPitchSelectorProps = {
  productId: string;
  product: any;
  selectedVariant: any;
  productOptions: any;
  reviews?: any[];
  scrollToReviews?: () => void;
};

const SalesPitchSelector: React.FC<SalesPitchSelectorProps> = ({
  productId,
  product,
  selectedVariant,
  productOptions,
  reviews = [],
  scrollToReviews,
}) => {
  console.log('Product ID:', productId);
  // Determine which sales pitch component to render based on the product ID
  const getSalesPitchComponent = () => {

    if (['gid://shopify/Product/8514250866922'].includes(productId)) {
      return (
        <SalesPitchWakeUpLightAlarm
          product={product}
          selectedVariant={selectedVariant}
          productOptions={productOptions}
          reviews={reviews}
          scrollToReviews={scrollToReviews}
        />
      );
    }


    if (['gid://shopify/Product/8514251161834'].includes(productId)) {
      return (
        <SalesPitchRotatingSensorLight
          product={product}
          selectedVariant={selectedVariant}
          productOptions={productOptions}
          reviews={reviews}
          scrollToReviews={scrollToReviews}
        />
      );
    }

    if (['gid://shopify/Product/8514250899690'].includes(productId)) {
      return (
        <SalesPitchAstronautGalaxyProjector
          product={product}
          selectedVariant={selectedVariant}
          productOptions={productOptions}
          reviews={reviews}
          scrollToReviews={scrollToReviews}
        />
      );
    }

    if (['gid://shopify/Product/8514251063530'].includes(productId)) {
      return (
        <SalesPitchFloatingLEDLamp
          product={product}
          selectedVariant={selectedVariant}
          productOptions={productOptions}
          reviews={reviews}
          scrollToReviews={scrollToReviews}
        />
      );
    }
    

    // Default case: return the wake-up light sales pitch or a generic one
    // You could also create a generic sales pitch component for unknown products
    return (
      <SalesPitchGeneric
        product={product}
        selectedVariant={selectedVariant}
        productOptions={productOptions}
        reviews={reviews}
        scrollToReviews={scrollToReviews}
      />
    );
  };

  return (
    <div className="sales-pitch-container">{getSalesPitchComponent()}</div>
  );
};

export default SalesPitchSelector;
