import { TableCell, TableRow } from "@/components/table";
import { STSkin } from "@skintracker/types/src";
import logger from "../logging";
import { Bitskins, DMarket, Skinport } from "../market";
import { skinToString } from "../type-conversion";
import { renderSkinPhaseTag } from "./render-skin-phase-tag";

export function getMinPrice(prices: {
  bitskins: string;
  dmarket: string;
  skinport: string;
}) {
  let lowestPrice = {
    price: Number.MAX_SAFE_INTEGER,
    market: "N/A",
  };
  for (const market in prices) {
    const priceStr = (prices as Record<string, string>)[market];
    if (priceStr === "N/A") {
      continue;
    }
    const price = parseFloat(priceStr.substring(1));
    if (lowestPrice.price > price) {
      lowestPrice = { price, market };
    }
  }
  return {
    price: lowestPrice.price === -1 ? "N/A" : lowestPrice.price.toFixed(2),
    market: lowestPrice.market,
  };
}

export async function renderSkinsTableRows(
  skins: STSkin[],
): Promise<JSX.Element | JSX.Element[]> {
  if (skins.length === 0) {
    return (
      <TableRow class="bg-slate-200">
        <TableCell classes="text-center text-slate-400 py-12" colspan="2">
          <p>No skins found.</p>
          <p>Add a skin using the Actions button above!</p>
        </TableCell>
      </TableRow>
    );
  }

  const minPricesResult = await Promise.allSettled(
    skins.map(async (skin) => ({
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
      market: "N/A",
      price: "N/A",
    };
  });

  return skins.map((skin, i) => {
    const skinString = skinToString({ skin });
    const price =
      minPrices[i].price === "N/A" ? "N/A" : `$${minPrices[i].price}`;
    return (
      <TableRow
        class="group odd:bg-slate-200 even:bg-slate-300 hover:bg-slate-400 hover:cursor-pointer"
        hx-trigger="click"
        hx-get="/client/home/skin-details-modal"
        hx-headers={`js:{'skin': '${skinString}'}`}
        hx-target="body"
        hx-swap="beforeend"
      >
        <TableCell>
          {Html.escapeHtml(skinString)}
          {renderSkinPhaseTag(skin)}
        </TableCell>
        <TableCell>
          <span class="inline-grid grid-cols-[21px_1fr_1fr] gap-x-1">
            <img
              alt={
                minPrices[i].market !== "N/A"
                  ? `${minPrices[i].market} Logo`
                  : "Question mark icon"
              }
              src={`/public/svg/${
                minPrices[i].market !== "N/A"
                  ? minPrices[i].market.toLowerCase()
                  : "questionmark"
              }.svg`}
              class="h-[17px] pt-[3px]"
            />
            <span safe>{price}</span>
            {minPrices[i].market === "skinport" &&
              skinString.indexOf("Doppler") > 0 && (
                <img
                  class="h-[19px] pt-[3px]"
                  src="/public/svg/warning.svg"
                  alt="Warning icon"
                />
              )}
          </span>
        </TableCell>
      </TableRow>
    );
  });
}
