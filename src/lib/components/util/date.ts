import { format } from 'date-fns-tz';

export function toMonthString(d: Date) {
	return format(d, 'MMM, yyyy');
}

export function subtractTzOffset(d: Date) {
	return new Date(d.valueOf() + d.getTimezoneOffset() * 60 * 1000);
}
