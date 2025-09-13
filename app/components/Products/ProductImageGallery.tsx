import {useState, useEffect} from 'react';

const ProductImageGallery = ({images, selectedVariant}: any) => {
  console.log({selectedVariant});

  const [mainImage, setMainImage] = useState(
    selectedVariant?.image?.url || images?.nodes[0]?.url || '',
  );

  // Add useEffect to update mainImage when selectedVariant changes
  useEffect(() => {
    if (selectedVariant?.image?.url) {
      setMainImage(selectedVariant.image.url);
    }
  }, [selectedVariant]);

  return (
    <div className="product-gallery">
      {/* Main Image Display */}
      <div className="mb-4 overflow-hidden rounded-lg bg-[#1A1A1A]">
        <img
          src={mainImage}
          alt="Wake up Light Alarm Clock"
          className="w-full h-auto object-cover aspect-square"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
