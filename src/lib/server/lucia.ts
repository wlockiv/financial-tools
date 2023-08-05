import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from '$lib/server/prisma';
import { dev } from '$app/environment';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prismaAdapter(prisma),
	getUserAttributes: (userData) => ({
		userId: userData.id,
		username: userData.username,
		email: userData.email,
		name: userData.name
	})
});

export type Auth = typeof auth;
