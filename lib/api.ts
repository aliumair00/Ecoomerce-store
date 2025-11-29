export async function getJSON<T>(url: string) {
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as T
}

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000"