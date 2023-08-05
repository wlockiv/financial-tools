import superjson from '$lib/util/superjson.js';
import type { Mortgage } from '@prisma/client';

export const load = async ({ data }) => {
	return {
		form: data.form,
		mortgages: superjson.deserialize(data.mortgages) as Mortgage[]
	};
};
