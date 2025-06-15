import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getErrorMessage } from "../hooks/Errors";
import api from "../services/api";

const ChangePassword = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("");
    toast.success("");

    const { newPassword, confirmPassword } = form;

    if (!newPassword || !confirmPassword)
      return toast.error("Preencha todos os campos.");

    if (newPassword !== confirmPassword)
      return toast.error("As senhas não coincidem.");

    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!strongRegex.test(newPassword))
      return toast.error("A nova senha precisa ser forte.");

    try {
      setLoading(true);
      await api.put(`/users/${userId}`, {
        password: newPassword,
      });

      toast.success("Senha alterada com sucesso!");
      setForm({ newPassword: "", confirmPassword: "" });
      setTimeout(() => navigate(`/dashboard/${userId}`), 3000);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-violet-700 mb-4 text-center">
        Alterar Senha
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-700 font-semibold mb-1">
            Nova senha
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            value={form.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 font-semibold mb-1">
            Confirmar nova senha
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-violet-700 text-white py-3 rounded-lg font-semibold hover:bg-violet-400 transition duration-300
          cursor-pointer"
        >
          {loading ? "Alterando..." : "Alterar Senha"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
