import Link from "next/link";
import { createGroup } from "@/app/actions/groups";
import { requireUser } from "@/lib/auth";

export default async function NewGroupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireUser();
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-[#fff7ea] px-6 py-8 text-[#17120f] md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link className="font-bold text-[#ff4f5e]" href="/dashboard">← Volver</Link>
        <div className="mt-8 rounded-[2.4rem] bg-white/82 p-6 shadow-[0_28px_80px_rgba(20,33,61,0.1)] ring-1 ring-[#17120f]/8 md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#ff4f5e]">Nuevo grupo</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">Prepara el sorteo</h1>
          {error ? <p className="mt-5 rounded-2xl bg-red-100 px-5 py-4 font-semibold text-red-800">{error}</p> : null}
          <form action={createGroup} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-bold" htmlFor="name">Nombre</label>
              <input className="mt-2 min-h-12 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 outline-none transition focus:border-[#2ec4b6]" id="name" name="name" placeholder="Navidad familia 2026" required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-bold" htmlFor="maxPrice">Precio máximo</label>
                <input className="mt-2 min-h-12 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 outline-none transition focus:border-[#2ec4b6]" id="maxPrice" name="maxPrice" min="1" step="0.01" type="number" placeholder="25" required />
              </div>
              <div>
                <label className="text-sm font-bold" htmlFor="exchangeDate">Fecha opcional</label>
                <input className="mt-2 min-h-12 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 outline-none transition focus:border-[#2ec4b6]" id="exchangeDate" name="exchangeDate" type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold" htmlFor="message">Mensaje para el grupo</label>
              <textarea className="mt-2 min-h-28 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 py-3 outline-none transition focus:border-[#2ec4b6]" id="message" name="message" placeholder="Nada de tarjetas regalo, por favor." />
            </div>
            <div>
              <label className="text-sm font-bold" htmlFor="giftSuggestions">Tus sugerencias</label>
              <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-[#17120f]/10 bg-[#fff7ea] px-4 py-3 outline-none transition focus:border-[#2ec4b6]" id="giftSuggestions" name="giftSuggestions" placeholder="Libros, café de especialidad, plantas..." />
            </div>
            <button className="w-full rounded-full bg-[#ff4f5e] px-6 py-4 font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.26)] transition hover:-translate-y-1" type="submit">Crear grupo</button>
          </form>
        </div>
      </div>
    </main>
  );
}
