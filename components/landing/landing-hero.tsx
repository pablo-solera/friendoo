import Link from "next/link";
import { signInWithGoogle } from "@/app/auth/actions";
import { LandingHeader } from "@/components/landing/landing-header";
import { SubmitButton } from "@/components/submit-button";
import type { AppUser } from "@/lib/users";

export function LandingHero({ user }: { user: AppUser | null }) {
  return (
    <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
      <div className="festival-glow absolute inset-0 -z-10" />
      <div className="absolute left-[7%] top-28 -z-10 h-3 w-3 rounded-full bg-[#ff4f5e] shadow-[130px_30px_0_#ffe66d,260px_-20px_0_#2ec4b6,520px_70px_0_#ff9f1c,780px_10px_0_#ff4f5e]" />

      <LandingHeader user={user} />

      <div className="mx-auto grid max-w-7xl items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="inline-flex rounded-full border border-[#ff9f1c]/40 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#b45309] shadow-sm">
            Amigo invisible sin caos
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Sorteos que se sienten como una fiesta.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#17120f]/68 sm:text-xl">
            Crea un grupo, comparte un código y deja que cada persona entre con Google. Friendoo hace el sorteo, envía los emails y guarda la magia en privado.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {user ? (
              <Link
                className="rounded-full bg-[#ff4f5e] px-7 py-4 text-center font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.28)] transition hover:-translate-y-1"
                href="/groups/new"
              >
                Crear mi sorteo
              </Link>
            ) : (
              <form action={signInWithGoogle}>
                <SubmitButton
                  className="w-full rounded-full bg-[#ff4f5e] px-7 py-4 font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.28)] transition hover:-translate-y-1"
                  pendingLabel="Entrando..."
                >
                  Crear mi sorteo
                </SubmitButton>
              </form>
            )}
            {user ? (
              <Link
                className="rounded-full border border-[#17120f]/12 bg-white/75 px-7 py-4 text-center font-bold text-[#14213d] transition hover:-translate-y-1 hover:border-[#2ec4b6]/60"
                href="/dashboard"
              >
                Unirme con código
              </Link>
            ) : (
              <form action={signInWithGoogle}>
                <SubmitButton
                  className="w-full rounded-full border border-[#17120f]/12 bg-white/75 px-7 py-4 text-center font-bold text-[#14213d] transition hover:-translate-y-1 hover:border-[#2ec4b6]/60"
                  pendingLabel="Entrando..."
                >
                  Unirme con código
                </SubmitButton>
              </form>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -left-5 top-12 h-24 w-24 rounded-full bg-[#2ec4b6]/35 blur-2xl" />
          <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-[#ff4f5e]/25 blur-2xl" />

          <div className="relative rounded-[2.5rem] border border-[#17120f]/10 bg-white/78 p-4 shadow-[0_35px_90px_rgba(20,33,61,0.16)] backdrop-blur">
            <div className="ticket-corners rounded-[2rem] bg-[#14213d] p-6 text-white">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.26em] text-[#ffe66d]">Invitación festival</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">Navidad 2026</h2>
                </div>
                <span className="rounded-full bg-[#ff9f1c] px-3 py-1 text-xs font-black text-[#17120f]">25 €</span>
              </div>

              <div className="mt-8 rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-white/60">Código</p>
                <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#ffe66d]">FIESTA-8K3P</p>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {["Ana", "Pablo", "Lucía"].map((name) => (
                  <div key={name} className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10">
                    <div className="mx-auto grid size-10 place-items-center rounded-full bg-white text-sm font-black text-[#14213d]">
                      {name[0]}
                    </div>
                    <p className="mt-2 text-xs font-bold">{name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">Listo</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-[#fff7ea] p-5 text-[#17120f]">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Email privado</p>
                <p className="mt-2 text-xl font-black leading-tight">Te ha tocado regalar a una persona secreta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
