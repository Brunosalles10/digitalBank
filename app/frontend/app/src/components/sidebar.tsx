import {
  FaChartBar,
  FaCog,
  FaCreditCard,
  FaHome,
  FaLock,
  FaLongArrowAltUp,
  FaUniversity,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logoSolidBank.png";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
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
            to="/dashboard/:userId"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-violet-600 font-medium hover:bg-violet-500 transition"
          >
            <FaHome />
            Inicio
          </Link>

          <Link
            to="/editprofile/:userId"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaUsers />
            Meu Dados
          </Link>
          <Link
            to="/accounts/user/:userId"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaUniversity />
            Conta
          </Link>

          <Link
            to="/cards"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaCreditCard />
            Cartões
          </Link>

          <Link
            to="/accounts/transactions/:userId"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaChartBar />
            Transações
          </Link>
          <Link
            to="/changepassword/:userId"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-violet-500 transition"
          >
            <FaLock />
            Alterar Senha
          </Link>

          <Link
            to="/"
            onClick={logout}
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
