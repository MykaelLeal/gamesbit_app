import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");

    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items, total) => {

    const newOrder = {
      id: Date.now(),

      items: JSON.parse(JSON.stringify(items)),

      total,

      date: new Date().toLocaleDateString("pt-BR"),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);