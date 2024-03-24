import { DividerSpaced } from "@/components/divider";
import { Link } from "@/components/link";
import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import { commands } from "@/utils/commands";
import { isGoToCommand } from "@/utils/type-guards/is-go-to-command";
import { AponiaCtxExtended } from "@/utils/types/context";
import { STUser } from "@skintracker/types/src";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const searchCommands: AponiaRouteHandlerFn<Promise<JSX.Element>> =
  async (ctx: AponiaCtx) => {
    const { jwt, body } = ctx as AponiaCtxExtended;
    const user = await jwt.verify<STUser>(ctx.cookie.auth);
    const searchQuery = (body as { query?: string }).query || "";
    const words = searchQuery.split(/\s+/);

    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    };
    const safeWords = words.map((word) => escapeRegExp(word));
    const regex = new RegExp(`^(?=.*${safeWords.join(")(?=.*")}).+`, "i");
    let results = Object.keys(commands)
      .filter((command) => {
        if (Bun.env.NODE_ENV === "production") {
          return !command.startsWith("Developer:");
        }
        return true;
      })
      .filter((command) => regex.test(command));

    if (!user) {
      results = results.filter((command) => {
        switch (command) {
          case "Add Skin":
          case "Log Out":
          case "Remove Skin":
            return false;
          default:
            return true;
        }
      });
    } else {
      results = results.filter((command) => {
        switch (command) {
          case "Login":
            return false;
          default:
            return true;
        }
      });
    }

    if (results.length === 0) {
      return <p class="px-4">No commands found.</p>;
    }

    const sortedResults = results.sort();
    const resultElements = sortedResults.map((result, i) => {
      const command = commands[result];
      if (isGoToCommand(command)) {
        return (
          <>
            <li class="px-4">
              <Link href={command.href}>{result}</Link>
            </li>
            {i < results.length - 1 ? <DividerSpaced /> : null}
          </>
        );
      }
      return (
        <>
          <li class="px-4">
            <Link
              href="#"
              hx-get={command["hx-get"]}
              hx-target="body"
              hx-swap="beforeend"
              data-script="on click trigger closeCommandBar"
            >
              {result}
            </Link>
          </li>
          {i < results.length - 1 ? <DividerSpaced /> : null}
        </>
      );
    });

    return <ul>{resultElements}</ul>;
  };

export const searchCommandsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
  type: "urlencoded",
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: searchCommands,
    hooks: searchCommandsHooks,
  },
};
