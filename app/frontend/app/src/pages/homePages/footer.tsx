import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logoSolidBank.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo Solid Bank" className="" />
          <span className="text-xl font-bold text-violet-700">Solid Bank</span>
        </div>

        {/* REDES SOCIAIS */}
        <div className="flex items-center gap-6 text-violet-700 text-xl">
          <a
            href="#"
            className="hover:text-violet-500 transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="hover:text-violet-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-violet-500 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            className="hover:text-violet-500 transition"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        {/* LINKS RÁPIDOS */}
        <div className="text-sm text-gray-600 space-x-4">
          <a href="#" className="hover:underline">
            Termos de Uso
          </a>
          <a href="#" className="hover:underline">
            Política de Privacidade
          </a>
          <a href="#" className="hover:underline">
            Contato
          </a>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} Solid Bank. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
