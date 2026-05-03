import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useState } from "react";

import "./navBar.css";
 
 export const NavBar = () => {
    const navigate = useNavigate();

    const { addItem, cart } = useCart();
    const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

    const totalItems = cart.reduce(
     (acc, item) => acc + item.quantity, 0
    );


    return(

        <nav className="navbar">

            <div className="nav-left">
                <h2 className="logo">GamesBit</h2>

                <div className="search">
                   <input type="text" placeholder="Buscar jogos..." />
                </div>
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
 
 