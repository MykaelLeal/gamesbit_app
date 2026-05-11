import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";

import "../../styles/auth.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signed, user } = useContext(AuthContext);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedUser = signIn({ email, password });

    if (!loggedUser) {
      setError("Usuário não cadastrado ou senha inválida");
      return;
    }

    setError("");

    if (loggedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container">

      <div className="left-side">
        <div className="left-content">
          <h1>Bem-vindo ao GamesBit</h1>

          <p>
            Reviva seus clássicos favoritos e
            descubra novos jogos.
          </p>
        </div>
      </div>

      <div className="right-side">
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <span className="login-form-title">
            Login
          </span>

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
            Login
          </button>

        </div>
          <div className="text-center">
            <span className="txt1">
              Não possui conta?
            </span>

            <Link
              className="txt2"
              to="/register"
            >
              Criar conta
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};