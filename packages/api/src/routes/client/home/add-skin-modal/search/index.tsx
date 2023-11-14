import Divider from "@/components/divider";
import { Link } from "@/components/link";
import { setHTMLAsContentType } from "@/hooks";
import {
  ALL_SUPPORTED_WEAPONS,
  ALL_SUPPORTED_WEAPON_SKIN_STRINGS,
} from "@/utils/skins";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const searchSkins: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx,
) => {
  const searchQuery = (ctx.body as { query?: string }).query || "";
  const words = searchQuery.split(/\s+/);

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };
  const safeWords = words.map((word) => escapeRegExp(word));
  const regex = new RegExp(`^(?=.*${safeWords.join(")(?=.*")}).+`, "i");
  const results = ALL_SUPPORTED_WEAPON_SKIN_STRINGS.filter((skin) => {
    if (Bun.env.NODE_ENV === "production") {
      return !skin.startsWith("Developer:");
    }
    return true;
  }).filter((skin) => regex.test(skin));

  if (results.length === 0) {
    return <p class="px-4">No commands found.</p>;
  }

  const sortedResults = results.sort();
  const constrainedResults =
    sortedResults.length >= 10 ? sortedResults.slice(0, 10) : sortedResults;
  const resultElements = constrainedResults.map((result, i) => {
    const urlEncodedResult = encodeURIComponent(result);
    return (
      <>
        <li class="px-4">
          <Link
            href="#"
            class="text-blue-600 hover:underline"
            hx-get={`/client/home/add-skin-modal/details?skin=${urlEncodedResult}`}
            hx-target="#add-skin-modal-content"
            hx-swap="innerHTML"
          >
            {result}
          </Link>
        </li>
        {i < constrainedResults.length - 1 ? <Divider class="my-2" /> : null}
      </>
    );
  });

  return <ul>{resultElements}</ul>;
};

export const searchSkinsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
  type: "urlencoded",
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: searchSkins,
    hooks: searchSkinsHooks,
  },
};
