import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInputs";
import { getErrorMessage } from "../hooks/Errors";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const validatePasswordStrength = (value: string) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    setPasswordStrength(strongRegex.test(value) ? "Forte" : "Fraca");
  };

  const handleChange = (field: string, value: string) => {
    if (field === "cpf") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    if (field === "phone") {
      value = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }
    setForm({ ...form, [field]: value });

    if (field === "password") validatePasswordStrength(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { name, email, cpf, phone, password, confirmPassword } = form;

    if (Object.values(form).some((v) => !v))
      return setError("Preencha todos os campos.");
    if (password !== confirmPassword)
      return setError("As senhas não coincidem.");
    if (passwordStrength !== "Forte")
      return setError("A senha precisa ser forte.");
    if (!email.includes("@") || !email.includes("."))
      return setError("Email inválido.");

    try {
      setLoading(true);
      await api.post("/users", { name, email, cpf, phone, password });
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-violet-700 text-center mb-2">
          Crie sua conta
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Preencha os dados para abrir sua conta no Solid Bank
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded">{error}</p>
          )}
          {success && (
            <p className="bg-green-100 text-green-700 p-2 rounded">{success}</p>
          )}

          <FormInput
            id="name"
            label="Nome completo"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <FormInput
            id="cpf"
            label="CPF"
            value={form.cpf}
            maxLength={14}
            onChange={(e) => handleChange("cpf", e.target.value)}
          />
          <FormInput
            id="phone"
            label="Telefone"
            value={form.phone}
            maxLength={15}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <FormInput
            id="password"
            label="Senha"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {form.password && (
            <p
              className={`text-sm font-medium ${
                passwordStrength === "Forte" ? "text-green-600" : "text-red-600"
              }`}
            >
              Senha {passwordStrength}
            </p>
          )}
          <FormInput
            id="confirmPassword"
            label="Confirmar senha"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white bg-violet-700 transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-violet-400 cursor-pointer"
            }`}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

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
