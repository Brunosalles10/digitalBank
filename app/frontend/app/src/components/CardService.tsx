import { ReactNode } from "react";

interface CardServiceProps {
  icon: ReactNode;
  title: string;
}

const CardService = ({ icon, title }: CardServiceProps) => {
  return (
    <div
      className="group flex flex-col items-center text-center p-8 bg-gray-100 rounded-xl shadow-md 
      transform transition duration-300 ease-in-out 
      hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:bg-violet-50 cursor-pointer"
    >
      <div className="mb-4 text-violet-700 transition duration-300 group-hover:scale-110">
        {icon}
      </div>

      <p className="text-gray-900 font-semibold transition duration-300 group-hover:text-violet-700">
        {title}
      </p>
    </div>
  );
};

export default CardService;
