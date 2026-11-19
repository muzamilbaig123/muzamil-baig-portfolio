const TOKEN_KEY = "admin_token";

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch { /* ignore */ }
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      clearToken(); // expire ho chuka, hata do
      return false;
    }
    return true;
  } catch {
    clearToken(); // token kharab hai
    return false;
  }
}
