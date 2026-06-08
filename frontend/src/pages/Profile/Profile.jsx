import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiLogOut,
  FiEdit2,
  FiSave,
} from "react-icons/fi";

import {useContext, useEffect, useState} from "react";

import { AuthContext } from "../../context/AuthContext";

import api from "../../service/api";

import "../../styles/profile.css";

export const Profile = () => {

  const navigate = useNavigate();

  const { user, setUser, signOut } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    avatar: "",
  });

 useEffect(() => {
  console.log(user);

  if (user) {
    setProfile(user);
  }
}, [user]);


  const saveProfile = async () => {

    const response = await api.patch(
      `/user/${user._id}`,
      {
        name: profile.name,
        cpf: profile.cpf,
        phone: profile.phone,
        avatar: profile.avatar,
      }
    );

    const updatedUser = response.data.user;

    setUser(updatedUser);

    localStorage.setItem(
      "@Auth:user",
      JSON.stringify(updatedUser)
    );

    setEditing(false);
    console.log(response.data.user)


};

const formatCpf = (cpf) => {
  if (!cpf) return "";

  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

  const handleLogout = () => {
    navigate("/", {
      replace: true,
    });

    signOut();
  };

  return (
    <main className="profile-page">

      <div className="profile-container">

        <aside className="profile-sidebar">

          <div className="profile-user">

            <img
              src={profile.avatar}
              alt={profile.name}
            />

            <h3>{profile.name}</h3>

            <p>{profile.email}</p>

          </div>

          <nav className="profile-menu">

            <button
              onClick={() =>
                navigate("/orders")
              }
            >
              <FiShoppingBag />
              Meus Pedidos
            </button>

            <button
              onClick={() =>
                navigate("/wishlist")
              }
            >
              <FiHeart />
              Minha Lista de Desejos
            </button>

            <button
              onClick={() =>
                navigate("/")
              }
            >
              <FiUser />
              Voltar para Loja
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

        <section className="profile-content">

          <div className="profile-card hero-card">

            <div>

              <span className="profile-tag">
                Visão Geral
              </span>

              <h1>
                Bem-vindo, {profile.name}
              </h1>

              <p>
                Gerencie sua conta,
                acompanhe seus pedidos
                e visualize seus jogos
                favoritos em um só lugar.
              </p>

            </div>

            <img
              src={profile.avatar}
              alt={profile.name}
            />

          </div>

          <div className="profile-card">

            <div className="card-header">

              <h2>Dados da Conta</h2>

              {!editing ? (

                <button
                  className="edit-profile-btn"
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  <FiEdit2 />
                  Editar Dados
                </button>

              ) : (

                <button
                  className="edit-profile-btn"
                  onClick={saveProfile}
                >
                  <FiSave />
                  Salvar
                </button>

              )}

            </div>

            <div className="profile-info-grid">

              <div className="info-box">

                <span>Nome Completo</span>

                {editing ? (

                  <input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name: e.target.value,
                      })
                    }
                  />

                ) : (

                  <strong>
                    {profile.name}
                  </strong>

                )}

              </div>

              <div className="info-box">

                <span>Email</span>

                <strong>
                  {profile.email}
                </strong>

              </div>

              <div className="info-box">

                <span>CPF</span>

                 <strong>
                  {formatCpf(profile.cpf)}
                </strong>

              </div>

              <div className="info-box">

                <span>Telefone</span>

                {editing ? (

                  <input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                  />

                ) : (

                  <strong>
                    {profile.phone || "Não informado"}
                  </strong>

                )}

              </div>

              <div className="info-box full-width">

                <span>Avatar URL</span>

                {editing ? (

                  <input
                    value={profile.avatar}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        avatar: e.target.value,
                      })
                    }
                  />

                ) : (

                  <strong>
                    Avatar personalizado
                  </strong>

                )}

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};