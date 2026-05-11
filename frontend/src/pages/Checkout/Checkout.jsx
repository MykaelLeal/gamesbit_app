import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { SuccessModal } from "../../components/SucessModal/SucessModal";

import "./checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { cart, total, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [showSuccess, setShowSuccess] = useState(false);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      cep: "",
    });

  useEffect(() => {

  const storedProfile =
    JSON.parse(
      localStorage.getItem(
        `@profile:${user.id}`
      )
    );

  if (storedProfile) {

    setProfile({
      name: storedProfile.name || "",
      email: storedProfile.email || "",
      cpf: storedProfile.cpf || "",
      phone: storedProfile.phone || "",
      cep: storedProfile.cep || "",
    });

  }

}, [user]);


 const handleFinishOrder = () => {

  if (cart.length === 0) return;

  // salva profile atualizado
  localStorage.setItem(
    `@profile:${user.id}`,
    JSON.stringify(profile)
  );

  // cria pedido completo
  addOrder(
    cart,
    total,
    {
      customer: {
        name: profile.name,
        email: profile.email,
        cpf: profile.cpf,
        phone: profile.phone,
        cep: profile.cep,
      },

      paymentMethod: "PIX",

      status: "Processando",
    }
  );

  // limpa carrinho
  clearCart();

  // abre modal
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
               <input
                  type="text"
                  placeholder="Nome completo"
                  className="full"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      name: e.target.value,
                    })
                  }
                />
                
               <input
                  type="email"
                  placeholder="Email"
                  className="full"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                />

                <div className="row">
                    <input
                      type="text"
                      placeholder="CPF"
                      value={profile.cpf}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          cpf: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Celular"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value,
                        })
                      }
                    />

                </div>

                  <input
                    type="text"
                    placeholder="CEP"
                    className="full"
                    value={profile.cep}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cep: e.target.value,
                      })
                    }
                  />
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

          navigate("/");

        }}
      />

    </main>
    );
    };