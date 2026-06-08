import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../service/api";

import { AuthContext } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);


  const loadWishlist = async () => {
    try {
      const response =
        await api.get("/wishlist");

      setWishlist(
        response.data.products || []
      );
    } catch (error) {
      console.error(
        "Erro ao carregar wishlist:",
        error
      );
    }
  };

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async ( product ) => {
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

        return;
      }

      await api.post(
        "/wishlist/products",
        {
          productId: product._id,
        }
      );

      setWishlist((prev) => [
        product,
        ...prev,
      ]);
    } catch (error) {
      console.error(
        "Erro ao atualizar wishlist:",
        error
      );
    }
  };

  const isInWishlist = ( productId ) =>
    wishlist.some(
      (item) =>
        item._id === productId
    );

  const clearWishlist = async () => {
    try {
      await api.delete(
        "/wishlist/clear"
      );

      setWishlist([]);
    } catch (error) {
      console.error(
        "Erro ao limpar wishlist:",
        error
      );
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