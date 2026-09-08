import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await login(email, senha);
      localStorage.setItem("token", token);
      navigate("/admin/eventos");
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#4a0b16] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-[#fce3e4] mb-2">
            Fiorella Club
          </h1>
          <p className="text-xs tracking-widest text-[#c07a82]">
            Área administrativa
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#fce3e4]/70 text-sm">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-[#fce3e4] placeholder:text-white/30 focus:outline-none focus:border-[#c07a82] transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fce3e4] text-[#4a0b16] px-8 py-4 rounded-full hover:bg-white hover:-translate-y-0.5 transition-all duration-300 shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}