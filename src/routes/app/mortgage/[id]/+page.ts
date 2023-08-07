import { makePaymentTable } from '$lib/components/util/loans';
import superjson from '$lib/util/superjson.js';
import type { Mortgage } from '@prisma/client';

export const load = async ({ data }) => {
	const mortgage = superjson.deserialize<Mortgage>(data.mortgage);

	const payments = makePaymentTable(
		mortgage.principle.toNumber(),
		mortgage.interestRate.toNumber(),
		mortgage.term,
		0,
		mortgage.startDate,
		0
	);

	return { mortgage, payments };
};
