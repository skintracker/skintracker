import type { BitskinsSearchResponse, STSkin } from "@skintracker/types/src";
import httpRequestCache from "../cache";
import logger from "../logging";
import { skinToString } from "../type-conversion";

export async function getMinPrice(skin: STSkin): Promise<string> {
  if (!Bun.env.ST_BITSKINS_API_KEY) {
    logger.warn("Bitskins API key not found");
    return "N/A";
  }

  logger.debug(
    `Fetching Bitskins price for ${skinToString({ skin, includePhase: true })}`,
  );
  logger.debug(`Bitskins API key: ${Bun.env.ST_BITSKINS_API_KEY}`);

  const requestUrl = "https://api.bitskins.com/market/search/730";

  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-apikey": Bun.env.ST_BITSKINS_API_KEY,
    },
    body: JSON.stringify({
      limit: 10,
      offset: 0,
      order: [
        {
          field: "price",
          order: "ASC",
        },
      ],
      where: {
        name: skinToString({ skin, includePhase: true }),
      },
    }),
  };
  const cachedRes = httpRequestCache.get(requestUrl, requestOptions);
  if (cachedRes) {
    logger.debug(`Cache hit: ${JSON.stringify(cachedRes)}`);
    return cachedRes;
  }
  logger.debug(`Request options: ${JSON.stringify(requestOptions)}`);

  const response = await fetch(
    "https://api.bitskins.com/market/search/730",
    requestOptions,
  );
  const json = await response.json<BitskinsSearchResponse>();
  logger.debug(`[${response.status}]: ${JSON.stringify(json)}`);

  if (!json.list) {
    return "N/A";
  }
  const minPrice = json.list[0]?.price / 1000;
  const minPriceStr = minPrice ? `$${minPrice.toFixed(2)}` : "N/A";
  httpRequestCache.add(requestUrl, requestOptions, minPriceStr);
  return minPriceStr;
}
