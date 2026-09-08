import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEventos, deleteEvento } from "../../services/eventService";
import type { Evento } from "../../types/event";
import { ModalExclusao } from "../../components/modal/ModalExclusao"; 
import heroFallback from "../../assets/galeria8.jpg";

export function AdminEventosPage() {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado que guarda o evento que vai abrir no modal
  const [eventoParaExcluir, setEventoParaExcluir] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos();
        setEventos(data);
      } catch (err: Error | unknown) {
        setError(err instanceof Error ? err.message : "Erro ao buscar eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleAbrirModal = (id: string, titulo: string) => {
    setEventoParaExcluir({ id, title: titulo });
  };

  const confirmarExclusao = async () => {
    if (!eventoParaExcluir) return;

    try {
      await deleteEvento(eventoParaExcluir.id);
      setEventos(eventos.filter(evento => evento.id !== eventoParaExcluir.id));
      setEventoParaExcluir(null);
    } catch (err) {
      alert("Erro ao excluir o evento. Tente novamente.");
    }
  };

  const formatarData = (dataStr: string) => {
    return new Date(dataStr).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatarValor = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const vagasRestantes = (evento: Evento) =>
    evento.maxAttendees - evento.registeredCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#4a0b16] flex items-center justify-center">
        <div className="text-5xl animate-bounce">🌸</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#4a0b16] flex items-center justify-center px-6">
        <p className="text-[#fce3e4] font-serif text-xl text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4a0b16] font-sans relative">
      {/* Header */}
      <header className="px-6 md:px-12 py-5 flex justify-between items-center border-b border-white/10 sticky top-0 bg-[#4a0b16]/90 backdrop-blur-md z-10">
        <h1 className="text-lg md:text-2xl font-serif text-[#fce3e4] tracking-wide">
          <span className="md:hidden">Admin</span>
          <span className="hidden md:inline">Fiorella Club — Admin</span>
        </h1>
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => navigate("/admin/criarEvento")}
            className="bg-[#fce3e4] text-[#4a0b16] px-4 md:px-6 py-2 rounded-full text-sm font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md whitespace-nowrap"
          >
            + Novo evento
          </button>
          <button
            onClick={handleLogout}
            className="text-[#fce3e4]/50 hover:text-[#fce3e4] text-sm font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-10">
          <p className="text-[#c07a82] text-xs tracking-widest uppercase mb-1 font-semibold">
            Gerenciar
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#fce3e4]">
            Eventos
          </h2>
        </div>

        {eventos.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-[#fce3e4]/60 font-serif text-xl mb-6">
              Nenhum evento cadastrado ainda.
            </p>
            <button
              onClick={() => navigate("/admin/criarEvento")}
              className="bg-[#fce3e4] text-[#4a0b16] px-8 py-3 rounded-full font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Criar primeiro evento
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {eventos.map((evento) => {
              const vagas = vagasRestantes(evento);
              const esgotado = vagas <= 0;

              return (
                <div
                  key={evento.id}
                  className="bg-white/10 border border-white/20 rounded-3xl overflow-hidden flex flex-col md:flex-row transition-all hover:bg-white/[0.12] hover:border-white/30"
                >
                  {/* Imagem */}
                  <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0 relative">
                    <img
                      src={evento.imageUrl || heroFallback}
                      alt={evento.title}
                      className="w-full h-full object-cover"
                    />
                    {esgotado && (
                      <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Esgotado
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between p-5 md:p-6 flex-1 gap-6 lg:gap-4">
                    
                    {/* Informações do Evento */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-serif text-[#fce3e4] mb-3 leading-tight">
                        {evento.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#fce3e4]/70 font-medium">
                        <span className="flex items-center gap-1.5">
                          📅 {formatarData(evento.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          💰 {formatarValor(evento.price)}
                        </span>
                        {evento.location && (
                          <span className="flex items-center gap-1.5">
                            📍 {evento.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Área de Ações Responsiva */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:flex-shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t border-white/10 lg:border-none">
                      
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:border-r sm:border-white/10 sm:pr-5">
                        
                        {/* Vagas */}
                        <div className="text-left sm:text-center min-w-[70px]">
                          <p className={`text-3xl font-serif leading-none mb-1 ${esgotado ? "text-red-400" : "text-[#fce3e4]"}`}>
                            {vagas}
                          </p>
                          <p className="text-[10px] font-bold tracking-widest text-[#c07a82] uppercase">
                            {esgotado ? "esgotado" : "vagas"}
                          </p>
                        </div>

                        {/* Botões de Ícones */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/editarEvento/${evento.id}`)}
                            className="flex items-center justify-center w-11 h-11 bg-white/5 border border-white/20 text-[#fce3e4] rounded-full hover:bg-[#fce3e4] hover:text-[#4a0b16] hover:border-[#fce3e4] active:scale-95 transition-all"
                            title="Editar Evento"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                          </button>

                          <button
                            onClick={() => handleAbrirModal(evento.id, evento.title)}
                            className="flex items-center justify-center w-11 h-11 bg-white/5 border border-white/20 text-[#fce3e4] rounded-full hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-95 transition-all"
                            title="Excluir Evento"
                          >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Botão Ver Inscritas */}
                      <button
                        onClick={() => navigate(`/admin/inscricoes/${evento.id}`)}
                        className="w-full sm:w-auto bg-[#fce3e4] text-[#4a0b16] px-6 py-3 rounded-full text-sm font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(252,227,228,0.3)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                      >
                        Ver inscritas
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- 2. CHAMANDO O COMPONENTE DO MODAL AQUI EMBAIXO --- */}
      <ModalExclusao
        isOpen={eventoParaExcluir !== null}
        tituloEvento={eventoParaExcluir?.title || ""}
        onConfirm={confirmarExclusao}
        onCancel={() => setEventoParaExcluir(null)}
      />
    </div>
  );
}