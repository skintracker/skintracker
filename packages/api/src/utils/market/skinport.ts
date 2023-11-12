import { STSkin, SkinportSearchResponse } from "@skintracker/types/src";
import { queryParamsToString, skinToString } from "../type-conversion";
import logger from "../logging";
import httpRequestCache from "../cache";

const host = "api.skinport.com/v1";

function buildStandardHeaders(id: string, secret: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
  };
}

async function getPrices(
  id?: string,
  secret?: string
): Promise<SkinportSearchResponse> {
  if (!id || !secret) {
    throw new Error("Must provide a Skinport login token!");
  }
  const headers = buildStandardHeaders(id, secret);
  const params = {
    currency: "USD",
    // market_hash_name: skinToString(skin),
  };
  const requestOptions: RequestInit = {
    method: "GET",
    headers: headers,
  };
  const requestUrl = `https://${host}/items?${queryParamsToString(params)}`;
  const response = await fetch(requestUrl, requestOptions);
  const json = await response.json<SkinportSearchResponse>();
  logger.info(`[${response.status}]: ${JSON.stringify(json)}`);
  return json;
}

// Cache Response
// const cachedRes = httpRequestCache.get(requestUrl, requestOptions);
// if (cachedRes) {
//   logger.debug(`Cache hit: ${JSON.stringify(cachedRes)}`);
//   return cachedRes;
// }

// Get min price from response
export async function getMinPrice(skin: STSkin): Promise<string> {
  const minPrice = (
    await getPrices(
      Bun.env.ST_SKINPORT_CLIENT_ID,
      Bun.env.ST_SKINPORT_API_SECRET
    )
  ).filter((item) => item.market_hash_name === skinToString({ skin }))[0]
    ?.min_price;
  return `$${minPrice.toFixed(2).toString()}`;
}
