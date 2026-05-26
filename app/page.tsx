import Link from "next/link";
import { signInWithGoogle } from "@/app/auth/actions";
import { SubmitButton } from "@/components/submit-button";
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

const faqs = [
  {
    question: "¿Cuánto se tarda en crear un sorteo?",
    answer: "Solo necesitas poner un nombre, precio máximo y, si quieres, una fecha o mensaje para el grupo.",
  },
  {
    question: "¿Tengo que crear cuentas manualmente para los participantes?",
    answer: "No. Cada persona entra con Google y se une usando el código o enlace del grupo.",
  },
  {
    question: "¿Cómo se unen los participantes?",
    answer: "Puedes compartir el código del grupo o un enlace directo. Al iniciar sesión, podrán añadir sus sugerencias.",
  },
  {
    question: "¿El sorteo evita que alguien se regale a sí mismo?",
    answer: "Sí. Friendoo genera las asignaciones para que cada persona regale a otra.",
  },
  {
    question: "¿Puedo usarlo desde el móvil?",
    answer: "Sí. La experiencia está pensada para funcionar bien en móvil, tablet y escritorio.",
  },
];

export default async function Home() {
  const user = await getUser();

  return (
    <main className="min-h-dvh overflow-hidden bg-[#fff7ea] text-[#17120f]">
      <section className="relative isolate px-5 py-6 sm:px-8 lg:px-12">
        <div className="festival-glow absolute inset-0 -z-10" />
        <div className="absolute left-[7%] top-28 -z-10 h-3 w-3 rounded-full bg-[#ff4f5e] shadow-[130px_30px_0_#ffe66d,260px_-20px_0_#2ec4b6,520px_70px_0_#ff9f1c,780px_10px_0_#ff4f5e]" />

        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-[1.75rem] border border-[#17120f]/10 bg-white/65 px-4 py-3 shadow-sm backdrop-blur md:flex-nowrap md:rounded-full md:px-6">
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
            <Link
              className="rounded-full bg-[#14213d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
              href="/dashboard"
            >
              Dashboard
            </Link>
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
              <Link
                className="rounded-full border border-[#17120f]/12 bg-white/75 px-7 py-4 text-center font-bold text-[#14213d] transition hover:-translate-y-1 hover:border-[#2ec4b6]/60"
                href="/dashboard"
              >
                Unirme con código
              </Link>
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
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff4f5e]">Cómo funciona</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tres pasos. Sin complicaciones.</h2>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
            <div className="absolute left-1/2 top-8 hidden h-px w-[68%] -translate-x-1/2 bg-[#17120f]/12 md:block" />
            {steps.map((step, index) => (
              <article key={step.number} className="relative text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full border border-[#17120f]/10 bg-[#fff7ea] text-lg font-black shadow-[0_16px_42px_rgba(20,33,61,0.08)]">
                  <span className={index === 0 ? "text-[#ff4f5e]" : index === 1 ? "text-[#0f766e]" : "text-[#b45309]"}>
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-7 text-[#17120f]/62">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preguntas-frecuentes" className="bg-[#14213d] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffe66d]">FAQ</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Preguntas frecuentes</h2>
          </div>

          <div className="mt-10 divide-y divide-white/12 rounded-[2rem] bg-white/7 px-5 shadow-[0_28px_90px_rgba(0,0,0,0.12)] ring-1 ring-white/12 backdrop-blur md:px-7">
            {faqs.map((faq) => (
              <article key={faq.question} className="py-6 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:py-7">
                <h3 className="text-xl font-black leading-tight tracking-tight">{faq.question}</h3>
                <p className="mt-3 leading-7 text-white/68 md:mt-0">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#17120f]/10 px-5 py-8 text-center text-sm font-bold text-[#17120f]/60 sm:px-8 lg:px-12">
        Hecho con ❤️ por Pablo
      </footer>
    </main>
  );
}
