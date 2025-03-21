"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  food: {
    _id: string;
    foodName: string;
    ingredients: string;
    price: string;
    image: string;
  };
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextType>({} as CartContextType);
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.food._id === item.food._id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const updateQuantity = (index: number, quantity: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = quantity;
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
export const useCart = () => useContext(CartContext);
