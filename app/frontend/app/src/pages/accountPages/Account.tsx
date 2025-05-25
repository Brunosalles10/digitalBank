import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaMoneyCheck,
  FaUser,
} from "react-icons/fa";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";
import BalanceCard from "./BalanceCard";
import Card from "./Card";

type Account = {
  accountNumber: string;
  type: string;
  balance: number | string;
  userId: string;
};

const AccountPage = () => {
  const { userId } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar conta do usuário
  useEffect(() => {
    const fetchAccount = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/accounts/user/${userId}`);
        setAccounts(data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 404) {
          setError("Conta não encontrada. Por favor, crie uma conta.");
        } else {
          toast.error(getErrorMessage(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [userId]);

  // Criar conta
  const handleCreateAccount = async () => {
    try {
      const response = await api.post("/accounts", {
        userId,
        balance: 0.01,
        type: "current",
      });
      setAccounts([response.data]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const account = accounts[0];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8">
        <h2
          className="text-4xl font-extrabold text-center mb-12 
          bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 
          bg-clip-text text-transparent animate-pulse"
        >
          Minha Conta
        </h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {!account && (
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="text-gray-700 mb-4">
              Você ainda não possui uma conta.
            </p>
            <button
              onClick={handleCreateAccount}
              disabled={loading}
              className="bg-violet-700 text-white py-2 px-6 rounded-lg hover:bg-violet-400 transition cursor-pointer"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </div>
        )}

        {account && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card: Dados da Conta */}
            <Card icon={<FaUser />} title="Dados da Conta">
              <p>
                <strong>Número Da Conta:</strong> {account.accountNumber}
              </p>
              <p>
                <strong>Tipo De Conta: </strong>
                {account.type === "current" ? "Corrente" : "Pagamento"}
              </p>
            </Card>

            {/* Card: Saldo */}
            <BalanceCard />

            {/* Card: Depósitos */}
            <Card icon={<FaMoneyCheck />} title="Depósitos" to="/deposit">
              <p className="text-sm text-gray-600">
                Acesse a seção de depósito para adicionar saldo.
              </p>
            </Card>

            {/* Card: Transferências */}
            <Card icon={<FaExchangeAlt />} title="Transferências">
              <p className="text-sm text-gray-600">
                Gerencie envios e recebimentos entre contas.
              </p>
            </Card>

            {/* Card: Pagamentos */}
            <Card icon={<FaFileInvoiceDollar />} title="Pagamentos">
              <p className="text-sm text-gray-600">
                Histórico de boletos e cobranças pagas.
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
