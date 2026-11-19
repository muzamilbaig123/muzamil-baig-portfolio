import { FiAlertTriangle } from "react-icons/fi";
import { btnDanger, btnMd, btnSecondary } from "../../styles/ui";
import Modal from "./Modal";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean; // delete chal raha hai
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  busy,
  onConfirm,
  onCancel,
}: Props) {
  // Delete ke dauraan band na ho
  const close = () => {
    if (!busy) onCancel();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title={title}
      size="sm"
      footer={
        <>
          <button
            type="button"
            onClick={close}
            disabled={busy}
            className={`${btnSecondary} ${btnMd}`}
            data-autofocus
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`${btnDanger} ${btnMd}`}
          >
            {busy ? "Deleting..." : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-500/10 text-red-400">
          <FiAlertTriangle aria-hidden />
        </span>
        <p className="pt-2 text-sm leading-relaxed text-neutral-300">
          {message}
        </p>
      </div>
    </Modal>
  );
}
