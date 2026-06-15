import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

export const OrdersAdmin = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);


  const loadOrders = async () => {
    try {
      const response =
         await api.get("/orders/admin/all");

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);


  return (
    <section className="admin-card">
      <div className="card-top">
        <h2>Pedidos</h2>
      </div>

      <div className="crud-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              className="crud-item"
              key={order._id}
            >
              <div>
                <h3>
                  Pedido #
                  {
                    order.orderNumber
                  }
                </h3>

                <span>
                  Cliente:
                  {" "}
                  {
                    order.userId
                      ?.name
                  }
                </span>
              </div>

              <div>
                <strong
                  style={{
                    color:
                      "#8b5cf6",
                  }}
                >
                  {order.total.toLocaleString(
                    "pt-BR",
                    {
                      style:
                        "currency",
                      currency:
                        "BRL",
                    }
                  )}
                </strong>

              </div>
            </div>
          ))
        ) : (
          <p>
            Nenhum pedido
            encontrado.
          </p>
        )}
      </div>
    </section>
  );
}