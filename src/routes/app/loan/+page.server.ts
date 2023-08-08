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

	const loans = await prisma.loan.findMany({ where: { user_id: session.user.userId } });

	return { form, loans: superjson.serialize(loans) };
};

export const actions = {
	create: async ({ request, locals }) => {
		const session = await locals.auth.validate();
		const form = await superValidate(request, schema);

		if (!session || !session.user) {
			return fail(401, { message: 'Forbidden ' });
		}

		const { id } = await prisma.loan.create({
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

		throw redirect(302, `/app/loan/${id}`);
	}
};
