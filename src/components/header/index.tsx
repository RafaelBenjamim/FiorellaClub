import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleInicio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleContato = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // já está na landing, só scrolla
      document
        .getElementById("contato")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // está em outra página, navega pra landing e scrolla depois
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("contato")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="flex justify-between items-center px-8 md:px-16 py-6 bg-[#fce3e4]/80 backdrop-blur-md sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <span className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
          Fiorella Club
        </span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-semibold">
        <a
          href="/"
          onClick={handleInicio}
          className="hover:text-[#c07a82] transition-colors duration-300 cursor-pointer"
        >
          Início
        </a>
        <Link
          to="/meeting"
          className="hover:text-[#c07a82] transition-colors duration-300"
        >
          Eventos
        </Link>
        <a
          href="#contato"
          onClick={handleContato}
          className="hover:text-[#c07a82] transition-colors duration-300
          cursor-pointer"
        >
          Contato
        </a>
      </nav>
      <button
        className="md:hidden text-[#4a0b16]"
        onClick={() => setMenuAberto(!menuAberto)}
      >
        {menuAberto ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu mobile */}
      {menuAberto && (
        <div className="absolute top-full left-0 right-0 bg-[#fce3e4]/95 backdrop-blur-md flex flex-col items-center gap-6 py-8 text-sm uppercase tracking-widest font-semibold md:hidden shadow-md">
          <a
            href="/"
            onClick={handleInicio}
            className="hover:text-[#c07a82] transition-colors duration-300 cursor-pointer"
          >
            Início
          </a>
          <Link
            to="/meeting"
            onClick={() => setMenuAberto(false)}
            className="hover:text-[#c07a82] transition-colors duration-300"
          >
            Eventos
          </Link>
          <a
            href="#contato"
            onClick={handleContato}
            className="hover:text-[#c07a82] transition-colors duration-300 cursor-pointer"
          >
            Contato
          </a>
        </div>
      )}
    </header>
  );
}
