import Link from "next/link";
import { joinGroupFromRoute } from "@/app/actions/groups";
import { requireUser } from "@/lib/auth";

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  await requireUser();
  const { code } = await params;
  const joinAction = joinGroupFromRoute.bind(null, code);

  return (
    <main className="grid min-h-screen place-items-center bg-[#fff7ea] px-6 py-8 text-[#17120f]">
      <div className="w-full max-w-xl rounded-[2.5rem] bg-white/82 p-8 text-center shadow-[0_32px_90px_rgba(20,33,61,0.14)] ring-1 ring-[#17120f]/8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff4f5e]">Invitación</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight">Unirte al grupo</h1>
        <p className="mt-5 text-lg text-[#17120f]/62">Vas a entrar con el código:</p>
        <p className="mt-4 rounded-2xl bg-[#ffe66d] px-5 py-4 text-3xl font-black">{decodeURIComponent(code).toUpperCase()}</p>
        <form action={joinAction} className="mt-8">
          <button className="w-full rounded-full bg-[#ff4f5e] px-6 py-4 font-black text-white shadow-[0_18px_45px_rgba(255,79,94,0.26)] transition hover:-translate-y-1" type="submit">Confirmar unión</button>
        </form>
        <Link className="mt-5 inline-flex font-bold text-[#ff4f5e]" href="/dashboard">Cancelar</Link>
      </div>
    </main>
  );
}
