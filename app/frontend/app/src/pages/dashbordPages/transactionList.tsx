import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

type Transaction = {
  id: number;
  transactionType: "deposit" | "transfer" | "payment";
  description: string;
  amount: number;
  createdAt: string;
};

const typeLabels = {
  deposit: "Depósito",
  transfer: "Transferência",
  payment: "Pagamento",
};

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/transactions");
      // Ordenar pela data e pegar os 5 mais recentes
      const sorted = [...data]
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-violet-700">
          Transações Recentes
        </h3>
        <Link
          to="/transactions"
          className="text-sm text-violet-700 font-medium hover:underline"
        >
          Ver todas
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Carregando transações...</p>
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
                  {item.transactionType === "deposit" ? (
                    <FaArrowDown />
                  ) : (
                    <FaArrowUp />
                  )}
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {typeLabels[item.transactionType]}
                  </p>
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
