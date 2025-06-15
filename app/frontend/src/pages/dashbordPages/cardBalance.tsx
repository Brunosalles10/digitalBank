import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHandHoldingUsd, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";

const CardBalance = () => {
  const { userId } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/accounts/user/${userId}`);
        const account = data[0];
        setBalance(parseFloat(account.balance));
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, [userId]);

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center h-full text-center
     hover:bg-violet-50 cursor-pointer border-2 border-violet-800"
    >
      <div className="text-violet-700 text-4xl mb-4">
        <FaHandHoldingUsd />
      </div>
      <h3 className="text-gray-600 text-sm mb-1">Saldo disponível</h3>

      {loading ? (
        <p className="text-gray-400 text-lg animate-pulse">Carregando...</p>
      ) : (
        <p className="text-3xl font-bold text-violet-700">
          R$ {balance?.toFixed(2).replace(".", ",")}
        </p>
      )}

      <Link
        to={`/accounts/user/${userId}`}
        className="flex items-center justify-center gap-4 mt-4 text-violet-700 font-semibold border-2 border-violet-700 
        hover:bg-violet-400 rounded-lg py-2 px-4 transition"
      >
        <FaUniversity />
        Detalhes da conta
      </Link>
    </div>
  );
};

export default CardBalance;
