import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar
) =>
  User.findOneAndUpdate(
    { _id: id },
    {
      name,
      username,
      email,
      password,
      avatar,
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