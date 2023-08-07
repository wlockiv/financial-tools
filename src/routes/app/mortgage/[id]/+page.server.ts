import { prisma } from '$lib/server/prisma.js';
import superjson from '$lib/util/superjson.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const { id } = params;
	const session = await locals.auth.validate();

	try {
		const mortgage = await prisma.mortgage.findUniqueOrThrow({
			where: { id: parseInt(id), user_id: session.user.userId }
		});

		return { mortgage: superjson.serialize(mortgage) };
	} catch (e) {
		// Prisma DB - Not Found (P2025)
		if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
			throw error(404, {
				message: 'Mortgage not found.',
				userHelp: "This item was deleted, never existed, or you don't have access to it."
			});

		console.error(e);
		throw error(400, { message: 'An unknown error occurred.' });
	}
};

export const actions = {
	delete: async ({ params }) => {
		await prisma.mortgage.delete({ where: { id: parseInt(params.id) } });
		throw redirect(302, '/app/mortgage');
	}
};
