import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChartBar } from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import TransactionCard from "../../components/TransactionCard";
import TransactionChart from "../../components/TransactionChart";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

type Transaction = {
  id: number;
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
  transactionType: "transfer" | "deposit" | "payment";
  description?: string;
  createdAt: string;
};

type Account = {
  id: number;
  userId: string;
};

const TransactionsPage = () => {
  const { userId } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

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

        setTransactions(userTransactions);
      } catch (err) {
        toast.error(getErrorMessage(err));
        setError("Erro ao buscar transações.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center gap-3 text-violet-700 text-2xl font-bold mb-6">
          <FaChartBar />
          Minhas Transações
        </div>

        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
        )}
        {loading && <p className="text-gray-600 mb-4">Carregando...</p>}

        <TransactionChart transactions={transactions} />

        <div className="mt-8 grid gap-4">
          {transactions.map((t) => (
            <TransactionCard key={t.id} transaction={t} />
          ))}
          {transactions.length === 0 && !loading && (
            <p className="text-gray-500 text-center">
              Nenhuma transação encontrada.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionsPage;
