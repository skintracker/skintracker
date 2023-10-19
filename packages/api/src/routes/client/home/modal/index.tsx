import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose, ModalTitle } from "@/components/modal";
import type {
	AponiaAfterRequestHandler,
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";

export const clickHomepageLogin: AponiaRouteHandlerFn<JSX.Element> = (
	_ctx: AponiaCtx,
) => {
	const closeModalEventName = "INDEX_CLOSE_MODAL";
	return (
		<Modal closeEvent={closeModalEventName}>
			<ModalTitle>Modal</ModalTitle>
			<Divider />
			<p>Modal content text!</p>
			<br />
			<br />
			<Divider />
			<ModalClose closeEvent={closeModalEventName}>
				<Button text="Close" classes="float-right" />
			</ModalClose>
		</Modal>
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
