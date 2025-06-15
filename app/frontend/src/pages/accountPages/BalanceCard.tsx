import { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";
import Card from "./Card";

const BalanceCard = () => {
  const { userId } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    const fetchBalance = async () => {
      try {
        const { data } = await api.get(`/accounts/user/${userId}`);
        const account = data[0];
        setBalance(parseFloat(account.balance));
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    fetchBalance();
  }, [userId]);

  return (
    <Card icon={<FaWallet />} title="Saldo Atual">
      {error && <p className="text-red-600">{error}</p>}
      {balance !== null ? (
        <p className="text-2xl font-bold text-gray-700">
          R$ {balance.toFixed(2)}
        </p>
      ) : (
        <p className="text-gray-500">Carregando saldo...</p>
      )}
    </Card>
  );
};

export default BalanceCard;
