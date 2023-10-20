export type Cookie = unknown & { name: string; value: string };

export function cookiesToString(cookies: Cookie[]): string {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
}
