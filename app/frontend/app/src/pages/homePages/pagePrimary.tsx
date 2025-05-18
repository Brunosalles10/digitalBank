import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import phone from "../../assets/phone.png";

const PagePrimary = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20 px-8 items-center">
      {/* CARD ESQUERDO */}
      <div className="bg-white shadow-lg rounded-lg p-12">
        {/* TEXTO PRINCIPAL COM ANIMAÇÃO DE BRILHO */}
        <motion.p
          className="text-6xl font-extrabold tracking-tight leading-tight mb-10 bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600 bg-clip-text text-transparent"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          COMPRE. <br />
          PAGUE. <br />
          GERENCIE.
        </motion.p>

        {/* SLOGAN COM ENTRADA SUAVE */}
        <motion.p
          className="text-xl  text-gray-900 font-semibold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A sua liberdade financeira começa com o Solid Bank.
        </motion.p>

        {/* BOTÃO LINK  */}
        <Link
          to="/signup"
          className="border-2 border-violet-700 rounded-xl  hover:bg-violet-500
          px-8 py-4 text-xl font-semibold  text-gray-900  hover:text-gray-900 transition duration-300 ease-in-out hover:scale-105 cursor-pointer shadow-md"
        >
          Abrir Minha Conta
        </Link>
      </div>

      {/* IMAGEM DIREITA */}
      <div className="flex justify-center lg:justify-end mt-[-50px]">
        <img
          src={phone}
          alt="Phone"
          className="pr-0 lg:pr-24 max-w-xl w-full transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
};

export default PagePrimary;
