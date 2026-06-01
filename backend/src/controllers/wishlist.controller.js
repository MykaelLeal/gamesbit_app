import {
  findWishlistByUserIdService,
  addProductToWishlistService,
  removeProductFromWishlistService,
  clearWishlistService,
  checkProductInWishlistService,
} from "../services/wishlist.service.js";

export const getWishlist = async (req, res) => {
  try {
    const { id } = req.user;

    const wishlist = await findWishlistByUserIdService(id);

    if (!wishlist) {
      return res.status(200).send({
        products: [],
      });
    }

    return res.status(200).send(wishlist);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const addProductToWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).send({
        message: "ProductId é obrigatório",
      });
    }

    const wishlist = await addProductToWishlistService(
      id,
      productId
    );

    return res.status(200).send({
      message: "Produto adicionado à wishlist",
      wishlist,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const removeProductFromWishlist = async (req, res) => {

  try {
    const { id } = req.user;
    const { productId } = req.params;

    const wishlist =
      await removeProductFromWishlistService(
        id,
        productId
      );

    return res.status(200).send({
      message: "Produto removido da wishlist",
      wishlist,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};


export const clearWishlist = async (req, res) => {
  try {
    const { id } = req.user;

    const wishlist =
      await clearWishlistService(id);

    return res.status(200).send({
      message: "Wishlist limpa",
      wishlist,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const checkWishlistProduct = async (req, res) => {
    
  try {
    const { id } = req.user;
    const { productId } = req.params;

    const isFavorite =
      await checkProductInWishlistService(
        id,
        productId
      );

    return res.status(200).send({
      isFavorite,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};