export function queryParamsToString(
	params: Record<string, string | number>,
): string {
	const urlParams = new URLSearchParams();

	for (const key in params) {
		urlParams.append(key, params[key].toString());
	}

	return urlParams.toString();
}
