import { useParams, Link } from "react-router-dom";

function ConfirmacaoPage() {
  const { registrationId } = useParams();

  return (
    <div className="min-h-screen bg-[#fce3e4] text-[#4a0b16] font-sans flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-sm border border-[#fce3e4] p-8 md:p-12 text-center">
        <div className="text-6xl mb-6">🌸</div>
        <h1 className="text-4xl font-serif mb-4">Pagamento confirmado!</h1>
        <p className="text-lg text-[#940c0c] leading-relaxed mb-4">
          Obrigada por se inscrever no Fiorella Club. Em breve você receberá uma
          confirmação por email e WhatsApp com todos os detalhes do encontro.
        </p>
        <p className="text-sm text-[#4a0b16]/60 mb-8">
          Código da inscrição: {registrationId}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[#4a0b16] px-8 py-3 text-[#fce3e4] font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-[#940c0c]"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}

export default ConfirmacaoPage;
