import { redirect } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { toAppUser } from "@/lib/users";

async function getSupabaseUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getUser() {
  const user = await getSupabaseUser();

  return user ? toAppUser(user) : null;
}

export async function requireUser() {
  const user = await getSupabaseUser();

  if (!user) {
    redirect("/");
  }

  await syncProfile(user);
  return toAppUser(user);
}

export async function syncProfile(user: SupabaseUser) {
  const admin = createAdminClient();
  const metadata = user.user_metadata ?? {};

  await admin.from("profiles").upsert({
    id: user.id,
    email: user.email,
    name: metadata.full_name ?? metadata.name ?? user.email?.split("@")[0] ?? "Sin nombre",
    avatar_url: metadata.avatar_url ?? metadata.picture ?? null,
    updated_at: new Date().toISOString(),
  });
}
