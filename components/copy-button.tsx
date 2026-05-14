"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Copiar" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      className="rounded-full bg-[#14213d] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
    >
      {copied ? "Copiado" : label}
    </button>
  );
}
