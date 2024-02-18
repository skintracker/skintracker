import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose } from "@/components/modal";
import { setHTMLAsContentType } from "@/hooks";
import { skinToString, stringToSkin } from "@/utils/type-conversion";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showSkinDetailsModal: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_SKIN_DETAILS_MODAL";
  const { headers } = ctx;

  if (!headers.skin) {
    throw new Error("Skin not found");
  }
  const skinString = decodeURIComponent(headers.skin);

  return (
    <Modal id="skin-details-modal" closeEvent={closeModalEventName}>
      <div id="skin-details" class="py-4">
        <p class="px-4" safe>
          {skinString}
        </p>
      </div>
      <p class="px-4 text-stone-400">Skin details coming soon!</p>
      <br />
      <Divider />
      <div class="grid grid-cols-[60px_70px] gap-x-2 align-center justify-center">
        <ModalClose closeEvent={closeModalEventName}>
          <Button text="Close" />
        </ModalClose>
        <input
          type="submit"
          class="flex border border-solid border-slate-200 rounded p-2 bg-red-600 text-white justify-center border-transparent hover:cursor-pointer"
          value="Delete"
        />
      </div>
    </Modal>
  );
};

export const showSkinDetailsModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showSkinDetailsModal,
    hooks: showSkinDetailsModalHooks,
  },
};
