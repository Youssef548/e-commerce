"use client";

import Button from "@/app/Button";
import ProductImage from "@/app/components/Products/ProductImage";
import SetColor from "@/app/components/Products/SetColor";
import SetQuantity from "@/app/components/Products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react";

interface productDetailsProps {
  product: any;
}

export type CartProdcutType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2"></hr>;
};

const ProductDetails: React.FC<productDetailsProps> = ({ product }) => {
  const [cartProduct, setCartProduct] = useState<CartProdcutType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  const handleSetColor = useCallback(
    (value: SelectedImgType) => {
      setCartProduct((previous) => ({ ...previous, selectedImg: value }));
    },
    [cartProduct.selectedImg]
  );

  const handleQTYIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  const handleQTYDecrease = useCallback(() => {
    if (cartProduct.quantity > 1) {
      setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity-- };
      });
    }
  }, [cartProduct]);

  const productRating =
    product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    product.reviews.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* <div>Images</div> */}
      <ProductImage
        product={product}
        cartProduct={cartProduct}
        handleColorSelect={handleSetColor}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700"> {product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CateBgory:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">Brand:</span> {product.brand}
        </div>
        <div
          className={`${product.inStock ? "text-teal-400" : "text-rose-400"}`}
        >
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        <SetColor
          cartProduct={cartProduct}
          images={product.images}
          handleColorSelect={handleSetColor}
        />
        <Horizontal />
        <SetQuantity
          cartProduct={cartProduct}
          handleQTYIncrease={handleQTYIncrease}
          handleQTYDecrease={handleQTYDecrease}
        />
        <Horizontal />
        <div className="max-w-[300px]">
          <Button label={"add to cart"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
