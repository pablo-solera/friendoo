import Link from "next/link";
import { runDraw, updateGiftSuggestions } from "@/app/actions/groups";
import { CopyButton } from "@/components/copy-button";
import { requireUser } from "@/lib/auth";
import { getGroupForUser } from "@/lib/groups";

export default async function GroupPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { error, saved } = await searchParams;
  const { group, members, currentMember, assignment } = await getGroupForUser(id, user.id);
  const isOwner = group.owner_id === user.id;
  const joinUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/join/${group.join_code}`;

  return (
    <main className="min-h-screen bg-[#fff7ea] px-6 py-8 text-[#17120f] md:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link className="font-bold text-[#ff4f5e]" href="/dashboard">← Dashboard</Link>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#14213d] p-8 text-white shadow-[0_32px_90px_rgba(20,33,61,0.18)]">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#ff4f5e]/25 blur-3xl" />
            <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ffe66d]">{group.status === "drawn" ? "Sorteo realizado" : "Grupo abierto"}</p>
            <h1 className="mt-4 text-5xl font-black leading-none tracking-tight md:text-7xl">{group.name}</h1>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Precio</p>
                <p className="mt-2 text-2xl font-black">{group.max_price.toFixed(2)} €</p>
              </div>
              <div className="rounded-3xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Personas</p>
                <p className="mt-2 text-2xl font-black">{members.length}</p>
              </div>
              <div className="rounded-3xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-white/55">Fecha</p>
                <p className="mt-2 text-2xl font-black">{group.exchange_date ?? "Libre"}</p>
              </div>
            </div>
            {group.message ? <p className="mt-6 rounded-3xl bg-[#fff7ea] p-5 font-semibold text-[#17120f]">{group.message}</p> : null}
            </div>
          </div>

          <aside className="space-y-5">
            {error ? <p className="rounded-2xl bg-red-100 px-5 py-4 font-semibold text-red-800">{error}</p> : null}
            {saved ? <p className="rounded-2xl bg-green-100 px-5 py-4 font-semibold text-green-800">Sugerencias guardadas.</p> : null}

            {group.status === "draft" ? (
              <div className="rounded-[2rem] bg-[#ff9f1c] p-6 shadow-[0_22px_60px_rgba(255,159,28,0.18)]">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#17120f]/70">Código compartible</p>
                <p className="mt-4 rounded-2xl bg-[#fff7ea] px-4 py-3 text-3xl font-black tracking-tight text-[#17120f]">{group.join_code}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CopyButton value={group.join_code} label="Copiar código" />
                  <CopyButton value={joinUrl} label="Copiar enlace" />
                </div>
              </div>
            ) : null}

            {assignment ? (
              <div className="rounded-[2rem] bg-white/82 p-6 shadow-sm ring-1 ring-[#17120f]/8">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Tu resultado</p>
                <p className="mt-4 text-2xl font-black">Te toca regalar a {assignment.receiver.name}</p>
              </div>
            ) : null}

            {isOwner && group.status === "draft" ? (
              <form action={runDraw} className="rounded-[2rem] bg-white/82 p-6 shadow-sm ring-1 ring-[#17120f]/8">
                <input type="hidden" name="groupId" value={group.id} />
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Organizador</p>
                <p className="mt-3 text-[#17120f]/62">Cuando todos estén dentro, lanza el sorteo. Se enviará un email a cada participante.</p>
                <button className="mt-5 w-full rounded-full bg-[#ff4f5e] px-5 py-4 font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.24)] transition hover:-translate-y-1 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#17120f]/25 disabled:shadow-none" disabled={members.length < 3} type="submit">
                  Realizar sorteo
                </button>
              </form>
            ) : null}

            {isOwner && group.status === "drawn" ? (
              <Link className="block rounded-[2rem] bg-[#ffe66d] p-6 text-center text-xl font-black text-[#17120f] shadow-[0_22px_60px_rgba(255,230,109,0.24)] transition hover:-translate-y-1" href={`/groups/${group.id}/reveal`}>
                Abrir revelación extraordinaria
              </Link>
            ) : null}
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form action={updateGiftSuggestions} className="rounded-[2rem] bg-white/82 p-6 shadow-sm ring-1 ring-[#17120f]/8">
            <input type="hidden" name="groupId" value={group.id} />
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Tus ideas</p>
            <h2 className="mt-3 text-3xl font-black">Sugerencias de regalo</h2>
            <textarea
              className="mt-5 min-h-40 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 py-3 outline-none transition focus:border-[#2ec4b6]"
              defaultValue={currentMember?.gift_suggestions ?? ""}
              name="giftSuggestions"
              placeholder="Cuanto más concreto, mejor: tallas, gustos, tiendas, no-goes..."
            />
            <button className="mt-4 rounded-full bg-[#14213d] px-5 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#1d315a]" type="submit">Guardar sugerencias</button>
          </form>

          <div className="rounded-[2rem] bg-white/78 p-6 ring-1 ring-[#17120f]/8">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Participantes</p>
            <div className="mt-5 grid gap-3">
              {members.map((member) => (
                <div key={member.user_id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-[#17120f]/5">
                  <div>
                    <p className="font-black">{member.profile.name}</p>
                    <p className="text-sm text-[#17120f]/50">{member.role === "owner" ? "Organizador" : "Participante"}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${member.gift_suggestions ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                    {member.gift_suggestions ? "Con sugerencias" : "Pendiente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
