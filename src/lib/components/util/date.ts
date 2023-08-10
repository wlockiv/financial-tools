import { format } from 'date-fns-tz';

/**
 * Converts a Date object to a formatted string representing the month and year.
 * @param {Date} d - The input Date object.
 * @returns {string} A formatted string in the format 'MMM, yyyy'.
 */
export function toMonthString(d: Date) {
	return format(d, 'MMM, yyyy');
}

/**
 * Subtracts the time zone offset from a Date object, effectively converting it to UTC.
 * @param {Date} d - The input Date object.
 * @returns {Date} A new Date object with the time zone offset subtracted.
 */
export function subtractTzOffset(d: Date) {
	return new Date(d.valueOf() + d.getTimezoneOffset() * 60 * 1000);
}
