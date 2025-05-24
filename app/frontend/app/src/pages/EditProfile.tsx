import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInputs";
import Sidebar from "../components/sidebar";
import { useAuth } from "../contexts/AuthContext";
import { getErrorMessage } from "../hooks/Errors";
import api from "../services/api";

const EditProfile = () => {
  const { userId, logout } = useAuth();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (!userId) return;
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/users/${userId}`);
        setForm({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
        });
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    };
    fetchUser();
  }, [userId, token, navigate]);

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
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss("");
    if (Object.values(form).some((v) => !v))
      return toast.error("Preencha todos os campos.");

    try {
      setLoading(true);
      await api.put(`/users/${userId}`, form);
      toast.success("Dados atualizados com sucesso!");
      setTimeout(() => navigate(`/dashboard/${userId}`), 3000);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmed) return;

    try {
      await api.delete(`/users/${userId}`);
      logout();
      navigate("/");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-8 bg-gray-50 rounded-xl justify-items-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-violet-700 text-center mb-2">
            Editar Perfil
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Atualize suas informações de cadastro
          </p>

          <form className="space-y-4" onSubmit={handleUpdate}>
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white bg-violet-700 transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-violet-400 cursor-pointer"
              }`}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleDelete}
              className="text-sm text-red-600 hover:text-gray-950 font-semibold  w-full py-3 rounded-lg bg-red-200 transition hover:bg-red-500 cursor-pointer"
            >
              Deletar minha conta
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
