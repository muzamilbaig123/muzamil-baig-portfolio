// ============================================================
// hooks/useFetch.ts
// Data laane ka reusable hook: loading, error aur data teeno sambhalta hai.
//
//   const { data, loading, error, reload } = useFetch(fetchProjects);
//
// Note: fetcher function component ke bahar define karo (jaise api/ me),
// warna har render pe naya function banega aur request baar baar jayegi.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "../api/client";

type State<T> = { data: T | null; loading: boolean; error: string | null };

export function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: null });

  // reload() is number ko badhata hai, jis se useEffect dobara chalta hai
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  // Admin panel list ko locally update karne ke liye (add/edit/delete ke baad dobara fetch ki zaroorat nahi)
  const setData = useCallback((update: (prev: T | null) => T | null) => {
    setState((s) => ({ ...s, data: update(s.data) }));
  }, []);

  useEffect(() => {
    // Agar component request poori hone se pehle hat jaye, to purana response ignore karo
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ data: null, loading: false, error: getErrorMessage(err) });
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher, reloadKey]);

  return { ...state, reload, setData };
}
