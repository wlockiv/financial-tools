import { auth } from '$lib/server/lucia.js';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { setMessage, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().nonempty('Required')
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		throw redirect(302, '/');
	}

	const form = await superValidate(loginSchema);
	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await auth.useKey('email', form.data.email.toLowerCase(), form.data.password);

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError) {
				if (['AUTH_INVALID_PASSWORD', 'AUTH_INVALID_KEY_ID'].includes(e.message))
					return setMessage(form, 'Incorrect username or password.', { status: 401 });

				return setMessage(form, `Unknown Error: ${e.message}`, { status: 400 });
			}

			return fail(400, { message: e });
		}

		throw redirect(302, '/');
	}
};
