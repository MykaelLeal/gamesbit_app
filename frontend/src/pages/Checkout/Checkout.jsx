import { useState, useContext, useEffect } from "react";

import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import { SuccessModal } from "../../components/SucessModal/SucessModal";

import "./checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { cart, total, clearCart } = useCart();

  const { addOrder } = useOrders();

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      cep: "",
    });

  // carregar perfil salvo
  useEffect(() => {
    if (!user) return;

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

  // validação
  const validateForm = () => {
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name =
        "Nome obrigatório";
    }

    if (!profile.email.trim()) {
      newErrors.email =
        "Email obrigatório";
    } else if (
      !/\S+@\S+\.\S+/.test(
        profile.email
      )
    ) {
      newErrors.email =
        "Email inválido";
    }

    if (!profile.cpf.trim()) {
      newErrors.cpf =
        "CPF obrigatório";
    }

    if (!profile.phone.trim()) {
      newErrors.phone =
        "Celular obrigatório";
    }

    if (!profile.cep.trim()) {
      newErrors.cep =
        "CEP obrigatório";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length ===
      0
    );
  };

  // finalizar pedido
  const handleFinishOrder = () => {
    if (cart.length === 0) return;

    const isValid = validateForm();

    if (!isValid) return;

    // salvar perfil
    localStorage.setItem(
      `@profile:${user.id}`,
      JSON.stringify(profile)
    );

    // criar pedido
    addOrder(cart, total, {
      customer: {
        name: profile.name,
        email: profile.email,
        cpf: profile.cpf,
        phone: profile.phone,
        cep: profile.cep,
      },

      paymentMethod: "PIX",

      status: "Processando",
    });

    // limpar carrinho
    clearCart();

    // abrir modal
    setShowSuccess(true);
  };

  return (
    <main>

      <div className="checkout-page">

        <header className="checkout-header">

          <h1>
            Finalizar Compra
          </h1>

          <p>
            Confira seus dados e
            conclua seu pedido com
            segurança
          </p>

        </header>

        <div className="checkout-container">

          {/* esquerda */}

          <div className="checkout-left">

            {/* infos pessoais */}

            <div className="card">

              <h2>
                Informações Pessoais
              </h2>

              <form className="checkout-form">

                {/* nome */}

                <div className="input-group">

                  <label>
                    Nome completo{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    className="full"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        name:
                          e.target.value,
                      })
                    }
                  />

                  {errors.name && (
                    <span className="input-error">
                      {errors.name}
                    </span>
                  )}

                </div>

                {/* email */}

                <div className="input-group">

                  <label>
                    Email <span>*</span>
                  </label>

                  <input
                    type="email"
                    className="full"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email:
                          e.target.value,
                      })
                    }
                  />

                  {errors.email && (
                    <span className="input-error">
                      {errors.email}
                    </span>
                  )}

                </div>

                {/* cpf e telefone */}

                <div className="row">

                  <div className="input-group">

                    <label>
                      CPF <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={profile.cpf}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          cpf:
                            e.target.value,
                        })
                      }
                    />

                    {errors.cpf && (
                      <span className="input-error">
                        {errors.cpf}
                      </span>
                    )}

                  </div>

                  <div className="input-group">

                    <label>
                      Celular{" "}
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone:
                            e.target.value,
                        })
                      }
                    />

                    {errors.phone && (
                      <span className="input-error">
                        {errors.phone}
                      </span>
                    )}

                  </div>

                </div>

                {/* cep */}

                <div className="input-group">

                  <label>
                    CEP <span>*</span>
                  </label>

                  <input
                    type="text"
                    className="full"
                    value={profile.cep}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        cep:
                          e.target.value,
                      })
                    }
                  />

                  {errors.cep && (
                    <span className="input-error">
                      {errors.cep}
                    </span>
                  )}

                </div>

              </form>

            </div>

            {/* envio */}

            <div className="card">

              <h2>
                Método de Envio
              </h2>

              <div className="shipping-method">

                <label>
                  <input
                    type="radio"
                    name="shipping"
                    defaultChecked
                  />

                  Frete Grátis
                </label>

                <span className="shipping-free">
                  Frete grátis
                </span>

              </div>

            </div>

            {/* pagamento */}

            <div className="card">

              <h2>
                Método de Pagamento
              </h2>

              <div className="payment-method">

                <label>
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />

                  Pix
                </label>

              </div>

            </div>

          </div>

          {/* direita */}

          <div className="checkout-right">

            <div className="card">

              <h2>
                Confirmação do Pedido
              </h2>

              <div className="order-products">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="order-card"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="order-info">

                      <p className="order-name">
                        {item.name}
                      </p>

                      <p className="order-qty">
                        Qtd:{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <div className="order-price">

                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        "pt-BR",
                        {
                          style:
                            "currency",
                          currency:
                            "BRL",
                        }
                      )}

                    </div>

                  </div>
                ))}

              </div>

              {/* resumo */}

              <div className="summary">

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    {total.toLocaleString(
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

                <div className="summary-row">

                  <span>Frete</span>

                  <span>
                    R$ 0,00
                  </span>

                </div>

                <div className="summary-total">

                  <span>Total</span>

                  <span>
                    {total.toLocaleString(
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

              </div>

              <button
                className="finish-btn-checkout"
                onClick={
                  handleFinishOrder
                }
              >
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