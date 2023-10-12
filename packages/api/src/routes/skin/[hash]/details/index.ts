import {
	AK47Skins,
	STSkinCategory,
	STSkinExterior,
	Weapon,
	type STSkin,
} from "@skintracker/types/src";
import type { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";

export const getSkinDetails: AponiaRouteHandlerFn<STSkin> = (
	ctx: AponiaCtx,
) => {
	const { hash } = ctx.params;
	return {
		item: Weapon.AK47,
		name: AK47Skins.AquamarineRevenge,
		hash: hash,
		exterior: STSkinExterior.BS,
		category: STSkinCategory.Normal,
	};
};

export const handler: AponiaRouteHandler = {
	GET: [getSkinDetails],
};
