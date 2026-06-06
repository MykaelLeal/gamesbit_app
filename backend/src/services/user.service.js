import User from "../models/User.js";

const createService = (body) =>
  User.create({
    ...body,
    role:
      body.email === "admin@gamesbit.com"
        ? "admin"
        : "client",
  });

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  cpf,
  phone
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      username,
      email,
      password,
      avatar,
      cpf,
      phone
    },
    {
      new: true,
    }
  );

const deleteUserByIdService = (id) =>
  User.findByIdAndDelete(id);

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteUserByIdService,
};