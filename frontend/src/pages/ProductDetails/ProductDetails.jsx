import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FiHeart, FiArrowLeft } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { products } from "../../data/Products.jsx";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import {NavBar} from "../../components/NavBar/NavBar.jsx";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { Footer} from "../../components/Footer/Footer.jsx";

import "../../styles/productDetails.css";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Produto não encontrado</p>;

  const isLiked = isInWishlist(product.id);

  

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
          Voltar a Loja
        </button>
      </div>

      <div className="details-container">

        <div className="details-left">

         <div className="image-card">

          <div
            className="wishlist-icon-details"
            onClick={() => toggleWishlist(product)}
          >
            {isInWishlist(product.id) ? (
              <FaHeart color="red" />
            ) : (
              <FiHeart />
            )}
          </div>

            <div className="image-content">

              <div className="image-box">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="image-info">
                <h1 className="title">{product.name}</h1>
                <span className="category">{product.category}</span>
              </div>

            </div>

          </div>

          <h3 className="description-title">
             Descrição do Produto
          </h3>

          <p className="description">
             {product.description || "Sem descrição disponível para este jogo."}
          </p>

        </div>

        <div className="details-right">

         <div className="price-box">
          {product.oldPrice && (
            <span className="old-price-details">
              {product.oldPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}

          <span className="price-details">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

          <button
            className="buy-now-btn"
            onClick={() => {
              addItem(product)
              navigate("/cart");
            }}
          >
            Comprar agora
        </button>
        </div>

      </div>

        
      </main>

      <Footer />

      </>
    );
  };