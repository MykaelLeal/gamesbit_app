import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../service/api";

import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCart([]);
      setTotal(0);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const response = await api.get("/cart");

      setCart(response.data.items || []);
      setTotal(response.data.total || 0);

    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (product) => {
    try {
      await api.post("/cart/items", {
        productId: product._id,
        quantity: 1,
      });

      await loadCart();

    } catch (error) {
      console.error(error);
    }
  };

  const increaseQty = async (productId) => {
    try {
      const item = cart.find(
        (item) =>
          item.productId._id === productId
      );

      if (!item) return;

      await api.put(
        `/cart/items/${productId}`,
        {
          quantity: item.quantity + 1,
        }
      );

      await loadCart();

    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      const item = cart.find(
        (item) =>
          item.productId._id === productId
      );

      if (!item) return;

      if (item.quantity <= 1) {
        await removeItem(productId);
        return;
      }

      await api.put(
        `/cart/items/${productId}`,
        {
          quantity: item.quantity - 1,
        }
      );

      await loadCart();

    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete(
        `/cart/items/${productId}`
      );

      await loadCart();

    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");

      setCart([]);
      setTotal(0);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addItem,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}