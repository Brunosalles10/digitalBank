import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Sidebar from "../../components/sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { getErrorMessage } from "../../hooks/Errors";
import api from "../../services/api";
import CardDisplay from "../cardPages/CardDisplay";
import CreateCardPrompt from "../cardPages/CreateCardPrompt";

type Card = {
  id: number;
  cardNumber: string;
  cardType: "credit" | "debit";
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  status: "active" | "blocked" | "expired";
};

type Account = {
  accountNumber: string;
  id: number;
};

const CreditCardPage = () => {
  const { userId, userName } = useAuth();
  const [account, setAccount] = useState<Account | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await api.get(`/accounts/user/${userId}`);
        setAccount(data[0]);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    };
    fetchAccount();
  }, [userId]);

  useEffect(() => {
    const fetchCard = async () => {
      if (!account?.accountNumber) return;
      try {
        const { data } = await api.get(
          `/cards/account/${account.accountNumber}`
        );
        setCard(data[0]);
      } catch {
        setCard(null);
      }
    };
    fetchCard();
  }, [account]);

  const handleCreateCard = async () => {
    if (!account) return;
    setLoading(true);
    try {
      const { data } = await api.post("/cards", {
        accountId: account.id,
        cardType: "credit",
        cardHolderName: userName,
      });
      toast.success("Cartão criado!");
      setCard(data);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBlockCard = async () => {
    if (!card) return;
    const confirm = window.confirm("Deseja realmente bloquear o cartão?");
    if (!confirm) return;
    try {
      await api.put(`/cards/${card.id}`, { status: "blocked" });
      toast.success("Cartão bloqueado.");
      setCard({ ...card, status: "blocked" });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleDeleteCard = async () => {
    if (!card) return;
    const confirm = window.confirm("Deseja realmente excluir o cartão?");
    if (!confirm) return;
    try {
      await api.delete(`/cards/${card.id}`);
      toast.success("Cartão excluído.");
      setCard(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-violet-700 mb-6">
          Cartões de Crédito
        </h2>
        {!card ? (
          <CreateCardPrompt onCreate={handleCreateCard} loading={loading} />
        ) : (
          <CardDisplay
            card={card}
            onBlock={handleBlockCard}
            onDelete={handleDeleteCard}
          />
        )}
      </main>
    </div>
  );
};

export default CreditCardPage;
