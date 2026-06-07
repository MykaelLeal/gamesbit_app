import userService from '../services/user.service.js';

const createUser = async (req, res) => {

    try {
    
    const {name, email, cpf, password} = req.body;

    if (!name || !cpf || !email || !password) {
       return res.status(400).send({message: "Submeta todos os campos para registrar!"})
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({message: "Erro ao criar o usuário"});
    }

    res.status(201).send({
        message:"Usuário criado com sucesso!",
        user: {
            id: user._id,
            name,
            cpf,
            email,
        },
    });

    } catch (err) {
        return res.status(500).send({message: err.message});
    }
};


const findAllUsers = async (req, res) => {

    try {
    
    const users = await userService.findAllService();

    if( users.length === 0) {
        return res.status(400).send({message: "Não há usuários cadastrados!"});
    }

    res.send(users)

   } catch (err) {
     return res.status(500).send({message: err.message});
   }

};


const findUserById = async (req, res) => {

    try {

    res.send(req.foundUser);

    } catch (err) {
       return res.status(500).send({message: err.message});
    }


};


const updateUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      avatar,
      cpf,
      phone,
    } = req.body;

    if (
      !name &&
      !username &&
      !email &&
      !password &&
      !avatar &&
      !cpf &&
      !phone
    ) {
      return res.status(400).send({
        message:
          "Submeta pelo menos um campo para realizar a atualização!",
      });
    }

    if (password) {
      const bcrypt = await import("bcrypt");

      req.body.password =
        await bcrypt.default.hash(password, 10);
    }

    const { id } = req;

    const updatedUser =
      await userService.updateService(
        id,
        name,
        username,
        email,
        req.body.password,
        avatar,
        cpf,
        phone
      );

    return res.send({
      message: "Usuário atualizado com sucesso!",
      user: updatedUser,
    });

  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};


const deleteUserById = async (req, res) => {
    try {
        const { id } = req;

        await userService.deleteUserByIdService(id);

        return res.status(200).send({
            message: 'Usuário deletado com sucesso!',
        });

    } catch (err) {
      return res.status(500).send({message: err.message});
    }
};

export default {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUserById,
}

