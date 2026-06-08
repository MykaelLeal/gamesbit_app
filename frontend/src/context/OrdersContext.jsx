import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../service/api";

import { AuthContext } from "./AuthContext";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  const loadOrders = async () => {
    try {
      const response =
        await api.get(
          "/orders/my-orders"
        );

         console.log("Pedidos:", response.data);

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  
 const addOrder = async () => {
  try {
    const response = await api.post("/orders");

    await loadOrders();

    return response.data.order;
  } catch (error) {
    console.error(error.response?.data);
    return null;
  }
};


  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        loadOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () =>
  useContext(OrdersContext);