import sobre1 from "../../assets/sobre1.jpg";
import sobre2 from "../../assets/sobre2.jpg";
import { motion } from "framer-motion";

function Sobre() {
  return (
    <section
      id="sobre"
      className="py-24 px-6 md:px-12 max-w-5xl mx-auto bg-white rounded-[3rem] shadow-sm my-12 border border-[#fce3e4]"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-serif mb-8 text-[#4a0b16] text-center"
      >
        Sobre nós
      </motion.h2>
      <div className="w-24 h-1.5 bg-[#c07a82] mx-auto mb-12 rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-10 items-center px-4 md:px-10">
        <div className="flex flex-col gap-4">
          <img
            src={sobre1}
            alt="Encontro Fiorella Club"
            className="rounded-2xl w-full h-48 object-cover"
          />
          <img
            src={sobre2}
            alt="Grupo do Fiorella Club"
            className="rounded-2xl w-full h-48 object-cover"
          />
        </div>

        <div className="space-y-6 text-[#940c0c] text-lg leading-relaxed">
          <p>
            O Fiorella nasceu do desejo de criar encontros que fossem além do
            hobby.
          </p>
          <p>
            Nasceu da vontade de oferecer um espaço onde mulheres pudessem
            desacelerar, sair da rotina e viver momentos leves, criativos e
            cheios de significado.
          </p>
          <p>
            Acreditamos que a criatividade não precisa de perfeição, experiência
            ou talento. Aqui, ninguém precisa saber fazer.
          </p>
          <p className="pt-4 font-serif text-2xl md:text-3xl text-[#4a0b16] leading-snug">
            Um lugar para criar, pertencer e florescer junto.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
