import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: "Token não informado!",
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).send({
        message: "Token inválido!",
      });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
      return res.status(401).send({
        message: "Token mal formatado!",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_JWT
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).send({
        message: "Usuário não encontrado!",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Token inválido!",
    });
  }
};

export default authMiddleware;