import {
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

import "./dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();

  const { signOut } = useContext(AuthContext);

  const [activeSection, setActiveSection] =
    useState("products");

  const users =
    JSON.parse(
      localStorage.getItem("@Auth:users")
    ) || [];

  const allOrders = users.flatMap((user) => {
    const userOrders =
      JSON.parse(
        localStorage.getItem(
          `@orders:${user.id}`
        )
      ) || [];

    return userOrders.map((order) => ({
      ...order,
      userName: user.name,
    }));
  });

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <div className="admin-page">


      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>Painel Admin</h2>
          <p>GamesBit Platform</p>
        </div>

        <nav className="admin-menu">

          <button
            className={
              activeSection === "products"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("products")
            }
          >
            <FiBox />
            Produtos
          </button>

          <button
            className={
              activeSection === "categories"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("categories")
            }
          >
            <FiGrid />
            Categorias
          </button>

          <button
            className={
              activeSection === "orders"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("orders")
            }
          >
            <FiShoppingCart />
            Pedidos
          </button>

          <button
            className={
              activeSection === "users"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("users")
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

          <div>

            <span className="admin-tag">
              Painel Administrativo
            </span>

            <h1>
              Gerenciamento da Plataforma
            </h1>

            <p>
              Gerencie produtos, pedidos,
              usuários e categorias da sua
              loja.
            </p>

          </div>

        </div>

        {activeSection === "products" && (
          <section className="admin-card">

            <div className="card-top">

              <h2>Produtos</h2>

              <button className="add-btn">
                <FiPlus />
                Novo Produto
              </button>

            </div>

            <div className="crud-list">

              <div className="crud-item">

                <div>
                  <h3>Cyber Legends</h3>
                  <span>R$ 249,90</span>
                </div>

                <div className="crud-actions">

                  <button>
                    <FiEdit2 />
                  </button>

                  <button>
                    <FiTrash2 />
                  </button>

                </div>

              </div>

            </div>

          </section>
        )}

        {activeSection === "categories" && (
          <section className="admin-card">

            <div className="card-top">

              <h2>Categorias</h2>

              <button className="add-btn">
                <FiPlus />
                Nova Categoria
              </button>

            </div>

            <div className="crud-list">

              <div className="crud-item">

                <div>
                  <h3>Ação</h3>
                </div>

                <div className="crud-actions">

                  <button>
                    <FiEdit2 />
                  </button>

                  <button>
                    <FiTrash2 />
                  </button>

                </div>

              </div>

            </div>

          </section>
        )}

        {activeSection === "orders" && (
          <section className="admin-card">

            <div className="card-top">
              <h2>Pedidos</h2>
            </div>

            <div className="crud-list">

              {allOrders.length > 0 ? (
                allOrders.map((order) => (
                  <div
                    className="crud-item"
                    key={order.id}
                  >

                    <div>

                      <h3>
                        Pedido #{order.id}
                      </h3>

                      <span>
                        Usuário:{" "}
                        {order.userName}
                      </span>

                    </div>

                    <div>

                      <strong
                        style={{
                          color: "#8b5cf6",
                        }}
                      >
                        R$ {order.total}
                      </strong>

                    </div>

                  </div>
                ))
              ) : (
                <p>
                  Nenhum pedido encontrado.
                </p>
              )}

            </div>

          </section>
        )}

        {activeSection === "users" && (
          <section className="admin-card">

            <div className="card-top">
              <h2>Usuários</h2>
            </div>

            <div className="crud-list">

              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    className="crud-item"
                    key={user.id}
                  >

                    <div>

                      <h3>{user.name}</h3>

                      <span>
                        {user.email}
                      </span>

                    </div>

                    <div className="crud-actions">

                      <button>
                        <FiEdit2 />
                      </button>

                      <button>
                        <FiTrash2 />
                      </button>

                    </div>

                  </div>
                ))
              ) : (
                <p>
                  Nenhum usuário encontrado.
                </p>
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}