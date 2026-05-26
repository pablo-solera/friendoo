"use client";

import { useEffect, useRef, useState } from "react";

export function CopyButton({
  value,
  label = "Copiar",
  className = "rounded-full bg-[#14213d] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <button
      type="button"
      onClick={copyValue}
      className={className}
    >
      {status === "copied" ? "Copiado" : status === "error" ? "No se pudo copiar" : label}
    </button>
  );
}
