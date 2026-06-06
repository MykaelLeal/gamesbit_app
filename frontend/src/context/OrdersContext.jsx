import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../service/api";

const OrdersContext = createContext();

export const OrdersProvider = ({
  children,
}) => {
  const [orders, setOrders] =
    useState([]);

  const loadOrders = async () => {
    try {
      const response =
        await api.get(
          "/orders/my-orders"
        );

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem(
        "@Auth:token"
      );

    if (token) {
      loadOrders();
    }
  }, []);

  const addOrder = async (
    shippingAddress
  ) => {
    try {
      const response =
        await api.post("/orders", {
          shippingAddress,
        });

      setOrders((prev) => [
        response.data.order,
        ...prev,
      ]);

      return response.data.order;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getOrderById = async (
    orderId
  ) => {
    try {
      const response =
        await api.get(
          `/orders/${orderId}`
        );

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        getOrderById,
        loadOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () =>
  useContext(OrdersContext);