import Button from "@/components/button";
import Divider from "@/components/divider";
import { ModalClose } from "@/components/modal";
import { gzipEncode, setHTMLAsContentType } from "@/hooks";
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
  let phaseSelect: string | JSX.Element = "";
  if (skin.indexOf("Doppler") !== -1) {
    phaseSelect = (
      <div class="form-field grid grid-cols-2 items-center px-2 mt-2">
        <p class="text-stone-400">Phase</p>
        <select
          title="Select doppler phase"
          class="border rounded-md border-slate-300 px-2 py-1"
          name="phase"
        >
          {[1, 2, 3, 4].map((phase) => (
            <option value={`${phase}`}>Phase {phase}</option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <>
      <form
        id="add-skin-form"
        hx-post="/client/home/add-skin-modal/track"
        hx-target="#tracked-skins-table-body"
        hx-swap="innerHTML"
        data-script={`on submit trigger ${closeModalEventName}`}
      >
        <input
          id="has-skins-field"
          type="hidden"
          name="hasSkins"
          value="false"
        />
        <input type="hidden" name="skin" value={skin} />
        <input
          title={`Skin: ${skin}`}
          id="skin-input"
          type="search"
          name="skin"
          class="w-full p-4 bg-slate-200 text-black text-center rounded"
          value={skin}
          disabled
        />
        <div class="py-4">
          <div class="form-field grid grid-cols-2 items-center px-2">
            <p class="text-stone-400">Exterior</p>
            <select
              title="Select skin exterior"
              class="border rounded-md border-slate-300 px-2 py-1"
              name="exterior"
            >
              {Object.values(STSkinExterior).map((exterior) => (
                <option value={exterior}>{exterior}</option>
              ))}
            </select>
          </div>
          <div class="form-field grid grid-cols-2 items-center px-2 mt-2">
            <p class="text-stone-400">Category</p>
            <select
              title="Select skin exterior"
              class="border rounded-md border-slate-300 px-2 py-1"
              name="category"
            >
              {Object.values(STSkinCategory).map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>
          {phaseSelect}
        </div>
        <Divider />
        <div class="grid grid-cols-[70px_58px] align-center justify-center gap-2">
          <ModalClose closeEvent={closeModalEventName}>
            <Button>Cancel</Button>
          </ModalClose>
          <input
            type="submit"
            class="flex border border-solid border-slate-200 rounded p-2 bg-green-600 text-white text-center border-transparent hover:cursor-pointer"
            value="Track"
          />
        </div>
      </form>
      <script>
        {`
          window.setHasSkinsField = () => {
            const hasSkinsField = document.getElementById("has-skins-field");
            const tableBody = document.getElementById("tracked-skins-table-body");
            const hasSkins = !tableBody.children[0].innerHTML.includes("No skins found");
            if (hasSkins) {
              const form = document.getElementById("add-skin-form");
              form.setAttribute("hx-swap", "beforeend")
            }
            hasSkinsField.value = hasSkins;
          }
          window.setHasSkinsField();
        `}
      </script>
    </>
  );
};

export const getAddSkinModalDetailsHooks: AponiaHooks = {
  afterHandle: [setHTMLAsContentType, gzipEncode],
};

export const handler: AponiaRouteHandler = {
  GET: {
    fn: getAddSkinModalDetails,
    hooks: getAddSkinModalDetailsHooks,
  },
};
