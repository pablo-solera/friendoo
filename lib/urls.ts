export function getSafeRedirectPath(value: string | null, fallback = "/dashboard") {
  if (!value || !value.startsWith("/")) {
    return fallback;
  }

  if (value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }

  return value;
}
