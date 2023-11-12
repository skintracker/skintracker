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

export const showLogoutModal: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_REMOVE_SKIN_MODAL";
  return (
    <Modal closeEvent={closeModalEventName}>
      <ModalTitle center>Remove Tracked Skin</ModalTitle>
      <Divider />
      <p class="text-center">Not implemented.</p>
      <br />
      <Divider />
      <div class="grid grid-cols-[70px_70px] align-center justify-center gap-2">
        <ModalClose closeEvent={closeModalEventName}>
          <Button text="Cancel" />
        </ModalClose>
      </div>
    </Modal>
  );
};

export const showLogoutModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showLogoutModal,
    hooks: showLogoutModalHooks,
  },
};
