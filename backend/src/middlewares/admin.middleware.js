const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({
        message: "Usuário não autenticado!",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).send({
        message: "Acesso negado!",
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

export default adminMiddleware;