import Link from "next/link";
import { signInWithGoogle, signOut } from "@/app/auth/actions";
import { SubmitButton } from "@/components/submit-button";
import { UserMenu } from "@/components/landing/user-menu";
import type { AppUser } from "@/lib/users";

export function LandingHeader({ user }: { user: AppUser | null }) {
  return (
    <nav className="relative z-[100] mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[1.75rem] border border-[#17120f]/10 bg-white/65 px-4 py-3 shadow-sm backdrop-blur md:flex-nowrap md:rounded-full md:px-6">
      <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
        <span className="grid size-9 place-items-center rounded-full bg-[#ff4f5e] text-white shadow-[0_10px_30px_rgba(255,79,94,0.28)]">
          F
        </span>
        Friendoo
      </Link>

      <div className="order-3 flex w-full items-center justify-center gap-5 border-t border-[#17120f]/8 pt-3 text-sm font-bold text-[#17120f]/70 md:order-none md:w-auto md:gap-8 md:border-0 md:pt-0">
        <a className="transition hover:text-[#ff4f5e]" href="#como-funciona">Cómo funciona</a>
        <a className="transition hover:text-[#ff4f5e]" href="#preguntas-frecuentes">Preguntas frecuentes</a>
      </div>

      {user ? (
        <UserMenu user={user} signOutAction={signOut} />
      ) : (
        <form action={signInWithGoogle}>
          <SubmitButton
            className="rounded-full bg-[#14213d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
            pendingLabel="Entrando..."
          >
            Entrar
          </SubmitButton>
        </form>
      )}
    </nav>
  );
}
