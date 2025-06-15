import Sidebar from "../components/sidebar";
import { useAuth } from "../contexts/AuthContext";
import CardActions from "./dashbordPages/cardActions";
import CardBalance from "./dashbordPages/cardBalance";
import CardVirtualCard from "./dashbordPages/cardVirtualCard";
import TransactionList from "./dashbordPages/transactionList";
const Dashbord = () => {
  const { userName } = useAuth();

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="p-6 space-y-8">
          {/* TÍTULO */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visão geral</h1>
            <p className="text-gray-600">
              Olá {userName}, bem-vindo a sua conta digital!
            </p>
          </div>
          {/* GRID DE CARDS SUPERIORES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardBalance />
            <CardActions />
            <CardVirtualCard />
          </div>
          {/* TRANSAÇÕES RECENTES */}
          <TransactionList />
        </div>
      </div>
    </>
  );
};
export default Dashbord;
