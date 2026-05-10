import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useState } from "react";

import { products } from "../../data/Products";


import "./navBar.css";

import logo from "../../assets/logo.png";
 
 export const NavBar = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const { addItem, cart } = useCart();
    const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

    const totalItems = cart.reduce(
     (acc, item) => acc + item.quantity, 0
    );

    const filteredProducts =
        search.trim().length > 0
            ? products.filter((product) =>
                product.name
                    .toLowerCase()
                    .startsWith(search.toLowerCase())
            )
            : [];


    return(

        <nav className="navbar">

             <div className="logo-container" onClick={() => navigate("/")}>
                <img src={logo} alt="logo" className="logo-img" />
                <h2 className="logo">GamesBit</h2>
            </div>

               <div className="search">
                <input
                    type="text"
                    placeholder="Buscar jogos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (

                    <div className="search-dropdown">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="search-item"
                                    onClick={() => {
                                        navigate(`/product/${product.id}`);
                                        setSearch("");
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <span>
                                        {product.name}
                                    </span>

                                </div>

                            ))

                        ) : (
                            <p className="no-results">
                                Nenhum jogo encontrado
                            </p>

                        )}

                    </div>

                )}

            </div>


            <div className="nav-actions">

                <div
                className="icon"
                onClick={() => navigate("/wishlist")}
                >
                <FiHeart />
                {wishlist.length > 0 && (
                    <span className="badge">{wishlist.length}</span>
                )}
                </div>

                <div
                className="icon cart"
                onClick={() => navigate("/cart")}
                >
                <FiShoppingCart />

                {totalItems > 0 && (
                <span className="badge">{totalItems}</span>
                )}

                </div>

                <button className="login" onClick={() => navigate("/login")}>
                Login
                </button>

                <button className="register" onClick={() => navigate("/register")}>
                Registrar-se
                </button>

            </div>
        </nav>

    );



 }
 
 