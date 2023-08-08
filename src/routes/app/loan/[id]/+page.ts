import { makePaymentSchedule } from '$lib/components/util/loans';
import superjson from '$lib/util/superjson.js';
import type { Loan } from '@prisma/client';

export const load = async ({ data }) => {
	const loan = superjson.deserialize<Loan>(data.loan);

	const payments = [...makePaymentSchedule(loan)];

	return { loan, payments };
};
