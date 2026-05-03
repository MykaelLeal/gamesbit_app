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
        <span className="price">R$ {product.price}</span>

        <button onClick={() => onAdd(product)}>
          Adicionar ao carrinho
        </button>
      </div>

    </div>
  );
};