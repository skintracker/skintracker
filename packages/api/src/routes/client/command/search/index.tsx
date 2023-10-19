import Divider from "@/components/divider";
import { Link } from "@/components/link";
import { commands } from "@/utils/commands";
import type {
	AponiaAfterRequestHandler,
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
	const results = Object.keys(commands).filter((command) =>
		regex.test(command),
	);

	return results.length > 0 ? (
		<ul>
			{results.map((result, i) => (
				<>
					<li>
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
		<p>No commands found.</p>
	);
};

export const postSearchCommands: AponiaAfterRequestHandler = ({
	set,
}: // biome-ignore lint/suspicious/noExplicitAny: set is of unknown type, but we don't care
any) => {
	set.headers["Content-Type"] = "text/html";
};

export const searchCommandsHooks: AponiaHooks = {
	afterHandle: [postSearchCommands],
};

export const handler: AponiaRouteHandler = {
	POST: [searchCommands, searchCommandsHooks],
};
