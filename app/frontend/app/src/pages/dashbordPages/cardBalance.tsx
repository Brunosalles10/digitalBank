import { FaHandHoldingUsd, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardBalance = () => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center h-full text-center
     hover:bg-violet-50 cursor-pointer border-2 border-violet-800"
    >
      <div className="text-violet-700 text-4xl mb-4">
        <FaHandHoldingUsd />
      </div>
      <h3 className="text-gray-600 text-sm mb-1">Saldo disponível</h3>
      <p className="text-3xl font-bold text-violet-700">R$ 4.720</p>
      <Link
        to="/account"
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
