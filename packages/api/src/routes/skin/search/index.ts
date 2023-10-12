import {
	STSkin,
	STSkinCategory,
	STSkinExterior,
	Weapon,
} from "@skintracker/types/src";
import type {
	AponiaCtx,
	AponiaHooks,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";
import { t } from "elysia";

export interface STSkinSearchResult {
	name: string;
	hash: number;
}

export const searchSkin: AponiaRouteHandlerFn<STSkinSearchResult> = (
	ctx: AponiaCtx,
) => {
	const data = ctx.body as Partial<STSkin>;
	if (!data || !data.name || !data.category || !data.exterior || !data.item)
		throw new Error("Invalid request body");
	return {
		name: data.name,
		hash: Bun.hash.crc32(JSON.stringify(data)),
	};
};

export const hooks: AponiaHooks = {
	body: t.Object({
		name: t.String(),
		category: t.Enum(STSkinCategory),
		exterior: t.Enum(STSkinExterior),
		item: t.Enum(Weapon),
	}),
};

export const handler: AponiaRouteHandler = {
	POST: [searchSkin, hooks],
};
