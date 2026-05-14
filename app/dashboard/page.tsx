import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { joinGroupByCode } from "@/app/actions/groups";
import { requireUser } from "@/lib/auth";
import { getDashboardGroups } from "@/lib/groups";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const user = await requireUser();
  const groups = await getDashboardGroups(user.id);
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fff7ea] px-6 py-8 text-[#17120f] md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="relative overflow-hidden rounded-[2.4rem] bg-[#14213d] p-6 text-white shadow-[0_32px_90px_rgba(20,33,61,0.18)] md:p-8">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#2ec4b6]/25 blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffe66d]">Panel</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Tus sorteos</h1>
          </div>
          <form action={signOut}>
            <button className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/18" type="submit">
              Cerrar sesión
            </button>
          </form>
          </div>
        </header>

        {error ? <p className="rounded-2xl bg-red-100 px-5 py-4 font-semibold text-red-800">{error}</p> : null}

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#ff4f5e] p-6 text-white shadow-[0_24px_70px_rgba(255,79,94,0.24)]">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white/75">Crear</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Organiza un grupo nuevo</h2>
            <p className="mt-4 text-white/82">Define precio máximo, comparte el código y espera a que todos completen sus sugerencias.</p>
            <Link className="mt-8 inline-flex rounded-full bg-[#ffe66d] px-6 py-3 font-black text-[#17120f] shadow-[0_14px_36px_rgba(255,230,109,0.28)] transition hover:-translate-y-1" href="/groups/new">
              Crear grupo
            </Link>
          </div>

          <form action={joinGroupByCode} className="rounded-[2rem] border border-[#17120f]/10 bg-white/78 p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Unirse</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">Tengo un código</h2>
            <label className="mt-6 block text-sm font-bold" htmlFor="code">Código del grupo</label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input className="min-h-12 flex-1 rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 font-bold outline-none transition focus:border-[#2ec4b6]" id="code" name="code" placeholder="FIESTA-8K3P" required />
              <button className="rounded-2xl bg-[#14213d] px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]" type="submit">Unirme</button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-black">Mis grupos</h2>
          {groups.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-[#17120f]/20 bg-white/60 p-10 text-center">
              <p className="text-lg font-bold">Todavía no participas en ningún grupo.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {groups.map((group) => (
                <Link key={group.id} className="group rounded-[2rem] bg-white/82 p-6 shadow-sm ring-1 ring-[#17120f]/8 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,33,61,0.12)]" href={`/groups/${group.id}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff4f5e]">{group.status === "drawn" ? "Sorteado" : "Preparando"}</p>
                      <h3 className="mt-3 text-3xl font-black tracking-tight">{group.name}</h3>
                    </div>
                    <span className="rounded-full bg-[#2ec4b6]/18 px-3 py-1 text-xs font-black text-[#0f766e]">{group.member_count} pers.</span>
                  </div>
                  <p className="mt-6 font-bold">Máximo {group.max_price.toFixed(2)} €</p>
                  <p className="mt-2 text-sm text-stone-500">Código {group.join_code}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
