// ============================================================
// admin/pages/MessagesPage.tsx
// Contact form se aaye messages: sirf dekhna aur delete karna.
// ============================================================

import { useState } from "react";
import { FiAlertCircle, FiCornerUpLeft, FiInbox, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { messagesApi } from "../../api/admin";
import { getErrorMessage } from "../../api/client";
import type { ApiMessage } from "../../api/types";
import { useFetch } from "../../hooks/useFetch";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import { useToast } from "../components/toast";
import { formatDate } from "../format";
import { btnMd, btnSecondary, btnSm, card, iconBtnDanger } from "../../styles/ui";

export default function MessagesPage() {
  const toast = useToast();
  const { data: messages, loading, error, reload, setData } = useFetch(messagesApi.list);
  const [pendingDelete, setPendingDelete] = useState<ApiMessage | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const msg = pendingDelete;

    setDeleting(true);
    try {
      await messagesApi.remove(msg.id);
      setData((prev) => prev?.filter((m) => m.id !== msg.id) ?? null); // list se hata do
      toast.success("Message deleted");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  let body;
  if (loading) {
    body = (
      <div className="space-y-3" aria-busy="true" aria-label="Loading">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${card} space-y-3 p-5 md:p-6`}>
            <div className="skeleton h-4 w-40 rounded" />
            <div className="skeleton h-3.5 w-56 rounded" />
            <div className="skeleton h-3.5 w-3/4 rounded" />
          </div>
        ))}
      </div>
    );
  } else if (error) {
    body = (
      <div className={`${card} flex flex-col items-center px-6 py-16 text-center`} role="alert">
        <FiAlertCircle className="text-2xl text-neutral-500" aria-hidden />
        <p className="mt-4 font-medium text-white">Couldn't load messages</p>
        <p className="mt-1 text-sm text-neutral-500">{error}</p>
        <button onClick={reload} className={`mt-6 ${btnSecondary} ${btnMd}`}>
          <FiRefreshCw aria-hidden /> Try again
        </button>
      </div>
    );
  } else if (!messages?.length) {
    body = (
      <div className={`${card} flex flex-col items-center px-6 py-16 text-center`}>
        <span className="grid h-12 w-12 place-items-center rounded-full border border-neutral-800 text-neutral-500">
          <FiInbox className="text-lg" aria-hidden />
        </span>
        <p className="mt-4 font-medium text-white">Inbox is empty</p>
        <p className="mt-1 text-sm text-neutral-500">Messages from your contact form will appear here.</p>
      </div>
    );
  } else {
    body = (
      <ul className="space-y-3">
        {messages.map((m) => (
          <li key={m.id}>
            <article className={`${card} p-5 transition-colors hover:border-neutral-700 md:p-6`}>
              <header className="flex items-start gap-4">
                {/* Naam ka pehla harf: list jaldi scan ho */}
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-neutral-800 bg-neutral-900 text-sm font-semibold uppercase text-neutral-300"
                >
                  {m.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-medium text-white">{m.name}</p>
                    <time dateTime={m.created_at} className="text-xs text-neutral-500">
                      {formatDate(m.created_at)}
                    </time>
                  </div>
                  <p className="break-all text-sm text-neutral-500">{m.email}</p>
                </div>
              </header>

              {/* whitespace-pre-wrap: message ki line breaks waise hi dikhen */}
              <p className="mt-4 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-neutral-300 sm:pl-14">
                {m.message}
              </p>

              <footer className="mt-5 flex items-center justify-end gap-1 border-t border-neutral-800/70 pt-4 sm:ml-14">
                {/* mailto: click karne pe email app me reply khul jaye */}
                <a href={`mailto:${m.email}`} className={`${btnSecondary} ${btnSm}`}>
                  <FiCornerUpLeft aria-hidden /> Reply
                </a>
                <button
                  onClick={() => setPendingDelete(m)}
                  className={iconBtnDanger}
                  aria-label={`Delete message from ${m.name}`}
                  title="Delete"
                >
                  <FiTrash2 aria-hidden />
                </button>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description={
          messages ? `${messages.length} ${messages.length === 1 ? "message" : "messages"} from your contact form.` : "Messages from your contact form."
        }
      />

      {body}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete message?"
        message={pendingDelete ? `The message from ${pendingDelete.name} will be permanently removed. This can't be undone.` : ""}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
