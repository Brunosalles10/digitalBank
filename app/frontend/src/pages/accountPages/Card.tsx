import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  to?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, children, to }) => {
  const content = (
    <div
      className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl hover:shadow-violet-200/50 hover:ring-4 hover:ring-violet-100
       border-2 border-violet-700 hover:bg-violet-50 transition duration-300
  cursor-pointer hover:bg-gradient-to-br from-white to-violet-100"
    >
      <div className="flex items-center gap-2 text-violet-700 mb-4 text-xl">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
};

export default Card;
