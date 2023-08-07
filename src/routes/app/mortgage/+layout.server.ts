import { subtractTzOffset } from '$lib/components/util/date';
import { prisma } from '$lib/server/prisma';
import superjson from '$lib/util/superjson';
import { error } from '@sveltejs/kit';
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
