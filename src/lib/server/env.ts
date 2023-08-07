import { z } from 'zod';

const schema = z.object({
	DB_NAME: z.string().nonempty(),
	DB_USERNAME: z.string().nonempty(),
	DB_HOST: z.string().nonempty(),
	DB_PASSWORD: z.string().nonempty()
});

const env = schema.parse(process.env);

export default env;
