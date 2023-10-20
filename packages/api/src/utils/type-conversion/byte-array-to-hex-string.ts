export function byteToHexString(uint8arr: Uint8Array): string {
	if (!uint8arr) {
		return "";
	}

	return uint8arr.reduce(
		(accumulator, value) => accumulator + value.toString(16).padStart(2, "0"),
		"",
	);
}
