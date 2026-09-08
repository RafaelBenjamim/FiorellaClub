import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getConfirmacao } from "../services/registrationService";
import type { ConfirmacaoResponse } from "../types/event";

const statusConfig = {
  0: {
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    titulo: "Aguardando confirmação",
    mensagem: "Seu pagamento está sendo processado com segurança. Assim que confirmado, você receberá um email com todos os detalhes.",
    iconeBg: "bg-amber-100 text-amber-700",
  },
  1: {
    badgeBg: "bg-[#fce3e4]/60 text-[#4a0b16] border-[#c07a82]/30",
    titulo: "Inscrição confirmada!",
    mensagem: "Sua vaga está garantida com sucesso. Preencha seu coração de expectativa, preparamos algo lindo para você.",
    iconeBg: "bg-[#fce3e4] text-[#4a0b16]",
  },
  2: {
    badgeBg: "bg-red-50 text-red-800 border-red-200",
    titulo: "Inscrição cancelada",
    mensagem: "Identificamos o cancelamento desta inscrição. Se precisar de ajuda, entre em contato conosco pelo WhatsApp.",
    iconeBg: "bg-red-100 text-red-700",
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
        .then((data: ConfirmacaoResponse) => {
          setConfirmacao(data);
          setTimeout(() => setAnimado(true), 100);
        })
        .catch((err: Error) => setError(err.message))
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
      <div className="min-h-screen bg-gradient-to-br from-[#fffaf8] via-[#fce3e4] to-[#f4c4c8] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#4a0b16] border-t-transparent animate-spin" />
        <p className="text-[#4a0b16] font-serif text-lg tracking-wide">
          Buscando os detalhes do seu encontro...
        </p>
      </div>
    );
  }

  if (error || !confirmacao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fffaf8] via-[#fce3e4] to-[#f4c4c8] flex flex-col items-center justify-center px-6 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-[#fce3e4] max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
            !
          </div>
          <p className="text-[#4a0b16] font-serif text-2xl mb-2">Ops!</p>
          <p className="text-[#940c0c] text-sm mb-6">
            {error || "Não conseguimos encontrar os dados desta inscrição."}
          </p>
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

  const config =
    statusConfig[confirmacao.status as keyof typeof statusConfig] ??
    statusConfig[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf8] via-[#fce3e4] to-[#f4c4c8] text-[#4a0b16] font-sans flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden selection:bg-[#c07a82] selection:text-white">

      {/* Elementos decorativos de fundo suaves */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#c07a82]/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className={`w-full max-w-xl bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl border border-white p-8 md:p-12 text-center transition-all duration-700 relative z-10 ${
          animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        
        {/* Status Badge Superior */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm bg-[#fce3e4]/60 text-[#4a0b16] border-[#c07a82]/30">
          <span className="w-2 h-2 rounded-full bg-[#4a0b16] animate-pulse" />
          Status do Pedido
        </div>

        {/* Título Principal */}
        <h1
          className={`text-3xl md:text-4xl font-serif mb-3 text-[#4a0b16] leading-tight transition-all duration-500 delay-300 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {config.titulo}
        </h1>

        <p
          className={`text-sm md:text-base text-[#940c0c]/90 font-medium mb-8 max-w-md mx-auto leading-relaxed transition-all duration-500 delay-500 ${
            animado ? "opacity-100" : "opacity-0"
          }`}
        >
          Olá, <strong className="text-[#4a0b16] font-semibold">{confirmacao.name}</strong>! {config.mensagem}
        </p>

        {/* Card de Detalhes do Encontro (Estilo Convite Digital) */}
        <div
          className={`bg-[#fffaf8] border border-[#fce3e4] rounded-[2rem] p-6 md:p-8 mb-8 text-left space-y-4 shadow-sm transition-all duration-500 delay-700 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="border-b border-[#fce3e4] pb-4 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c07a82] font-bold block mb-1">
              Experiência Selecionada
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-[#4a0b16]">
              {confirmacao.title}
            </h2>
          </div>

          <div className="space-y-3 pt-2 text-sm md:text-base text-[#4a0b16]">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-full bg-[#fce3e4]/60 flex items-center justify-center text-sm shrink-0">
                📅
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#c07a82] font-bold">Data</span>
                <span className="font-medium text-[#4a0b16]">{formatarData(confirmacao.date)}</span>
              </div>
            </div>

            {confirmacao.location && (
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-[#fce3e4]/60 flex items-center justify-center text-sm shrink-0">
                  📍
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#c07a82] font-bold">Local</span>
                  <span className="font-medium text-[#4a0b16]">{confirmacao.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Código da Inscrição Discreto */}
        <div
          className={`bg-[#fce3e4]/30 border border-[#fce3e4] rounded-2xl p-4 mb-8 transition-all duration-500 delay-900 ${
            animado ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c07a82] font-bold mb-1">
            Código de Referência da Inscrição
          </p>
          <p className="text-xs font-mono text-[#4a0b16]/70 break-all select-all">
            {registrationId}
          </p>
        </div>

        {/* Botão de Ação Principal em Pílula */}
        <div
          className={`transition-all duration-500 delay-1000 ${
            animado ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#4a0b16] px-10 py-4 text-[#fce3e4] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-[#940c0c] shadow-xl text-sm md:text-base tracking-wide"
          >
            Voltar para o início
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ConfirmacaoPage;