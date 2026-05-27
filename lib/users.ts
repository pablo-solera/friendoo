import type { User as SupabaseUser } from "@supabase/supabase-js";

export type AppUser = {
  id: string;
  email: string | null;
  name: string;
  avatarUrl: string | null;
};

export function toAppUser(user: SupabaseUser): AppUser {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? null,
    name: getMetadataString(metadata.full_name) ?? getMetadataString(metadata.name) ?? user.email?.split("@")[0] ?? "Sin nombre",
    avatarUrl: getMetadataString(metadata.avatar_url) ?? getMetadataString(metadata.picture) ?? null,
  };
}

export function getUserInitials(user: AppUser) {
  return user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getMetadataString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}
