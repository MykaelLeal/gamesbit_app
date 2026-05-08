import {
  FiBox,
  FiGrid,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiEdit2,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

import { useState } from "react";

import "./dashboard.css";

export function Dashboard() {
    const [activeSection, setActiveSection] = useState("products");

    
  return (
    <div className="admin-page">

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h2>Painel Admin</h2>
          <p>GamesBit Platform</p>
        </div>

        <nav className="admin-menu">

          <button
            className={activeSection === "products" ? "active" : ""}
            onClick={() => setActiveSection("products")}
            >
            <FiBox />
            Produtos
            </button>

            <button
            className={activeSection === "categories" ? "active" : ""}
            onClick={() => setActiveSection("categories")}
            >
            <FiGrid />
            Categorias
            </button>

            <button
            className={activeSection === "orders" ? "active" : ""}
            onClick={() => setActiveSection("orders")}
            >
            <FiShoppingCart />
            Pedidos
            </button>

            <button
            className={activeSection === "users" ? "active" : ""}
            onClick={() => setActiveSection("users")}
            >
            <FiUsers />
            Usuários
            </button>

            <button className="logout-btn">
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

            <h1>Gerenciamento da Plataforma</h1>

            <p>
              Gerencie produtos, pedidos, usuários e categorias
              da sua loja.
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

            <div className="crud-item">

                <div>
                <h3>Pedido #1024</h3>

                <span>Usuário: Mykael</span>
                </div>

                <div>
                <strong style={{ color: "#8b5cf6" }}>
                    R$ 249,90
                </strong>
                </div>

            </div>

            <div className="crud-item">

                <div>
                <h3>Pedido #1025</h3>

                <span>Usuário: João</span>
                </div>

                <div>
                <strong style={{ color: "#8b5cf6" }}>
                    R$ 349,90
                </strong>
                </div>

            </div>

            </div>

        </section>
        )}

        {activeSection === "users" && (
        <section className="admin-card">

            <div className="card-top">
            <h2>Usuários</h2>
            </div>

            <div className="crud-list">

            <div className="crud-item">

                <div>
                <h3>Mykael</h3>

                <span>mykael@email.com</span>
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



      </main>

    </div>
  );
}