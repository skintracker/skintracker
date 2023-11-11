import {
  type DMarketItemsSearchResponse,
  type STSkin,
} from "@skintracker/types/src";
import httpRequestCache from "../cache";
import logger from "../logging";
import { queryParamsToString, skinToString } from "../type-conversion";
import { sign } from "tweetnacl";
import { byteArrayToHexString, hexStringToByteArray } from "../type-conversion";

function buildSignature(
  method: "GET" | "POST",
  path: string,
  body: string,
  timestamp: number,
  secretKey: string
) {
  const str = `${method}${path}${body}${timestamp}`;
  const signatureRaw = sign(
    new TextEncoder().encode(str),
    hexStringToByteArray(secretKey)
  );
  return byteArrayToHexString(signatureRaw).substring(0, 128);
}

function buildStandardHeaders(
  method: "GET" | "POST",
  path: string,
  body: string,
  timestamp: number,
  publicKey: string,
  secretKey: string
) {
  return {
    "Content-Type": "application/json",
    "X-Api-Key": publicKey,
    "X-Request-Sign": `dmar ed25519 ${buildSignature(
      method,
      path,
      body,
      timestamp,
      secretKey
    )}`,
    "X-Sign-Date": timestamp.toString(),
  };
}

// Validate API Key
// ** Not sure if we need to use public or private API key yet
export async function getMinPrice(skin: STSkin): Promise<string> {
  if (
    !Bun.env.ST_DMARKET_API_PUBLIC_KEY ||
    !Bun.env.ST_DMARKET_API_PRIVATE_KEY
  ) {
    logger.debug("DMarket API key not found");
    return "N/A";
  }

  logger.debug(
    `Fetching DMarket price for ${skinToString({ skin, includePhase: true })}`
  );
  logger.debug(`DMarket API key: ${Bun.env.ST_DMARKET_API_PUBLIC_KEY}`);

  const timestamp = Math.floor(Date.now() / 1000);
  const path = "/exchange/v1/market/items";
  const params = {
    gameId: "a8db",
    currency: "USD",
    limit: 10,
    title: `${skin.item} ${skin.name} (${skin.exterior})`,
    orderBy: "price",
    orderDir: "asc",
  };

  //* Not sure if this is correct URL yet
  const builtPath = `${path}?${queryParamsToString(params)}`;
  const requestUrl = `https://api.dmarket.com${builtPath}`;

  // Request entries of skin from DMarket
  const requestOptions: RequestInit = {
    method: "GET",
    headers: buildStandardHeaders(
      "GET",
      builtPath,
      "",
      timestamp,
      Bun.env.ST_DMARKET_API_PUBLIC_KEY,
      Bun.env.ST_DMARKET_API_PRIVATE_KEY
    ),
  };

  // Response Caching
  const cachedRes = httpRequestCache.get(requestUrl, requestOptions);
  if (cachedRes) {
    logger.debug(`Cache hit: ${JSON.stringify(cachedRes)}`);
    return cachedRes;
  }
  logger.debug(`Request options: ${JSON.stringify(requestOptions)}`);

  const response = await fetch(requestUrl, requestOptions);

  const json = await response.json<DMarketItemsSearchResponse>();
  logger.debug(`[${response.status}]: ${JSON.stringify(json)}`);

  // No results
  if (!json.objects || json.objects.length === 0) {
    return "N/A";
  }

  // Determine min price of results
  const minPriceObject = json.objects.reduce((min, current) => {
    const currentPrice = parseFloat(current.price.USD);
    const minPrice = parseFloat(min.price.USD);
    return currentPrice < minPrice ? current : min;
  }, json.objects[0]);
  const minPriceUSD = parseFloat(minPriceObject.price.USD) / 100;
  const minPriceStr = minPriceUSD ? `$${minPriceUSD.toFixed(2)}` : "N/A";
  if (minPriceStr !== "N/A") {
    httpRequestCache.add(requestUrl, requestOptions, minPriceStr);
  }
  return minPriceStr;
}
