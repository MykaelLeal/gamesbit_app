import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);

  // chave dinâmica por usuário
  const cartKey = user
    ? `@cart:${user.id}`
    : "@cart:guest";

  // carregar carrinho do usuário
  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    setCart(storedCart);
  }, [cartKey]);

  // salvar carrinho automaticamente
  useEffect(() => {
    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );
  }, [cart, cartKey]);

  // adicionar item
  const addItem = (product) => {
    const exists = cart.find(
      (item) => item.id === product.id
    );

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // aumentar quantidade
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // diminuir quantidade
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  // remover item
  const removeItem = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // limpar carrinho
  const clearCart = () => {
    setCart([]);
  };

  // total
  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}