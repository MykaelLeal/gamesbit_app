import { ProductCard } from "../ProductCard/ProductCard";
import "./productList.css";

export const ProductList = ({
  products,
  onAdd,
  onToggleWishlist,
  isInWishlist,
}) => {
  const categories = [
    { key: "ofertas", title: "Ofertas Imperdíveis", isOffer: true },
    { key: "modernos", title: "Jogos Modernos" },
    { key: "classicos", title: "Jogos Clássicos" },
    { key: "retro", title: "Jogos Retrô" },
  ];

  return (
    <div className="product-sections">
      {categories.map((category) => {
        let filteredProducts = [];

        // 🔥 CASO ESPECIAL: OFERTAS
        if (category.isOffer) {
          filteredProducts = products
            .filter((p) => p.isOffer)
            .slice(0, 4);
        } 
        // 🎮 OUTRAS CATEGORIAS
        else {
          filteredProducts = products
            .filter((p) => p.category === category.key)
            .slice(0, 4);
        }

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