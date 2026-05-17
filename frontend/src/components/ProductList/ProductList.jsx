import { ProductCard } from "../ProductCard/ProductCard";

import "../../styles/productList.css";

export const ProductList = ({
  products,
  onAdd,
  onToggleWishlist,
  isInWishlist,
}) => {
  const categories = [
    { key: "offer", title: "Ofertas Imperdíveis" },
    { key: "modern", title: "Jogos Modernos" },
    { key: "classic", title: "Jogos Clássicos" },
    { key: "retro", title: "Jogos Retrô" },
  ];

  return (

    <div className="product-sections">
      {categories.map((category) => {
        const filteredProducts = products
          .filter((p) => p.type === category.key)
          .slice(0, 4);

        if (filteredProducts.length === 0) return null;

        return (
          <section key={category.key} className="category-section">
            <h2>{category.title}</h2>

            <div className="products">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  onToggleWishlist={onToggleWishlist}
                  isLiked={isInWishlist(product.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
  };