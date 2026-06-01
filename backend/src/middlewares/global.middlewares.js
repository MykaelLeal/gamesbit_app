import mongoose from "mongoose";
import userService from "../services/user.service.js";

const validId = (req, res, next) => {

  try {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "ID inválido!",
      });
    }

    next();

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};

const validUser = async (req, res, next) => {

  try {

    const { id } = req.params;

    const foundUser = await userService.findByIdService(id);

    if (!foundUser) {
      return res.status(404).send({message: "Usuário não encontrado!"});

    }

    req.id = id;
    req.foundUser = foundUser;

    next();

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const ownerOrAdminMiddleware = (req, res, next) => {

  try {

    const userId = req.params.id;

    if (req.user.id !== userId && req.user.role !== "admin") {
       return res.status(403).send({message: "Acesso negado!"});

    }

    next();

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
  
};


export {
  validId,
  validUser,
  ownerOrAdminMiddleware,
}