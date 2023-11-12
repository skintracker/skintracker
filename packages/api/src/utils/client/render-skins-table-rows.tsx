import { STSkin } from "@skintracker/types/src";
import { Bitskins, DMarket, Skinport } from "../market";
import { TableCell, TableRow } from "@/components/table";
import { skinToString } from "../type-conversion";

export async function renderSkinsTableRows(
  skins: STSkin[],
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

  const minPricesResult = await Promise.allSettled(
    skins.map(async (skin) => ({
      bitskins: await Bitskins.getMinPrice(skin),
      // buffmarket: await BuffMarket.getMinPrice(skin),
      dmarket: await DMarket.getMinPrice(skin),
      skinport: await Skinport.getMinPrice(skin),
    })),
  );
  const minPrices = minPricesResult.map((result) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        bitskins: "N/A",
        // buffmarket: "N/A",
        dmarket: "N/A",
        skinport: "N/A",
      };
    }
  });

  return skins.map((skin, i) => (
    <TableRow class="odd:bg-slate-200 even:bg-slate-300 hover:bg-slate-400 hover:cursor-pointer">
      <TableCell>{skinToString({ skin })}</TableCell>
      <TableCell
        classes={`hidden md:table-cell ${
          i % 2 === 1 ? "bg-red-400" : "bg-red-300"
        }`}
      >
        {minPrices[i].bitskins}
      </TableCell>
      {/* <TableCell
                classes={`hidden md:table-cell ${
                  i % 2 === 1 ? "bg-orange-400" : "bg-orange-300"
                }`}
              >
                {minPrices[i].buffmarket}
              </TableCell> */}
      <TableCell
        classes={`hidden md:table-cell ${
          i % 2 === 1 ? "bg-green-400" : "bg-green-300"
        }`}
      >
        {minPrices[i].dmarket}
      </TableCell>
      <TableCell
        classes={`hidden md:table-cell ${
          i % 2 === 1 ? "bg-blue-400" : "bg-blue-300"
        }`}
      >
        {minPrices[i].skinport}
      </TableCell>
    </TableRow>
  ));
}
