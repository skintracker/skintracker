import { Button } from "@/components/button";
import Divider from "@/components/divider";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableHeaderRow,
	TableRow,
} from "@/components/table";
import { BaseLayout } from "@/layouts/base";
import { JsonHighlighter } from "@/utils/client";
import { captureException } from "@/utils/sentry";
import { skinToString } from "@/utils/type-conversion";
import {
	BayonetSkins,
	Knife,
	M4A4Skins,
	STSkin,
	STSkinCategory,
	STSkinExterior,
	Weapon,
} from "@skintracker/types/src";
import { AponiaCtx, AponiaRouteHandler, AponiaRouteHandlerFn } from "aponia";
import { getHealthcheck } from "./api/healthcheck";

export const getIndex: AponiaRouteHandlerFn<JSX.Element> = (
	_ctx: AponiaCtx,
) => {
	// Gets the healthceck and embeds into markdown.
	const healthcheckRes = getHealthcheck(_ctx);
	const skins: STSkin[] = [
		{
			item: Weapon.M4A4,
			name: M4A4Skins.EyeOfHorus,
			category: STSkinCategory.Normal,
			exterior: STSkinExterior.FN,
		},
		{
			item: Knife.Bayonet,
			name: BayonetSkins.Doppler,
			category: STSkinCategory.Normal,
			exterior: STSkinExterior.FN,
		},
	];
	return (
		<BaseLayout title="Home">
			<div class="overflow-scroll">
				<br />
				<Table>
					<TableHead>
						<TableHeaderRow>
							<TableHeaderCell>Skin</TableHeaderCell>
							<TableHeaderCell classes="hidden md:table-cell">
								<span class="text-red-700">Bitskins</span>
							</TableHeaderCell>
							<TableHeaderCell classes="hidden md:table-cell">
								<span class="text-orange-700">BUFF.Market</span>
							</TableHeaderCell>
							<TableHeaderCell classes="hidden md:table-cell">
								<span class="text-green-700">DMarket</span>
							</TableHeaderCell>
							<TableHeaderCell classes="hidden md:table-cell">
								<span class="text-blue-700">Skinport</span>
							</TableHeaderCell>
						</TableHeaderRow>
					</TableHead>
					<TableBody>
						{skins.map((skin) => (
							<TableRow>
								<TableCell>{skinToString(skin)}</TableCell>
								<TableCell classes="hidden md:table-cell bg-red-300">
									$20.50
								</TableCell>
								<TableCell classes="hidden md:table-cell bg-orange-300">
									$10,000.23
								</TableCell>
								<TableCell classes="hidden md:table-cell bg-green-300">
									<span class="bold">$0.69</span>
								</TableCell>
								<TableCell classes="hidden md:table-cell bg-blue-300">
									N/A
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<br />
				<br />
				<h2 class="text-xl">Healthcheck</h2>
				<Divider />
				<JsonHighlighter data={healthcheckRes} />
				<br />
				<h2 class="text-xl">HTMX Test</h2>
				<Divider />
				<Button text="Click me!" hx-post="/client/home/buttons" />
				<br />
				<br />
				<h2 class="text-xl">Modal Test</h2>
				<Divider />
				<Button
					text="Open Modal"
					hx-get="/client/home/modal"
					hx-target="body"
					hx-swap="beforeend"
				/>
			</div>
		</BaseLayout>
	);
};

export const handler: AponiaRouteHandler = {
	GET: [captureException(getIndex)],
};
