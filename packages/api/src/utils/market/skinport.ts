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
  logger.debug(`[${response.status}]: ${JSON.stringify(json)}`);
  return json;
}

// Get min price from response
export async function getMinPrice(skin: STSkin): Promise<string> {
  const cacheKey = `min-price-${skinToString({ skin })}`;

  // Check cache first
  const cachedMinPrice = httpRequestCache.get(cacheKey, {});
  if (cachedMinPrice) {
    logger.info(`Cache hit for min price: ${cachedMinPrice}`);
    return cachedMinPrice;
  }

  const minPrice = (
    await getPrices(
      Bun.env.ST_SKINPORT_CLIENT_ID,
      Bun.env.ST_SKINPORT_API_SECRET
    )
  ).filter((item) => item.market_hash_name === skinToString({ skin }))[0]
    ?.min_price;

  if (!minPrice) {
    return "N/A";
  } else {
    const formattedMinPrice = `$${minPrice.toFixed(2).toString()}`;
    httpRequestCache.add(cacheKey, {}, formattedMinPrice);
    return formattedMinPrice;
  }
}
