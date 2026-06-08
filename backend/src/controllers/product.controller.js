import productService from "../services/product.service.js";

const createProduct = async (req, res) => {

  try {

    const { title, description, category, platform, price, stock, image} = req.body;

    if (!title || !description || !category || !platform || !price || !stock || !image ) {
       return res.status(400).send({ message: "Submeta todos os campos para cadastrar o produto!"});

    }

    const product = await productService.createService(req.body);

    if (!product) {
      return res.status(400).send({
        message: "Erro ao criar produto!",
      });
    }

    res.status(201).send({
      message: "Produto criado com sucesso!",
      product,
    });

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const findAllProducts = async (req, res) => {

  try {

    const products = await productService.findAllService();

    if (products.length === 0) {
      return res.status(400).send({
        message: "Não há produtos cadastrados!",
      });
    }

    res.send(products);

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const findProductById = async (req, res) => {

  try {

    const { id } = req.params;

    const product = await productService.findByIdService(id);

    if (!product) {
      return res.status(404).send({
        message: "Produto não encontrado!",
      });
    }

    res.send(product);

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const findProductsByCategory = async (req, res) => {

  try {

    const { category } = req.params;

    const products = await productService.findByCategoryService(
      category
    );

    res.send(products);

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const findProductsByPlatform = async (req, res) => {

  try {

    const { platform } = req.params;

    const products = await productService.findByPlatformService(platform);

    res.send(products);
  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const searchProducts = async (req, res) => {

  try {

    const { q } = req.query;

    const products = await productService.searchProductsService(q);

    res.send(products);

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};

const updateProduct = async (req, res) => {

  try {

    const {title, description, category, platform,oldPrice, price, stock, image, active} = req.body;

    if (!title && !description && !category && !platform && !price && !stock && !image &&
       active === undefined
    ) {

      return res.status(400).send({
        message:
          "Submeta pelo menos um campo para atualizar o produto!",
      });

    }

    const { id } = req.params;

    const updatedProduct = await productService.updateService(
      id,
      title,
      description,
      category,
      platform,
      oldPrice,
      price,
      stock,
      image,
      active
    );

    res.send({
      message: "Produto atualizado com sucesso!",
      updatedProduct,
    });

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProductByIdService(id);

    return res.status(200).send({
      message: "Produto deletado com sucesso!",
    });

  } catch (err) {
    return res.status(500).send({message: err.message});

  }
};


export default {
  createProduct,
  findAllProducts,
  findProductById,
  findProductsByCategory,
  findProductsByPlatform,
  searchProducts,
  updateProduct,
  deleteProductById,
};