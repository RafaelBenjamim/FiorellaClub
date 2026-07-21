import { Link } from "react-router-dom";
import logo from "../../assets/Logo.jpg";

export function Header() {
  return (
    <header className="flex justify-between items-center px-8 md:px-16 py-6 bg-[#fce3e4]/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="" className="h-10 w-10 object-contain" />
        <span className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
          Fiorella Club
        </span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold">
        <Link
          to="/"
          className="hover:text-[#c07a82] transition-colors duration-300"
        >
          Início
        </Link>
        <Link
          to="/meeting"
          className="hover:text-[#c07a82] transition-colors duration-300"
        >
          Eventos
        </Link>
        <Link
          to="/"
          className="hover:text-[#c07a82] transition-colors duration-300"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}
