import { Link, useNavigate } from "react-router-dom";
import { useState, useContext} from "react";

import { AuthContext } from "../../context/AuthContext";

import "../../styles/auth.css";

export const Register = () => {
  const navigate = useNavigate();

  const { signed, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");

  if (signed) {
     if (user?.email === "admin@gamesbit.com")  {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // pega usuários já cadastrados
    const users =
      JSON.parse(localStorage.getItem("@Auth:users")) || [];

    // verifica se email já existe
    const emailExists = users.find(
      (user) => user.email === email
    );

    if (emailExists) {
      setError("Usuário já cadastrado");
      return;
    }

    // novo usuário
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,

      role: email === "admin@gamesbit.com"
        ? "admin"
        : "user",
    };

    // adiciona usuário
    users.push(newUser);

    // salva no localStorage
    localStorage.setItem(
      "@Auth:users",
      JSON.stringify(users)
    );

    setError("");
    navigate("/login");
  };

  return (
    <div className="container">

      <div className="left-side">
        <div className="left-content">
          <h1>Crie sua conta</h1>

          <p>
            Explore jogos clássicos e modernos em um só lugar.
          </p>
        </div>
      </div>

      <div className="right-side">
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <span className="login-form-title">
            Criar Conta
          </span>

          <div className="wrap-input">
            <input
              className={
                name ? "has-val input" : "input"
              }
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <span
              className="focus-input"
              data-placeholder="Nome"
            ></span>
          </div>

          <div className="wrap-input">
            <input
              className={
                email ? "has-val input" : "input"
              }
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <span
              className="focus-input"
              data-placeholder="Email"
            ></span>
          </div>

          <div className="wrap-input">
              <input
                className={
                  password
                    ? "has-val input"
                    : "input"
                }
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                className="focus-input"
                data-placeholder="Senha"
              ></span>
            </div>

            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

          <div className="container-login-form-btn">
            <button
              type="submit"
              className="login-form-btn"
            >
              Criar Conta
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">
              Já possui conta?
            </span>

            <Link className="txt2" to="/login">
              Fazer login
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};