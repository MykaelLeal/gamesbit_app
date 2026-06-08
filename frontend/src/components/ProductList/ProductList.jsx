import { ProductCard } from "../ProductCard/ProductCard";
import "../../styles/productList.css";

export const ProductList = ({
  products = [],
  onAdd,
  onToggleWishlist,
  isInWishlist,
}) => {
  const categories = [
    {
      key: "moderno",
      title: "Jogos Modernos",
    },
    {
      key: "classico",
      title: "Jogos Clássicos",
    },
    {
      key: "retro",
      title: "Jogos Retrô",
    },
  ];

  const offers = products.filter(
    (p) =>
      p.oldPrice &&
      p.oldPrice > p.price
  );

  return (
    <div className="product-sections">

      {offers.length > 0 && (
        <section className="category-section">

          <h2>
            🔥 Ofertas Imperdíveis
          </h2>

          <div className="products">

            {offers
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={onAdd}
                  onToggleWishlist={
                    onToggleWishlist
                  }
                  isLiked={isInWishlist?.(
                    product._id
                  )}
                />
              ))}

          </div>

        </section>
      )}

      {categories.map((cat) => {

        const filtered =
          products.filter(
            (p) =>
              p.category ===
                cat.key &&
              !(
                p.oldPrice &&
                p.oldPrice >
                  p.price
              )
          );

        if (
          filtered.length === 0
        ) {
          return null;
        }

        return (
          <section
            key={cat.key}
            className="category-section"
          >

            <h2>
              {cat.title}
            </h2>

            <div className="products">

              {filtered
                .slice(0, 8)
                .map((product) => (
                  <ProductCard
                    key={
                      product._id
                    }
                    product={
                      product
                    }
                    onAdd={onAdd}
                    onToggleWishlist={
                      onToggleWishlist
                    }
                    isLiked={isInWishlist?.(
                      product._id
                    )}
                  />
                ))}

            </div>

          </section>
        );
      })}

    </div>
  );
};