import { Header } from "../components/header";
import { Hero } from "../components/Hero/Index";
import Sobre from "../components/Sobre";
import Footer from "../components/footer/index";
import { Galeria } from "../components/galeria/index";

const beneficios = [
  {
    titulo: "Uma pausa para respirar",
    texto:
      "Um encontro pensado para desacelerar, deixar a correria de lado e voltar com mais presença.",
  },
  {
    titulo: "Espaço acolhedor",
    texto:
      "Mais do que um evento, um ambiente leve e seguro para compartilhar, criar e se sentir parte de algo.",
  },
  {
    titulo: "Momento com propósito",
    texto:
      "Cada experiência é pensada para despertar criatividade, conexão e um sentimento de pertencimento.",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans flex flex-col selection:bg-[#c07a82] selection:text-white">
      <Header />
      <Hero />
      <Sobre />

      <section id="beneficios" className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white/80 rounded-[2rem] border border-[#fce3e4] shadow-sm p-8 md:p-12">
          <div className="max-w-3xl mb-10">
            <p className="uppercase tracking-[0.3em] text-[#c07a82] text-sm font-semibold mb-3">
              Por que participar
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-[#4a0b16]">
              Mais do que um encontro: um espaço para se sentir em casa
            </h2>
            <p className="text-lg text-[#940c0c] leading-relaxed">
              No Fiorella Club, cada experiência foi pensada para oferecer
              acolhimento, criatividade e presença em meio à rotina.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {beneficios.map((item) => (
              <div
                key={item.titulo}
                className="rounded-[1.5rem] border border-[#fce3e4] bg-[#fffaf8] p-6 shadow-sm"
              >
                <h3 className="text-xl font-serif mb-3 text-[#4a0b16]">
                  {item.titulo}
                </h3>
                <p className="text-[#940c0c] leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inscreva" className="px-6 md:px-12 pb-16">
        <div className="max-w-5xl mx-auto bg-[#4a0b16] text-[#fce3e4] rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-[#f4c4c8] text-sm font-semibold mb-3">
              Próximo passo
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-3">
              Pronta para viver um momento diferente da rotina?
            </h2>
            <p className="text-[#fce3e4]/90 text-lg leading-relaxed">
              Entre em contato e descubra como participar dos próximos encontros
              do Fiorella Club.
            </p>
          </div>

          <a
            href="/meeting"
            className="inline-flex items-center justify-center rounded-full bg-[#fce3e4] px-8 py-4 text-[#4a0b16] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Reserve sua presença
          </a>
        </div>
      </section>

      <Galeria />
      <Footer />
    </div>
  );
}

export default App;
