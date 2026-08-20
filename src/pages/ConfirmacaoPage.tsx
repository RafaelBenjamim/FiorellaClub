import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConfirmacao } from "../services/registrationService";
import type { ConfirmacaoResponse } from "../types/event";

const statusConfig = {
  0: {
    emoji: "⏳",
    titulo: "Aguardando confirmação...",
    mensagem: "Seu pagamento está sendo processado. Assim que confirmado, você receberá um email com todos os detalhes.",
    cor: "text-[#940c0c]",
  },
  1: {
    emoji: "🌸",
    titulo: "Pagamento confirmado!",
    mensagem: "Sua vaga está garantida! Você receberá um email com todos os detalhes do encontro.",
    cor: "text-[#c07a82]",
  },
  2: {
    emoji: "😕",
    titulo: "Inscrição cancelada",
    mensagem: "Sua inscrição foi cancelada. Entre em contato pelo WhatsApp se tiver dúvidas.",
    cor: "text-[#940c0c]",
  },
} as const;

function ConfirmacaoPage() {
  const { registrationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmacao, setConfirmacao] = useState<ConfirmacaoResponse | null>(null);
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    if (registrationId) {
      getConfirmacao(registrationId)
        .then((data) => {
          setConfirmacao(data);
          setTimeout(() => setAnimado(true), 100);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [registrationId]);

  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl animate-bounce">🌸</div>
        <p className="text-[#4a0b16] font-serif text-xl">
          Carregando sua confirmação...
        </p>
      </div>
    );
  }

  if (error || !confirmacao) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex flex-col items-center justify-center px-6 gap-4">
        <div className="text-5xl">😕</div>
        <p className="text-[#940c0c] font-serif text-xl text-center">
          {error || "Não conseguimos encontrar sua inscrição."}
        </p>
        <Link to="/" className="text-[#c07a82] underline text-sm">
          Voltar para o início
        </Link>
      </div>
    );
  }

  const config =
    statusConfig[confirmacao.status as keyof typeof statusConfig] ??
    statusConfig[0];

  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans flex flex-col items-center justify-center px-6 py-16">

      {/* Pétalas animadas no fundo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {["🌸", "🌷", "🌺", "🌸", "🌷"].map((flor, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 animate-bounce"
            style={{
              left: `${10 + i * 20}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          >
            {flor}
          </span>
        ))}
      </div>

      <div
        className={`w-full max-w-2xl bg-white rounded-[2rem] shadow-lg border border-[#fce3e4] p-8 md:p-12 text-center transition-all duration-700 ${
          animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >

        <div
          className={`text-7xl mb-6 transition-all duration-500 delay-300 ${
            animado ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          {config.emoji}
        </div>

        <h1
          className={`text-4xl md:text-5xl font-serif mb-3 text-[#4a0b16] transition-all duration-500 delay-500 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {config.titulo}
        </h1>

        <p
          className={`text-lg font-medium mb-8 transition-all duration-500 delay-700 ${config.cor} ${
            animado ? "opacity-100" : "opacity-0"
          }`}
        >
          Olá, {confirmacao.name}! {config.mensagem}
        </p>

        <div
          className={`bg-[#fce3e4] rounded-[1.5rem] p-6 mb-8 text-left space-y-3 transition-all duration-500 delay-700 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xl font-serif text-[#4a0b16] mb-4 text-center">
            {confirmacao.title}
          </h2>
          <div className="flex items-center gap-3 text-[#4a0b16]">
            <span className="text-xl">📅</span>
            <span className="font-medium">{formatarData(confirmacao.date)}</span>
          </div>
          {confirmacao.location && (
            <div className="flex items-center gap-3 text-[#4a0b16]">
              <span className="text-xl">📍</span>
              <span className="font-medium">{confirmacao.location}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-[#4a0b16]">
            <span className="text-xl">✉️</span>
            <span className="text-sm opacity-70">
              Você receberá um email com todos os detalhes
            </span>
          </div>
        </div>

        <div
          className={`border border-[#fce3e4] rounded-2xl p-4 mb-8 transition-all duration-500 delay-1000 ${
            animado ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-xs uppercase tracking-widest text-[#c07a82] font-semibold mb-1">
            Código da inscrição
          </p>
          <p className="text-sm font-mono text-[#4a0b16]/60 break-all">
            {registrationId}
          </p>
        </div>

        <div
          className={`transition-all duration-500 delay-1000 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#4a0b16] px-10 py-4 text-[#fce3e4] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-[#940c0c] shadow-xl text-lg"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmacaoPage;