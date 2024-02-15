import Divider from "@/components/divider";
import { Skeleton } from "@/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from "@/components/table";
import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import { BaseLayout } from "@/layouts/base";
import { SplashLayout } from "@/layouts/splash";
import type { AponiaCtxExtended } from "@/utils/types/context";
import type { STUser } from "@skintracker/types/src";
import type { AponiaCtx, AponiaHooks, AponiaRouteHandler } from "aponia";

const SPLASH = (
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
      <br />
    </div>
  </SplashLayout>
);

export const getIndex = async (ctx: AponiaCtx) => {
  const { cookie, jwt } = ctx as AponiaCtxExtended;

  if (!cookie.auth) return SPLASH;

  const user = await jwt.verify<STUser>(cookie.auth);

  if (!user) return SPLASH;

  return (
    <BaseLayout title="Home" user={user}>
      <div class="overflow-scroll">
        <br />
        <Table id="tracked-skins-table">
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
          <TableBody
            id="tracked-skins-table-body"
            hx-get="/client/home/table-rows"
            hx-trigger="load"
            hx-swap="innerHTML"
          >
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <Divider />
      </div>
    </BaseLayout>
  );
};

export const getIndexHooks: AponiaHooks = {
  beforeHandle: [setHTMLAsContentType],
  afterHandle: [gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getIndex,
    hooks: getIndexHooks,
  },
};
