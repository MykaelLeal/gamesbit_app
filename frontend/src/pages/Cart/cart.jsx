import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { Footer } from "../../components/Footer/Footer";
import { NavBar } from "../../components/NavBar/NavBar";
import { useCart } from "../../context/CartContext";
import "../../styles/cart.css";

import { FiTrash2 } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const navigate = useNavigate();

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    total,
  } = useCart();

  const formatPrice = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (

  <div>

    <NavBar />
    <CategoryMenu />

    <main>

      <div className="cart-header">
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          <FiArrowLeft />
          Voltar
        </button>

        <div className="page-title">Meu Carrinho</div>
      </div>

      <div className="content">

        {cart.length === 0 ? (
          <section className="empty-cart">
            <p>Seu carrinho está vazio</p>

            <button onClick={() => navigate("/")}>
              Ir às compras
            </button>
          </section>
        ) : (
          <>
            <section>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>-</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product">
                          <img src={item.image} alt={item.name} />
                          <div className="info">
                            <div className="name">{item.name}</div>
                            <div className="category">
                              {item.category}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="price-cell">{formatPrice(item.price)}</td>

                      <td>
                        <div className="qty">
                          <button onClick={() => decreaseQty(item.id)}>
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button onClick={() => increaseQty(item.id)}>
                            +
                          </button>
                        </div>
                      </td>

                      <td className="price-total">
                        {formatPrice(item.price * item.quantity)}
                      </td>

                      <td>
                        <button
                          className="remove"
                          onClick={() => removeItem(item.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <aside>
              <div className="box">
                <header>Resumo da compra</header>

                <div className="info">
                  <div>
                    <span>Sub-total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div>
                    <span>Frete</span>
                    <span>Gratuito</span>
                  </div>
                </div>

                <footer>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </footer>
              </div>

             <button onClick={() => navigate("/checkout")}>
                 Finalizar compra
            </button>
            </aside>
          </>
        )}

      </div>
    </main>

    <Footer />

  </div>

  
);
};