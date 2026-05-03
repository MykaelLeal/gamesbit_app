import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";

import "../../styles/wishlist.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { Footer } from "../../components/Footer/Footer";

export const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
   <div>

    <NavBar />
    <CategoryMenu />

    <main>

       <div className="wishlist-header">
            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                <FiArrowLeft />
                Voltar
            </button>
            <h2 className="page-title">Minha Lista de Desejos</h2>
        </div>

        {wishlist.length === 0 ? (
        <div className="empty">
            <h3>Sua lista está vazia</h3>
            <p>Adicione jogos que você gosta</p>

            <button onClick={() => navigate("/")}>
            Ir para loja
            </button>
        </div>
        ) : (
        <div className="wishlist-grid">
            {wishlist.map((item) => (
            <ProductCard
                key={item.id}
                product={item}
                onAdd={addItem}
                onToggleWishlist={toggleWishlist}
                isInWishlist={() => true}
                forceWishlist={true}
            />
            ))}
        </div>
        )}

    </main>
    <Footer />
    </div>
    
    );
    };