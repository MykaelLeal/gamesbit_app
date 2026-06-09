import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const calculateTotal = (items) => {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const findCartByUserIdService = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "title price oldPrice image category platform"
  );

  if (!cart) return null;

  cart.items.forEach((item) => {
    item.price = item.productId.price;
  });

  cart.total = calculateTotal(cart.items);

  await cart.save();

  return cart;
};

export const createCartService = async (userId) => {
  const existingCart = await Cart.findOne({ userId });

  if (existingCart) {
    return existingCart;
  }

  const cart = await Cart.create({
    userId,
    items: [],
    total: 0,
  });

  return cart;
};

export const addItemToCartService = async (
  userId,
  productId,
  quantity = 1
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
      total: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      price: product.price,
    });
  }

  cart.total = calculateTotal(cart.items);

  await cart.save();

  return cart;
};

export const updateItemQuantityService = async (
  userId,
  productId,
  quantity
) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  const item = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (!item) {
    throw new Error("Produto não encontrado no carrinho");
  }

  item.quantity = quantity;

  if (item.quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
  }

  cart.total = calculateTotal(cart.items);

  await cart.save();

  return cart;
};

export const removeItemFromCartService = async (
  userId,
  productId
) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  cart.total = calculateTotal(cart.items);

  await cart.save();

  return cart;
};

export const clearCartService = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new Error("Carrinho não encontrado");
  }

  cart.items = [];
  cart.total = 0;

  await cart.save();

  return cart;
};