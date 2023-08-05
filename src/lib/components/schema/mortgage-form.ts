import { z } from 'zod';
import { toCurrency } from '../util/currency';
import { subtractTzOffset, toMonthString } from '../util/date';

export const schema = z.object({
	principle: z.number().min(1).default(300_000),
	interestRate: z.number().min(0.01).default(5.25),
	term: z.number().min(1).default(30),
	startDate: z.date().default(new Date()).transform(subtractTzOffset),
	additionalFlat: z.number().default(0),
	additionalMultiple: z.number().default(0)
});

export const response = z.array(
	z.object({
		paymentNo: z.number(),
		interestAmt: z.number().transform(toCurrency),
		principleAmt: z.number().transform(toCurrency),
		paymentAmt: z.number().transform(toCurrency),
		remainingAmt: z.number().transform(toCurrency),
		date: z.date().transform(toMonthString)
	})
);

export type MortgageFormResponseIn = z.input<typeof response>;
