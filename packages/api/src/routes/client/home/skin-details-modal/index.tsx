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
  ctx: AponiaCtx,
  
) => {
  const closeModalEventName = "HOME_SHOW_SKIN_DETAILS_MODAL";
  const { headers } = ctx;

  if (!headers.skin) {
    throw new Error("Skin not found");
  }
  const skin = stringToSkin(headers.skin);
  // Placeholder prices
  const prices = {
    bitskins: "100.00",
    skinport: "95.00",
    dmarket: "98.00",
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
            <TableRow class="bg-red-200 py-2">
              <TableCell>
                <img
                  alt="Bitskins Logo"
                  src="/public/svg/bitskins.svg"
                  class="inline h-[17px] mr-2"
                />
                BitSkins
              </TableCell>
              <TableCell>{prices.bitskins}</TableCell>
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
              <TableCell>{prices.dmarket}</TableCell>
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
              <TableCell>{prices.skinport}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Divider />
      <div class="flex justify-center items-center space-x-4 py-4">
        <div class="w-1/2">
          <ModalClose closeEvent={closeModalEventName}>
            <Button text="Close" />
          </ModalClose>
        </div>
        <div class="w-1/6">
          <input
            type="submit"
            class="w-full flex justify-center items-center border border-solid border-slate-200 rounded px-4 py-2 bg-red-600 text-white text-center hover:cursor-pointer"
            value="Delete"
          />
        </div>
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
