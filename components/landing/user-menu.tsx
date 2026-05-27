"use client";

import Link from "next/link";
import { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import type { AppUser } from "@/lib/users";
import { getUserInitials } from "@/lib/users";

type UserMenuProps = {
  user: AppUser;
  signOutAction: () => Promise<void>;
};

export function UserMenu({ user, signOutAction }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initials = getUserInitials(user);

  return (
    <div className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="grid size-11 place-items-center overflow-hidden rounded-full bg-[#14213d] bg-cover bg-center text-sm font-black text-[#ffe66d] shadow-[0_12px_28px_rgba(20,33,61,0.16)] ring-2 ring-white transition hover:-translate-y-0.5 hover:ring-[#ff4f5e]/30"
        onClick={() => setIsOpen((current) => !current)}
        style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : undefined}
        type="button"
      >
        {user.avatarUrl ? <span className="sr-only">Abrir menú de usuario</span> : initials}
      </button>

      {isOpen ? (
        <>
          <button
            aria-label="Cerrar menú de usuario"
            className="fixed inset-0 z-[998] cursor-default"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <div
            className="absolute right-0 top-[calc(100%+0.75rem)] z-[999] w-72 rounded-[1.5rem] border border-[#17120f]/10 bg-[#fff7ea] p-3 text-[#17120f] shadow-[0_28px_80px_rgba(20,33,61,0.18)]"
            role="menu"
          >
            <div className="flex items-center gap-3 rounded-[1.1rem] bg-white/75 p-3">
              <div
                className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#14213d] bg-cover bg-center text-xs font-black text-[#ffe66d]"
                style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : undefined}
              >
                {user.avatarUrl ? null : initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-black leading-tight">{user.name}</p>
                {user.email ? <p className="mt-1 truncate text-xs font-semibold text-[#17120f]/50">{user.email}</p> : null}
              </div>
            </div>

            <Link
              className="mt-3 flex rounded-[1.1rem] px-4 py-3 font-black transition hover:bg-white/80 hover:text-[#ff4f5e]"
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              role="menuitem"
            >
              Mis sorteos
            </Link>

            <div className="mt-3 border-t border-[#17120f]/10 pt-3">
              <form action={signOutAction}>
                <SubmitButton
                  className="w-full rounded-full bg-[#14213d] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a] disabled:cursor-not-allowed disabled:opacity-60"
                  pendingLabel="Cerrando..."
                >
                  Cerrar sesión
                </SubmitButton>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
