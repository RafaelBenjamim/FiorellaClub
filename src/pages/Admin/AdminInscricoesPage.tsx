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
  0: { texto: "Pendente", cor: "text-yellow-600 bg-yellow-50" },
  1: { texto: "Confirmada", cor: "text-green-600 bg-green-50" },
  2: { texto: "Cancelada", cor: "text-red-600 bg-red-50" },
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
        <div className="text-5xl animate-bounce">🌸</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fce3e4] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#940c0c] font-serif text-xl mb-4">{error}</p>
          <button
            onClick={() => navigate("/admin/eventos")}
            className="text-[#c07a82] underline text-sm"
          >
            ← Voltar para eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans">

      {/* Header */}
      <header className="bg-[#4a0b16] text-[#fce3e4] px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-serif">Fiorella Club — Admin</h1>
        <button
          onClick={() => navigate("/admin/eventos")}
          className="text-[#fce3e4]/70 hover:text-[#fce3e4] text-sm transition-colors"
        >
          ← Voltar
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif">Inscrições</h2>
          <div className="bg-white rounded-2xl px-6 py-3 border border-[#fce3e4]">
            <p className="text-sm uppercase tracking-widest text-[#c07a82] font-semibold">
              Total
            </p>
            <p className="text-2xl font-serif text-[#4a0b16] text-center">
              {inscricoes.length}
            </p>
          </div>
        </div>

        {inscricoes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#940c0c] font-serif text-xl">
              Nenhuma inscrição ainda.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[1.5rem] border border-[#fce3e4] overflow-hidden">
            {/* Header da tabela */}
            <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-[#fce3e4] text-xs uppercase tracking-widest text-[#c07a82] font-semibold">
              <span>Nome</span>
              <span>Email</span>
              <span>Telefone</span>
              <span>Status</span>
            </div>

            {/* Linhas */}
            {inscricoes.map((inscricao, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 gap-4 px-6 py-4 items-center ${
                  i % 2 === 0 ? "bg-white" : "bg-[#fce3e4]/20"
                }`}
              >
                <span className="font-medium text-[#4a0b16]">
                  {inscricao.name}
                </span>
                <span className="text-[#940c0c] text-sm">
                  {inscricao.email}
                </span>
                <span className="text-[#4a0b16]/70 text-sm">
                  {inscricao.phone}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                    statusLabel[inscricao.status]?.cor
                  }`}
                >
                  {statusLabel[inscricao.status]?.texto}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}