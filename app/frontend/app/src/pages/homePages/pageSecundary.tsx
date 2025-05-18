import {
  FaBarcode,
  FaFileInvoice,
  FaMobileAlt,
  FaMoneyBillAlt,
  FaReceipt,
  FaUserAlt,
} from "react-icons/fa";
import CardService from "../../components/CardService";

const PageSecundary = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-extrabold text-center mb-12 
          bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 
          bg-clip-text text-transparent animate-pulse"
        >
          Facilite seu dia a dia com nosso autoatendimento
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardService
            icon={<FaFileInvoice size={40} />}
            title="Fatura do cartão"
          />
          <CardService
            icon={<FaReceipt size={40} />}
            title="2ª via de boletos"
          />
          <CardService icon={<FaBarcode size={40} />} title="Pagar as contas" />
          <CardService
            icon={<FaUserAlt size={40} />}
            title="Acesso autenticado com biometria"
          />
          <CardService
            icon={<FaMoneyBillAlt size={40} />}
            title="Consulta de extrato"
          />
          <CardService
            icon={<FaMobileAlt size={40} />}
            title="Aplicativo Solid Bank"
          />
        </div>
      </div>
    </section>
  );
};

export default PageSecundary;
