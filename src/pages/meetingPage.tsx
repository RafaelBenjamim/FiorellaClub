import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import heroFallback from "../assets/galeria8.jpg";
import { getEventos } from "../services/eventService";
import { createRegistration } from "../services/registrationService";
import type { Evento } from "../types/event";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

function MeetingPage() {
  const { eventId } = useParams();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    getEventos()
      .then((data) => setEventos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const eventoSelecionado = eventId
    ? (eventos.find((e) => e.id === eventId) ?? null)
    : null;

  const vagasRestantes = eventoSelecionado
    ? eventoSelecionado.maxAttendees - eventoSelecionado.registeredCount
    : 0;

  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!eventoSelecionado) return;

    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitError("Preencha todos os campos para reservar sua vaga.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await createRegistration({
        eventId: eventoSelecionado.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      window.location.assign(response.paymentUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao realizar inscrição.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center">
        <p className="text-[#4a0b16] font-serif text-2xl animate-pulse">Carregando experiências...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center bg-white p-8 rounded-[2rem] shadow-sm max-w-md border border-[#fce3e4]">
          <p className="text-[#940c0c] font-serif text-xl mb-4">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-[#4a0b16] text-[#fce3e4] px-6 py-3 rounded-full hover:bg-[#940c0c] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  // Se nenhum ID foi passado, exibe a listagem de eventos com a pílula de voltar para o início
  if (!eventId) {
    return (
      <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans selection:bg-[#c07a82] selection:text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 md:px-12">
          
          <div className="mb-10 max-w-3xl">
            {/* Pílula de Voltar para o Início */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#4a0b16] text-[#fce3e4] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-md hover:bg-[#940c0c] hover:-translate-y-0.5 transition-all duration-300 mb-6"
            >
              ← Voltar para o início
            </Link>

            <h1 className="text-3xl md:text-5xl font-serif mb-4 text-[#4a0b16] leading-tight">
              Escolha o encontro que combina com você
            </h1>
            <p className="text-base md:text-lg text-[#940c0c]/90 leading-relaxed">
              Cada experiência do Fiorella Club é pensada para oferecer um
              momento único de presença, criação e acolhimento.
            </p>
          </div>

          {eventos.length === 0 ? (
            <div className="text-center py-20 bg-white/60 rounded-[2.5rem] border border-[#fce3e4]">
              <p className="text-[#940c0c] font-serif text-2xl mb-2">
                Nenhum evento disponível no momento.
              </p>
              <p className="text-[#4a0b16]/70 text-sm">
                Volte em breve para conferir os próximos encontros!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {eventos.map((evento) => {
                const vagas = evento.maxAttendees - evento.registeredCount;
                return (
                  <article
                    key={evento.id}
                    className="rounded-[2.5rem] border border-[#fce3e4] bg-white p-6 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md group"
                  >
                    <div className="relative mb-5 overflow-hidden rounded-[1.8rem] h-48 bg-[#fce3e4]/30">
                      <img
                        src={evento.imageUrl || heroFallback}
                        alt={evento.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#4a0b16] shadow-sm">
                        {formatarValor(evento.price)}
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
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Evento não encontrado via ID na rota
  if (!eventoSelecionado) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center bg-white p-8 rounded-[2rem] shadow-sm max-w-md border border-[#fce3e4]">
          <p className="text-[#940c0c] font-serif text-xl mb-4">
            Evento não encontrado.
          </p>
          <Link 
            to="/meeting" 
            className="inline-flex items-center justify-center bg-[#4a0b16] text-[#fce3e4] px-6 py-3 rounded-full hover:bg-[#940c0c] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
          >
            ← Voltar aos encontros
          </Link>
        </div>
      </div>
    );
  }

  // Tela de Detalhes do Evento & Inscrição com a Pílula Flutuante de Voltar
  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans selection:bg-[#c07a82] selection:text-white pb-16">
      
      {/* Banner Superior Imersivo */}
      <div className="relative w-full h-[40vh] md:h-[48vh] overflow-hidden">
        <img
          src={eventoSelecionado.imageUrl || heroFallback}
          alt={eventoSelecionado.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a0b16]/80 via-[#4a0b16]/30 to-black/20" />

        {/* Pílula Flutuante de Voltar aos Encontros */}
        <Link
          to="/meeting"
          className="absolute top-6 left-6 md:left-12 inline-flex items-center gap-2 bg-[#4a0b16]/80 backdrop-blur-md text-[#fce3e4] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#4a0b16] hover:-translate-y-0.5 transition-all duration-300"
        >
          ← Voltar aos encontros
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 max-w-4xl mx-auto">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#f4c4c8] font-bold mb-2">
            {formatarData(eventoSelecionado.date)}
          </p>
          <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            {eventoSelecionado.title}
          </h1>
        </div>
      </div>

      {/* Conteúdo Principal & Formulário de Inscrição Unificado */}
      <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl border border-[#fce3e4] p-8 md:p-12">
          
          {/* Informações rápidas em pílulas elegantes */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-[#fce3e4]/60 text-xs md:text-sm font-medium text-[#940c0c]">
            {eventoSelecionado.location && (
              <span className="bg-[#fce3e4]/40 px-4 py-2 rounded-full flex items-center gap-1.5">
                📍 {eventoSelecionado.location}
              </span>
            )}
            <span className="bg-[#fce3e4]/40 px-4 py-2 rounded-full flex items-center gap-1.5">
              💎 {formatarValor(eventoSelecionado.price)}
            </span>
            <span className="bg-[#fce3e4]/40 px-4 py-2 rounded-full flex items-center gap-1.5">
              🪑 {vagasRestantes > 0 ? `${vagasRestantes} vagas restantes` : "Esgotado"}
            </span>
          </div>

          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c07a82] font-bold mb-3">
              Sobre a experiência
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-[#4a0b16]/90">
              {eventoSelecionado.description}
            </p>
          </div>

          {/* Bloco do Formulário Direto */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#4a0b16] mb-2">
                Garanta a sua presença
              </h2>
              <p className="text-sm text-[#940c0c]/80">
                Preencha seus dados abaixo para prosseguir com a reserva da sua vaga.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-[#940c0c] text-sm text-center font-medium">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a0b16] mb-1.5 ml-3">
                  Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria Clara"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-[#fce3e4] bg-[#fffaf8] rounded-full px-6 py-3.5 text-[#4a0b16] placeholder:text-[#c07a82]/50 focus:outline-none focus:border-[#c07a82] focus:bg-white focus:ring-2 focus:ring-[#c07a82]/20 transition-all text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a0b16] mb-1.5 ml-3">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-[#fce3e4] bg-[#fffaf8] rounded-full px-6 py-3.5 text-[#4a0b16] placeholder:text-[#c07a82]/50 focus:outline-none focus:border-[#c07a82] focus:bg-white focus:ring-2 focus:ring-[#c07a82]/20 transition-all text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4a0b16] mb-1.5 ml-3">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="(34) 99999-9999"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border border-[#fce3e4] bg-[#fffaf8] rounded-full px-6 py-3.5 text-[#4a0b16] placeholder:text-[#c07a82]/50 focus:outline-none focus:border-[#c07a82] focus:bg-white focus:ring-2 focus:ring-[#c07a82]/20 transition-all text-sm md:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || vagasRestantes === 0}
                className="mt-4 w-full bg-[#4a0b16] text-[#fce3e4] py-4 px-6 rounded-full hover:bg-[#940c0c] hover:-translate-y-0.5 transition-all duration-300 shadow-xl text-base tracking-wide font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-center"
              >
                {submitting
                  ? "Processando pagamento..."
                  : vagasRestantes === 0
                    ? "Vagas esgotadas"
                    : "Confirmar e ir para pagamento"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MeetingPage;