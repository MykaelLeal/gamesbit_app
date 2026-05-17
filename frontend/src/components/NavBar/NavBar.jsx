import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiLogOut,
  FiPackage,
  FiSettings,
} from "react-icons/fi";

import { FaHeart } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { AuthContext } from "../../context/AuthContext";

import {
  useState,
  useContext,
} from "react";

import { products } from "../../data/Products";

import "../../styles/navBar.css";

import logo from "../../assets/logo.png";

export const NavBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const { addItem, cart } = useCart();

  const {
    wishlist,
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    user,
    signed,
    signOut,
  } = useContext(AuthContext);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const filteredProducts =
    search.trim().length > 0
      ? products.filter((product) =>
          product.name
            .toLowerCase()
            .startsWith(search.toLowerCase())
        )
      : [];

  return (
    <nav className="navbar">

      <div
        className="logo-container"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="logo"
          className="logo-img"
        />

        <h2 className="logo">
          GamesBit
        </h2>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Buscar jogos..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
            <span className="badge">
              {wishlist.length}
            </span>
          )}
        </div>

        <div
          className="icon cart"
          onClick={() => navigate("/cart")}
        >
          <FiShoppingCart />

          {totalItems > 0 && (
            <span className="badge">
              {totalItems}
            </span>
          )}
        </div>

        {signed ? (

          <div className="profile-wrapper-menu">

            <div
              className="profile-avatar-menu"
              onClick={() =>
                setOpenMenu(!openMenu)
              }
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.name || "user"} />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>

            {openMenu && (
              <div className="profile-menu-">

                <div className="profile-header-menu">
                  <div className="profile-avatar-menu large">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase()
                    )}

                  </div>

                  <div>
                    <h4>{user?.name}</h4>
                    <p>{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpenMenu(false);
                  }}
                >
                  <FiUser />
                  Meu Perfil
                </button>

                <button
                  onClick={() => {
                    navigate("/orders");
                    setOpenMenu(false);
                  }}
                >
                  <FiPackage />
                  Meus Pedidos
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setOpenMenu(false);
                    }}
                  >
                    <FiSettings />
                    Dashboard
                  </button>
                )}

                <button
                  className="logout-btn"
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                >
                  <FiLogOut />
                  Sair
                </button>

              </div>
            )}

          </div>

        ) : (

          <>
            <button
              className="login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register"
              onClick={() => navigate("/register")}
            >
              Registrar-se
            </button>
          </>

        )}

      </div>
    </nav>
  );
};

