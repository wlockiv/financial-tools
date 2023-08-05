import { Prisma } from '@prisma/client';
import superjson from 'superjson';

superjson.registerCustom<Prisma.Decimal, string>(
	{
		isApplicable: (v): v is Prisma.Decimal => Prisma.Decimal.isDecimal(v),
		serialize: (v) => v.toJSON(),
		deserialize: (v) => new Prisma.Decimal(v)
	},
	'prisma-decimal'
);

export default superjson;
