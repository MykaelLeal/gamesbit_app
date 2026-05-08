import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiLogOut,
  FiEdit2 
} from "react-icons/fi";

import { NavBar } from "../../components/NavBar/NavBar";
import { Footer } from "../../components/Footer/Footer";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";

import "./profile.css";

export const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Mykael",
    email: "mykael@email.com",
    cpf: "000.000.000-00",
    phone: "(83) 99999-9999",
    avatar:
      "https://i.pravatar.cc/200",
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>

      <main className="profile-page">
        <div className="profile-container">

          <aside className="profile-sidebar">
            <div className="profile-user">
              <img src={user.avatar} alt={user.name} />

              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <nav className="profile-menu">
              <button>
                <FiUser />
                Minha Conta
              </button>

              <button onClick={() => navigate("/orders")}>
                <FiShoppingBag />
                Meus Pedidos
              </button>

              <button onClick={() => navigate("/wishlist")}>
                <FiHeart />
                Minha Lista de Desejos
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut />
                Sair
              </button>
            </nav>
          </aside>

          <section className="profile-content">

            <div className="profile-card hero-card">
              <div>
                <span className="profile-tag">Visão Geral</span>

                <h1>Bem-vindo {user.name}</h1>

                <p>
                  Gerencie sua conta, acompanhe seus pedidos e visualize
                  seus jogos favoritos em um só lugar.
                </p>
              </div>

              <img src={user.avatar} alt={user.name} />
            </div>


            <div className="profile-card">
              <div className="card-header">
                <h2>Dados da Conta</h2>

                    <button className="edit-profile-btn">
                        <FiEdit2 />
                        Editar Dados
                    </button>
                </div>

              <div className="profile-info-grid">

                <div className="info-box">
                  <span>Nome Completo</span>
                  <strong>{user.name}</strong>
                </div>

                <div className="info-box">
                  <span>Email</span>
                  <strong>{user.email}</strong>
                </div>

                <div className="info-box">
                  <span>CPF</span>
                  <strong>{user.cpf}</strong>
                </div>

                <div className="info-box">
                  <span>Telefone</span>
                  <strong>{user.phone}</strong>
                </div>

              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};
