import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { useOrders } from "../../context/OrdersContext";

import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { Footer } from "../../components/Footer/Footer";

import "./myOrders.css";

export const MyOrders = () => {
  const navigate = useNavigate();

  const { orders } = useOrders();

  return (
    <div>
      <NavBar />
      <CategoryMenu />

      <main>
        <div className="orders-header">
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            <FiArrowLeft />
            Voltar
          </button>

          <h2 className="page-title">Meus Pedidos</h2>
        </div>

        {orders.length === 0 ? (
          <div className="empty">
            <h3>Você ainda não possui pedidos</h3>

            <p>Finalize uma compra para visualizar aqui</p>

            <button onClick={() => navigate("/")}>
              Ir para loja
            </button>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-box" key={order.id}>

                <div className="order-top">
                  <div>
                    <h3>Pedido #{order.id}</h3>
                    <p>{order.date}</p>
                  </div>

                  <span className="order-total">
                    {order.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <div className="order-products">
                  {order.items.map((item) => (
                    <div className="order-product" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="order-info">
                        <h4>{item.name}</h4>
                        <p>Quantidade: {item.quantity}</p>
                      </div>

                      <span className="order-price">
                        {(item.price * item.quantity).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};