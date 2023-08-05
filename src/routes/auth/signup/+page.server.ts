import { auth } from '$lib/server/lucia';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { setError, superValidate, setMessage } from 'sveltekit-superforms/server';
import { z } from 'zod';

const loginSchema = z
	.object({
		email: z.string().email(),
		name: z.string().nonempty(),
		password: z
			.string()
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Must contain at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
			),
		pwConfirm: z.string()
	})
	.refine((arg) => arg.password === arg.pwConfirm, {
		message: 'Passwords did not match',
		path: ['pwConfirm']
	});

export const load = async () => {
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
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: form.data.email.toLowerCase(),
					password: form.data.password
				},
				attributes: {
					email: form.data.email,
					name: form.data.name
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError) {
				return setMessage(form, `Unknown Error: ${e.message}`, { status: 400 });
			}

			if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
				return setError(form, 'email', 'This email is already in use.', { status: 409 });
			}

			return setMessage(form, `Unknown Error: ${JSON.stringify(e)}`, { status: 500 });
		}

		throw redirect(302, '/');
	}
};
