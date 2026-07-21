import { Link } from "react-router-dom";
import heroBg from "../../assets/hero-bg.jpg";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex-1 flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#4a0b16]/55"></div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-[#fce3e4]">
          Um encontro para respirar, criar e voltar com mais leveza
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#fce3e4]/90 mb-12 font-medium">
          O Fiorella Club reúne mulheres em um espaço acolhedor para
          desacelerar, se conectar e viver momentos que fazem bem ao coração.
        </p>
        <Link
          to="/meeting"
          className="inline-flex items-center justify-center bg-[#fce3e4] text-[#4a0b16] px-10 py-4 rounded-full hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-xl text-lg tracking-wide font-medium"
        >
          Quero participar
        </Link>
      </div>
    </section>
  );
}
