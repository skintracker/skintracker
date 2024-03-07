import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose, ModalTitle } from "@/components/modal";
import { setHTMLAsContentType } from "@/hooks";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showModal: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx,
) => {
  const closeModalEventName = "DEV_CLOSE_MODAL";
  return (
    <Modal closeEvent={closeModalEventName}>
      <ModalTitle>Modal</ModalTitle>
      <Divider />
      <p>Modal content text!</p>
      <br />
      <br />
      <Divider />
      <ModalClose closeEvent={closeModalEventName}>
        <Button>Close</Button>
      </ModalClose>
    </Modal>
  );
};

export const showModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showModal,
    hooks: showModalHooks,
  },
};
