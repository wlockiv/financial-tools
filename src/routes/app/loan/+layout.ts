import superjson from '$lib/util/superjson.js';
import type { Loan } from '@prisma/client';

export const load = async ({ data }) => {
	return {
		form: data.form,
		loans: superjson.deserialize(data.loans) as Loan[]
	};
};
