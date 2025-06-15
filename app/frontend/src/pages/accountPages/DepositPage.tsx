import { useState } from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

const DepositPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const parsedAmount = parseFloat(
      amount.replace(/[^\d,.-]/g, "").replace(",", ".")
    );

    try {
      setLoading(true);

      // Recupera conta do usuário
      const { data } = await api.get(`/accounts/user/${userId}`);
      const accountNumber = data[0].accountNumber;
      if (!accountNumber) {
        return setError("Conta não encontrada.");
      }

      // Faz depósito
      await api.post("/deposit", {
        accountNumber,
        amount: parsedAmount,
        description,
      });

      setMessage("Depósito realizado com sucesso!");
      setAmount("");
      setDescription("");
      setTimeout(() => navigate(`/accounts/user/${userId}`), 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
          <div className="flex items-center gap-3 mb-6 text-violet-700 text-2xl font-bold">
            <FaMoneyCheckAlt />
            <h2>Realizar Depósito</h2>
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
          )}
          {message && (
            <p className="text-green-700 bg-green-100 p-2 rounded mb-4">
              {message}
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Valor do Depósito
              </label>
              <NumericFormat
                value={amount}
                onValueChange={(values) => setAmount(values.value)}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                decimalScale={2}
                fixedDecimalScale
                placeholder="R$ 0,00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Depósito via PIX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <button
              type="button"
              onClick={handleDeposit}
              disabled={loading}
              className="bg-violet-700 text-white w-full py-3 rounded-lg hover:bg-violet-400 transition cursor-pointer"
            >
              {loading ? "Depositando..." : "Depositar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
