import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
      <h1 className="text-5xl font-bold text-violet-700 mb-4">Oops!</h1>
      <p className="text-gray-700 mb-6 text-lg">
        Algo deu errado. Página não encontrada ou erro interno.
      </p>
      <Link
        to="/"
        className="bg-violet-700 text-white px-6 py-3 rounded-lg hover:bg-violet-600 transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
};

export default ErrorPage;
