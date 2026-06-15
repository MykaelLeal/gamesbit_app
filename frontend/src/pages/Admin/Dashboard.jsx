import {
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { ProductsAdmin } from "./ProductsAdmin";
import { OrdersAdmin } from "./OrdersAdmin";
import { UsersAdmin } from "./UsersAdmin";

import "../../styles/dashboard.css";

export const Dashboard = () => {

  const { signOut } = useContext(AuthContext);

  const [activeSection, setActiveSection] = useState("products");

  const handleLogout = () => { signOut() };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>Painel Admin</h2>
          <p>GamesBit Platform</p>
        </div>

        <nav className="admin-menu">

          <button
            onClick={() =>
              setActiveSection("products")
            }
            className={
              activeSection === "products"
                ? "active"
                : ""
            }
          >
            <FiBox />
            Produtos
          </button>

          <button
            onClick={() =>
              setActiveSection("orders")
            }
            className={
              activeSection === "orders"
                ? "active"
                : ""
            }
          >
            <FiShoppingCart />
            Pedidos
          </button>

          <button
            onClick={() =>
              setActiveSection("users")
            }
            className={
              activeSection === "users"
                ? "active"
                : ""
            }
          >
            <FiUsers />
            Usuários
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />
            Sair
          </button>

        </nav>
      </aside>

      <main className="admin-content">

        <div className="admin-header">
          <span className="admin-tag">
            Painel Administrativo
          </span>

          <h1>
            Bem-vindo ao painel da
            GamesBit
          </h1>

          <p>
            Gerencie produtos,
            pedidos e usuários da
            plataforma.
          </p>
        </div>

        {activeSection === "products" && (
          <ProductsAdmin />
        )}

        {activeSection === "orders" && (
          <OrdersAdmin />
        )}

        {activeSection === "users" && (
          <UsersAdmin />
        )}

      </main>
    </div>
  );
}