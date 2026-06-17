import {FiEdit2, FiTrash2, FiPlus, FiX} from "react-icons/fi";

import {useEffect, useState} from "react";

import api from "../../service/api";

import "../../styles/productAdmin.css";


export const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showDeleteModal, setShowDeleteModal] =  useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [errors, setErrors] = useState({});

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      category: "moderno",
      platform: "playstation",
      price: "",
      oldPrice: "",
      stock: "",
      image: "",
    });


  const loadProducts = async () => {
    try {
      const response =
        await api.get("/product/");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    loadProducts();
  }, []);


  const resetForm = () => {
    setEditingId(null);
    setErrors({});

    setForm({
      title: "",
      description: "",
      category: "moderno",
      platform: "playstation",
      price: "",
      oldPrice: "",
      stock: "",
      image: "",
    });
  };


  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Título obrigatório";
    }

    if (!form.description.trim()) {
      newErrors.description = "Descrição obrigatória";
    }

    if (!form.image.trim()) {
      newErrors.image = "Imagem obrigatória";
    } else {
      try {
        new URL(form.image);
      } catch {
        newErrors.image =
          "URL da imagem inválida";
      }
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price =
        "Preço deve ser maior que zero";
    }

    if (
      form.oldPrice &&
      Number(form.oldPrice) <= 0
    ) {
      newErrors.oldPrice =
        "Preço promocional inválido";
    }

    if (
      form.oldPrice &&
      Number(form.oldPrice) <=
        Number(form.price)
    ) {
      newErrors.oldPrice =
        "Preço antigo deve ser maior que o preço normal";
    }

    if (!form.stock && form.stock !== 0) {
      newErrors.stock =
        "Estoque obrigatório";
    } else if (
      Number(form.stock) < 0
    ) {
      newErrors.stock =
        "Estoque não pode ser negativo";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };


  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      title: product.title,
      description:
        product.description,
      category:
        product.category,
      platform:
        product.platform,
      price: product.price,
      oldPrice:
        product.oldPrice || "",
      stock: product.stock,
      image: product.image,
    });

    setShowForm(true);
  };


  const confirmDelete = async () => {
    try {
      await api.delete(
        `/product/${selectedProduct._id}`
      );

      loadProducts();

      setShowDeleteModal(false);
      setSelectedProduct(null);

    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice
          ? Number(form.oldPrice)
          : null,
        stock: Number(form.stock),
      };

      if (editingId) {
        await api.patch(
          `/product/${editingId}`,
          payload
        );
      } else {
        await api.post(
          "/product/",
          payload
        );
      }

      resetForm();
      setShowForm(false);
      loadProducts();

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="admin-card">

      <div className="card-top">

        <h2>Produtos</h2>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FiPlus />
          Novo Produto
        </button>

      </div>

      {showForm && (
        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <div className="form-header">

            <h3>
              {editingId
                ? "Editar Produto"
                : "Novo Produto"}
            </h3>

            <button
              type="button"
              onClick={() => {
                setShowForm(
                  false
                );

                resetForm();
              }}
            >
              <FiX />
            </button>

          </div>

          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            {errors.title && (
              <span className="error-message">
                {errors.title}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              
            />

            {errors.description && (
              <span className="error-message">
                {errors.description}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              name="category"
              value={
                form.category
              }
              onChange={
                handleChange
              }
            >
              <option value="retro">
                Retrô
              </option>

              <option value="classico">
                Clássico
              </option>

              <option value="moderno">
                Moderno
              </option>
            </select>
          </div>

        <div className="form-group">
          <label>Plataforma</label>
          <select
            name="platform"
            value={
              form.platform
            }
            onChange={
              handleChange
            }
          >
            <option value="playstation">
              PlayStation
            </option>

            <option value="xbox">
              Xbox
            </option>

            <option value="nintendo">
              Nintendo
            </option>
          </select>
         </div>


        <div className="form-group">
          <label>Preço</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}

          />

            {errors.price && (
            <span className="error-message">
              {errors.price}
            </span>
          )}
        </div>


        <div className="form-group">
          <label>Preço antigo</label>
          <input
            type="number"
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
          />

          {errors.oldPrice && (
            <span className="error-message">
              {errors.oldPrice}
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Estoque</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}  
          />

          {errors.stock && (
            <span className="error-message">
              {errors.stock}
            </span>
          )}
         </div>

        <div className="form-group">
          <label>URL da imagem</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />

          {errors.image && (
            <span className="error-message">
              {errors.image}
            </span>
          )}
        </div>


          <button
            type="submit"
          >
            {editingId
              ? "Atualizar Produto"
              : "Cadastrar Produto"}
          </button>

        </form>
      )}

      <div className="crud-list">

        {products.map(
          (product) => (
            <div
              className="crud-item"
              key={
                product._id
              }
            >
              <div>

                <h3>
                  {
                    product.title
                  }
                </h3>

                <span>
                  {product.price.toLocaleString(
                    "pt-BR",
                    {
                      style:
                        "currency",
                      currency:
                        "BRL",
                    }
                  )}
                </span>

              </div>

              <div className="crud-actions">

                <button
                  onClick={() =>
                    handleEdit(
                      product
                    )
                  }
                >
                  <FiEdit2 />
                </button>

                <button
                  onClick={() =>
                    openDeleteModal(product)
                  }
                >
                  <FiTrash2 />
                </button>

              </div>

            </div>
          )
        )}

        {showDeleteModal && (
        <div className="admin-product-modal-overlay">

          <div className="admin-product-modal">

            <div className="admin-product-modal-header">

              <h3>
                Excluir Produto
              </h3>

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProduct(null);
                }}
              >
                <FiX />
              </button>

            </div>

            <p>
              Tem certeza que deseja excluir o produto
              <strong>
                {" "}
                {selectedProduct?.title}
              </strong>
              ?
            </p>

            <span className="warning-product-text">
              Esta ação não poderá ser desfeita.
            </span>

            <div className="admin-product-modal-actions">

              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProduct(null);
                }}
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDelete}
              >
                Excluir
              </button>

            </div>

          </div>

        </div>
      )}

      </div>

    </section>
  );
}