import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types';

interface CartContextType {
  cart: Property[];
  addToCart: (property: Property) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getQuantity: (id: string) => number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (property: Property) => {
    setCart((prevCart) => [...prevCart, property]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id: string) => cart.some((item) => item.id === id);

  const getQuantity = (id: string) => cart.filter((item) => item.id === id).length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart, getQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};