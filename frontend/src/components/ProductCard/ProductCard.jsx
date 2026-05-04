import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import "./productCard.css";

export const ProductCard = ({
  product,
  onAdd,
  onToggleWishlist,
  isLiked,
}) => {
  return (
    <div className="card">

      <div className="card-img">
        <img src={product.image} alt={product.name} />

        <div
          className="wishlist-icon"
          onClick={() => onToggleWishlist(product)}
        >
          {isLiked ? <FaHeart color="red" /> : <FiHeart />}
        </div>
      </div>

      <div className="card-info">
        <h3>{product.name}</h3>
       <div className="price-container">
          {product.oldPrice && (
            <span className="old-price">R$ {product.oldPrice}</span>
          )}
          <span className="price">R$ {product.price}</span>
        </div>

        <button onClick={() => onAdd(product)}>
          Adicionar ao carrinho
        </button>
      </div>

    </div>
  );
};