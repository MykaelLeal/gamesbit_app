import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../service/api";

import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Modal } from "../../components/Modal/Modal";
import { NavBar } from "../../components/NavBar/NavBar";
import { Footer } from "../../components/Footer/Footer";

import "../../styles/products.css";

export const Products = () => {
  const navigate = useNavigate();

  const {
    platform: urlPlatform,
    category: urlCategory,
  } = useParams();

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } =
    useWishlist();

  const [products, setProducts] = useState([]);

  const [categories, setCategories] =
    useState(
      urlCategory &&
        urlCategory !== "all"
        ? [urlCategory]
        : []
    );

  const [platforms, setPlatforms] =
    useState(
      urlPlatform &&
        urlPlatform !== "all"
        ? [urlPlatform]
        : []
    );

  const [showModal, setShowModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response =
        await api.get("/product/");

      setProducts(response.data);

      console.log(
        "Produtos:",
        response.data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = (product) => {
    addItem(product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter(
            (item) => item !== value
          )
        : [...prev, value]
    );
  };

  const handlePlatform = (value) => {
    setPlatforms((prev) =>
      prev.includes(value)
        ? prev.filter(
            (item) => item !== value
          )
        : [...prev, value]
    );
  };

  const filteredProducts =
    products.filter((product) => {
      const matchCategory =
        categories.length === 0 ||
        categories.includes(
          product.category
        );

      const matchPlatform =
        platforms.length === 0 ||
        platforms.includes(
          product.platform
        );

      return (
        matchCategory &&
        matchPlatform
      );
    });

  return (
    <>
      <NavBar />

      <div className="products-page">
        <div
          className="back-button"
          onClick={() => navigate("/")}
        >
          <FiArrowLeft />
          <span>Voltar à loja</span>
        </div>

        <div className="products-header">
          <h1>Explorar Jogos</h1>

          <p>
            Filtre por categoria e
            plataforma
          </p>
        </div>

        <div className="products-layout">
          <div className="filters-card">
            <h3>Filtros</h3>

            <div className="filter-section">
              <span>Categoria</span>

              <label>
                <input
                  type="checkbox"
                  value="moderno"
                  checked={categories.includes(
                    "moderno"
                  )}
                  onChange={(e) =>
                    handleCategory(
                      e.target.value
                    )
                  }
                />
                Modernos
              </label>

              <label>
                <input
                  type="checkbox"
                  value="classico"
                  checked={categories.includes(
                    "classico"
                  )}
                  onChange={(e) =>
                    handleCategory(
                      e.target.value
                    )
                  }
                />
                Clássicos
              </label>

              <label>
                <input
                  type="checkbox"
                  value="retro"
                  checked={categories.includes(
                    "retro"
                  )}
                  onChange={(e) =>
                    handleCategory(
                      e.target.value
                    )
                  }
                />
                Retrô
              </label>
            </div>

            <div className="filter-section">
              <span>Plataforma</span>

              <label>
                <input
                  type="checkbox"
                  value="xbox"
                  checked={platforms.includes(
                    "xbox"
                  )}
                  onChange={(e) =>
                    handlePlatform(
                      e.target.value
                    )
                  }
                />
                Xbox
              </label>

              <label>
                <input
                  type="checkbox"
                  value="playstation"
                  checked={platforms.includes(
                    "playstation"
                  )}
                  onChange={(e) =>
                    handlePlatform(
                      e.target.value
                    )
                  }
                />
                PlayStation
              </label>

              <label>
                <input
                  type="checkbox"
                  value="nintendo"
                  checked={platforms.includes(
                    "nintendo"
                  )}
                  onChange={(e) =>
                    handlePlatform(
                      e.target.value
                    )
                  }
                />
                Nintendo
              </label>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length ===
            0 ? (
              <div className="no-products">
                <h2>
                  Nenhum produto
                  encontrado.
                </h2>

                <p>
                  Tente alterar os
                  filtros para ver
                  mais opções.
                </p>

                <button
                  onClick={() => {
                    setCategories([]);
                    setPlatforms([]);
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAdd={handleAdd}
                    onToggleWishlist={toggleWishlist}
                    isLiked={isInWishlist(product._id)}
                  />
                )
              )
            )}
          </div>
        </div>

        <Modal
          show={showModal}
          product={selectedProduct}
          onClose={() =>
            setShowModal(false)
          }
          onGoCart={() =>
            navigate("/cart")
          }
        />
      </div>

      <Footer />
    </>
  );
};