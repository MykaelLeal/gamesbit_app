import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { ProductList } from "../../components/ProductList/ProductList";
import { Modal } from "../../components/Modal/Modal";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

import { products } from "../../data/Products";
import { Footer } from "../../components/Footer/Footer";

import { Banner } from "../../components/Banner/Banner";

export const Home = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = (product) => {
    addItem(product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  
  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="home">

      <NavBar />

      <CategoryMenu />

      <Banner />

      <ProductList
        products={filteredProducts}
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