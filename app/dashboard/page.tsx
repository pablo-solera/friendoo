import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { joinGroupByCode } from "@/app/actions/groups";
import { CopyButton } from "@/components/copy-button";
import { SubmitButton } from "@/components/submit-button";
import { requireUser } from "@/lib/auth";
import { getDashboardGroups } from "@/lib/groups";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const user = await requireUser();
  const groups = await getDashboardGroups(user.id);
  const { error } = await searchParams;
  const preparingGroups = groups.filter((group) => group.status === "draft").length;
  const drawnGroups = groups.length - preparingGroups;
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0] ??
    "Friendoo";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ??
    (user.user_metadata?.picture as string | undefined) ??
    null;
  const initials = getInitials(displayName);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7ea] px-5 py-6 text-[#17120f] sm:px-8 md:py-8 lg:px-10">
      <div className="festival-glow fixed inset-0 -z-10" />
      <div className="mx-auto max-w-7xl space-y-7">
        <header className="rounded-[2rem] border border-[#17120f]/10 bg-white/78 p-5 shadow-sm backdrop-blur md:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Dashboard</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-4xl">Hola, {displayName}</h1>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="grid size-11 place-items-center overflow-hidden rounded-full bg-[#14213d] bg-cover bg-center text-sm font-black text-[#ffe66d] shadow-[0_12px_28px_rgba(20,33,61,0.16)]"
                aria-label={`Avatar de ${displayName}`}
                style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
              >
                {avatarUrl ? null : initials}
              </div>
              <form action={signOut}>
                <SubmitButton className="rounded-full border border-[#17120f]/10 bg-[#14213d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a] disabled:cursor-not-allowed disabled:opacity-60" pendingLabel="Cerrando...">
                  Cerrar sesión
                </SubmitButton>
              </form>
            </div>
          </div>
        </header>

        {error ? <p className="rounded-2xl bg-red-100 px-5 py-4 font-semibold text-red-800">{error}</p> : null}

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="relative overflow-hidden rounded-[2rem] bg-[#ff4f5e] p-6 text-white shadow-[0_24px_70px_rgba(255,79,94,0.24)] md:p-7">
            <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-[#ffe66d]/25 blur-2xl" />
            <div className="relative">
              <h2 className="max-w-md text-3xl font-black leading-tight md:text-4xl">Crea un grupo y comparte la invitación</h2>
              <p className="mt-4 max-w-xl text-white/82">Define precio, fecha y mensaje. Friendoo preparará el código para que todos entren y añadan sus ideas.</p>
              <Link className="mt-7 inline-flex rounded-full bg-[#ffe66d] px-6 py-3 font-black text-[#17120f] shadow-[0_14px_36px_rgba(255,230,109,0.28)] transition hover:-translate-y-1" href="/groups/new">
                Crear grupo nuevo
              </Link>
            </div>
          </article>

          <form action={joinGroupByCode} className="rounded-[2rem] border border-[#17120f]/10 bg-white/82 p-6 shadow-sm md:p-7">
            <h2 className="text-3xl font-black leading-tight">Únete con un código</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#17120f]/58">Pega el código que te han enviado. Si ya perteneces al grupo, te llevaremos directamente a su pantalla.</p>
            <label className="mt-6 block text-sm font-bold" htmlFor="code">Código del grupo</label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input className="min-h-12 flex-1 rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 font-black uppercase tracking-[0.08em] outline-none transition placeholder:font-bold placeholder:tracking-normal focus:border-[#2ec4b6]" id="code" name="code" placeholder="FIESTA-8K3P" required />
              <SubmitButton className="rounded-2xl bg-[#14213d] px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a] disabled:cursor-not-allowed disabled:opacity-60" pendingLabel="Uniendo...">Unirme</SubmitButton>
            </div>
          </form>
        </section>

        <section className="rounded-[2.2rem] bg-white/62 p-4 ring-1 ring-[#17120f]/8 backdrop-blur md:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">Mis grupos</h2>
            </div>
            {groups.length > 0 ? (
              <p className="rounded-full bg-[#14213d]/8 px-4 py-2 text-sm font-black text-[#14213d]">
                {drawnGroups} sorteado{drawnGroups === 1 ? "" : "s"} · {preparingGroups} en preparación
              </p>
            ) : null}
          </div>

          {groups.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-[#17120f]/18 bg-[#fff7ea] p-8 text-center md:p-12">
              <p className="mx-auto grid size-14 place-items-center rounded-full bg-[#ffe66d] text-2xl font-black">F</p>
              <h3 className="mt-5 text-3xl font-black tracking-tight">Todavía no tienes grupos</h3>
              <p className="mx-auto mt-3 max-w-md text-[#17120f]/62">Crea tu primer sorteo o únete con un código para empezar a organizar el amigo invisible.</p>
              <Link className="mt-7 inline-flex rounded-full bg-[#ff4f5e] px-6 py-3 font-black text-white shadow-[0_16px_36px_rgba(255,79,94,0.24)] transition hover:-translate-y-1" href="/groups/new">
                Crear mi primer grupo
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {groups.map((group) => (
                <article key={group.id} className="rounded-[1.65rem] bg-white/92 p-5 shadow-sm ring-1 ring-[#17120f]/8 transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(20,33,61,0.1)]">
                  <Link className="group block" href={`/groups/${group.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-black leading-none tracking-tight transition group-hover:text-[#ff4f5e]">{group.name}</h3>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${group.status === "drawn" ? "bg-[#2ec4b6]/18 text-[#0f766e]" : "bg-[#ff9f1c]/18 text-[#9a3412]"}`}>
                        {group.status === "drawn" ? "Sorteado" : "Preparando"}
                      </span>
                    </div>

                    <dl className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#fff7ea] p-4 text-sm">
                      <div>
                        <dt className="font-black text-[#17120f]/42">Personas</dt>
                        <dd className="mt-1 font-black">{group.member_count}</dd>
                      </div>
                      <div>
                        <dt className="font-black text-[#17120f]/42">Máximo</dt>
                        <dd className="mt-1 font-black">{group.max_price.toFixed(2)} €</dd>
                      </div>
                      <div>
                        <dt className="font-black text-[#17120f]/42">Fecha</dt>
                        <dd className="mt-1 font-black">{group.exchange_date ?? "Libre"}</dd>
                      </div>
                    </dl>
                  </Link>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#17120f]/8 bg-white px-4 py-3">
                    <div className="min-w-0">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#17120f]/42">Código</p>
                      <p className="mt-1 truncate font-mono text-sm font-black tracking-[0.08em] text-[#17120f]">{group.join_code}</p>
                    </div>
                    <CopyButton
                      className="shrink-0 rounded-full bg-[#14213d] px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]"
                      label="Copiar"
                      value={group.join_code}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
