const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-white py-6">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        {/* Logo e Nome do Projeto */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="w-15 h-15" />
          <p className="text-2xl font-medium">SoftPet</p>
        </div>

        {/* Links rápidos */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#about" className="hover:underline">
            Sobre
          </a>
          <a href="#services" className="hover:underline">
            Serviços
          </a>
          <a href="#contact" className="hover:underline">
            Contato
          </a>
        </div>

        {/* Direitos autorais e redes sociais */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          <p className="text-sm">
            &copy; 2024 SoftPet. Todos os direitos reservados.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
