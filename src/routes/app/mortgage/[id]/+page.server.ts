import { prisma } from '$lib/server/prisma.js';
import superjson from '$lib/util/superjson.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;

	const mortgage = await prisma.mortgage.findFirstOrThrow({ where: { id: parseInt(id) } });

	return { mortgage: superjson.serialize(mortgage) };
};

export const actions = {
	delete: async ({ params }) => {
		await prisma.mortgage.delete({ where: { id: parseInt(params.id) } });
		throw redirect(302, '/app/mortgage');
	}
};
