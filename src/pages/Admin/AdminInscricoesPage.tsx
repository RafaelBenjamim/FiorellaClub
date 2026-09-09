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
        
        {/* Bloco de Título e Contagem */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#4a0b16] mb-2">Inscrições</h2>
            <p className="text-sm text-[#940c0c]/80">Gerencie as participantes deste encontro.</p>
          </div>
          
          <div className="bg-white rounded-3xl px-8 py-4 border border-[#fce3e4] shadow-sm flex flex-col items-center min-w-[140px]">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#c07a82] font-bold mb-1">
              Total
            </p>
            <p className="text-3xl font-serif text-[#4a0b16]">
              {inscricoes.length}
            </p>
          </div>
        </div>

        {inscricoes.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border border-[#fce3e4]">
            <p className="text-[#940c0c] font-serif text-2xl mb-2">
              Nenhuma inscrição ainda.
            </p>
            <p className="text-[#4a0b16]/70 text-sm">
              As inscrições confirmadas aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] border border-[#fce3e4] shadow-sm overflow-hidden">
            
            {/* Wrapper de Scroll Horizontal para Telas Pequenas */}
            <div className="overflow-x-auto custom-scrollbar">
              
              {/* Largura mínima força a tabela a não espremer em telas menores */}
              <div className="min-w-[800px]">
                
                {/* Header da tabela (Proporções ajustadas: Nome 1.5, Email 2.0, Fone 1.2, Status 1.0) */}
                <div className="grid grid-cols-[1.5fr_2fr_1.2fr_1fr] gap-4 px-8 py-4 bg-[#fffaf8] border-b border-[#fce3e4] text-[10px] uppercase tracking-[0.2em] text-[#c07a82] font-bold">
                  <span>Nome</span>
                  <span>Email</span>
                  <span>Telefone</span>
                  <span>Status</span>
                </div>

                {/* Linhas */}
                <div className="divide-y divide-[#fce3e4]/60">
                  {inscricoes.map((inscricao, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1.5fr_2fr_1.2fr_1fr] gap-4 px-8 py-5 items-center hover:bg-[#fffaf8]/50 transition-colors"
                    >
                      <span className="font-medium text-[#4a0b16] truncate pr-4">
                        {inscricao.name}
                      </span>
                      <span className="text-[#940c0c] text-sm truncate pr-4">
                        {inscricao.email}
                      </span>
                      <span className="text-[#4a0b16]/80 text-sm font-mono tracking-tight">
                        {inscricao.phone}
                      </span>
                      <div>
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
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}