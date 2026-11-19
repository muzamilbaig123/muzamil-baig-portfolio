// ============================================================
// components/ContactForm.tsx
// Contact form -> POST /api/messages
//
// Validation 2 jagah hoti hai:
//   1) Browser me (yahan): foran feedback, request bheje baghair
//   2) Server pe (backend): asli hifazat. Agar woh field-wise errors bheje
//      { errors: { email: "..." } } to har input ke neeche dikhate hain.
// ============================================================

import { useState, type ChangeEvent, type FormEvent } from "react";
import { FiAlertCircle, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { sendMessage } from "../api/portfolio";
import { getErrorMessage, getFieldErrors } from "../api/client";
import type { MessageInput } from "../api/types";
import { alertError, alertSuccess, btnLg, btnPrimary, fieldError, input, inputInvalid, label } from "../styles/ui";

type Errors = Partial<Record<keyof MessageInput, string>>;

const EMPTY: MessageInput = { name: "", email: "", message: "" };

// Backend ki limits jaisi hi
function validate(values: MessageInput): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  else if (values.name.trim().length > 100) errors.name = "Name must be at most 100 characters";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Invalid email format";

  if (!values.message.trim()) errors.message = "Message is required";
  else if (values.message.trim().length > 5000) errors.message = "Message must be at most 5000 characters";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<MessageInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null); // e.g. server down
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // User type kare to us field ka error hata do
    setErrors((errs) => ({ ...errs, [name]: undefined }));
    if (status === "sent") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // page reload rokna
    setFormError(null);

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setStatus("sending");
    try {
      await sendMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("sent");
      setValues(EMPTY); // form khaali kar do
    } catch (err) {
      setStatus("idle");
      const fieldErrors = getFieldErrors(err);
      if (fieldErrors) setErrors(fieldErrors); // server ke field-wise errors
      else setFormError(getErrorMessage(err));
    }
  }

  /** Ek field ka error text (agar hai) */
  const errorText = (field: keyof MessageInput) =>
    errors[field] && (
      <p id={`${field}-error`} className={fieldError}>
        <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
        {errors[field]}
      </p>
    );

  /** Error ho to laal border wala input, warna normal */
  const inputClass = (field: keyof MessageInput) => (errors[field] ? inputInvalid : input);

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto mt-14 max-w-xl space-y-5 text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass("email")}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass("message")} min-h-32 resize-y`}
          data-lenis-prevent // textarea ke andar scroll Lenis na pakde
        />
        {errorText("message")}
      </div>

      {formError && (
        <p className={alertError} role="alert">
          <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
          {formError}
        </p>
      )}

      {/* aria-live: screen readers success message parh ke sunayein */}
      <div aria-live="polite">
        {status === "sent" && (
          <p className={alertSuccess}>
            <FiCheckCircle className="mt-0.5 shrink-0" aria-hidden />
            Thanks! Your message has been sent. I'll get back to you soon.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`group ${btnPrimary} ${btnLg} w-full sm:w-auto`}
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-950" aria-hidden />
            Sending...
          </>
        ) : (
          <>
            Send message
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
