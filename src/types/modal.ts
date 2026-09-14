export interface ModalExclusaoProps {
  isOpen: boolean;
  tituloEvento: string;
  onConfirm: () => void;
  onCancel: () => void;
}