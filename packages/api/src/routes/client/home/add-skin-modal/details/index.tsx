import Button from "@/components/button";
import Divider from "@/components/divider";
import { ModalClose } from "@/components/modal";
import { setHTMLAsContentType } from "@/hooks";
import { STSkinCategory, STSkinExterior } from "@skintracker/types/src";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const getAddSkinModalDetails: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx,
) => {
  const { query, set } = ctx;
  const skin = (query as { skin?: string }).skin;
  if (!skin) {
    set.status = 400;
    throw new Error("No skin provided");
  }
  const closeModalEventName = "HOME_SHOW_ADD_SKIN_MODAL";
  return (
    <>
      <form
        id="add-skin-form"
        hx-post="/client/home/add-skin-modal/track"
        hx-target="#tracked-skins-table"
        hx-swap="beforeend"
        data-script={`on submit trigger ${closeModalEventName}`}
      >
        <input type="hidden" name="skin" value={skin} />
        <input
          id="skin-input"
          type="search"
          name="skin"
          class="w-full p-4 bg-slate-200 text-black rounded"
          placeholder="Search for a skin..."
          data-script={`on keydown[key is 'Escape'] trigger ${closeModalEventName}`}
          autofocus="true"
          value={skin}
          disabled
        />
        <div class="py-4">
          <p class="text-stone-400 px-4">Exterior</p>
          <select
            title="Select skin exterior"
            class="border rounded-md border-slate-300 mx-4 px-2 py-1"
            name="exterior"
          >
            {Object.values(STSkinExterior).map((exterior) => (
              <option value={exterior}>{exterior}</option>
            ))}
          </select>
          <p class="text-stone-400 px-4 mt-2">Category</p>
          <select
            title="Select skin exterior"
            class="border rounded-md border-slate-300 mx-4 px-2 py-1"
            name="category"
          >
            {Object.values(STSkinCategory).map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <Divider />
        <div class="grid grid-cols-[70px_53px] align-center justify-center gap-2">
          <ModalClose closeEvent={closeModalEventName}>
            <Button text="Cancel" />
          </ModalClose>
          <input
            type="submit"
            class="flex border border-solid border-slate-200 rounded p-2 bg-green-600 text-white border-transparent hover:cursor-pointer"
            value="Track"
          />
        </div>
      </form>
    </>
  );
};

export const getAddSkinModalDetailsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getAddSkinModalDetails,
    hooks: getAddSkinModalDetailsHooks,
  },
};
