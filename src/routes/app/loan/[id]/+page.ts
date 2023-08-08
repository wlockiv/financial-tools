import { makePaymentTable } from '$lib/components/util/loans';
import superjson from '$lib/util/superjson.js';
import type { Loan } from '@prisma/client';

export const load = async ({ data }) => {
	const loan = superjson.deserialize<Loan>(data.loan);

	const payments = makePaymentTable(
		loan.principle.toNumber(),
		loan.interestRate.toNumber(),
		loan.term,
		0,
		loan.startDate,
		0
	);

	return { loan, payments };
};
