import { Button } from "@/components/button";
import Divider from "@/components/divider";
import { BaseLayout } from "@/layouts/base";
import { captureException } from "@/utils/sentry";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import { getHealthcheck } from "./api/healthcheck";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "@/components/table";
import {
  BayonetSkins,
  Knife,
  M4A4Skins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  Weapon,
} from "@skintracker/types/src";
import { skinToString } from "@/utils/type-conversion";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx
) => {
  // Gets the healthceck and embeds into markdown.
  const healthcheckRes = getHealthcheck(_ctx);
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
    },
  ];
  return (
    <BaseLayout title="Home">
      <div class="overflow-scroll">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <br />
        <h2 class="text-xl">Tracking</h2>
        <Divider />
        <Table>
          <TableHead>
            <TableHeaderRow>
              <TableHeaderCell>Skin</TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="text-red-700">Bitskins</span>
              </TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="text-orange-700">BUFF.Market</span>
              </TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="text-green-700">DMarket</span>
              </TableHeaderCell>
              <TableHeaderCell classes="hidden md:table-cell">
                <span class="text-blue-700">Skinport</span>
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHead>
          <TableBody>
            {skins.map((skin) => (
              <TableRow>
                <TableCell>{skinToString(skin)}</TableCell>
                <TableCell classes="hidden md:table-cell">$20.50</TableCell>
                <TableCell classes="hidden md:table-cell">$10,000.23</TableCell>
                <TableCell classes="hidden md:table-cell">
                  <span class="text-green-500">$0.69</span>
                </TableCell>
                <TableCell classes="hidden md:table-cell">N/A</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <br />
        <h2 class="text-xl">Healthcheck</h2>
        <Divider />
        <pre>
          <code class="language-json" safe>
            {JSON.stringify(healthcheckRes)}
          </code>
        </pre>
        <br />
        <h2 class="text-xl">HTMX Test</h2>
        <Divider />
        <Button text="Click me!" hx-post="/client/home/buttons" />
        <br />
        <br />
        <h2 class="text-xl">Modal Test</h2>
        <Divider />
        <Button
          text="Open Modal"
          hx-get="/client/home/modal"
          hx-target="body"
          hx-swap="beforeend"
        />
      </div>
    </BaseLayout>
  );
};

export const handler: AponiaRouteHandler = {
  GET: [captureException(getIndex)],
};
