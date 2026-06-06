import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import "../../styles/productCard.css";

export const ProductCard = ({
  product,
  onAdd,
  onToggleWishlist,
  isLiked,
}) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const hasDiscount =
    product.oldPrice &&
    product.oldPrice > product.price;

  const discountPercentage =
    hasDiscount
      ? Math.round(
          ((product.oldPrice -
            product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <div
      className="card"
      onClick={goToDetails}
    >
      <div className="card-img">
        <img
          src={product.image}
          alt={product.title}
        />

        {hasDiscount && (
          <span className="discount-badge">
            {discountPercentage}% OFF
          </span>
        )}

        <div
          className="wishlist-icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
        >
          {isLiked ? (
            <FaHeart color="red" />
          ) : (
            <FiHeart />
          )}
        </div>
      </div>

      <div className="card-info">
        <h3>{product.title}</h3>

        <div className="price-container">
          {hasDiscount && (
            <span className="old-price">
              {product.oldPrice.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                }
              )}
            </span>
          )}

          <span className="price">
            {product.price.toLocaleString(
              "pt-BR",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
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