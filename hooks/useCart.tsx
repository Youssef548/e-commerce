// import { createContext, useContext, useState } from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartProdcutType } from "@/app/product/[productId]/ProductDetails";

import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProdcutType[] | null;
  handleAddProductToCart: (product: CartProdcutType) => void;
  handleRemoveProductFromCart: (product: CartProdcutType) => void;
};

const cartContext = createContext<CartContextType | null>(null);

interface Props {
  [propsName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProdcutType[] | null>(
    null
  );

  useEffect(() => {
    if (!localStorage.getItem("productsInCart")) return;
    const products = JSON.parse(localStorage.getItem("productsInCart")!);
    setCartProducts(products);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProdcutType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("productsInCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);


  const handleRemoveProductFromCart = useCallback((product: CartProdcutType) => {
    if(cartProducts) {
      const filteredProducts = cartProducts.filter((item) => {
        return item.id !== product.id;
      });

      setCartProducts(filteredProducts);
      toast.success("Product removed from cart");
      localStorage.setItem("productsInCart", JSON.stringify(filteredProducts));

    }

  } , [cartProducts])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };
  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const ctx = useContext(cartContext);

  if (ctx === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return ctx;
};
