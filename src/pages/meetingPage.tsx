import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import heroFallback from "../assets/galeria8.jpg";
import { getEventos } from "../services/eventService";
import { createRegistration } from "../services/registrationService";
import type { Evento, FormData } from "../types/event";
import { EventCard } from "../components/eventCard/Index"; // 👈 Importando o componente que criamos



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
    const dataFormatada = data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const horaFormatada = data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dataFormatada} às ${horaFormatada}`;
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

  if (!eventId) {
    return (
      <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans selection:bg-[#c07a82] selection:text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 md:px-12">
          
          <div className="mb-10 max-w-3xl">
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
              {/* 🌟 USANDO O COMPONENTE ISOLADO AQUI */}
              {eventos.map((evento) => (
                <EventCard 
                  key={evento.id} 
                  evento={evento} 
                  formatarValor={formatarValor} 
                  formatarData={formatarData} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

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

  const descontoAtual = eventoSelecionado.discountPercentage || 0;
  const valorComDesconto = eventoSelecionado.price - (eventoSelecionado.price * (descontoAtual / 100));

  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans selection:bg-[#c07a82] selection:text-white pb-16">
      
      <div className="relative w-full h-[40vh] md:h-[48vh] overflow-hidden">
        <img
          src={eventoSelecionado.imageUrl || heroFallback}
          alt={eventoSelecionado.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a0b16]/80 via-[#4a0b16]/30 to-black/20" />

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

      <div className="flex flex-col items-center px-6 -mt-12 relative z-10">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl border border-[#fce3e4] p-8 md:p-12">
          
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 pb-6 border-b border-[#fce3e4]/60 text-xs md:text-sm font-medium text-[#940c0c]">
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

            {descontoAtual > 0 && (
              <span className="bg-[#4a0b16] text-[#fce3e4] px-4 py-2 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest shadow-sm">
                ✨ Benefício Membro: {descontoAtual}% OFF
              </span>
            )}
          </div>

          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#c07a82] font-bold mb-3">
              Sobre a experiência
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-[#4a0b16]/90">
              {eventoSelecionado.description}
            </p>
          </div>

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

              {descontoAtual > 0 && (
                <div className="mt-2 mb-2 bg-[#fffaf8] border border-[#fce3e4] rounded-2xl p-4 flex items-start gap-3">
                  <div className="text-[#c07a82] text-xl">✨</div>
                  <p className="text-xs text-[#940c0c] leading-relaxed">
                    <strong>Benefício Membro Fiorella:</strong> O seu e-mail será validado automaticamente. Caso você já tenha participado de encontros anteriores, seu desconto de <strong>{descontoAtual}%</strong> será aplicado e você pagará apenas <strong>{formatarValor(valorComDesconto)}</strong> na próxima etapa!
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || vagasRestantes === 0}
                className="mt-2 w-full bg-[#4a0b16] text-[#fce3e4] py-4 px-6 rounded-full hover:bg-[#940c0c] hover:-translate-y-0.5 transition-all duration-300 shadow-xl text-base tracking-wide font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-center"
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