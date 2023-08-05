export const isNullish = (value: unknown): value is null | undefined => {
	if (value === undefined || value === null) {
		return true;
	}

	return false;
};
