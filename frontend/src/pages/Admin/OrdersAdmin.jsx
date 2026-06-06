import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

export function OrdersAdmin() {
  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response =
        await api.get("/orders");

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

                <button
                  onClick={() =>
                    navigate(
                      `/admin/orders/${order._id}`
                    )
                  }
                >
                  Ver detalhes
                </button>
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