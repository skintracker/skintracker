import Divider from "@/components/divider";
import { Link } from "@/components/link";
import { setHTMLAsContentType } from "@/hooks";
import { commands } from "@/utils/commands";
import { captureException } from "@/utils/sentry";
import type {
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const searchCommands: AponiaRouteHandlerFn<JSX.Element> = (
	_ctx: AponiaCtx,
) => {
	const searchQuery = (_ctx.body as { query: string }).query;
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

	return results.length > 0 ? (
		<ul>
			{results.sort().map((result, i) => (
				<>
					<li class="px-4">
						<Link
							href={commands[result as keyof typeof commands]}
							class="text-blue-600"
						>
							{result}
						</Link>
					</li>
					{i < results.length - 1 ? <Divider class="my-2" /> : null}
				</>
			))}
		</ul>
	) : (
		<p class="px-4">No commands found.</p>
	);
};

export const searchCommandsHooks: AponiaHooks = {
	afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
	POST: [captureException(searchCommands), searchCommandsHooks],
};