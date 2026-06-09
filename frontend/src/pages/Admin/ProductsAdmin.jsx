import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
} from "react-icons/fi";

import {
  useEffect,
  useState,
} from "react";

import api from "../../service/api";

import "../../styles/productAdmin.css";

export function ProductsAdmin() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [showDeleteModal, setShowDeleteModal] =  useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response =
        await api.get("/product/");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(
          form.price
        ),
        oldPrice:
          form.oldPrice
            ? Number(
                form.oldPrice
              )
            : null,
        stock: Number(
          form.stock
        ),
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

  const handleEdit = (
    product
  ) => {
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

          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={
              handleChange
            }
            required
          />

          <textarea
            name="description"
            placeholder="Descrição"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            required
          />

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

          <input
            type="number"
            name="price"
            placeholder="Preço"
            value={form.price}
            onChange={
              handleChange
            }
            required
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Preço promocional"
            value={
              form.oldPrice
            }
            onChange={
              handleChange
            }
          />

          <input
            type="number"
            name="stock"
            placeholder="Estoque"
            value={form.stock}
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="image"
            placeholder="URL da imagem"
            value={form.image}
            onChange={
              handleChange
            }
            required
          />

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
        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

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

            <span className="warning-text">
              Esta ação não poderá ser desfeita.
            </span>

            <div className="admin-modal-actions">

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