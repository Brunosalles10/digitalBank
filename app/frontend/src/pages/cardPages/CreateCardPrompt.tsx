interface Props {
  onCreate: () => void;
  loading: boolean;
}

const CreateCardPrompt = ({ onCreate, loading }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-xl mx-auto">
      <p className="mb-4 text-gray-600">
        Você ainda não possui um cartão vinculado à sua conta.
      </p>
      <button
        onClick={onCreate}
        disabled={loading}
        className="bg-violet-700 text-white px-6 py-2 rounded-lg hover:bg-violet-400 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Criando cartão..." : "Criar Cartão"}
      </button>
    </div>
  );
};

export default CreateCardPrompt;
