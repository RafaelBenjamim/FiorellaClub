import type { ModalExclusaoProps } from "../../types/modal";

export function ModalExclusao({ isOpen, tituloEvento, onConfirm, onCancel }: ModalExclusaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#4a0b16] border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
        
        <div className="flex items-center gap-4 mb-4 text-red-400">
          <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <h3 className="text-2xl font-serif text-[#fce3e4]">Excluir Evento</h3>
        </div>
        
        <p className="text-[#fce3e4]/80 text-base mb-8">
          Tem certeza que deseja excluir o evento <strong className="text-white font-semibold">"{tituloEvento}"</strong>? Esta ação é permanente e não poderá ser desfeita.
        </p>
        
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold text-[#fce3e4] hover:bg-white/10 active:scale-95 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-bold bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}