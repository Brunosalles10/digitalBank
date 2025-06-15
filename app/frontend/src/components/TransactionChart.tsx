import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Transaction = {
  transactionType: "deposit" | "transfer" | "payment";
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

const COLORS = ["#10B981", "#3B82F6", "#EF4444"];

const typeLabels: Record<string, string> = {
  deposit: "Depósitos",
  transfer: "Transferências",
  payment: "Pagamentos",
};

const TransactionChart = ({ transactions }: Props) => {
  const grouped = transactions.reduce(
    (acc, curr) => {
      acc[curr.transactionType] += Number(curr.amount);
      return acc;
    },
    { deposit: 0, transfer: 0, payment: 0 }
  );

  const data = Object.entries(grouped)
    .map(([type, value]) => ({
      name: typeLabels[type],
      value,
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border-2 border-violet-800 hover:bg-violet-50 transition">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Distribuição das Transações
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Valor"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
