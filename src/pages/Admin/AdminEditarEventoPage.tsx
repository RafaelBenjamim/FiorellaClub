import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById, editarEvento } from "../../services/eventService";

export function AdminEditarEventoPage() {
  const navigate = useNavigate();
  
  // 1. PEGA O ID DA URL
  // Lembra que a rota que criamos foi `/admin/editarEvento/:id`? 
  // O useParams puxa esse ID de lá para sabermos qual evento estamos editando.
  const { eventId } = useParams<{ eventId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. O ESTADO DO FORMULÁRIO
  // Guardamos aqui todos os campos que o seu UpdateEventRequestDto do C# espera receber.
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    price: 0,
    maxAttendees: 0,
    location: "",
    imageUrl: "",
  });

  // 3. BUSCAR OS DADOS AO ABRIR A TELA (useEffect)
  // Assim que a página abre, fazemos um GET no C# para preencher os inputs com o que já está salvo no banco.
  useEffect(() => {
    const fetchEvento = async () => {
      if (!eventId) return;
      try {
        const evento = await getEventoById(eventId);
        
        // Formatamos a data para o formato aceito pelo input type="date" (YYYY-MM-DD)
        const dataFormatada = evento.date
        ? new Date(evento.date.endsWith("Z") ? evento.date : evento.date + "Z")
        .toLocaleDateString("sv-SE", { timeZone: "America/Sao_Paulo" })
        : "";

        setFormData({
          title: evento.title,
          description: evento.description || "",
          date: dataFormatada,
          price: evento.price,
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

  // 4. ATUALIZAR O ESTADO CONFORME O USUÁRIO DIGITA
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 5. ENVIAR AS ALTERAÇÕES (O seu endpoint [HttpPut("EditEvent/{eventId}")])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue sozinha
    if (!eventId) return;

    try {
      // Chamamos a função do service que faz o PUT para a API em C#
     await editarEvento(eventId, {
  ...formData,
  date: new Date(formData.date + "T12:00:00").toISOString(),  // ← meio-dia UTC
  price: Number(formData.price),
  maxAttendees: Number(formData.maxAttendees),
});

      alert("Evento atualizado com sucesso!");
      navigate("/admin/eventos"); // Volta para a listagem
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
          
          {/* Título */}
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

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#fce3e4]">Descrição</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Data */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Data</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[#fce3e4] outline-none focus:border-[#fce3e4] transition-all"
              />
            </div>

            {/* Preço */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#fce3e4]">Preço (R$)</label>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Vagas Máximas */}
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

            {/* Local */}
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
          </div>

          {/* URL da Imagem */}
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