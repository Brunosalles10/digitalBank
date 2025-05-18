import CardActions from "./dashbordPages/CardActions";
import CardBalance from "./dashbordPages/CardBalance";
import CardVirtualCard from "./dashbordPages/CardVirtualCard";
import Sidebar from "./dashbordPages/sidebar";
import TransactionList from "./dashbordPages/transactionList";
const Dashbord = () => {
  const userName = "John Doe";
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="p-6 space-y-8">
          {/* TÍTULO */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visão geral</h1>
            <p className="text-gray-600">Olá {userName}, bem-vindo de volta!</p>
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
