import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

const TransferPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [receiverAccount, setReceiverAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    setError("");
    setMessage("");

    const parsedAmount = parseFloat(
      amount.replace(/[^\d,.-]/g, "").replace(",", ".")
    );

    if (!receiverAccount || !parsedAmount || parsedAmount <= 0) {
      return setError("Preencha todos os campos corretamente.");
    }

    try {
      setLoading(true);

      // Pega a conta do usuário logado
      const { data: userAccounts } = await api.get(`/accounts/user/${userId}`);
      const senderAccountNumber = userAccounts[0]?.accountNumber;

      if (!senderAccountNumber) {
        return setError("Conta de origem não encontrada.");
      }

      const response = await api.post("/transactions/transfer", {
        senderAccountNumber,
        receiverAccountNumber: receiverAccount,
        amount: parsedAmount,
        description,
      });
      const customMessage = "Transferência realizada com sucesso!";
      setMessage(customMessage || response.data.message);
      setAmount("");
      setReceiverAccount("");
      setDescription("");
      setTimeout(() => {
        navigate(`/accounts/user/${userId}`);
      }, 3000);
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
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border-2 border-violet-700">
          <div className="flex items-center justify-center text-violet-700 mb-6 text-4xl">
            <FaExchangeAlt />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-violet-700">
            Transferência Bancária
          </h2>

          {error && (
            <p className="text-red-600 bg-red-100 p-2 rounded mb-4">{error}</p>
          )}
          {message && (
            <p className="text-green-700 bg-green-100 p-2 rounded mb-4">
              {message}
            </p>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Conta de destino
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={receiverAccount}
                onChange={(e) => setReceiverAccount(e.target.value)}
                placeholder="Número da conta"
              />
            </div>

            <NumericFormat
              value={amount}
              onValueChange={(values) => {
                setAmount(values.value);
              }}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              allowNegative={false}
              decimalScale={2}
              fixedDecimalScale
              placeholder="R$ 0,00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            />

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Descrição (opcional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Pagamento de serviço"
              />
            </div>

            <button
              type="button"
              onClick={handleTransfer}
              disabled={loading}
              className={`cursor-pointer w-full bg-violet-700 text-white py-3 rounded-lg font-semibold transition duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-400"
              }`}
            >
              {loading ? "Transferindo..." : "Transferir"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransferPage;
