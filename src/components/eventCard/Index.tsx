import { Link } from "react-router-dom";
import type { Evento } from "../../types/event";
import heroFallback from "../../assets/galeria8.jpg";

interface EventCardProps {
  evento: Evento;
  formatarValor: (valor: number) => number | string;
  formatarData: (dataStr: string) => string;
}

export function EventCard({ evento, formatarValor, formatarData }: EventCardProps) {
  const vagas = evento.maxAttendees - evento.registeredCount;
  const desconto = evento.discountPercentage || 0;

  return (
    <article className="rounded-[2.5rem] border border-[#fce3e4] bg-white p-6 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group">
      <div className="relative mb-5 overflow-hidden rounded-[1.8rem] h-48 bg-[#fce3e4]/30">
        <img
          src={evento.imageUrl || heroFallback}
          alt={evento.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4a0b16] shadow-sm">
            {formatarValor(evento.price)}
          </div>
          {desconto > 0 && (
            <div className="bg-[#4a0b16]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#fce3e4] shadow-sm">
              ✨ {desconto}% OFF Membros
            </div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.25em] text-[#c07a82] font-bold mb-1.5">
          {formatarData(evento.date)}
        </p>
        <h2 className="text-2xl font-serif text-[#4a0b16] group-hover:text-[#c07a82] transition-colors leading-snug">
          {evento.title}
        </h2>
      </div>

      <p className="text-[#940c0c]/80 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
        {evento.description}
      </p>

      <div className="text-xs font-medium text-[#4a0b16]/80 mb-6 space-y-2 pt-4 border-t border-[#fce3e4]/60">
        {evento.location && (
          <div className="flex items-center gap-2">
            <span className="text-[#c07a82]">📍</span>
            <span className="truncate">{evento.location}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[#c07a82]">🪑</span>
          <span className={vagas > 0 ? "text-[#4a0b16]" : "text-[#940c0c] font-semibold"}>
            {vagas > 0 ? `${vagas} vagas restantes` : "Vagas esgotadas"}
          </span>
        </div>
      </div>

      <Link
        to={`/meeting/${evento.id}`}
        className="inline-flex items-center justify-center rounded-full bg-[#4a0b16] px-6 py-3.5 text-[#fce3e4] font-semibold text-sm transition-all duration-300 hover:bg-[#940c0c] active:scale-95 shadow-sm"
      >
        Ver detalhes e participar
      </Link>
    </article>
  );
}