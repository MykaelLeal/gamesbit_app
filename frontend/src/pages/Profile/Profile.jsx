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

import "./profile.css";

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
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const saveProfile = () => {
    if (!profile) return;

    const updatedUser = {
      ...user,
      ...profile,
      avatar: profile.avatar ?? user.avatar
    };

    setUser(updatedUser);

    localStorage.setItem(
      "@Auth:user",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(localStorage.getItem("@Auth:users")) || [];

    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem(
      "@Auth:users",
      JSON.stringify(updatedUsers)
    );

    setEditing(false);
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

              {editing ? (

                <input
                  value={profile.cpf}
                  disabled={!!user?.cpf}
                  placeholder="Digite seu CPF"
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      cpf: e.target.value,
                    })
                  }
                />

              ) : (

                <strong>
                  {profile.cpf || "Não informado"}
                </strong>

              )}

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