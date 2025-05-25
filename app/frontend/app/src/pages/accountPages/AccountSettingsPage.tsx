import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

type Account = {
  type: string;
  accountNumber: string;
  id: number;
  userId: string;
  balance: number | string;
};

const AccountSettingsPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [account, setAccount] = useState<Account | null>(null);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await api.get(`/accounts/user/${userId}`);
        const userAccount = data[0];
        setAccount(userAccount);
        setType(userAccount?.type || "");
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [userId]);

  const handleUpdate = async () => {
    setError("");
    setMessage("");
    setLoading(true);
    if (!account) return;
    try {
      await api.put(`/accounts/${account.id}`, {
        type,
      });
      setMessage("Tipo de conta atualizado com sucesso.");
      setTimeout(() => navigate(`/accounts/user/${userId}`), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar sua conta?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/accounts/${account!.id}`);
      setMessage("Conta deletada com sucesso.");
      setTimeout(() => navigate(`/dashboard/${userId}`), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md border-2 border-violet-700">
          <div className="flex items-center justify-center text-violet-700 mb-6 text-4xl">
            <FaCog />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-violet-700">
            Configurações da Conta
          </h2>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
          )}
          {message && (
            <p className="text-green-700 bg-green-100 p-2 rounded mb-4">
              {message}
            </p>
          )}

          {account ? (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Número da Conta
                </label>
                <input
                  type="text"
                  value={account.accountNumber}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Tipo de Conta
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="current">Corrente</option>
                  <option value="payment">Pagamento</option>
                </select>
              </div>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`cursor-pointer w-full bg-violet-700 text-white py-3 rounded-lg font-semibold transition duration-300 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-violet-400"
                }`}
              >
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="cursor-pointer w-full mt-2 border-2  text-gray-700 py-3 rounded-lg font-semibold hover:bg-red-400 transition"
              >
                {loading ? "Deletando..." : "Deletar Conta"}
              </button>
            </div>
          ) : (
            <p className="text-gray-600 text-center">
              Carregando dados da conta...
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsPage;
