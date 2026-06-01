import {
  findCartByUserIdService,
  addItemToCartService,
  updateItemQuantityService,
  removeItemFromCartService,
  clearCartService,
} from "../services/cart.service.js";


export const getCart = async (req, res) => {
  try {
    const { id } = req.user;

    const cart = await findCartByUserIdService(id);

    if (!cart) {
      return res.status(404).send({
        message: "Carrinho não encontrado",
      });
    }

    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).send({
        message: "ProductId é obrigatório",
      });
    }

    const cart = await addItemToCartService(
      id,
      productId,
      quantity || 1
    );

    return res.status(200).send({
      message: "Produto adicionado ao carrinho",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const updateItemQuantity = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).send({
        message: "Quantidade é obrigatória",
      });
    }

    const cart = await updateItemQuantityService(
      id,
      productId,
      quantity
    );

    return res.status(200).send({
      message: "Quantidade atualizada",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;

    const cart = await removeItemFromCartService(
      id,
      productId
    );

    return res.status(200).send({
      message: "Produto removido do carrinho",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { id } = req.user;

    const cart = await clearCartService(id);

    return res.status(200).send({
      message: "Carrinho esvaziado",
      cart,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};