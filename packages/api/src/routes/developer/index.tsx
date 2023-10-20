import Button from "@/components/button";
import Divider from "@/components/divider";
import {
	deriveSentryTransaction,
	finishSentryTransaction,
	setHTMLAsContentType,
} from "@/hooks";
import BaseLayout from "@/layouts/base";
import { JsonHighlighter } from "@/utils/client";
import { captureException } from "@/utils/sentry";
import type {
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";
import { getHealthcheck } from "../api/healthcheck";

export const getDeveloper: AponiaRouteHandlerFn<JSX.Element | undefined> = (
	ctx: AponiaCtx,
) => {
	// Gets the healthceck and embeds into markdown.
	if (Bun.env.NODE_ENV === "production") {
		ctx.set.status = 404;
		return;
	}
	const healthcheckRes = getHealthcheck(ctx);

	return (
		<BaseLayout title="Home">
			<div class="overflow-scroll">
				<br />
				<h1 class="text-2xl font-bold">Developer</h1>
				<br />
				<h2 class="text-xl">Healthcheck</h2>
				<Divider />
				<JsonHighlighter data={healthcheckRes} />
				<br />
				<h2 class="text-xl">HTMX Test</h2>
				<Divider />
				<Button text="Click me!" hx-post="/client/home/buttons" />
				<br />
				<br />
				<h2 class="text-xl">Modal Test</h2>
				<Divider />
				<Button
					text="Open Modal"
					hx-get="/client/home/modal"
					hx-target="body"
					hx-swap="beforeend"
				/>
			</div>
		</BaseLayout>
	);
};

export const getDeveloperHooks: AponiaHooks = {
	afterHandle: [setHTMLAsContentType, finishSentryTransaction],
};

export const handler: AponiaRouteHandler = {
	GET: {
		fn: captureException(getDeveloper),
		hooks: getDeveloperHooks,
		derivedState: [deriveSentryTransaction],
	},
};
