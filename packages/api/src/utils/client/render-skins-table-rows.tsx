import { TableCell, TableRow } from "@/components/table";
import { STSkin } from "@skintracker/types/src";
import { Bitskins, DMarket, Skinport } from "../market";
import { skinToString } from "../type-conversion";

export async function renderSkinsTableRows(
  skins: STSkin[]
): Promise<JSX.Element | JSX.Element[]> {
  if (skins.length === 0) {
    return (
      <TableRow class="bg-slate-200">
        <TableCell classes="text-center text-slate-400 py-12" colspan="4">
          <p>No skins found.</p>
          <p>Add a skin using the Actions button above!</p>
        </TableCell>
      </TableRow>
    );
  }

  const start = performance.now();
  const minPricesResult = await Promise.allSettled(
    skins.map(async (skin) => ({
      bitskins: await Bitskins.getMinPrice(skin),
      dmarket: await DMarket.getMinPrice(skin),
      skinport: await Skinport.getMinPrice(skin),
    }))
  );
  const minPrices = minPricesResult.map((result) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        bitskins: "N/A",
        dmarket: "N/A",
        skinport: "N/A",
      };
    }
  });

  return skins.map((skin, i) => (
    <TableRow class="group odd:bg-slate-200 even:bg-slate-300 hover:bg-slate-400 hover:cursor-pointer">
      <TableCell>{skinToString({ skin })}</TableCell>
      <TableCell classes="hidden md:table-cell group-odd:bg-red-300 group-even:bg-red-400">
        {minPrices[i].bitskins}
      </TableCell>
      <TableCell classes="hidden md:table-cell group-odd:bg-green-300 group-even:bg-green-400">
        {minPrices[i].dmarket}
      </TableCell>
      <TableCell classes="hidden md:table-cell group-odd:bg-blue-300 group-even:bg-blue-400">
        {minPrices[i].skinport}
      </TableCell>
    </TableRow>
  ));
}
