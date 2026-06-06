import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { useOrders } from "../../context/OrdersContext";

import { NavBar } from "../../components/NavBar/NavBar";
import { CategoryMenu } from "../../components/CategoryMenu/CategoryMenu";
import { Footer } from "../../components/Footer/Footer";

import "../../styles/myOrders.css";

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

          <h2 className="page-title">
            Meus Pedidos
          </h2>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="empty">
            <h3>
              Você ainda não possui pedidos
            </h3>

            <p>
              Finalize uma compra para
              visualizar aqui
            </p>

            <button
              onClick={() => navigate("/")}
            >
              Ir para loja
            </button>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div
                className="order-box"
                key={order._id}
              >
                <div className="order-top">
                  <div>
                    <h3>
                      Pedido #
                      {order.orderNumber}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>

                  <span className="order-total">
                    {order.total.toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </span>
                </div>

                <div className="order-products">
                  {order.products?.map(
                    (product, index) => (
                      <div
                        className="order-product"
                        key={`${product.productId}-${index}`}
                      >
                        <img
                          src={product.image}
                          alt={
                            product.title
                          }
                        />

                        <div className="order-info">
                          <h4>
                            {product.title}
                          </h4>

                          <p>
                            Quantidade:{" "}
                            {
                              product.quantity
                            }
                          </p>
                        </div>

                        <span className="order-price">
                          {(
                            product.price *
                            product.quantity
                          ).toLocaleString(
                            "pt-BR",
                            {
                              style:
                                "currency",
                              currency:
                                "BRL",
                            }
                          )}
                        </span>
                      </div>
                    )
                  )}
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