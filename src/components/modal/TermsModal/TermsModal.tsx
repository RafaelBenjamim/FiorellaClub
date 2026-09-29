import { useState } from "react";

interface TermsModalProps {
  isOpen: boolean;
  submitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function TermsModal({ isOpen, submitting, onClose, onConfirm }: TermsModalProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  const handleClose = () => {
    setAgreedToTerms(false); // Reseta o checkbox ao fechar
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a0b16]/40 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl border border-[#fce3e4] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        
        <div className="p-6 md:p-10">
          <h3 className="text-2xl font-serif text-[#4a0b16] mb-4">
            Política de Cancelamento
          </h3>
          
          <div className="text-[#940c0c]/90 text-sm space-y-3 leading-relaxed mb-6 bg-[#fffaf8] p-5 md:p-6 rounded-2xl border border-[#fce3e4] max-h-[50vh] overflow-y-auto">
            <ul className="list-disc pl-5 space-y-3">
              <li>
                Após a confirmação da inscrição, não realizamos reembolso, pois cada vaga dá início à compra de materiais, insumos e à organização da experiência especialmente para a participante.
              </li>
              <li>
                Caso não possa comparecer, a participante poderá transferir sua vaga para outra pessoa, desde que a transferência seja informada à equipe do Fiorella com até 48 horas de antecedência do encontro.
              </li>
              <li>
                Após esse prazo, não será possível realizar a transferência da vaga. Em caso de não comparecimento, não haverá reembolso ou crédito do valor pago.
              </li>
              <li>
                Em caso de cancelamento ou remarcação do encontro por parte da organização, o valor pago será integralmente convertido em crédito para utilização em uma próxima edição do Fiorella Club.
              </li>
            </ul>
            
            <div className="mt-5 pt-4 border-t border-[#fce3e4]/60">
              <p className="italic text-[#4a0b16]/80">
                Ao concluir sua inscrição, a participante declara estar ciente e de acordo com as informações e condições desta experiência.
              </p>
              <p className="mt-2 font-serif font-bold text-[#4a0b16]">
                Equipe Fiorella Club
              </p>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 border-2 border-[#c07a82] rounded flex items-center justify-center peer-checked:bg-[#4a0b16] peer-checked:border-[#4a0b16] transition-colors shrink-0">
                <svg 
                  className={`w-3.5 h-3.5 text-white transition-opacity ${agreedToTerms ? 'opacity-100' : 'opacity-0'}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-sm md:text-base font-bold text-[#4a0b16] group-hover:text-[#940c0c] transition-colors select-none">
              Li e estou de acordo.
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 p-6 bg-[#fffaf8] border-t border-[#fce3e4]/60">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 px-6 py-3.5 rounded-full border border-[#fce3e4] text-[#940c0c] text-sm font-semibold hover:bg-[#fce3e4]/50 transition-colors"
          >
            Voltar e revisar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!agreedToTerms || submitting}
            className="flex-1 px-6 py-3.5 rounded-full bg-[#4a0b16] text-[#fce3e4] text-sm font-semibold shadow-md hover:bg-[#940c0c] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? "Processando..." : "Ir para pagamento"}
          </button>
        </div>

      </div>
    </div>
  );
}