import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrderService = async (
  userId,
  shippingAddress
) => {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId"
  );

  if (!cart || cart.items.length === 0) {
    throw new Error("Carrinho vazio");
  }

  const orderNumber = `GB-${Date.now()}`;

  const products = cart.items.map((item) => ({
    productId: item.productId._id,
    title: item.productId.title,
    image: item.productId.image,
    quantity: item.quantity,
    price: item.price,
  }));

  const order = await Order.create({
    orderNumber,
    userId,
    products,
    total: cart.total,
    shippingAddress,
  });

  cart.items = [];
  cart.total = 0;

  await cart.save();

  return order;
};

export const findOrdersByUserService = async (
  userId
) => {
  return await Order.find({ userId })
    .sort({ createdAt: -1 });
};

export const findOrderByIdService = async (
  orderId
) => {
  return await Order.findById(orderId)
    .populate("userId", "name email");
};

export const findAllOrdersService = async () => {
  return await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
};