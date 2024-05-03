import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose } from "@/components/modal";
import { Table, TableBody, TableCell, TableRow } from "@/components/table";
import { setHTMLAsContentType } from "@/hooks";
import { renderSkinPhaseTag } from "@/utils/client/render-skin-phase-tag";
import { Bitskins, DMarket, Skinport } from "@/utils/market";
import { skinToString, stringToSkin } from "@/utils/type-conversion";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showSkinDetailsModal: AponiaRouteHandlerFn<JSX.Element> = async (
  ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_HIDE_SKIN_DETAILS_MODAL";
  const { headers } = ctx;

  if (!headers.skin) {
    throw new Error("Skin not found");
  }
  const skinString = decodeURIComponent(headers.skin);
  const skin = stringToSkin(skinString);
  const phase = headers.phase
    ? (parseInt(headers.phase) as 1 | 2 | 3 | 4)
    : undefined;
  skin.phase = phase;

  const prices = {
    bitskins: await Bitskins.getMinPrice(skin).catch((e) => "N/A"),
    dmarket: await DMarket.getMinPrice(skin).catch((e) => "N/A"),
    skinport: await Skinport.getMinPrice(skin).catch((e) => "N/A"),
  };

  return (
    <Modal id="skin-details-modal" closeEvent={closeModalEventName}>
      <div id="skin-details" class="py-4">
        <form
          id="remove-skin-form"
          hx-post="/client/home/remove-skin-modal/remove"
          hx-target="#tracked-skins-table-body"
          hx-swap="innerHTML"
          data-script={`on submit trigger ${closeModalEventName}`}
          class="hidden"
        >
          <input
            type="hidden"
            name="skin"
            value={skinToString({ skin, includePhase: true })}
          />
        </form>
        <p class="mt-[-24px] mb-0 mx-[-8px] py-4 bg-slate-800 hover:bg-slate-700 text-white text-center">
          {skinString}
          {phase && renderSkinPhaseTag(skin)}
        </p>
        <br />
        <Table>
          <TableBody>
            <TableRow class="bg-red-200 py-2">
              <TableCell>
                <img
                  alt="Bitskins Logo"
                  src="/public/svg/bitskins.svg"
                  class="inline h-[17px] mr-2"
                />
                BitSkins
              </TableCell>
              <TableCell safe>{prices.bitskins}</TableCell>
            </TableRow>
            <TableRow class="bg-green-200 py-2">
              <TableCell>
                <img
                  alt="DMarket Logo"
                  src="/public/svg/dmarket.svg"
                  class="inline h-[17px] mr-2"
                />
                DMarket
              </TableCell>
              <TableCell safe>{prices.dmarket}</TableCell>
            </TableRow>
            <TableRow class="bg-blue-200 py-2">
              <TableCell>
                <img
                  alt="Skinport Logo"
                  src="/public/svg/skinport.svg"
                  class="inline h-[17px] mr-2"
                />
                Skinport
              </TableCell>
              <TableCell safe>{prices.skinport}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <br />
      <Divider />
      <div class="grid grid-cols-[60px_70px] gap-x-2 align-center justify-center">
        <ModalClose closeEvent={closeModalEventName}>
          <Button>Close</Button>
        </ModalClose>
        <input
          type="submit"
          class="flex border border-solid border-slate-200 rounded p-2 bg-red-600 text-white justify-center border-transparent hover:cursor-pointer"
          value="Delete"
          form="remove-skin-form"
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
