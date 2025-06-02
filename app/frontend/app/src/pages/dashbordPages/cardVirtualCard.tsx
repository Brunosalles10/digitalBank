import { Link } from "react-router-dom";
import cardImage from "../../assets/card1.png";

const CardVirtualCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md  hover:bg-violet-50 cursor-pointer border-2 border-violet-800">
      <h3 className="text-gray-600 text-sm mb-3">Seu cartão virtual</h3>
      <Link to="/accounts/creditcard/:userId">
        <img
          src={cardImage}
          alt="Cartão Virtual"
          className="rounded-xl shadow-md mb-4 hover:scale-105 transition w-100 h-55 object-cover mx-auto"
        />
      </Link>
      <Link
        to="/accounts/creditcard/:userId"
        className="block text-center text-violet-700 font-semibold  border-2 border-violet-700 transition hover:bg-violet-400 rounded-lg py-2 px-4"
      >
        Ver cartões
      </Link>
    </div>
  );
};

export default CardVirtualCard;
