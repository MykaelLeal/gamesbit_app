import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "../../styles/auth.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signed } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn({ email, password });
  };

 
  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="container">

      {/* ESQUERDA */}
      <div className="left-side">
        <div className="left-content">
          <h1>Bem-vindo ao GamesBit 🎮</h1>
          <p>
            Reviva seus clássicos favoritos e descubra novos jogos.
            Sua jornada começa aqui.
          </p>
        </div>
      </div>

      {/* DIREITA */}
      <div className="right-side">
        <form onSubmit={handleSubmit} className="login-form">

          <span className="login-form-title">
            Login
          </span>

          <div className="wrap-input">
            <input
              className={email ? "has-val input" : "input"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Email"></span>
          </div>

          <div className="wrap-input">
            <input
              className={password ? "has-val input" : "input"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="focus-input" data-placeholder="Senha"></span>
          </div>

          <div className="container-login-form-btn">
            <button type="submit" className="login-form-btn">
              Login
            </button>
          </div>

          <div className="text-center">
            <span className="txt1">Não possui conta? </span>
            <Link className="txt2" to="/register">
              Criar conta
            </Link>
          </div>

        </form>
      </div>

    </div>
  );
};

