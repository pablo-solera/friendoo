import Link from "next/link";
import { signInWithGoogle } from "@/app/auth/actions";
import { getUser } from "@/lib/auth";

const steps = [
  {
    number: "01",
    title: "Crea el grupo",
    text: "Define el nombre, precio máximo y las reglas del intercambio.",
  },
  {
    number: "02",
    title: "Comparte el código",
    text: "Cada participante entra con Google y añade sus sugerencias.",
  },
  {
    number: "03",
    title: "Lanza la fiesta",
    text: "Friendoo sortea, guarda resultados y envía los emails privados.",
  },
];

export default async function Home() {
  const user = await getUser();

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ea] text-[#17120f]">
      <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
        <div className="festival-glow absolute inset-0 -z-10" />
        <div className="absolute left-[7%] top-28 -z-10 h-3 w-3 rounded-full bg-[#ff4f5e] shadow-[130px_30px_0_#ffe66d,260px_-20px_0_#2ec4b6,520px_70px_0_#ff9f1c,780px_10px_0_#ff4f5e]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#17120f]/10 bg-white/65 px-4 py-3 shadow-sm backdrop-blur md:px-6">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid size-9 place-items-center rounded-full bg-[#ff4f5e] text-white shadow-[0_10px_30px_rgba(255,79,94,0.28)]">
              F
            </span>
            Friendoo
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-[#17120f]/70 md:flex">
            <a href="#como-funciona">Cómo funciona</a>
          </div>

          {user ? (
            <Link
              className="rounded-full bg-[#14213d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <form action={signInWithGoogle}>
              <button
                className="rounded-full bg-[#14213d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
                type="submit"
              >
                Entrar
              </button>
            </form>
          )}
        </nav>

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
                  <button
                    className="w-full rounded-full bg-[#ff4f5e] px-7 py-4 font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.28)] transition hover:-translate-y-1"
                    type="submit"
                  >
                    Crear mi sorteo
                  </button>
                </form>
              )}
              <Link
                className="rounded-full border border-[#17120f]/12 bg-white/75 px-7 py-4 text-center font-bold text-[#14213d] transition hover:-translate-y-1 hover:border-[#2ec4b6]/60"
                href="/dashboard"
              >
                Unirme con código
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm font-bold text-[#17120f]/62">
              <span className="rounded-full bg-[#ffe66d]/70 px-4 py-2">Sin emails manuales</span>
              <span className="rounded-full bg-[#2ec4b6]/15 px-4 py-2 text-[#0f766e]">Sorteo privado</span>
              <span className="rounded-full bg-[#ff9f1c]/18 px-4 py-2 text-[#9a3412]">Listo para móvil</span>
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

      <section id="como-funciona" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-white/78 p-6 shadow-[0_28px_90px_rgba(20,33,61,0.08)] ring-1 ring-[#17120f]/8 md:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff4f5e]">Cómo funciona</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tres pasos, cero drama.</h2>
            </div>
            <p className="max-w-md text-[#17120f]/62">Pensado para grupos reales: familia, amigos, oficina o cualquier excusa para celebrar.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-[2rem] border border-[#17120f]/8 bg-[#fff7ea] p-6">
                <p className="text-sm font-black text-[#2ec4b6]">{step.number}</p>
                <h3 className="mt-5 text-2xl font-black tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#17120f]/64">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17120f]/10 px-5 py-8 text-center text-sm font-bold text-[#17120f]/60 sm:px-8 lg:px-12">
        Hecho con amor por Pablo
      </footer>
    </main>
  );
}
