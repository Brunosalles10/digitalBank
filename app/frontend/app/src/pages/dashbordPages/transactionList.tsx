const transactions = [
  {
    name: "Spotify",
    date: "20 Mar 2021 08:00",
    amount: "-R$10,00",
    type: "debit",
  },
  {
    name: "Netflix",
    date: "14 Mar 2021 20:00",
    amount: "-R$20,00",
    type: "debit",
  },
  {
    name: "Faculdade",
    date: "09 Mar 2021 15:30",
    amount: "-R$250,00",
    type: "debit",
  },
  {
    name: "Trabalho",
    date: "06 Mar 2021 11:00",
    amount: "+R$5.000",
    type: "credit",
  },
];

const TransactionList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-900 font-bold text-lg">Transações recentes</h3>
        <a href="#" className="text-sm text-violet-700 hover:underline">
          Ver tudo
        </a>
      </div>

      <ul className="space-y-4">
        {transactions.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="text-gray-800 font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
            <p
              className={`font-semibold ${
                item.type === "credit" ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.amount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
