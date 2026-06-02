import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const WishlistContext = createContext();

export function WishlistProvider({
  children,
}) {
  const [wishlist, setWishlist] =
    useState([]);

  useEffect(() => {
    const token = localStorage.getItem(
      "@Auth:token"
    );

    if (token) {
      loadWishlist();
    }
  }, []);

  const loadWishlist = async () => {
    try {
      const response =
        await api.get("/wishlist");

      setWishlist(
        response.data.products || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWishlist = async (
    product
  ) => {
    try {
      const exists = wishlist.some(
        (item) =>
          item._id === product._id
      );

      if (exists) {
        await api.delete(
          `/wishlist/products/${product._id}`
        );

        setWishlist((prev) =>
          prev.filter(
            (item) =>
              item._id !== product._id
          )
        );
      } else {
        await api.post(
          "/wishlist/products",
          {
            productId: product._id,
          }
        );

        await loadWishlist();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isInWishlist = (
    productId
  ) => {
    return wishlist.some(
      (item) =>
        item._id === productId
    );
  };

  const clearWishlist = async () => {
    try {
      await api.delete(
        "/wishlist/clear"
      );

      setWishlist([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(
    WishlistContext
  );
}