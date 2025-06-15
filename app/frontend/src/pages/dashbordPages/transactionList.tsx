import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsReceiptCutoff } from "react-icons/bs";
import { FaExchangeAlt, FaPiggyBank } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

type Transaction = {
  id: number;
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
  transactionType: "deposit" | "transfer" | "payment";
  description?: string;
  createdAt: string;
};

type Account = {
  id: number;
  userId: string;
};

const typeLabels = {
  deposit: "Depósito",
  transfer: "Transferência",
  payment: "Pagamento",
};

const TransactionList = () => {
  const { userId } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);

        // Busca contas do usuário
        const accountsRes = await api.get(`/accounts/user/${userId}`);
        const accountIds: number[] = accountsRes.data.map(
          (acc: Account) => acc.id
        );

        // Busca todas as transações
        const transRes = await api.get("/transactions");
        const allTransactions: Transaction[] = transRes.data;

        // Filtra apenas transações relacionadas ao usuário
        const userTransactions = allTransactions.filter(
          (t) =>
            accountIds.includes(t.senderAccountId) ||
            accountIds.includes(t.receiverAccountId)
        );

        // Ordena por data mais recente e pega apenas as 5 primeiras
        const sorted = [...userTransactions]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

        setTransactions(sorted);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const renderIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <FaPiggyBank size={18} />;
      case "transfer":
        return <FaExchangeAlt size={18} />;
      case "payment":
        return <BsReceiptCutoff size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-violet-700">
          Transações Recentes
        </h3>
        <Link
          to="/accounts/transactions/userId"
          className="text-sm text-violet-700 font-medium hover:underline"
        >
          Ver todas
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Carregando transações...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Nenhuma transação encontrada.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    item.transactionType === "deposit"
                      ? "bg-green-100 text-green-600"
                      : item.transactionType === "payment"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {renderIcon(item.transactionType)}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {typeLabels[item.transactionType]}
                  </p>
                  {item.description && (
                    <p className="text-xs text-gray-400 truncate max-w-32">
                      {item.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
              <p
                className={`text-base font-bold ${
                  item.transactionType === "deposit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.transactionType === "deposit" ? "+" : "-"}R${" "}
                {parseFloat(item.amount.toString()).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
