import { Protocol } from 'puppeteer';

export type Cookie = Protocol.Network.Cookie;

export function cookiesToString(cookies: Cookie[]) {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}
