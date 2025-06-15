import blackCard from "../../assets/card.png";

const PageTertiary = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* TÍTULO COM EFEITO */}
        <h2
          className="text-4xl font-extrabold text-center mb-12 
          bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 
          bg-clip-text text-transparent animate-pulse"
        >
          SOLID CARD
        </h2>

        {/* CARD COM EFEITOS DE HOVER */}
        <div
          className="group flex flex-col lg:flex-row items-center justify-between 
          bg-gray-100 rounded-xl p-8 shadow-md transition 
          duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:bg-violet-50"
        >
          {/* Texto à esquerda */}
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-violet-700 transition">
              Benefícios do cartão de crédito
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Cartão sem anuidade</li>
              <li>Cashback em compras</li>
              <li>Compras parceladas em até 12x</li>
            </ul>
          </div>

          {/* Imagem à direita */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={blackCard}
              alt="Cartão Black"
              className="max-w-xs w-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTertiary;
