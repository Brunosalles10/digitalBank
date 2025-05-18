import {
  FaChartBar,
  FaCog,
  FaCreditCard,
  FaHome,
  FaLongArrowAltUp,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logoSolidBank.png";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-violet-700 text-white flex flex-col justify-between py-6 px-4">
      {/* TOPO: LOGO */}
      <div>
        <div className="flex items-center gap-2 mb-10 px-2">
          <img src={logo} alt="Solid Bank" className="" />
        </div>

        {/* MENU PRINCIPAL */}
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-violet-600 font-medium hover:bg-violet-500 transition"
          >
            <FaHome />
            Inicio
          </Link>

          <Link
            to="/clients"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaUsers />
            Meu Dados
          </Link>
          <Link
            to="/accounts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaUniversity />
            Contas
          </Link>

          <Link
            to="/cards"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaCreditCard />
            Cartões
          </Link>

          <Link
            to="/transactions"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaChartBar />
            Transações
          </Link>
          <Link
            to="/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaLongArrowAltUp />
            Sair
          </Link>
        </nav>
      </div>

      {/* RODAPÉ: CONFIGURAÇÕES */}
      <div>
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
        >
          <FaCog />
          Configurações
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
