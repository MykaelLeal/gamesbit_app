import Product from "../models/Product.js";

const createService = (body) => Product.create(body);

const findAllService = () =>
  Product.find().sort({ createdAt: -1 });

const findByIdService = (id) =>
  Product.findById(id);

const findByCategoryService = (category) =>
  Product.find({
    category,
    active: true,
  });

const findByPlatformService = (platform) =>
  Product.find({
    platform,
    active: true,
  });

const searchProductsService = (query) =>
  Product.find({
    title: { $regex: query, $options: "i" },
    active: true,
  });

const updateService = (
  id,
  title,
  description,
  category,
  platform,
  price,
  stock,
  image,
  active
) =>
  Product.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      category,
      platform,
      price,
      stock,
      image,
      active,
    },
    {
      new: true,
    }
  );

const deleteProductByIdService = (id) =>
  Product.findByIdAndDelete(id);

export default {
  createService,
  findAllService,
  findByIdService,
  findByCategoryService,
  findByPlatformService,
  searchProductsService,
  updateService,
  deleteProductByIdService,
};