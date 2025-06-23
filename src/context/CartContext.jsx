import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

// Create CartContext
const CartContext = createContext();

// Custom hook to use CartContext
export function useCart() {
  return useContext(CartContext);
}

// CartProvider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // Debounced save to localStorage
  const saveCartToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  useEffect(() => {
    const timeoutId = setTimeout(saveCartToLocalStorage, 500); // Debounce by 500ms
    return () => clearTimeout(timeoutId);
  }, [cart, saveCartToLocalStorage]);

  const addToCart = useCallback((product) => {
    if (!product || !product.id) {
      toast.error("Invalid product data", { position: "top-center", theme: "colored" });
      return;
    }
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);
      if (existingProduct) {
        toast.success(`${product.name || "Item"} quantity updated in cart`, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name || "Item"} added to cart`, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === productId);
      if (item) {
        toast.success(`${item.name || "Item"} removed from cart`, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      }
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    setCart((prev) => {
      const item = prev.find((item) => item.id === productId);
      if (!item) return prev;
      const maxQuantity = item.stock || 100; // Default max 100 if stock not provided
      const validatedQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));
      if (newQuantity > maxQuantity) {
        toast.warn(`Cannot exceed stock limit of ${maxQuantity} for ${item.name || "item"}`, {
          position: "top-center",
          theme: "colored",
        });
      }
      toast.success(`${item.name || "Item"} quantity updated to ${validatedQuantity}`, {
        position: "top-center",
        theme: "colored",
        autoClose: 2000,
      });
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: validatedQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    toast.success("Cart cleared", {
      position: "top-center",
      theme: "colored",
      autoClose: 2000,
    });
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}