import ribbon from "../../assets/footer.jpg";

function Footer() {
  return (
    <footer
      id="contato"
      className="bg-[#4a0b16] text-[#fce3e4] py-16 text-center mt-auto rounded-t-[3rem]"
    >
      <div className="text-4xl font-serif mb-6">Fiorella Club</div>
      <img src={ribbon} alt="" className="w-16 h-16 mx-auto mb-4 opacity-90" />
      <p className="mb-10 opacity-90 max-w-md mx-auto font-light">
        Criando momentos, conexões e arte.
      </p>

      <div className="flex justify-center gap-10 mb-12">
        <a
          href="https://www.instagram.com/fiorellaclub_/"
          className="hover:text-[#c07a82] transition-colors tracking-widest uppercase text-sm font-semibold"
        >
          Instagram
        </a>
        <a
          href="#"
          className="hover:text-[#c07a82] transition-colors tracking-widest uppercase text-sm font-semibold"
        >
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
