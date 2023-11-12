import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose } from "@/components/modal";
import { setHTMLAsContentType } from "@/hooks";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showAddSkinModal: AponiaRouteHandlerFn<JSX.Element> = (
  _ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_ADD_SKIN_MODAL";
  return (
    <Modal id="add-skin-modal" closeEvent={closeModalEventName}>
      <input
        id="skin-input"
        type="search"
        name="query"
        class="w-full p-4 bg-slate-200 text-black rounded"
        placeholder="Search for a skin..."
        data-script={`on keydown[key is 'Escape'] trigger ${closeModalEventName}`}
        autofocus="true"
        hx-post="/client/home/add-skin-modal/search"
        hx-trigger="keyup changed delay:300ms, search"
        hx-target="#search-skin-results"
      />
      <div id="search-skin-results" class="py-4">
        <p class="text-stone-400 px-4">Results will appear here</p>
      </div>
      <Divider />
      <div class="grid grid-cols-[70px] align-center justify-center">
        <ModalClose closeEvent={closeModalEventName}>
          <Button text="Cancel" />
        </ModalClose>
      </div>
    </Modal>
  );
};

export const showAddSkinModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: showAddSkinModal,
    hooks: showAddSkinModalHooks,
  },
};
