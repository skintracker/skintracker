import Divider from "@/components/divider";
import { Link } from "@/components/link";
import { setHTMLAsContentType } from "@/hooks";
import { commands } from "@/utils/commands";
import { isGoToCommand } from "@/utils/type-guards/is-go-to-command";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const searchCommands: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx,
) => {
  const searchQuery = (ctx.body as { query?: string }).query || "";
  const words = searchQuery.split(/\s+/);

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
  };
  const safeWords = words.map((word) => escapeRegExp(word));
  const regex = new RegExp(`^(?=.*${safeWords.join(")(?=.*")}).+`, "i");
  const results = Object.keys(commands)
    .filter((command) => {
      if (Bun.env.NODE_ENV === "production") {
        return !command.startsWith("Developer:");
      }
      return true;
    })
    .filter((command) => regex.test(command));

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
            <Link href={command.href} class="text-blue-600 hover:underline">
              {result}
            </Link>
          </li>
          {i < results.length - 1 ? <Divider class="my-2" /> : null}
        </>
      );
    } else {
      return (
        <>
          <li class="px-4">
            <Link
              href="#"
              hx-get={command["hx-get"]}
              hx-target="body"
              hx-swap="beforeend"
              class="text-blue-600 hover:cursor-pointer hover:underline"
              data-script="on click trigger closeCommandBar"
            >
              {result}
            </Link>
          </li>
          {i < results.length - 1 ? <Divider class="my-2" /> : null}
        </>
      );
    }
  });

  return <ul>{resultElements}</ul>;
};

export const searchCommandsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
  type: "urlencoded",
};

export const handler: AponiaRouteHandler = {
  POST: {
    fn: searchCommands,
    hooks: searchCommandsHooks,
  },
};
