import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart, FiArrowLeft } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import api from "../../service/api";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { Footer } from "../../components/Footer/Footer";

import "../../styles/productDetails.css";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } =
    useWishlist();

  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const response =
        await api.get(`/product/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

   useEffect(() => {
    loadProduct();
  }, [id]);

  
  if (!product) {
    return (
      <>
        <NavBar />
        <CategoryMenu />
        <main>
          <p>Carregando produto...</p>
        </main>
        <Footer />
      </>
    );
  }

  const inStock = product?.stock > 0;

  return (
    <>
      <NavBar />
      <CategoryMenu />

      <main>
        <div className="details-header">
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft />
            Voltar à Loja
          </button>
        </div>

        <div className="details-container">
          <div className="details-left">
            <div className="image-card">
              <div
                className="wishlist-icon-details"
                onClick={() =>
                  toggleWishlist(product)
                }
              >
                {isInWishlist(
                  product._id
                ) ? (
                  <FaHeart color="red" />
                ) : (
                  <FiHeart />
                )}
              </div>

              <div className="image-content">
                <div className="image-box">
                  <img
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className="image-info">
                  <h1 className="title">
                    {product.title}
                  </h1>

                  <span className="category">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="description-title">
              Descrição do Produto
            </h3>

            <p className="description">
              {product.description ||
                "Sem descrição disponível para este jogo."}
            </p>
          </div>

          <div className="details-right">
            <div className="price-box">
              {product.oldPrice && (
                <span className="old-price-details">
                  {product.oldPrice.toLocaleString(
                    "pt-BR",
                    {
                      style:
                        "currency",
                      currency:
                        "BRL",
                    }
                  )}
                </span>
              )}

              <span className="price-details">
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

            {inStock ? (
            <button
              className="buy-now-btn"
              onClick={() => {
                addItem(product);
                navigate("/cart");
              }}
            >
              Comprar agora
            </button>
          ) : (
            <button
              className="buy-now-btn disabled"
              disabled
            >
              Produto indisponível
            </button>
          )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};