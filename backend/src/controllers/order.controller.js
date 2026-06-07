import {
  createOrderService,
  findOrdersByUserService,
  findOrderByIdService,
  findAllOrdersService,
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { id } = req.user;

    const order = await createOrderService(id);

    return res.status(201).send({
      message: "Pedido criado com sucesso",
      order,
    });
    
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await findOrdersByUserService(id);

    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await findOrderByIdService(orderId);

    if (!order) {
      return res.status(404).send({
        message: "Pedido não encontrado",
      });
    }

    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await findAllOrdersService();

    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};