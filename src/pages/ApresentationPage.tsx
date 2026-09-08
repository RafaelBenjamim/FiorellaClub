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
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans flex flex-col selection:bg-[#c07a82] selection:text-white overflow-x-hidden">
      <Header />
      <Hero />

      {/* Container principal organizando o fluxo com respiro uniforme e sem colagens */}
      <main className="flex flex-col gap-6 md:gap-8 my-6 md:my-8">
        
        {/* Seção Sobre */}
        <div className="px-6 md:px-12">
          <Sobre />
        </div>

        {/* Seção de Benefícios */}
        <section id="beneficios" className="px-6 md:px-12">
          <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-[3rem] border border-[#fce3e4] shadow-sm p-8 md:p-12 transition-all duration-300 hover:shadow-md">
            <div className="max-w-3xl mb-8 md:mb-10">
              <p className="uppercase tracking-[0.3em] text-[#c07a82] text-xs font-bold mb-2">
                Por que participar
              </p>
              <h2 className="text-3xl md:text-4xl font-serif mb-3 text-[#4a0b16] leading-tight">
                Mais do que um encontro: um espaço para se sentir em casa
              </h2>
              <p className="text-base md:text-lg text-[#940c0c]/90 leading-relaxed">
                No Fiorella Club, cada experiência foi pensada para oferecer
                acolhimento, criatividade e presença em meio à rotina.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {beneficios.map((item) => (
                <div
                  key={item.titulo}
                  className="rounded-[1.5rem] border border-[#fce3e4]/60 bg-[#fffaf8] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-[#c07a82]/40 group"
                >
                  <h3 className="text-xl font-serif mb-2.5 text-[#4a0b16] group-hover:text-[#c07a82] transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-[#940c0c]/80 text-sm md:text-base leading-relaxed">
                    {item.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Chamada para Ação (CTA) */}
        <section id="inscreva" className="px-6 md:px-12">
          <div className="max-w-5xl mx-auto bg-[#4a0b16] text-[#fce3e4] rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            
            {/* Detalhe decorativo sutil */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <p className="uppercase tracking-[0.3em] text-[#f4c4c8] text-xs font-bold mb-2">
                Próximo passo
              </p>
              <h2 className="text-2xl md:text-4xl font-serif mb-3 leading-tight">
                Pronta para viver um momento diferente da rotina?
              </h2>
              <p className="text-[#fce3e4]/80 text-base md:text-lg leading-relaxed">
                Entre em contato e descubra como participar dos próximos encontros
                do Fiorella Club.
              </p>
            </div>

            <a
              href="/meeting"
              className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#fce3e4] px-8 py-4 text-[#4a0b16] font-semibold text-sm md:text-base transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_0_25px_rgba(252,227,228,0.4)] active:scale-95 whitespace-nowrap"
            >
              Reserve sua presença
            </a>
          </div>
        </section>

      </main>

      <Galeria />
      <Footer />
    </div>
  );
}

export default App;