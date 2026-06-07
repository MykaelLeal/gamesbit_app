import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import { FiEye, FiEyeOff } from "react-icons/fi";

import "../../styles/auth.css";

import logo from "../../assets/logo.png";

export const Register = () => {

  const navigate = useNavigate();

  const {signed, user, register} = useContext(AuthContext);

  const [name, setName] = useState("");

  const [cpf, setCpf] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (signed) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [signed, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await register({
      name,
      cpf,
      email,
      password,
    });

    if (!success) {
      setError(
        "Erro ao cadastrar usuário"
      );
      return;
    }

    setError("");

    navigate("/login");
  };

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
            Crie sua conta
          </h1>

          <p>
            Explore jogos clássicos e
            modernos em um só lugar.
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
                name
                  ? "has-val input"
                  : "input"
              }
              type="text"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
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
                cpf
                  ? "has-val input"
                  : "input"
              }
              type="text"
              value={cpf}
              onChange={(e) =>
                setCpf(
                  e.target.value
                )
              }
              required
            />

            <span
              className="focus-input"
              data-placeholder="CPF"
            ></span>

          </div>

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
                setEmail(
                  e.target.value
                )
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
              Criar Conta
            </button>

          </div>

          <div className="text-center">

            <span className="txt1">
              Já possui conta?
            </span>

            <Link
              className="txt2"
              to="/login"
            >
              Fazer login
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
};