import type { STSkin } from "@skintracker/types/src";
import { Aponia } from "aponia";
import type {
	AponiaCtx,
	AponiaRouteHandler,
	AponiaRouteHandlerFn,
} from "aponia";
import featureFlags, { initFFClient } from "@/utils/feature-flags";
import queries from "@/queries";
import { captureException } from "@/utils/sentry";
import { intToCategory, intToExterior } from "@/utils/type-conversion";
import { LDContext } from "launchdarkly-node-server-sdk";

export interface UserTrackingResponse {
	items: STSkin[];
}

export interface UserTrackingResponseError {
	msg: string;
}

export type GetUserTrackingResponse =
	| UserTrackingResponse
	| UserTrackingResponseError;

export const getUserTracking: AponiaRouteHandlerFn<
	Promise<GetUserTrackingResponse>
> = async (ctx: AponiaCtx): Promise<GetUserTrackingResponse> => {
	const { id } = ctx.params;
	Aponia.log(`[GET] /user/${id}/tracking test`);
	const ffCtx: LDContext = {
		kind: "user",
		key: id,
	};
	const dbAccess = await featureFlags.DB_ACCESS(ffCtx);
	Aponia.log(`[FEATURE_FLAG:DB_ACCESS] ${id}: ${dbAccess}`);
	if (!dbAccess) {
		ctx.set.status = 403;
		return {
			msg: `FEATURE_FLAG:DB_ACCESS is not enabled for ${id}!`,
		};
	}
	const res = await queries.getTrackedSkins(id);
	if (!res) {
		throw new Error("Invalid or no response from Turso!");
	}
	return {
		items: res.rows.map(
			(row) =>
				({
					item: row[0],
					name: row[1],
					category: intToCategory(row[2] as number),
					exterior: intToExterior(row[3] as number),
				}) as STSkin,
		),
	};
};

export const handler: AponiaRouteHandler = {
	GET: [captureException(getUserTracking)],
};
