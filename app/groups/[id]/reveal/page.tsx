import Link from "next/link";
import { RevealStage } from "@/components/reveal-stage";
import { requireUser } from "@/lib/auth";
import { getRevealForOwner } from "@/lib/groups";

export default async function RevealPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const { group, assignments } = await getRevealForOwner(id, user.id);

  return (
    <main className="min-h-screen overflow-hidden bg-[#14213d] px-6 py-8 text-white md:px-10">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#ff4f5e]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#ffe66d]/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <Link className="font-bold text-[#ffe66d]" href={`/groups/${group.id}`}>← Volver al grupo</Link>
        <header className="rounded-[3rem] border border-white/14 bg-white/7 p-8 backdrop-blur">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#ffe66d]">Ceremonia privada del organizador</p>
          <h1 className="mt-4 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.05em] md:text-8xl">La revelación de {group.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Abre los sobres uno a uno o revela toda la constelación. Solo el organizador puede ver esta pantalla completa.
          </p>
        </header>
        {assignments.length === 0 ? (
          <div className="rounded-[2rem] border border-white/14 bg-white/7 p-10 text-center">
            <p className="text-xl font-bold">Aún no hay resultados guardados.</p>
          </div>
        ) : (
          <RevealStage assignments={assignments} />
        )}
      </div>
    </main>
  );
}
