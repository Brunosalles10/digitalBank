import { Link } from "react-router-dom";
import logo from "../../assets/logoSolidBank.png";
const NavBar = () => {
  return (
    <header className="absolute inset-x-3 top-0 z-50 bg-white/80 border-violet-500 border-b-2 backdrop-blur shadow-md">
      <nav className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo Solid Bank"
              className="border-2 border-violet-500 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-110"
            />
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="border-2 border-violet-700 rounded-lg hover:bg-violet-400
            px-4 py-2 text-lg font-semibold text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
          >
            Área do Cliente
          </Link>

          <Link
            to="/signup"
            className="
            border-2 border-violet-700 rounded-lg  hover:bg-violet-400
            px-4 py-2 text-lg font-semibold text-gray-900 hover:text-gray-900 transition duration-300 ease-in-out hover:scale-105 cursor-pointer"
          >
            Abrir Conta
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default NavBar;
