import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import "./productCard.css";

export const ProductCard = ({
  product,
  onAdd,
  onToggleWishlist,
  isLiked,
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card" onClick={goToDetails}>

      <div className="card-img">
        <img src={product.image} alt={product.name} />

        <div
          className="wishlist-icon"
          onClick={(e) => {
            e.stopPropagation(); 
            onToggleWishlist(product);
          }}
        >
          {isLiked ? <FaHeart color="red" /> : <FiHeart />}
        </div>
      </div>

      <div className="card-info">
        <h3>{product.name}</h3>

        <div className="price-container">
          {product.oldPrice && (
            <span className="old-price">
              {product.oldPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}

          <span className="price">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); 
            onAdd(product);
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>

    </div>
  );
};