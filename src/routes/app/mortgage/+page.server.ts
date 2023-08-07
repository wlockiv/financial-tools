import { subtractTzOffset } from '$lib/components/util/date';
import { prisma } from '$lib/server/prisma.js';
import superjson from '$lib/util/superjson.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z.object({
	name: z.string().nonempty(),
	principle: z.number().min(1).default(300_000),
	interestRate: z.number().min(0.01).default(5.25),
	term: z.number().min(1).default(30),
	startDate: z.date().default(new Date()).transform(subtractTzOffset),
	additionalFlat: z.number().default(0),
	additionalMultiple: z.number().default(0)
});

export const load = async ({ locals }) => {
	const form = await superValidate(schema);

	const session = await locals.auth.validate();

	if (!session?.user) {
		throw error(401, { message: 'Forbidden' });
	}

	const mortgages = await prisma.mortgage.findMany({ where: { user_id: session.user.userId } });

	return { form, mortgages: superjson.serialize(mortgages) };
};

export const actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		const form = await superValidate(request, schema);

		if (!session || !session.user) {
			return fail(401, { message: 'Forbidden ' });
		}

		const { id } = await prisma.mortgage.create({
			data: {
				name: form.data.name,
				principle: form.data.principle,
				interestRate: form.data.interestRate,
				term: form.data.term,
				startDate: form.data.startDate,
				user: {
					connect: {
						id: session.user.userId
					}
				}
			}
		});

		throw redirect(302, `/app/mortgage/${id}`);
	}
};

// 	if (!form.valid) {
// 		return fail(400, { form });
// 	}

// 	const monthlyRate = calculateMonthlyRate(form.data.interestRate);
// 	const totalPayments = calculateTotalPayments(form.data.term);
// 	const paymentAmt = calculateMonthlyPayment(form.data.principle, monthlyRate, totalPayments);

// 	const payments = [];
// 	let totalInterest = 0;

// 	let remainingAmt = form.data.principle;
// 	let paymentNo = 1;

// 	while (remainingAmt >= 0.01) {
// 		const interestAmt = calculateInterest(remainingAmt, monthlyRate);
// 		totalInterest += interestAmt;

// 		let principleAmt = paymentAmt - interestAmt;
// 		principleAmt *= 1 + form.data.additionalMultiple;
// 		principleAmt += form.data.additionalFlat;

// 		const date = addMonths(form.data.startDate, paymentNo - 1);

// 		if (remainingAmt <= principleAmt) {
// 			payments.push({
// 				paymentNo,
// 				interestAmt,
// 				principleAmt: remainingAmt,
// 				remainingAmt: 0,
// 				paymentAmt: interestAmt + remainingAmt,
// 				date
// 			});
// 			break;
// 		}

// 		remainingAmt -= principleAmt;

// 		payments.push({ paymentNo, interestAmt, principleAmt, paymentAmt, remainingAmt, date });

// 		paymentNo += 1;
// 	}

// 	return { form, payments, totalInterest };
// }
