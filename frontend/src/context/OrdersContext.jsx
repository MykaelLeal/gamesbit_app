import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./AuthContext";

const OrdersContext = createContext();

export const OrdersProvider = ({
  children,
}) => {

  const { user } = useContext(AuthContext);

  const ordersKey = user
    ? `@orders:${user.id}`
    : "@orders:guest";

  const [orders, setOrders] = useState([]);

  // carregar pedidos do usuário
  useEffect(() => {
    const storedOrders =
      JSON.parse(
        localStorage.getItem(ordersKey)
      ) || [];

    setOrders(storedOrders);
  }, [ordersKey]);

  // salvar automaticamente
  useEffect(() => {
    localStorage.setItem(
      ordersKey,
      JSON.stringify(orders)
    );
  }, [orders, ordersKey]);

  // adicionar pedido
  const addOrder = (items, total) => {

    const newOrder = {
      id: Date.now(),

      items: JSON.parse(
        JSON.stringify(items)
      ),

      total,

      date: new Date().toLocaleDateString(
        "pt-BR"
      ),
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () =>
  useContext(OrdersContext);