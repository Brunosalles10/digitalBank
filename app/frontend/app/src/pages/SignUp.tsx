import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    // Por exemplo, fazer uma requisição para a API para criar a conta
    console.log("Formulário enviado");
    navigate("/login");
  };

  const validatePasswordStrength = (value: string) => {
    const strongRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (strongRegex.test(value)) {
      setPasswordStrength("Forte");
    } else {
      setPasswordStrength("Fraca");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-violet-700 mb-2 text-center">
          Crie sua conta
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Preencha os dados para abrir sua conta no Solid Bank
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nome completo */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* E-mail */}
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
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* CPF */}
          <div>
            <label
              htmlFor="cpf"
              className="block text-gray-700 font-semibold mb-1"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Telefone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-1"
            >
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(44) 99234-5678"
              maxLength={15}
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
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePasswordStrength(e.target.value);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
            {password && (
              <p
                className={`mt-1 text-sm font-medium ${
                  passwordStrength === "Forte"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Senha {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirmação de senha */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-semibold mb-1"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Repita sua senha"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-violet-700 text-white py-3 rounded-lg font-semibold hover:bg-violet-400 transition duration-300 cursor-pointer"
          >
            Criar Conta
          </button>
        </form>

        {/* Link para login */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <Link
            to="/login"
            className="text-violet-700 font-semibold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
