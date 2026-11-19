import type { ChangeEvent } from "react";
import { FiAlertCircle } from "react-icons/fi";
import {
  fieldError,
  fieldHint,
  input,
  inputInvalid,
  label as labelClass,
} from "../../styles/ui";

type Props = {
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  type?: "text" | "password" | "textarea";
  required?: boolean;
  placeholder?: string;
  hint?: string; // input ke neeche chhoti si madad wali line
  suggestions?: string[];
  autoComplete?: string;
  rows?: number;
};

export default function FormField({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  placeholder,
  hint,
  suggestions,
  autoComplete,
  rows = 4,
}: Props) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const className = error ? inputInvalid : input;

  const handle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(name, e.target.value);

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="ml-1 text-neutral-500" aria-hidden>
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handle}
          placeholder={placeholder}
          rows={rows}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${className} resize-y`}
        />
      ) : (
        <>
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handle}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            list={suggestions?.length ? `${id}-list` : undefined}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={className}
          />
          {suggestions && suggestions.length > 0 && (
            <datalist id={`${id}-list`}>
              {suggestions.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          )}
        </>
      )}

      {error ? (
        <p id={`${id}-error`} className={fieldError}>
          <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className={fieldHint}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}
