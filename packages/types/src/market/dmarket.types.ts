export interface DMarketRequest {
	method: "GET" | "POST";
	path: string;
	targetBody?: string;
	timestamp: number;
}

export interface DMarketItemsSearchResponse {
	cursor: string;
	objects: DMarketItemsSearchObject[];
	total: string;
}

interface DMarketItemsSearchObject {
	amount: number;
	classId: string;
	createdAt: number;
	description: string;
	discount: number;
	extra: DMarketItemsSearchObjectExtra;
	extraDoc: string;
	gameId: string;
	gameType: string;
	image: string;
	inMarket: boolean;
	instantPrice: DMarketPrice;
	instantTargetId: string;
	itemId: string;
	lockStatus: boolean;
	owner: string;
	ownerDetails: DMarketOwnerDetails;
	ownersBlockchainId: string;
	price: DMarketPrice;
	recommendedPrice: DMarketRecommendedPrice;
	slug: string;
	status: string;
	suggestedPrice: DMarketPrice;
	title: string;
	type: string;
}

interface DMarketItemsSearchObjectExtra {
	ability: string;
	backgroundColor: string;
	category: string;
	categoryPath: string;
	class: string[];
	collection: string[];
	exterior: string;
	floatValue: number;
	gameId: string;
	gems: DMarketGem[];
	grade: string;
	groupId: string;
	growth: number;
	hero: string;
	inspectInGame: string;
	isNew: boolean;
	itemType: string;
	linkId: string;
	name: string;
	nameColor: string;
	offerId: string;
	quality: string;
	rarity: string;
	serialNumber: number;
	stickers: DMarketSticker[];
	subscribers: number;
	tagName: string;
	tradable: boolean;
	tradeLock: number;
	tradeLockDuration: number;
	type: string;
	videos: number;
	viewAtSteam: string;
	withdrawable: boolean;
}

interface DMarketSticker {
	image: string;
	name: string;
}

type DMarketGem = DMarketSticker;

interface DMarketPrice {
	DMC: string;
	USD: string;
}

interface DMarketOwnerDetails {
	avatar: string;
	id: string;
	wallet: string;
}

interface DMarketRecommendedPrice {
	d3: DMarketPrice;
	d7: DMarketPrice;
	d7Plus: DMarketPrice;
}
