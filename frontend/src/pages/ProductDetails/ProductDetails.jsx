import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { products } from "../../data/Products.jsx";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((p) => p.id === Number(id));

  const isLiked = isInWishlist(product.id);

  const navigate = useNavigate();

  return (
    <div className="details-container">

      <div className="details-left">

       <div className="image-card">

          <div className="wishlist-icon-details">
            {isLiked ? <FaHeart color="red" /> : <FiHeart />}
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

        <p className="description">
          {product.description || "Sem descrição disponível para este jogo."}
        </p>

      </div>

      <div className="details-right">

        <div className="price-box">
          {product.oldPrice && (
            <span className="old-price-details">
              R$ {product.oldPrice.toFixed(2)}
            </span>
          )}

          <span className="price-details">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        <button
          className="buy-btn"
          onClick={() => addToCart(product)}
        >
          Adicionar ao carrinho
        </button>

        <button
          className="buy-now-btn"
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Comprar agora
       </button>
      </div>

    </div>
  );
};