import type { STUser } from "@skintracker/types/src";
import type {
	AponiaCtx,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const getUser: AponiaRouteHandlerFn<STUser> = (ctx: AponiaCtx) => {
	const { id } = ctx.params;
	return { steamid: id, tracking: [] };
};

export const handler: AponiaRouteHandler = {
	GET: [getUser],
};
