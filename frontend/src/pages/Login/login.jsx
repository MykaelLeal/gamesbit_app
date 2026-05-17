import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";

import { FiEye, FiEyeOff } from "react-icons/fi";

import logo from "../../assets/logo.png";

import "../../styles/auth.css";

export const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const { signIn, user } = useContext(AuthContext);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    const success = signIn({
      email,
      password,
    });

    if (!success) {
      setError(
        "Usuário não cadastrado ou senha inválida"
      );
    }

  };

  useEffect(() => {

    if (user?.role === "admin") {
      navigate("/admin");
    }

    if (
      user &&
      user.role !== "admin"
    ) {
      navigate("/");
    }

  }, [user]);

  return (
    <div className="container">

      <div className="left-side">

        <div className="left-content">

          <div
            className="logo-auth-container"
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

          <h1>
            Bem-vindo ao GamesBit
          </h1>

          <p>
            Reviva seus clássicos favoritos
            e descubra novos jogos.
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
                email
                  ? "has-val input"
                  : "input"
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

          <div className="wrap-input password-input">

            <input
              className={
                password
                  ? "has-val input"
                  : "input"
              }
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <span
              className="focus-input"
              data-placeholder="Senha"
            ></span>

            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >

              {showPassword ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}

            </button>

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