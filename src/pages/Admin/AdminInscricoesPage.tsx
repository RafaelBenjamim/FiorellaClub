import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

interface Inscricao {
  name: string;
  email: string;
  phone: string;
  status: number;
}

const statusLabel: Record<number, { texto: string; cor: string }> = {
  0: { texto: "Pendente", cor: "text-amber-700 bg-amber-50 border border-amber-200" },
  1: { texto: "Confirmada", cor: "text-emerald-700 bg-emerald-50 border border-emerald-200" },
  2: { texto: "Cancelada", cor: "text-red-700 bg-red-50 border border-red-200" },
};

export function AdminInscricoesPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [inscricoes, setInscricoes] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para controlar o filtro selecionado ("all" | 0 | 1 | 2)
  const [filtroStatus, setFiltroStatus] = useState<number | "all">("all");

  useEffect(() => {
    const fetchInscricoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${API_BASE_URL}/api/registration/event/${eventId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Erro ao buscar inscrições.");

        const data = await response.json();
        setInscricoes(data);
      } catch (err: Error | unknown) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar inscrições."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInscricoes();
  }, [eventId]);

  // Contagens para os cards de resumo
  const totalInscricoes = inscricoes.length;
  const totalConfirmadas = inscricoes.filter((i) => i.status === 1).length;
  const totalPendentes = inscricoes.filter((i) => i.status === 0).length;
  const totalCanceladas = inscricoes.filter((i) => i.status === 2).length;

  // Inscrições filtradas de acordo com o botão selecionado
  const inscricoesFiltradas = inscricoes.filter((inscricao) => {
    if (filtroStatus === "all") return true;
    return inscricao.status === filtroStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#4a0b16] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center bg-white p-8 rounded-[2rem] shadow-sm max-w-md border border-[#fce3e4]">
          <p className="text-[#940c0c] font-serif text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/eventos")}
            className="inline-flex items-center justify-center bg-[#4a0b16] text-[#fce3e4] px-6 py-3 rounded-full hover:bg-[#940c0c] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
          >
            ← Voltar para eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans selection:bg-[#c07a82] selection:text-white">
      {/* Header Premium */}
      <header className="bg-[#4a0b16] text-[#fce3e4] px-6 md:px-12 py-5 flex justify-between items-center shadow-md relative z-10">
        <h1 className="text-xl md:text-2xl font-serif tracking-wide">Fiorella Club — Admin</h1>
        <button
          onClick={() => navigate("/admin/eventos")}
          className="text-[#fce3e4]/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          ← Voltar
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        
        {/* Bloco de Título e Contagens */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#4a0b16] mb-2">Inscrições</h2>
            <p className="text-sm text-[#940c0c]/80">Gerencie as participantes deste encontro.</p>
          </div>
          
          {/* Cards de Resumo */}
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-white rounded-3xl px-6 py-4 border border-[#fce3e4] shadow-sm flex flex-col items-center min-w-[120px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold mb-1">
                Confirmadas
              </p>
              <p className="text-3xl font-serif text-emerald-800">
                {totalConfirmadas}
              </p>
            </div>

            <div className="flex-1 md:flex-initial bg-white/70 rounded-3xl px-6 py-4 border border-[#fce3e4] shadow-sm flex flex-col items-center min-w-[120px]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#c07a82] font-bold mb-1">
                Total Geral
              </p>
              <p className="text-3xl font-serif text-[#4a0b16]">
                {totalInscricoes}
              </p>
            </div>
          </div>
        </div>

        {/* Barra de Filtros por Status */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/60 p-2 rounded-2xl border border-[#fce3e4]">
          <button
            onClick={() => setFiltroStatus("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filtroStatus === "all"
                ? "bg-[#4a0b16] text-[#fce3e4] shadow-sm"
                : "text-[#4a0b16]/70 hover:bg-white/80"
            }`}
          >
            Todas ({totalInscricoes})
          </button>
          <button
            onClick={() => setFiltroStatus(1)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filtroStatus === 1
                ? "bg-emerald-700 text-white shadow-sm"
                : "text-emerald-800/80 hover:bg-white/80"
            }`}
          >
            Confirmadas ({totalConfirmadas})
          </button>
          <button
            onClick={() => setFiltroStatus(0)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filtroStatus === 0
                ? "bg-amber-700 text-white shadow-sm"
                : "text-amber-800/80 hover:bg-white/80"
            }`}
          >
            Pendentes ({totalPendentes})
          </button>
          <button
            onClick={() => setFiltroStatus(2)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filtroStatus === 2
                ? "bg-red-700 text-white shadow-sm"
                : "text-red-800/80 hover:bg-white/80"
            }`}
          >
            Canceladas ({totalCanceladas})
          </button>
        </div>

        {inscricoesFiltradas.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border border-[#fce3e4]">
            <p className="text-[#940c0c] font-serif text-2xl mb-2">
              Nenhuma inscrição encontrada com este filtro.
            </p>
            <p className="text-[#4a0b16]/70 text-sm">
              Tente selecionar outra categoria acima.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-0 md:bg-white md:rounded-[2rem] md:border border-[#fce3e4] md:shadow-sm md:overflow-hidden md:divide-y md:divide-[#fce3e4]/60">
            
            {/* Header da tabela (Desktop) */}
            <div className="hidden md:grid grid-cols-[1.5fr_2fr_1.2fr_1fr] gap-4 px-8 py-4 bg-[#fffaf8] border-b border-[#fce3e4] text-[10px] uppercase tracking-[0.2em] text-[#c07a82] font-bold">
              <span>Nome</span>
              <span>Email</span>
              <span>Telefone</span>
              <span>Status</span>
            </div>

            {/* Linhas / Cards */}
            {inscricoesFiltradas.map((inscricao, i) => (
              <div
                key={i}
                className="bg-white rounded-[1.5rem] md:rounded-none border border-[#fce3e4] md:border-none p-6 md:p-0 md:px-8 md:py-5 flex flex-col md:grid md:grid-cols-[1.5fr_2fr_1.2fr_1fr] md:gap-4 md:items-center hover:bg-[#fffaf8]/50 transition-colors shadow-sm md:shadow-none"
              >
                
                {/* Mobile Header */}
                <div className="flex justify-between items-start mb-4 md:hidden">
                  <span className="font-serif text-xl text-[#4a0b16] pr-2">
                    {inscricao.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap ${
                      statusLabel[inscricao.status]?.cor
                    }`}
                  >
                    {statusLabel[inscricao.status]?.texto}
                  </span>
                </div>

                {/* Desktop Nome */}
                <span className="hidden md:block font-medium text-[#4a0b16] truncate pr-4">
                  {inscricao.name}
                </span>

                {/* Contatos */}
                <div className="space-y-3 md:space-y-0 md:contents text-sm">
                  
                  <div className="flex flex-col md:block">
                    <span className="text-[10px] uppercase tracking-widest text-[#c07a82] font-bold md:hidden mb-0.5">
                      Email
                    </span>
                    <span className="text-[#940c0c] truncate pr-4">
                      {inscricao.email}
                    </span>
                  </div>
                  
                  <div className="flex flex-col md:block">
                    <span className="text-[10px] uppercase tracking-widest text-[#c07a82] font-bold md:hidden mb-0.5">
                      Telefone
                    </span>
                    <span className="text-[#4a0b16]/80 font-mono tracking-tight">
                      {inscricao.phone}
                    </span>
                  </div>

                </div>

                {/* Desktop Status */}
                <div className="hidden md:block">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                      statusLabel[inscricao.status]?.cor
                    }`}
                  >
                    {statusLabel[inscricao.status]?.texto}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}