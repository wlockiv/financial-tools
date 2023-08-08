import { prisma } from '$lib/server/prisma.js';
import superjson from '$lib/util/superjson.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import { error, redirect } from '@sveltejs/kit';
import { schema } from '$lib/modals/EditLoanModal.svelte';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals }) => {
	const { id } = params;
	const session = await locals.auth.validate();
	const form = await superValidate(schema);

	try {
		const loan = await prisma.loan.findUniqueOrThrow({
			where: { id, user_id: session.user.userId }
		});

		return { form, loan: superjson.serialize(loan) };
	} catch (e) {
		// Prisma DB - Not Found (P2025)
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, {
				message: 'Loan not found.',
				userHelp: "This item was deleted, never existed, or you don't have access to it."
			});

		console.error(e);
		throw error(400, { message: 'An unknown error occurred.' });
	}
};

export const actions = {
	delete: async ({ params }) => {
		const { id } = params;
		await prisma.loan.delete({ where: { id } });
		throw redirect(302, '/app/loan');
	},

	edit: async ({ request }) => {
		const form = await superValidate(request, schema);
		await prisma.loan.update({
			where: { id: form.data.id },
			data: {
				name: form.data.name,
				principle: form.data.principle,
				interestRate: form.data.interestRate,
				startDate: form.data.startDate,
				term: form.data.term
			}
		});

		throw redirect(302, `/app/loan/${form.data.id}`);
	}
};
