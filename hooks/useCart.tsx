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
  cartTotalAmount: number;
  cartProducts: CartProdcutType[] | null;
  handleAddProductToCart: (product: CartProdcutType) => void;
  handleRemoveProductFromCart: (product: CartProdcutType) => void;
  handleIncreaseQTY: (product: CartProdcutType) => void;
  handleDecreaseQTY: (product: CartProdcutType) => void;
  handleClearCart: () => void;
};

const cartContext = createContext<CartContextType | null>(null);

interface Props {
  [propsName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProdcutType[] | null>(
    null
  );

  console.log(cartTotalAmount);

  useEffect(() => {
    if (!localStorage.getItem("productsInCart")) return;
    const products = JSON.parse(localStorage.getItem("productsInCart")!);
    setCartProducts(products);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProdcutType) => {
    let updatedCart;
    setCartProducts((prev) => {
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      return updatedCart;
    });
    toast.success("Product added to cart");
    localStorage.setItem("productsInCart", JSON.stringify(updatedCart));
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProdcutType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);
        toast.success("Product removed from cart");
        localStorage.setItem(
          "productsInCart",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleIncreaseQTY = useCallback(
    (product: CartProdcutType) => {
      let updatedCart;

      if (product.quantity === 99) {
        toast.error("Oooop! max reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex((item) => {
          return item.id == product.id;
        });

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("productsInCart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleDecreaseQTY = useCallback(
    (product: CartProdcutType) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error("Cannot  remove from the list!");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id == product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("productsInCart", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem("productsInCart", JSON.stringify(null));
  }, []);
  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleIncreaseQTY,
    handleDecreaseQTY,
    handleClearCart,
    cartTotalAmount,
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
