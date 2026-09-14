import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById, editarEvento } from "../../services/eventService";

export function AdminEditarEventoPage() {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    price: 0,
    fiorellaDiscount: 0, // NOVO CAMPO
    maxAttendees: 0,
    location: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchEvento = async () => {
      if (!eventId) return;
      try {
        const evento = await getEventoById(eventId);
        
        // --- O PULO DO GATO PARA A HORA FUNCIONAR ---
        // O input type="datetime-local" espera exatamente: "YYYY-MM-DDTHH:mm"
        // Se a API devolve "2026-09-09T21:15:54.000Z", cortamos os segundos para encaixar no input.
        let dataFormatada = "";
        if (evento.date) {
          const dateObj = new Date(evento.date);
          // Ajusta para o fuso horário local para não dar problema de exibir hora errada no input
          const tzOffset = (new Date()).getTimezoneOffset() * 60000;
          const localISOTime = (new Date(dateObj.getTime() - tzOffset)).toISOString().slice(0, 16);
          dataFormatada = localISOTime;
        }

        setFormData({
          title: evento.title,
          description: evento.description || "",
          date: dataFormatada,
          price: evento.price,
          fiorellaDiscount: evento.discountPercentage || 0, // Preenche com o banco, se existir
          maxAttendees: evento.maxAttendees,
          location: evento.location || "",
          imageUrl: evento.imageUrl || "",
        });
      } catch (err) {
        setError("Erro ao carregar dados do evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!eventId) return;

    try {
      await editarEvento(eventId, {
        ...formData,
        // Envia a data exata que está no input + "Z" (ou converte para ISO completo)
        date: new Date(formData.date).toISOString(), 
        price: Number(formData.price),
        discountPercentage: Number(formData.fiorellaDiscount), // Garante que é número
        maxAttendees: Number(formData.maxAttendees),
      });

      alert("Evento atualizado com sucesso!");
      navigate("/admin/eventos"); 
    } catch (err) {
      alert("Erro ao atualizar o evento. Tente novamente.");
    }
  };

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
    <div className="min-h-screen bg-[#4a0b16] font-sans py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">
        
        <div className="mb-8">
          <p className="text-[#c07a82] text-xs tracking-widest uppercase mb-1 font-semibold">
            Painel Administrativo
          </p>
          <h2 className="text-3xl font-serif text-[#fce3e4]">Editar Evento</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#fce3e4]">Título do Evento</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#fce3e4]">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all resize-none"
            />
          </div>

          {/* Dados Financeiros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Preço Inteiro (R$)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">
                Desconto Fiorella (%)
              </label>
              <input
                type="number"
                name="fiorellaDiscount"
                value={formData.fiorellaDiscount}
                onChange={handleChange}
                min="0"
                max="100"
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Data e Hora</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all [color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Máximo de Vagas</label>
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Local</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">URL da Imagem</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/eventos")}
              className="px-6 py-3 rounded-full text-sm font-bold text-[#fce3e4] hover:bg-white/10 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#fce3e4] text-[#4a0b16] px-8 py-3 rounded-full text-sm font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}