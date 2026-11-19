// ============================================================
// admin/pages/LoginPage.tsx
// Admin login: POST /api/auth/login -> token localStorage me save.
// ============================================================

import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { FiAlertCircle, FiArrowLeft, FiClock } from "react-icons/fi";
import { login } from "../../api/admin";
import { isLoggedIn, setToken } from "../../api/auth";
import { getErrorMessage } from "../../api/client";
import FormField from "../components/FormField";
import { alertError, alertWarning, btnLg, btnPrimary, card, eyebrow } from "../../styles/ui";

type Errors = { username?: string; password?: string };

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // RequireAuth ne bheja ho to wapas wahi page, warna dashboard
  const from = (location.state as { from?: string } | null)?.from ?? "/admin";

  // api/client.ts token expire hone pe ?expired=1 ke saath yahan bhejta hai
  const expired = new URLSearchParams(location.search).has("expired");

  // Pehle se logged in ho to login page dikhane ki zaroorat nahi
  if (isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    // Client-side validation
    const errs: Errors = {};
    if (!values.username.trim()) errs.username = "Username is required";
    if (!values.password) errs.password = "Password is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const { token } = await login(values.username.trim(), values.password);
      setToken(token); // ab har request me Authorization header lagega
      navigate(from, { replace: true });
    } catch (err) {
      // 401 pe backend "Invalid username or password" bhejta hai
      setFormError(getErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12">
      {/* Halki si roshni upar se: flat black se thoda depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.06),transparent_70%)]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="" className="mx-auto h-14 w-14 rounded-xl border border-neutral-800" />
          <p className={`mt-6 ${eyebrow}`}>Admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-neutral-400">Sign in to manage your portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className={`${card} space-y-5 p-6 sm:p-8`}>
          {expired && !formError && (
            <p className={alertWarning} role="status">
              <FiClock className="mt-0.5 shrink-0" aria-hidden />
              Your session expired. Please sign in again.
            </p>
          )}
          {formError && (
            <p className={alertError} role="alert">
              <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden />
              {formError}
            </p>
          )}

          <FormField
            name="username"
            label="Username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
            autoComplete="username"
            required
          />
          <FormField
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading} className={`${btnPrimary} ${btnLg} w-full`}>
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-neutral-950" aria-hidden />
            )}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a
          href="/"
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-lg text-sm text-neutral-500 transition hover:text-white"
        >
          <FiArrowLeft aria-hidden /> Back to site
        </a>
      </div>
    </div>
  );
}
