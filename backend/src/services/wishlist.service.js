import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const findWishlistByUserIdService = async (userId) => {
  return await Wishlist.findOne({ userId }).populate("products");
};

export const addProductToWishlistService = async (
  userId,
  productId
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado");
  }

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId,
      products: [],
    });
  }

  const alreadyExists = wishlist.products.some(
    (product) => product.toString() === productId
  );

  if (alreadyExists) {
    throw new Error("Produto já está na lista de desejos.");
  }

  wishlist.products.push(productId);

  await wishlist.save();

  return wishlist;
};

export const removeProductFromWishlistService = async (
  userId,
  productId
) => {
  const wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    throw new Error("Lista de desejo não encontrada");
  }

  wishlist.products = wishlist.products.filter(
    (product) => product.toString() !== productId
  );

  await wishlist.save();

  return wishlist;
};

export const clearWishlistService = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    throw new Error("Lista de desejo não encontrada");
  }

  wishlist.products = [];

  await wishlist.save();

  return wishlist;
};

export const checkProductInWishlistService = async (
  userId,
  productId
) => {
  const wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    return false;
  }

  return wishlist.products.some(
    (id) => id.toString() === productId
  );
};