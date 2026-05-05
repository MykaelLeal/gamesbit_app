import "./sucessModal.css";

export const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-sucess-overlay" onClick={onClose}>
      <div
        className="modal-sucess"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Pedido realizado!</h2>
        <p>Seu pedido foi criado com sucesso.</p>
        <p>Finalize o pagamento via Pix para receber seu jogo.</p>

        <button onClick={onClose}>
          Voltar para loja
        </button>
      </div>
    </div>
  );
};