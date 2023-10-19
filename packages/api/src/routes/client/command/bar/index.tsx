import { CommandBar } from "@/components/command-bar";
import type {
	AponiaAfterRequestHandler,
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const showCommandBar: AponiaRouteHandlerFn<JSX.Element> = (
	_ctx: AponiaCtx,
) => {
	return <CommandBar />;
};

export const postShowCommandBar: AponiaAfterRequestHandler = ({
	set,
}: // biome-ignore lint/suspicious/noExplicitAny: set is of unknown type, but we don't care
any) => {
	set.headers["Content-Type"] = "text/html";
};

export const showCommandBarHooks: AponiaHooks = {
	afterHandle: [postShowCommandBar],
};

export const handler: AponiaRouteHandler = {
	GET: [showCommandBar, showCommandBarHooks],
};
