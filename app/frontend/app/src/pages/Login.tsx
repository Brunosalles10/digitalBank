import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-violet-700 mb-2 text-center">
          Bem-vindo de volta
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Acesse sua conta Solid Bank
        </p>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-violet-700 text-white py-3 rounded-lg font-semibold hover:bg-violet-400 transition duration-500 cursor-pointer"
          >
            Entrar
          </button>
        </form>

        {/* Link para cadastro */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Não tem uma conta?{" "}
          <Link
            to="/signup"
            className="text-violet-700 font-semibold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
