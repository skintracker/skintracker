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
    <div class="jumbotron">
      <h1 class="jumbotron-title">
        <img
          alt="Counter-Strike 2 Logo"
          src="/public/svg/cs2.svg"
          class="jumbotron-img"
        />
        Skintracker is in development.
      </h1>
    </div>
    <br />
    <div class="splash-container">
      <h1 class="splash-header">What is this?</h1>
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
              <TableHeaderCell>Lowest Price</TableHeaderCell>
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
