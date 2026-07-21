import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galeria1 from "../../assets/galeria1.jpg";
import galeria2 from "../../assets/galeria2.jpg";
import galeria3 from "../../assets/galeria3.jpg";
import galeria4 from "../../assets/galeria4.jpg";
import galeria5 from "../../assets/galeria5.jpg";
import galeria6 from "../../assets/galeria6.jpg";
import galeria7 from "../../assets/galeria7.jpg";
import galeria8 from "../../assets/galeria8.jpg";
import galeria9 from "../../assets/galeria9.jpg";

const fotos = [
  galeria1,
  galeria2,
  galeria3,
  galeria4,
  galeria5,
  galeria6,
  galeria7,
  galeria8,
  galeria9,
];

export function Galeria() {
  const [selecionada, setSelecionada] = useState<number | null>(null);

  const fechar = useCallback(() => setSelecionada(null), []);

  const anterior = useCallback(() => {
    setSelecionada((atual) =>
      atual === null ? null : (atual - 1 + fotos.length) % fotos.length,
    );
  }, []);

  const proxima = useCallback(() => {
    setSelecionada((atual) =>
      atual === null ? null : (atual + 1) % fotos.length,
    );
  }, []);

  // Navegação por teclado
  useEffect(() => {
    if (selecionada === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selecionada, fechar, anterior, proxima]);

  // Trava o scroll da página quando o lightbox está aberto
  useEffect(() => {
    document.body.style.overflow = selecionada !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selecionada]);

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center text-[#4a0b16]">
        Momentos do clube
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {fotos.map((foto, i) => (
          <motion.img
            key={i}
            src={foto}
            alt={`Momento do encontro Fiorella ${i + 1}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            onClick={() => setSelecionada(i)}
            className="w-full h-48 md:h-56 object-cover rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selecionada !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
            onClick={fechar}
          >
            {/* Botão fechar */}
            <button
              onClick={fechar}
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X size={32} />
            </button>

            {/* Seta esquerda */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                anterior();
              }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Imagem */}
            <motion.img
              key={selecionada}
              src={fotos[selecionada]}
              alt={`Momento do encontro Fiorella ${selecionada + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-full md:max-w-[80vw] object-contain rounded-xl"
            />

            {/* Seta direita */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                proxima();
              }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight size={40} />
            </button>

            {/* Contador */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selecionada + 1} / {fotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
