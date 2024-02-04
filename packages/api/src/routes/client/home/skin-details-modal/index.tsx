import Button from "@/components/button";
import Divider from "@/components/divider";
import { Modal, ModalClose } from "@/components/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";
import { setHTMLAsContentType } from "@/hooks";
import logger from "@/utils/logging";
import { stringToSkin } from "@/utils/type-conversion";
import type {
  AponiaCtx,
  AponiaHooks,
  AponiaRouteHandler,
  AponiaRouteHandlerFn,
} from "aponia";

export const showSkinDetailsModal: AponiaRouteHandlerFn<JSX.Element> = (
  ctx: AponiaCtx
) => {
  const closeModalEventName = "HOME_SHOW_SKIN_DETAILS_MODAL";
  const { headers } = ctx;

  if (!headers.skin) {
    throw new Error("Skin not found");
  }
  const skin = stringToSkin(headers.skin);
  // Placeholder prices
  const prices = {
    bitskins: "100.00$",
    skinport: "95.00$",
    dmarket: "98.00$",
  };

  return (
    <Modal id="skin-details-modal" closeEvent={closeModalEventName}>
      <div id="skin-details" class="py-4">
        <p
          style={{ backgroundColor: "rgb(30, 41, 59)" }}
          class="text-white px-2 py-2"
        >
          {`${skin.item} | ${skin.name} (${skin.exterior}), ${skin.category}`}
        </p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Platform</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow class="bg-red-400 py-2">
              <TableCell <img alt="Bitskins Logo" src="/public/svg/bitskins.svg" class="h-[17px] pt-[3px]">>BitSkins</TableCell>
              <TableCell>{prices.bitskins}</TableCell>
            </TableRow>
            <TableRow class="bg-green-400 py-2">
              <TableCell>DMarket</TableCell>
              <TableCell>{prices.dmarket}</TableCell>
            </TableRow>
            <TableRow class="bg-blue-400 py-2">
              <TableCell>Skinport</TableCell>
              <TableCell>{prices.skinport}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Divider />
      <div class="grid grid-cols-[70px] align-center justify-center">
        <ModalClose closeEvent={closeModalEventName}>
          <Button text="Close" />
        </ModalClose>
        <input
          type="submit"
          class="flex border border-solid border-slate-200 rounded p-2 bg-red-600 text-white text-center border-transparent hover:cursor-pointer"
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
