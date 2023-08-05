import 'unplugin-icons/types/svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		interface Error {
			message: string;
		}
		// interface Platform {}
	}
}

declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = Omit<import('@prisma/client').User, 'id'>;
		// type DatabaseSessionAttributes = import('@prisma/client').Session;
		type DatabaseSessionAttributes = Record<string, never>;
	}

	// eslint-disable-next-line no-var
	var __prisma: PrismaClient;
}

export {};
