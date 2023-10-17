import Button from "@/components/button";
import Divider from "@/components/divider";
import type {
	AponiaAfterRequestHandler,
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const clickHomepageLogin: AponiaRouteHandlerFn<JSX.Element> = (
	ctx: AponiaCtx,
) => {
	return (
		<div
			id="modal"
			class="flex flex-col items-center fixed top-0 bottom-0 left-0 right-0 z-50"
			data-script="on closeModal remove me"
		>
			<div
				class="modal-underlay absolute -z-10 top-0 bottom-0 left-0 right-0 bg-slate-950/30"
				data-script="on click trigger closeModal"
			/>
			<div class="modal-content mt-6 w-4/5 max-w-xl border border-solid rounded bg-white p-2">
				<h1 class="text-xl">Modal</h1>
				<Divider />
				<p>Modal content text!</p>
				<br />
				<br />
				<Divider />
				<Button
					text="Close"
					_="on click trigger closeModal"
					classes="float-right"
				/>
			</div>
		</div>
	);
};

export const postClickHomepageLogin: AponiaAfterRequestHandler = ({
	set,
}: // biome-ignore lint/suspicious/noExplicitAny: set is of unknown type, but we don't care
any) => {
	set.headers["Content-Type"] = "text/html";
};

export const clickHomepageLoginHooks: AponiaHooks = {
	afterHandle: [postClickHomepageLogin],
};

export const handler: AponiaRouteHandler = {
	GET: [clickHomepageLogin, clickHomepageLoginHooks],
};
