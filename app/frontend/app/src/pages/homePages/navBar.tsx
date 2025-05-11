import { Link } from "react-router-dom";
import logo from "../../assets/logoSolidBank.png";
const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur">
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Solid Bank</span>
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="flex gap-4 ml-8">
          <Link
            to="/login"
            className="border-2 border-violet-700 rounded-lg hover:bg-violet-400
            px-4 py-2 text-lg font-semibold text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out cursor-pointer"
          >
            Área do Cliente
          </Link>

          <Link
            to="/sigin"
            className="
            border-2 border-violet-700 rounded-lg  hover:bg-violet-400
            px-4 py-2 text-lg font-semibold text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out cursor-pointer"
          >
            Abrir Conta
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
