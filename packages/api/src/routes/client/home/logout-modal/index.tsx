import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose, ModalTitle } from "@/components/modal";
import { gzipEncode, setHTMLAsContentType } from "@/hooks";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showLogoutModal: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_LOGOUT_CLOSE_MODAL";
  return (
    <Modal closeEvent={closeModalEventName}>
      <ModalTitle center>Account Logout</ModalTitle>
      <Divider />
      <p class="text-center">Are you sure you want to log out?</p>
      <br />
      <Divider />
      <div class="grid grid-cols-[70px_75px] align-center justify-center gap-2">
        <ModalClose closeEvent={closeModalEventName}>
          <Button>Cancel</Button>
        </ModalClose>
        <ModalClose closeEvent={closeModalEventName}>
          <button
            class="flex border border-solid border-slate-200 rounded p-2 bg-red-600 text-white border-transparent"
            type="submit"
            onclick="window.location.href = '/logout'"
          >
            Log out
          </button>
        </ModalClose>
      </div>
    </Modal>
  );
};

export const showLogoutModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showLogoutModal,
    hooks: showLogoutModalHooks,
  },
};
