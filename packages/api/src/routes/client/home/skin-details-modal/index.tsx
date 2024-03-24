import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose } from "@/components/modal";
import { Table, TableBody, TableCell, TableRow } from "@/components/table";
import { setHTMLAsContentType } from "@/hooks";
import { Bitskins, DMarket, Skinport } from "@/utils/market";
import { stringToSkin } from "@/utils/type-conversion";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showSkinDetailsModal: AponiaRouteHandlerFn<JSX.Element> = async (
  ctx: AponiaCtx,
) => {
  const closeModalEventName = "HOME_SHOW_SKIN_DETAILS_MODAL";
  const { headers } = ctx;

  if (!headers.skin) {
    throw new Error("Skin not found");
  }
  const skinString = decodeURIComponent(headers.skin);
  const skin = stringToSkin(skinString);
  const prices = {
    bitskins: await Bitskins.getMinPrice(skin),
    dmarket: await DMarket.getMinPrice(skin),
    skinport: await Skinport.getMinPrice(skin),
  };

  return (
    <Modal id="skin-details-modal" closeEvent={closeModalEventName}>
      <div id="skin-details" class="py-4">
        <p class="px-4" safe>
          {skinString}
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
