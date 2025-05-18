import { FaExchangeAlt, FaPiggyBank } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardActions = () => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center h-full text-center space-y-4
     hover:bg-violet-50 cursor-pointer border-2 border-violet-800"
    >
      <h3 className="text-gray-600 text-sm">Ações rápidas</h3>
      <div className="flex flex-col gap-3 w-full">
        <Link
          to="/transfer"
          className="flex items-center justify-center gap-2 bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-violet-400 transition"
        >
          <FaExchangeAlt />
          Transferir
        </Link>
        <Link
          to="/deposit"
          className="flex items-center justify-center gap-2 bg-violet-700 text-white py-2 px-4 rounded-lg hover:bg-violet-400 transition"
        >
          <FaPiggyBank />
          Depositar
        </Link>
      </div>
    </div>
  );
};

export default CardActions;
