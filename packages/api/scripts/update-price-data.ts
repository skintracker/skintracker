import { getMinPrice } from "@/utils/client/render-skins-table-rows";
import { queries } from "@/utils/db";
import logger from "@/utils/logging";
import { Bitskins, DMarket, Skinport } from "@/utils/market";
import { INDEXED_SKINS_WITH_WEIGHTS } from "@/utils/market/market-index";


async function updatePriceData() {
  const minPricesResult = await Promise.allSettled(
    INDEXED_SKINS_WITH_WEIGHTS.map(async ([skin]) => ({
      bitskins: await Bitskins.getMinPrice(skin),
      dmarket: await DMarket.getMinPrice(skin),
      skinport: await Skinport.getMinPrice(skin),
    })),
  );

  const minPrices = minPricesResult.map((result) => {
    if (result.status === "fulfilled") {
      return getMinPrice(result.value);
    }
    logger.error(result);
    return {
      market: null,
      price: null,
    };
  });

  INDEXED_SKINS_WITH_WEIGHTS.map(([skin], index) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    // biome-ignore lint/suspicious/noExtraNonNullAssertion: <explanation>
    const price = (minPrices[index]?.price !== null) ? +(minPrices[index].price!) * 100 : null;
    queries.addPriceHistoryDataPoint(skin, price, minPrices[index].market);
  })
}

function main() {
  // Update price data immediately
  updatePriceData();

  // Update price data every minute
  const interval = setInterval(updatePriceData, 60000);

  // When the process is terminated, clear the interval
  process.on("SIGINT", () => {
    clearInterval(interval);
    process.exit();
  });
}

main();
