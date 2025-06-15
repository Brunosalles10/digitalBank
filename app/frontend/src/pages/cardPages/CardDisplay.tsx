import { FaCreditCard, FaLock, FaTrash } from "react-icons/fa";

type Card = {
  id: number;
  cardNumber: string;
  cardType: "credit" | "debit";
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  status: "active" | "blocked" | "expired";
};

interface Props {
  card: Card;
  onBlock: () => void;
  onDelete: () => void;
}

const CardDisplay = ({ card, onBlock, onDelete }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-violet-700 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <FaCreditCard className="text-4xl text-violet-700" />
        <div>
          <h3 className="text-xl font-bold text-violet-700">
            Cartão {card.cardType === "credit" ? "Crédito" : "Débito"}
          </h3>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <strong>{card.status === "active" ? "Ativo" : "Bloqueado"}</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-gray-600 text-sm">Nome</label>
          <p className="font-semibold">{card.cardHolderName}</p>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Número do Cartão</label>
          <p className="font-mono font-semibold">{card.cardNumber}</p>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Validade</label>
          <p className="font-semibold">{card.expirationDate}</p>
        </div>
        <div>
          <label className="text-gray-600 text-sm">CVV</label>
          <p className="font-semibold">{card.cvv}</p>
        </div>
        <div>
          <label className="text-gray-600 text-sm">Limite de Crédito</label>
          <p className="font-semibold">R$ 5.000,00</p>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={onBlock}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <FaLock /> Bloquear
        </button>
        <button
          onClick={onDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <FaTrash /> Excluir
        </button>
      </div>
    </div>
  );
};

export default CardDisplay;
