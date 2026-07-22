import { AiOutlineInstagram, AiOutlineWhatsApp } from "react-icons/ai";

function Footer() {
  return (
    <footer
      id="contato"
      className="bg-[#4a0b16] text-[#fce3e4] py-16 text-center mt-auto rounded-t-[3rem]"
    >
      <div className="text-4xl font-serif mb-6">Fiorella Club</div>
      <p className="mb-10 opacity-90 max-w-md mx-auto font-light">
        Criando momentos, conexões e arte.
      </p>

      <div className="flex justify-center gap-10 mb-12">
        <a
          href="https://www.instagram.com/fiorellaclub_/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#c07a82] transition-colors tracking-widest uppercase text-sm font-semibold"
        >
          <AiOutlineInstagram size={20} />
          Instagram
        </a>
        <a
          href="https://wa.me/5534992468401"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-[#c07a82] transition-colors tracking-widest uppercase text-sm font-semibold"
        >
          <AiOutlineWhatsApp size={20} />
          WhatsApp
        </a>
      </div>

      <div className="w-3/4 h-px bg-[#940c0c] mx-auto mb-8 opacity-50"></div>

      <div className="text-xs font-light opacity-60 tracking-wider">
        &copy; {new Date().getFullYear()} Fiorella Club. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;
