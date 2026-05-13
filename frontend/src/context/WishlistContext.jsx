import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({
  children,
}) {
  const { user } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);

  const wishlistKey = user
    ? `@wishlist:${user.id}`
    : "@wishlist:guest";

  useEffect(() => {
    const storedWishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];

    setWishlist(storedWishlist);
  }, [wishlistKey]);

  useEffect(() => {
    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlist)
    );
  }, [wishlist, wishlistKey]);

  const toggleWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist([
        ...wishlist,
        product,
      ]);
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}