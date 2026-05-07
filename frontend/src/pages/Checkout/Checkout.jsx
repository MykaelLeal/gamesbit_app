import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { useNavigate } from "react-router-dom";


import { SuccessModal } from "../../components/SucessModal/SucessModal";

import "./checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();

  const { cart, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [showSuccess, setShowSuccess] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Seu carrinho está vazio</h2>
        <button onClick={() => navigate("/")}>
          Voltar para loja
        </button>
      </div>
    );
  }

  const handleFinishOrder = () => {
    if (cart.length === 0) return;
    
    addOrder(cart, total);

    setShowSuccess(true);
  };

  return (

    <main>

    <div className="checkout-page">

      <header className="checkout-header">
        <h1>Finalizar Compra</h1>
        <p>Confira seus dados e conclua seu pedido com segurança</p>
      </header>

      <div className="checkout-container">

        <div className="checkout-left">

          <div className="card">
            <h2>Informações Pessoais</h2>

            <form className="checkout-form">
                <input type="text" placeholder="Nome completo" className="full" />
                
                <input type="email" placeholder="Email" className="full" />

                <div className="row">
                    <input type="text" placeholder="CPF" />
                    <input type="text" placeholder="Celular" />
                </div>

                <input type="text" placeholder="CEP" className="full" />
                </form>
          </div>

          <div className="card">
            <h2>Método de Envio</h2>

            <div className="shipping-method">
                <label>
                <input type="radio" name="shipping" defaultChecked />
                Frete Grátis
                </label>

                <span className="shipping-free">Frete grátis</span>
            </div>

         </div>
          
        
          <div className="card">
            <h2>Método de Pagamento</h2>

            <div className="payment-method">
              <label>
                <input type="radio" name="payment" defaultChecked />
                Pix
              </label>
            </div>
          </div>

        </div>

       <div className="checkout-right">

      <div className="card">

        <h2>Confirmação do Pedido</h2>

        <div className="order-products">
        {cart.map((item) => (
            <div key={item.id} className="order-card">

            <img src={item.image} alt={item.name} />

            <div className="order-info">
                <p className="order-name">{item.name}</p>
                <p className="order-qty">Qtd: {item.quantity}</p>
            </div>

            <div className="order-price">
                {(item.price * item.quantity).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                })}
            </div>

            </div>
        ))}
        </div>

        <div className="summary">

        <div className="summary-row">
            <span>Subtotal</span>
            <span>
            {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}
            </span>
        </div>

        <div className="summary-row">
            <span>Frete</span>
            <span>R$ 0,00</span>
        </div>

        <div className="summary-total">
            <span>Total</span>
            <span>
            {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}
            </span>
        </div>

        </div>

        <button className="finish-btn-checkout" onClick={handleFinishOrder}>
            Finalizar Pedido
        </button>

    </div>

    </div>
    </div>
    </div>

        <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);

          setTimeout(() => {
            clearCart();
            navigate("/");
          }, 100);
        }}
      />

    </main>
    );
    };