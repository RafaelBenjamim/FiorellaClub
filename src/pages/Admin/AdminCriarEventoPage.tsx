import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

export function AdminCriarEventoPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    maxAttendees: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString(),
          price: parseFloat(formData.price),
          maxAttendees: parseInt(formData.maxAttendees),
          location: formData.location || null,
          imageUrl: formData.imageUrl || null,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      navigate("/admin/eventos");
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#4a0b16] font-sans">

      {/* Header */}
      <header className="px-6 md:px-12 py-5 flex justify-between items-center border-b border-white/10">
        <h1 className="text-xl md:text-2xl font-serif text-[#fce3e4] tracking-wide">
          Fiorella Club
        </h1>
        <button
          onClick={() => navigate("/admin/eventos")}
          className="text-[#fce3e4]/50 hover:text-[#fce3e4] text-sm transition-colors"
        >
          ← Eventos
        </button>
      </header>

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-10 md:py-16">

        <div className="mb-10">
          <p className="text-[#c07a82] text-xs tracking-widest uppercase mb-2">
            Novo encontro
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#fce3e4]">
            Criar evento
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label className="text-[#fce3e4]/70 text-sm">
              Título do encontro
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Arranjos Florais de Agosto"
              required
              className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label className="text-[#fce3e4]/70 text-sm">
              Descrição
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Conte como será esse encontro..."
              required
              rows={4}
              className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors resize-none"
            />
          </div>

          {/* Data + Valor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">
                Data e hora
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] focus:outline-none focus:border-[#c07a82] transition-colors [color-scheme:dark]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">
                Valor (R$)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="150.00"
                required
                min="0"
                step="0.01"
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
              />
            </div>
          </div>

          {/* Vagas + Local */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">
                Limite de vagas
              </label>
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                placeholder="15"
                required
                min="1"
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">
                Local
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Uberlândia, MG"
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
              />
            </div>
          </div>

          {/* URL da imagem */}
          <div className="flex flex-col gap-2">
            <label className="text-[#fce3e4]/70 text-sm">
              URL da imagem <span className="text-white/30">(opcional)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
            />
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Botões */}
          <div className="flex flex-col md:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/admin/eventos")}
              className="flex-1 border border-white/20 text-[#fce3e4]/70 px-8 py-4 rounded-full hover:border-white/40 hover:text-[#fce3e4] transition-all duration-300 text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#fce3e4] text-[#4a0b16] px-8 py-4 rounded-full hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Criando..." : "Criar evento"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}