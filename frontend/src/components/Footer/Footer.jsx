import {
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiFacebook,
} from "react-icons/fi";

import "../../styles/footer.css";

export const Footer = () => {

  return (

    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <h2>GamesBit</h2>

          <p>
            Sua loja digital de jogos modernos,
            clássicos e retrô.
          </p>

        </div>

        <div className="footer-links">

          <h3>Navegação</h3>

          <a href="/">Home</a>
          <a href="/products">Jogos</a>
          <a href="/wishlist">Favoritos</a>
          <a href="/cart">Carrinho</a>

        </div>

        <div className="footer-support">

          <h3>Suporte</h3>

          <p>suporte@gamesbit.com</p>
          <p>(83) 99999-9999</p>
          <p>Seg - Sex • 08h às 18h</p>

        </div>

        <div className="footer-social">

          <h3>Redes sociais</h3>

          <div className="social-icons">

            <a href="#">
              <FiInstagram />
            </a>

            <a href="#">
              <FiTwitter />
            </a>

            <a href="#">
              <FiYoutube />
            </a>

            <a href="#">
              <FiFacebook />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 GamesBit • Todos os direitos reservados
        </p>

      </div>

    </footer>

  );
};