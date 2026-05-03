import "./modal.css";

export const Modal = ({
  show,
  product,
  onClose,
  onGoCart,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Item adicionado!</h3>

        {product && (
          <div className="modal-product">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={onClose}>
            Continuar comprando
          </button>

          <button className="go-cart" onClick={onGoCart}>
            Ir para o carrinho
          </button>
        </div>

      </div>
    </div>
  );
};