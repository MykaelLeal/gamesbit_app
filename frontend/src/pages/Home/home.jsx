import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { ProductList } from "../../components/ProductList/ProductList";
import { Modal } from "../../components/Modal/Modal";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { products } from "../../data/Products";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  const navigate = useNavigate();

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = (product) => {
    addItem(product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="home">

      <NavBar />

      <CategoryMenu />

      <ProductList
        products={products}
        onAdd={handleAdd}
        onToggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />

      <Footer />

      <Modal
        show={showModal}
        product={selectedProduct}
        onClose={() => setShowModal(false)}
        onGoCart={() => navigate("/cart")}
      />

     
    </div>
  );
};