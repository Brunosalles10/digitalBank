import { useEffect, useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

const PaymentPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar a conta do usuário ao carregar a página
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await api.get(`/accounts/user/${userId}`);
        setAccountNumber(data[0]?.accountNumber || "");
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [userId]);

  const handlePayment = async () => {
    setError("");
    setMessage("");

    const parsedAmount = parseFloat(
      amount.replace(/[^\d,.-]/g, "").replace(",", ".")
    );

    if (!parsedAmount || parsedAmount <= 0) {
      return setError("Informe um valor válido maior que zero.");
    }

    try {
      setLoading(true);
      const response = await api.post("/payment", {
        accountNumber,
        amount: parsedAmount,
        description,
      });
      const customMessage = "Pagemento realizada com sucesso!";
      setMessage(customMessage || response.data.message);
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
          <div className="flex items-center justify-center text-violet-700 mb-6 text-4xl">
            <FaFileInvoiceDollar />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-violet-700">
            Pagamento
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
            {/* Conta do usuário */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Número da sua conta
              </label>
              <input
                type="text"
                value={accountNumber}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Valor */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Valor do pagamento
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

            {/* Descrição */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Descrição (opcional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Pagamento de conta de luz"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className={`cursor-pointer w-full bg-violet-700 text-white py-3 rounded-lg font-semibold transition duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-400"
              }`}
            >
              {loading ? "Processando..." : "Pagar"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
