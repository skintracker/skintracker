import { Button } from "@/components/button";
import { BaseLayout } from "@/layouts/base";
import { captureException } from "@/utils/sentry";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import { getHealthcheck } from "./api/healthcheck";
import Divider from "@/components/divider";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
	_ctx: AponiaCtx,
) => {
	const healthcheckRes = getHealthcheck(_ctx);
	return (
		<BaseLayout title="Home">
			<div>
				<h1 class="text-2xl font-semibold">Dashboard</h1>
				<h2 class="text-xl">Healthcheck</h2>
				<Divider />
				<pre>
					<code class="language-json" safe>
					{JSON.stringify(healthcheckRes)}
					</code>
				</pre>
				<br />
				<h2 class="text-xl">HTMX Test</h2>
				<Divider />
				<Button text="Click me!" htmx={{ method: 'post', route: '/client/home/buttons'}} />
			</div>
		</BaseLayout>
	);
};

export const handler: AponiaRouteHandler = {
	GET: [captureException(getIndex)],
};
