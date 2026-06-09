import { useState, useContext, useEffect } from "react";

import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrdersContext";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";

import { SuccessModal } from "../../components/SucessModal/SucessModal";

import "../../styles/checkout.css";

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

  
  useEffect(() => {
    if (!user) return;

    const storedProfile = JSON.parse(
      localStorage.getItem(
        `@profile:${user._id}`
      )
    );

    setProfile({
      name: storedProfile?.name || user.name || "",
      email: storedProfile?.email || user.email || "",
      cpf: storedProfile?.cpf || user.cpf || "",
      phone: storedProfile?.phone || user.phone || "",
      cep: storedProfile?.cep || "",
    });
  }, [user]);

 
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

  const handleFinishOrder = async () => {
    if (cart.length === 0) return;

    const isValid = validateForm();
    if (!isValid) return;

    try {
      localStorage.setItem(
        `@profile:${user._id}`,
        JSON.stringify(profile)
      );

      const order = await addOrder();

      if (!order) return;

      clearCart();
      setShowSuccess(true);

    } catch (error) {
      console.error(error);
    }
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


          <div className="checkout-left">


            <div className="card">

              <h2>
                Informações Pessoais
              </h2>

              <form className="checkout-form">

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
                      src={item.productId.image}
                      alt={item.productId.title}
                    />

                    <div className="order-info">

                      <p className="order-name">
                        {item.productId.title}
                      </p>

                      <p className="order-qty">
                        Qtd:{" "}
                        {item.quantity}
                      </p>

                    </div>

                    <div className="order-price">
                      {item.productId.oldPrice &&
                        item.productId.oldPrice >
                          item.productId.price && (
                          <span
                            className="old-price-checkout"
                          >
                            {(
                              item.productId.oldPrice *
                              item.quantity
                            ).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                      )}

                      <span className="current-price-checkout">
                        {(
                          item.productId.price *
                          item.quantity
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>

                    </div>

                  </div>
                ))}

              </div>

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