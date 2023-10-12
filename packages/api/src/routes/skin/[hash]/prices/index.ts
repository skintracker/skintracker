import type { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import * as MarketUtils from "@/utils/market";

export interface STGetPricesResponse {
	bitskins: string;
	buffmarket: string;
	dmarket: string;
	skinport: string;
}

export function getValueFromPromiseSettledResult<T>(
	p: PromiseSettledResult<T>,
) {
	if (p.status === "fulfilled") {
		return p.value;
	}
	return "n/a: error";
}

export const getPrices: AponiaRouteHandlerFn<Promise<STGetPricesResponse>> =
	async (ctx: AponiaCtx) => {
		const results = await Promise.allSettled([
			MarketUtils.Bitskins.getMinPrice(),
			MarketUtils.BuffMarket.getMinPrice(),
			MarketUtils.DMarket.getMinPrice(),
			MarketUtils.Skinport.getMinPrice(),
		]);
		const transformedResults = results.reduce((accum, curr, i) => {
			switch (i) {
				case 0:
					return {
						...accum,
						bitskins: getValueFromPromiseSettledResult(curr),
					};
				case 1:
					return {
						...accum,
						buffmarket: getValueFromPromiseSettledResult(curr),
					};
				case 2:
					return {
						...accum,
						dmarket: getValueFromPromiseSettledResult(curr),
					};
				case 3:
					return {
						...accum,
						skinport: getValueFromPromiseSettledResult(curr),
					};
			}
			return accum;
		}, {} as Partial<STGetPricesResponse>);
		return transformedResults as STGetPricesResponse;
	};

export const handler: AponiaRouteHandler = {
	GET: [getPrices],
};
