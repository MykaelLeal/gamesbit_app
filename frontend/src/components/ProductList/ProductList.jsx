import { ProductCard } from "../ProductCard/ProductCard";
import "./productList.css"

export const ProductList = ({
  products,
  onAdd,
  onToggleWishlist,
  isInWishlist,
}) => {
  return (
    <section className="products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAdd}
          onToggleWishlist={onToggleWishlist}
          isLiked={isInWishlist(product.id)}
        />
      ))}
    </section>
  );
};