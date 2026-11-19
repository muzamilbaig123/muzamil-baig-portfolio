// ============================================================
// admin/pages/CrudPage.tsx
// Projects, Skills aur Experience teeno ka page ek jaisa hai:
//   list (table) + "New" button + Add/Edit modal + delete confirm
// Isliye ye ek generic component hai. Har page sirf apni "config" deta hai:
// kaunse fields, kaunse columns, aur data form <-> API me kaise badle.
// (Dekho ProjectsPage.tsx: wahan config se samajh aayega ye kaise use hota hai.)
// ============================================================

import { useState, type FormEvent, type ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiAlertCircle, FiEdit2, FiPlus, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import type { CrudApi } from "../../api/admin";
import { getErrorMessage } from "../../api/client";
import { useFetch } from "../../hooks/useFetch";
import FormField from "../components/FormField";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import PageHeader from "../components/PageHeader";
import { useToast } from "../components/toast";
import { alertError, btnMd, btnPrimary, btnSecondary, card, iconBtn, iconBtnDanger } from "../../styles/ui";

/** Form ka ek field */
export type FieldConfig<Item> = {
  name: string;
  label: string;
  type?: "text" | "textarea";
  required?: boolean;
  maxLength?: number; // DB column ki limit (schema.sql)
  placeholder?: string;
  hint?: string;
  /** Extra rule. Error ho to message return karo, sahi ho to undefined. */
  validate?: (value: string) => string | undefined;
  /** Dropdown suggestions, maujooda items se (e.g. pehle se bani categories) */
  getSuggestions?: (items: Item[]) => string[];
};

/** List (table) ka ek column. Pehla column mobile card ka "title" banta hai. */
export type ColumnConfig<Item> = {
  header: string;
  render: (item: Item) => ReactNode;
  className?: string;
};

type FormValues = Record<string, string>;

type Props<Item extends { id: number }, Input> = {
  title: string; // "Projects"
  singular: string; // "project"
  description: string; // page header ke neeche
  icon: IconType; // empty state ka icon
  api: CrudApi<Item, Input>;
  fields: FieldConfig<Item>[];
  columns: ColumnConfig<Item>[];
  /** Edit dabane pe: API item -> form ki string values */
  toForm: (item: Item) => FormValues;
  /** Save pe: form values -> API ko bhejne wala data */
  toInput: (values: FormValues) => Input;
  /** Delete confirm me dikhane ke liye naam */
  itemLabel: (item: Item) => string;
};

export default function CrudPage<Item extends { id: number }, Input>({
  title,
  singular,
  description,
  icon: EmptyIcon,
  api,
  fields,
  columns,
  toForm,
  toInput,
  itemLabel,
}: Props<Item, Input>) {
  // Saare fields khaali: naya item banane ke liye
  const emptyForm = (): FormValues => Object.fromEntries(fields.map((f) => [f.name, ""]));

  const toast = useToast();
  const { data: items, loading, error, reload, setData } = useFetch(api.list);

  // Form modal
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null); // null = "add" mode
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null); // server ka error (modal ke andar)
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [pendingDelete, setPendingDelete] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ---------- Form helpers ----------

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    // Is field ka error hata do (user ne theek karna shuru kar diya)
    setErrors((e) => {
      const next = { ...e };
      delete next[name];
      return next;
    });
  }

  function openAdd() {
    setEditing(null);
    setValues(emptyForm());
    setErrors({});
    setFormError(null);
    setFormOpen(true);
  }

  function openEdit(item: Item) {
    setEditing(item);
    setValues({ ...emptyForm(), ...toForm(item) });
    setErrors({});
    setFormError(null);
    setFormOpen(true);
  }

  function closeForm() {
    if (saving) return; // save ke dauraan band na ho
    setFormOpen(false);
  }

  /** Config ke rules se har field check karo */
  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    for (const f of fields) {
      const value = (values[f.name] ?? "").trim();
      if (f.required && !value) {
        errs[f.name] = `${f.label} is required`;
      } else if (f.maxLength && value.length > f.maxLength) {
        errs[f.name] = `${f.label} must be at most ${f.maxLength} characters`;
      } else if (value && f.validate) {
        const msg = f.validate(value);
        if (msg) errs[f.name] = msg;
      }
    }
    return errs;
  }

  // ---------- Create / Update ----------

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    try {
      const input = toInput(values);
      if (editing) {
        const updated = await api.update(editing.id, input);
        // List me purane item ki jagah updated item
        setData((prev) => prev?.map((it) => (it.id === updated.id ? updated : it)) ?? null);
        toast.success(`${capitalize(singular)} updated`);
      } else {
        const created = await api.create(input);
        // Naya item list me sabse upar
        setData((prev) => [created, ...(prev ?? [])]);
        toast.success(`${capitalize(singular)} added`);
      }
      setFormOpen(false);
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  // ---------- Delete ----------

  async function confirmDelete() {
    if (!pendingDelete) return;
    const item = pendingDelete;

    setDeleting(true);
    try {
      await api.remove(item.id);
      setData((prev) => prev?.filter((it) => it.id !== item.id) ?? null);
      toast.success(`${capitalize(singular)} deleted`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  // ---------- UI pieces ----------

  /** Edit + Delete icon buttons (table aur mobile card dono me) */
  const actions = (item: Item) => (
    <div className="flex justify-end gap-1">
      <button onClick={() => openEdit(item)} className={iconBtn} aria-label={`Edit ${itemLabel(item)}`} title="Edit">
        <FiEdit2 aria-hidden />
      </button>
      <button
        onClick={() => setPendingDelete(item)}
        className={iconBtnDanger}
        aria-label={`Delete ${itemLabel(item)}`}
        title="Delete"
      >
        <FiTrash2 aria-hidden />
      </button>
    </div>
  );

  const addButton = (
    <button onClick={openAdd} className={`${btnPrimary} ${btnMd}`}>
      <FiPlus aria-hidden /> New {singular}
    </button>
  );

  let body: ReactNode;
  if (loading) {
    // Skeleton rows
    body = (
      <div className="divide-y divide-neutral-800/70" aria-busy="true" aria-label="Loading">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 md:px-6">
            <div className="skeleton h-10 w-10 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-2/5 rounded" />
              <div className="skeleton h-3 w-1/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (error) {
    body = (
      <div className="flex flex-col items-center px-6 py-16 text-center" role="alert">
        <FiAlertCircle className="text-2xl text-neutral-500" aria-hidden />
        <p className="mt-4 font-medium text-white">Couldn't load {title.toLowerCase()}</p>
        <p className="mt-1 text-sm text-neutral-500">{error}</p>
        <button onClick={reload} className={`mt-6 ${btnSecondary} ${btnMd}`}>
          <FiRefreshCw aria-hidden /> Try again
        </button>
      </div>
    );
  } else if (!items?.length) {
    body = (
      <div className="flex flex-col items-center px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-neutral-800 text-neutral-500">
          <EmptyIcon className="text-lg" aria-hidden />
        </span>
        <p className="mt-4 font-medium text-white">No {title.toLowerCase()} yet</p>
        <p className="mt-1 text-sm text-neutral-500">Add your first {singular} and it will show up on your site.</p>
        <div className="mt-6">{addButton}</div>
      </div>
    );
  } else {
    body = (
      <>
        {/* ---- Desktop: table ---- */}
        <table className="hidden w-full text-left text-sm md:table">
          <thead>
            <tr className="border-b border-neutral-800 text-[11px] uppercase tracking-[0.15em] text-neutral-500">
              {columns.map((c) => (
                <th key={c.header} scope="col" className="px-6 py-3.5 font-medium">
                  {c.header}
                </th>
              ))}
              <th scope="col" className="px-6 py-3.5 text-right font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/70">
            {items.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-white/2">
                {columns.map((c) => (
                  <td key={c.header} className={`px-6 py-4 align-middle ${c.className ?? ""}`}>
                    {c.render(item)}
                  </td>
                ))}
                <td className="w-px whitespace-nowrap px-4 py-4">{actions(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ---- Mobile: har item ek card (table chhoti screen pe tang hoti hai) ---- */}
        <ul className="divide-y divide-neutral-800/70 md:hidden">
          {items.map((item) => (
            <li key={item.id} className="px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">{columns[0].render(item)}</div>
                {actions(item)}
              </div>
              {columns.length > 1 && (
                <dl className="mt-3 space-y-1.5">
                  {columns.slice(1).map((c) => (
                    <div key={c.header} className="flex gap-3 text-sm">
                      <dt className="w-20 shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.15em] text-neutral-500">{c.header}</dt>
                      <dd className="min-w-0 text-neutral-300">{c.render(item)}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title={title}
        description={description}
        action={items?.length ? addButton : undefined}
      />

      <div className={`${card} overflow-hidden`}>{body}</div>

      {/* ---- Add / Edit modal ---- */}
      <Modal
        open={formOpen}
        onClose={closeForm}
        closeOnOverlay={false}
        title={editing ? `Edit ${singular}` : `New ${singular}`}
        description={editing ? `Update "${itemLabel(editing)}".` : `Fields marked * are required.`}
        footer={
          <>
            <button type="button" onClick={closeForm} disabled={saving} className={`${btnSecondary} ${btnMd}`}>
              Cancel
            </button>
            {/* form="crud-form": button form ke bahar (footer me) hai, phir bhi usi form ko submit kare */}
            <button type="submit" form="crud-form" disabled={saving} className={`${btnPrimary} ${btnMd}`}>
              {saving && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-950" aria-hidden />
              )}
              {saving ? "Saving..." : editing ? "Save changes" : `Add ${singular}`}
            </button>
          </>
        }
      >
        <form id="crud-form" onSubmit={handleSubmit} noValidate className="space-y-5">
          {formError && (
            <p className={alertError} role="alert">
              <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
              {formError}
            </p>
          )}

          {fields.map((f) => (
            <FormField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type}
              required={f.required}
              placeholder={f.placeholder}
              hint={f.hint}
              value={values[f.name] ?? ""}
              error={errors[f.name]}
              onChange={handleChange}
              suggestions={f.getSuggestions && items ? f.getSuggestions(items) : undefined}
            />
          ))}
        </form>
      </Modal>

      {/* ---- Delete confirm ---- */}
      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete ${singular}?`}
        message={pendingDelete ? `"${itemLabel(pendingDelete)}" will be permanently removed. This can't be undone.` : ""}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
