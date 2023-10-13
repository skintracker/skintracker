import type { STSkin } from "@skintracker/types/src";
import { Aponia } from "aponia";
import type {
	AponiaCtx,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";
import { queries } from "@/utils/db";
import { intToCategory, intToExterior } from "@/utils/type-conversion";

export interface UserTrackingResponse {
	items: STSkin[];
}

export const getUserTracking: AponiaRouteHandlerFn<
	Promise<UserTrackingResponse>
> = async (ctx: AponiaCtx): Promise<UserTrackingResponse> => {
	const { id } = ctx.params;
	Aponia.log(`[GET] /user/${id}/tracking test`);
	const res = await queries.getUserTrackedSkins(id);
	if (!res) {
		throw new Error("Invalid or no response from Turso!");
	}
	return {
		items: res.rows.map(
			(row) =>
				({
					item: row[0],
					name: row[1],
					exterior: intToExterior(row[2] as number),
					category: intToCategory(row[3] as number),
				}) as STSkin,
		),
	};
};

export const handler: AponiaRouteHandler = {
	GET: [getUserTracking],
};
