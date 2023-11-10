import Divider from "@/components/divider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "@/components/table";
import { setHTMLAsContentType } from "@/hooks";
import { BaseLayout } from "@/layouts/base";
import { SplashLayout } from "@/layouts/splash";
import { Bitskins, DMarket, Skinport } from "@/utils";
import { skinToString } from "@/utils/type-conversion";
import { AponiaCtxExtended } from "@/utils/types/context";
import {
  BayonetSkins,
  Gloves,
  Knife,
  M4A4Skins,
  MotoGlovesSkins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  STUser,
  Weapon,
} from "@skintracker/types/src";
import { AponiaCtx, AponiaHooks, AponiaRouteHandler } from "aponia";

export const getIndex = async (ctx: AponiaCtx) => {
  const { jwt } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(ctx.cookie.auth);

  if (!user) {
    return (
      <SplashLayout title="Home">
        <div class="py-40 bg-[linear-gradient(135deg,#6C66C9_0%,#F97C73_100%)]">
          <h1 class="text-5xl font-bold text-center text-white">
            <img
              alt="Counter-Strike 2 Logo"
              src="/public/svg/cs2.svg"
              class="w-32 mx-auto mb-4"
            />
            Skintracker is in development.
          </h1>
        </div>
        <br />
        <div class="py-2 px-8">
          <h1 class="text-2xl font-bold">What is this?</h1>
          <p>
            We're actively working on this project and are excited to provide
            details soon!
          </p>
          <br />
          <p>However, the name and logo should give you a hint 😉</p>
        </div>
      </SplashLayout>
    );
  }

  const skins: STSkin[] = [
    {
      item: Weapon.M4A4,
      name: M4A4Skins.EyeOfHorus,
      category: STSkinCategory.Normal,
      exterior: STSkinExterior.FN,
    },
    {
      item: Knife.Bayonet,
      name: BayonetSkins.Doppler,
      category: STSkinCategory.Normal,
      exterior: STSkinExterior.FN,
      phase: 1,
    },
    {
      item: Gloves.Moto,
      name: MotoGlovesSkins.Eclipse,
      category: STSkinCategory.Normal,
      exterior: STSkinExterior.MW,
    },
  ];

  // get the min price for each skin for each site
  const minPricesResult = await Promise.allSettled(
    skins.map(async (skin) => ({
      bitskins: await Bitskins.getMinPrice(skin),
      // buffmarket: await BuffMarket.getMinPrice(skin),
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
        // buffmarket: "N/A",
        dmarket: "N/A",
        skinport: "N/A",
      };
    }
  });

  const tableRows = skins.map((skin, i) => (
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

  return (
    <BaseLayout title="Home" user={user}>
      <div class="overflow-scroll">
        <br />
        <Table>
          <TableHead class="uppercase text-sm">
            <TableHeaderRow dark>
              <TableHeaderCell>Skin</TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="inline-grid grid-cols-[39px_1fr]">
                  <img
                    alt="Bitskins Logo"
                    src="/public/svg/bitskins.svg"
                    class="h-[17px] pt-[3px]"
                  />
                  <span class="text-red-400">Bitskins</span>
                </span>
              </TableHeaderCell>
              {/* <TableHeaderCell classes="hidden md:table-cell">
                <span class="text-orange-400">BUFF.Market</span>
              </TableHeaderCell> */}
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="inline-grid grid-cols-[39px_1fr]">
                  <img
                    alt="DMarket Logo"
                    src="/public/svg/dmarket.svg"
                    class="h-[17px] pt-[3px]"
                  />
                  <span class="text-green-400">DMarket</span>
                </span>
              </TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="inline-grid grid-cols-[39px_1fr]">
                  <img
                    alt="Skinport Logo"
                    src="/public/svg/skinport.svg"
                    class="h-[17px] pt-[3px]"
                  />
                  <span class="text-blue-400">Skinport</span>
                </span>
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
        <br />
        <Divider />
        <br />
        <h2 class="text-2xl font-semibold">Market Index</h2>
        <Divider />
        <div
          id="market-index-chart-container"
          class="w-full min-h-[450px] rounded"
        />
      </div>
      <script src="https://unpkg.com/lightweight-charts@4.1.0/dist/lightweight-charts.standalone.production.js" />
      <script>
        {`
          const chart = LightweightCharts.createChart('market-index-chart-container', { 
            autoSize: true,
            layout: {
              background: {
                type: 'solid',
                color: 'rgba(30, 41, 59, 1)',
              },
              lineColor: 'rgba(30, 41, 59, 1)',
              textColor: '#D9D9D9',
            },
            watermark: {
              color: 'rgba(0, 0, 0, 0)',
            },
            crosshair: {
              color: '#758696',
            },
            grid: {
              vertLines: {
                color: '#2B2B43',
              },
              horzLines: {
                color: '#363C4E',
              },
            },
          });
          const chartEl = document.getElementsByClassName('tv-lightweight-charts')[0];
          chartEl.style.borderRadius = '0.25rem';
          var areaSeries = chart.addAreaSeries({
            topColor: 'rgba(171, 71, 188, 0.56)',
            bottomColor: 'rgba(171, 71, 188, 0.04)',
            lineColor: 'rgba(171, 71, 188, 1)',
            lineWidth: 2,
            symbol: 'AAPL',
          });
          
          areaSeries.setData([
            { time: '2018-10-19', value: 75.46 },
            { time: '2018-10-22', value: 76.69 },
            { time: '2018-10-23', value: 73.82 },
            { time: '2018-10-24', value: 71.50 },
            { time: '2018-10-25', value: 72.74 },
            { time: '2018-10-26', value: 72.06 },
            { time: '2018-10-29', value: 70.56 },
            { time: '2018-10-30', value: 73.47 },
            { time: '2018-10-31', value: 72.64 },
            { time: '2018-11-01', value: 74.28 },
            { time: '2018-11-02', value: 72.86 },
            { time: '2018-11-05', value: 74.59 },
            { time: '2018-11-06', value: 75.48 },
            { time: '2018-11-07', value: 76.82 },
            { time: '2018-11-08', value: 75.57 },
            { time: '2018-11-09', value: 74.25 },
            { time: '2018-11-12', value: 74.42 },
            { time: '2018-11-13', value: 72.43 },
            { time: '2018-11-14', value: 72.51 },
            { time: '2018-11-15', value: 73.06 },
            { time: '2018-11-16', value: 73.40 },
            { time: '2018-11-19', value: 71.23 },
            { time: '2018-11-20', value: 68.18 },
            { time: '2018-11-21', value: 69.49 },
            { time: '2018-11-23', value: 67.31 },
            { time: '2018-11-26', value: 68.43 },
            { time: '2018-11-27', value: 68.09 },
            { time: '2018-11-28', value: 69.30 },
            { time: '2018-11-29', value: 69.91 },
            { time: '2018-11-30', value: 69.50 },
            { time: '2018-12-03', value: 72.42 },
            { time: '2018-12-04', value: 70.78 },
            { time: '2018-12-06', value: 69.01 },
            { time: '2018-12-07', value: 68.57 },
            { time: '2018-12-10', value: 67.67 },
            { time: '2018-12-11', value: 68.01 },
            { time: '2018-12-12', value: 68.79 },
            { time: '2018-12-13', value: 69.75 },
            { time: '2018-12-14', value: 68.20 },
            { time: '2018-12-17', value: 67.02 },
            { time: '2018-12-18', value: 64.75 },
            { time: '2018-12-19', value: 63.09 },
            { time: '2018-12-20', value: 62.19 },
            { time: '2018-12-21', value: 61.42 },
            { time: '2018-12-24', value: 60.07 },
            { time: '2018-12-26', value: 62.54 },
            { time: '2018-12-27', value: 61.67 },
            { time: '2018-12-28', value: 60.98 },
            { time: '2018-12-31', value: 61.55 },
            { time: '2019-01-02', value: 60.91 },
            { time: '2019-01-03', value: 61.15 },
            { time: '2019-01-04', value: 62.81 },
            { time: '2019-01-07', value: 62.55 },
            { time: '2019-01-08', value: 63.89 },
            { time: '2019-01-09', value: 65.45 },
            { time: '2019-01-10', value: 64.86 },
            { time: '2019-01-11', value: 63.47 },
            { time: '2019-01-14', value: 62.45 },
            { time: '2019-01-15', value: 63.45 },
            { time: '2019-01-16', value: 63.73 },
            { time: '2019-01-17', value: 63.96 },
            { time: '2019-01-18', value: 64.93 },
            { time: '2019-01-22', value: 61.83 },
            { time: '2019-01-23', value: 61.94 },
            { time: '2019-01-24', value: 63.22 },
            { time: '2019-01-25', value: 64.07 },
            { time: '2019-01-28', value: 63.20 },
            { time: '2019-01-29', value: 63.57 },
            { time: '2019-01-30', value: 64.28 },
            { time: '2019-01-31', value: 64.27 },
            { time: '2019-02-01', value: 64.63 },
            { time: '2019-02-04', value: 64.37 },
            { time: '2019-02-05', value: 64.57 },
            { time: '2019-02-06', value: 63.70 },
            { time: '2019-02-07', value: 63.41 },
            { time: '2019-02-08', value: 63.37 },
            { time: '2019-02-11', value: 62.32 },
            { time: '2019-02-12', value: 62.89 },
            { time: '2019-02-13', value: 63.72 },
            { time: '2019-02-14', value: 63.89 },
            { time: '2019-02-15', value: 64.48 },
            { time: '2019-02-19', value: 66.38 },
            { time: '2019-02-20', value: 67.38 },
            { time: '2019-02-21', value: 66.48 },
            { time: '2019-02-22', value: 67.54 },
            { time: '2019-02-25', value: 66.80 },
            { time: '2019-02-26', value: 67.26 },
            { time: '2019-02-27', value: 67.25 },
            { time: '2019-02-28', value: 65.86 },
            { time: '2019-03-01', value: 65.92 },
            { time: '2019-03-04', value: 66.04 },
            { time: '2019-03-05', value: 66.36 },
            { time: '2019-03-06', value: 65.68 },
            { time: '2019-03-07', value: 64.41 },
            { time: '2019-03-08', value: 63.72 },
            { time: '2019-03-11', value: 64.85 },
            { time: '2019-03-12', value: 64.96 },
            { time: '2019-03-13', value: 65.25 },
            { time: '2019-03-14', value: 64.90 },
            { time: '2019-03-15', value: 65.12 },
            { time: '2019-03-18', value: 66.70 },
            { time: '2019-03-19', value: 67.71 },
            { time: '2019-03-20', value: 68.60 },
            { time: '2019-03-21', value: 68.41 },
            { time: '2019-03-22', value: 66.03 },
            { time: '2019-03-25', value: 65.06 },
            { time: '2019-03-26', value: 65.31 },
            { time: '2019-03-27', value: 64.93 },
            { time: '2019-03-28', value: 65.49 },
            { time: '2019-03-29', value: 65.43 },
            { time: '2019-04-01', value: 66.66 },
            { time: '2019-04-02', value: 65.92 },
            { time: '2019-04-03', value: 65.89 },
            { time: '2019-04-04', value: 66.64 },
            { time: '2019-04-05', value: 67.28 },
            { time: '2019-04-08', value: 67.58 },
            { time: '2019-04-09', value: 67.29 },
            { time: '2019-04-10', value: 67.04 },
            { time: '2019-04-11', value: 65.80 },
            { time: '2019-04-12', value: 65.70 },
            { time: '2019-04-15', value: 64.53 },
            { time: '2019-04-16', value: 64.51 },
            { time: '2019-04-17', value: 64.01 },
            { time: '2019-04-18', value: 64.59 },
            { time: '2019-04-22', value: 65.41 },
            { time: '2019-04-23', value: 65.25 },
            { time: '2019-04-24', value: 64.45 },
            { time: '2019-04-25', value: 64.04 },
            { time: '2019-04-26', value: 63.59 },
            { time: '2019-04-29', value: 63.67 },
            { time: '2019-04-30', value: 63.29 },
            { time: '2019-05-01', value: 62.94 },
            { time: '2019-05-02', value: 61.85 },
            { time: '2019-05-03', value: 62.42 },
            { time: '2019-05-06', value: 61.93 },
            { time: '2019-05-07', value: 60.05 },
            { time: '2019-05-08', value: 60.02 },
            { time: '2019-05-09', value: 59.34 },
            { time: '2019-05-10', value: 58.94 },
            { time: '2019-05-13', value: 57.87 },
            { time: '2019-05-14', value: 59.11 },
            { time: '2019-05-15', value: 58.41 },
            { time: '2019-05-16', value: 58.90 },
            { time: '2019-05-17', value: 58.07 },
            { time: '2019-05-20', value: 58.10 },
            { time: '2019-05-21', value: 58.38 },
            { time: '2019-05-22', value: 57.85 },
            { time: '2019-05-23', value: 56.31 },
            { time: '2019-05-24', value: 57.36 },
            { time: '2019-05-28', value: 57.19 },
          ]);
        `}
      </script>
    </BaseLayout>
  );
};

export const getIndexHooks: AponiaHooks = {
  beforeHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getIndex,
    hooks: getIndexHooks,
  },
};
