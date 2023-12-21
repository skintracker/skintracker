import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose, ModalTitle } from "@/components/modal";
import { setHTMLAsContentType } from "@/hooks";
import logger from "@/utils/logging";
import { skinToString } from "@/utils/type-conversion";
import { AponiaCtxExtended } from "@/utils/types/context";
import { getTracking } from "@/utils/user";
import type { STSkin, STUser } from "@skintracker/types/src";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const removeSkinModal: AponiaRouteHandlerFn<JSX.Element> = async (
  ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_REMOVE_SKIN_MODAL";
  const { jwt } = ctx as AponiaCtxExtended;
  const user = await jwt.verify<STUser>(ctx.cookie.auth);

  let skins: STSkin[] = [];
  try {
    const res = await getTracking(user.steamId);
    skins = res.items;
  } catch (e) {
    logger.warn(e);
  }

  const dropdownOptions = skins.map((skin) => (
    <option value={skinToString({ skin, includePhase: true })} safe>
      {skinToString({ skin, includePhase: true })}
    </option>
  ));

  return (
    <Modal closeEvent={closeModalEventName}>
      <ModalTitle center>Remove Tracked Skin</ModalTitle>
      <Divider />
      <form
        id="remove-skin-form"
        hx-post="/client/home/remove-skin-modal/remove"
        hx-target="#tracked-skins-table-body"
        hx-swap="innerHTML"
        data-script={`on submit trigger ${closeModalEventName}`}
      >
        <select
          name="skin"
          class="block mx-auto my-0 text-center border rounded-sm p-2"
        >
          {dropdownOptions}
        </select>
      </form>
      <br />
      <Divider />
      <div class="grid grid-cols-[70px_76px] align-center justify-center gap-2">
        <ModalClose closeEvent={closeModalEventName}>
          <Button text="Cancel" />
        </ModalClose>
        <input
          type="submit"
          class="border border-solid border-slate-200 rounded p-2 bg-red-500 text-white text-center border-transparent hover:cursor-pointer"
          value="Remove"
          form="remove-skin-form"
        />
      </div>
    </Modal>
  );
};

export const removeSkinModalHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: removeSkinModal,
    hooks: removeSkinModalHooks,
  },
};
