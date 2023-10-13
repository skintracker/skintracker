import type {
	AponiaAfterRequestHandler,
	AponiaCtx,
	AponiaDecorator,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const getDateDecorator: AponiaDecorator = ["getDate", () => Date.now()];

export const getHealthcheck: AponiaRouteHandlerFn<{
	status: string;
	timestamp: number;
}> = (ctx: AponiaCtx) => {
	const decoratedCtx = ctx as AponiaCtx & {
		getDate: () => Date;
	};
	return {
		status: "ok",
		timestamp: +decoratedCtx.getDate(),
	};
};

export const postGetHealthcheck: AponiaAfterRequestHandler = ({ set }) => {
	set.headers["Content-Type"] = "application/json";
};

export const getHealthcheckHooks: AponiaHooks = {
	afterHandle: [postGetHealthcheck],
};

export const handler: AponiaRouteHandler = {
	GET: [getHealthcheck, getHealthcheckHooks, undefined, [getDateDecorator]],
};
