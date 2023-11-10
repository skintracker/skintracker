import httpRequestCache from "../cache";

export interface SteamPlayer {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
}

export interface SteamGetPlayerSummariesResponse {
  response: {
    players: SteamPlayer[];
  };
}

export async function getPlayerSummaries(steamId64: string) {
  if (!Bun.env.ST_STEAM_API_KEY) throw new Error("ST_STEAM_API_KEY is not set");
  const url = new URL(
    "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
  );
  url.searchParams.append("key", Bun.env.ST_STEAM_API_KEY);
  url.searchParams.append("steamids", steamId64);

  const cachedRes = httpRequestCache.get(url.toString(), {});
  if (cachedRes) return cachedRes as SteamGetPlayerSummariesResponse;
  const res = await fetch(url);
  const data = await res.json<SteamGetPlayerSummariesResponse>();

  if (data.response.players.length !== 0)
    httpRequestCache.add(url.toString(), {}, data);
  return data;
}
