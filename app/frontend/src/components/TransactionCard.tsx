type Props = {
  transaction: {
    id: number;
    amount: number;
    transactionType: "transfer" | "deposit" | "payment";
    description?: string;
    createdAt: string;
  };
};

const TransactionCard = ({ transaction }: Props) => {
  const { amount, transactionType, description, createdAt } = transaction;

  const formattedAmount = Number(amount).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const colorMap = {
    deposit: "text-green-600",
    transfer: "text-blue-600",
    payment: "text-red-600",
  };

  const typeMap = {
    deposit: "Depósito",
    transfer: "Transferência",
    payment: "Pagamento",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow border-2 border-gray-200 hover:bg-gray-50 transition">
      <div className={`font-semibold text-lg ${colorMap[transactionType]}`}>
        {typeMap[transactionType]}
      </div>
      <div className="text-gray-700 mt-1">{formattedAmount}</div>
      {description && (
        <div className="text-gray-500 mt-1 text-sm">{description}</div>
      )}
      <div className="text-gray-400 mt-2 text-xs">
        {new Date(createdAt).toLocaleString("pt-BR")}
      </div>
    </div>
  );
};

export default TransactionCard;
