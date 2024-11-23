import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white py-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        {/* Logo e Nome do Projeto */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="w-15 h-15"
            width={35}
            height={35}
          />
          <p className="text-2xl font-medium">SoftPet</p>
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="#about" className="hover:underline">
            Sobre
          </Link>
          <Link href="#services" className="hover:underline">
            Serviços
          </Link>
          <Link href="#contact" className="hover:underline">
            Contato
          </Link>
        </div>

        {/* Direitos autorais, créditos e redes sociais */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-sm">
            &copy; 2024 SoftPet. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            Desenvolvido por <strong>Herbert Kayky</strong>
          </p>
          <div className="flex gap-3">
            {/* GitHub e LinkedIn */}
            <Link
              href="https://github.com/herbertkayky"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/herbert-kayky-783705141/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
          {/* Redes sociais (opcional) */}
          <div className="flex gap-3 mt-2">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
