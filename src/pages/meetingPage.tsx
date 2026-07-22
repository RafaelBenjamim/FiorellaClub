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

      // redireciona pro checkout da InfinitePay
      window.location.assign(response.paymentUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao realizar inscrição.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center">
        <p className="text-[#4a0b16] font-serif text-2xl">Carregando...</p>
      </div>
    );
  }

  // Erro ao buscar eventos
  if (error) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#940c0c] font-serif text-2xl mb-4">{error}</p>
          <Link to="/" className="text-[#c07a82] underline">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  // Lista de eventos (sem eventId na URL)
  if (!eventId) {
    return (
      <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans">
        <div className="max-w-6xl mx-auto px-6 py-16 md:px-12">
          <div className="mb-10">
            <Link
              to="/"
              className="text-sm uppercase tracking-[0.3em] text-[#c07a82] hover:text-[#940c0c] transition-colors"
            >
              ← Voltar para o início
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif mt-6 mb-4">
              Escolha o encontro que combina com você
            </h1>
            <p className="max-w-2xl text-lg text-[#940c0c] leading-relaxed">
              Cada experiência do Fiorella Club é pensada para oferecer um
              momento único de presença, criação e acolhimento.
            </p>
          </div>

          {eventos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#940c0c] font-serif text-2xl">
                Nenhum evento disponível no momento.
              </p>
              <p className="text-[#4a0b16]/70 mt-2">
                Volte em breve para conferir os próximos encontros!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {eventos.map((evento) => (
                <article
                  key={evento.id}
                  className="rounded-[2rem] border border-[#fce3e4] bg-white p-6 shadow-sm flex flex-col"
                >
                  {evento.imageUrl && (
                    <img
                      src={evento.imageUrl}
                      alt={evento.title}
                      className="w-full h-40 object-cover rounded-[1.5rem] mb-4"
                    />
                  )}

                  <div className="mb-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#c07a82] font-semibold">
                      {formatarData(evento.date)}
                    </p>
                    <h2 className="text-2xl font-serif mt-2 text-[#4a0b16]">
                      {evento.title}
                    </h2>
                  </div>

                  <p className="text-[#940c0c] leading-relaxed mb-4 flex-1">
                    {evento.description}
                  </p>

                  <div className="text-sm text-[#4a0b16] mb-4 space-y-1">
                    {evento.location && <p>📍 {evento.location}</p>}
                    <p>💰 {formatarValor(evento.price)}</p>
                    <p>
                      🪑{" "}
                      {evento.maxAttendees - evento.registeredCount > 0
                        ? `${evento.maxAttendees - evento.registeredCount} vagas restantes`
                        : "Vagas esgotadas"}
                    </p>
                  </div>

                  <Link
                    to={`/meeting/${evento.id}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#4a0b16] px-6 py-3 text-[#fce3e4] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-[#940c0c]"
                  >
                    Ver detalhes
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Evento não encontrado
  if (!eventoSelecionado) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#940c0c] font-serif text-2xl mb-4">
            Evento não encontrado.
          </p>
          <Link to="/meeting" className="text-[#c07a82] underline">
            ← Voltar para os eventos
          </Link>
        </div>
      </div>
    );
  }

  // Detalhe do evento
  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans">
      <div className="relative w-full h-[40vh] md:h-[48vh] overflow-hidden">
        <img
          src={eventoSelecionado.imageUrl || heroFallback}
          alt={eventoSelecionado.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        <Link
          to="/meeting"
          className="absolute top-6 left-6 text-sm uppercase tracking-widest font-semibold text-white/90 hover:text-white transition-colors"
        >
          ← Voltar
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
          <h1 className="text-3xl md:text-5xl font-serif text-white max-w-3xl">
            {eventoSelecionado.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-sm border border-[#fce3e4] p-8 md:p-12 -mt-16 relative z-10">
          <div className="flex flex-wrap gap-4 mb-7 text-[#940c0c] font-medium">
            <span>📅 {formatarData(eventoSelecionado.date)}</span>
            {eventoSelecionado.location && (
              <span>📍 {eventoSelecionado.location}</span>
            )}
            <span>💰 {formatarValor(eventoSelecionado.price)}</span>
            <span>
              {vagasRestantes > 0
                ? `${vagasRestantes} vagas restantes`
                : "Vagas esgotadas"}
            </span>
          </div>

          <p className="text-lg leading-relaxed text-[#4a0b16]/90 mb-10">
            {eventoSelecionado.description}
          </p>

          {/* Erro do formulário */}
          {submitError && (
            <p className="text-[#940c0c] text-sm mb-4 text-center">
              {submitError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-[#fce3e4] rounded-full px-6 py-3 text-[#4a0b16] focus:outline-none focus:border-[#c07a82]"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-[#fce3e4] rounded-full px-6 py-3 text-[#4a0b16] focus:outline-none focus:border-[#c07a82]"
            />
            <input
              type="tel"
              placeholder="Seu telefone (+5534999999999)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full border border-[#fce3e4] rounded-full px-6 py-3 text-[#4a0b16] focus:outline-none focus:border-[#c07a82]"
            />

            <button
              type="submit"
              disabled={submitting || vagasRestantes === 0}
              className="w-full bg-[#4a0b16] text-[#fce3e4] px-10 py-4 rounded-full hover:bg-[#940c0c] hover:-translate-y-1 transition-all duration-300 shadow-xl text-lg tracking-wide font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Processando..."
                : vagasRestantes === 0
                  ? "Vagas esgotadas"
                  : "Confirmar e ir para pagamento"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MeetingPage;
