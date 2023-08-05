import { addMonths, format } from 'date-fns';
import type { MortgageFormResponseIn } from '../schema/mortgage-form';

export function calculateMonthlyRate(annualRate: number): number {
	return annualRate / 100 / 12;
}

export function calculateTotalPayments(termYears: number): number {
	return termYears * 12;
}

export function calculateMonthlyPayment(
	principal: number,
	monthlyRate: number,
	totalPayments: number
): number {
	return (
		(principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
		(Math.pow(1 + monthlyRate, totalPayments) - 1)
	);
}

export function calculateInterest(principal: number, monthlyRate: number): number {
	return principal * monthlyRate;
}

export function calculatePrincipal(monthlyPayment: number, interest: number): number {
	return monthlyPayment - interest;
}

export function makePaymentTable(
	principle: number,
	rate: number,
	term: number,
	additional: number,
	startDate: Date,
	principleMultiplier = 1
): MortgageFormResponseIn {
	const monthlyRate = calculateMonthlyRate(rate);
	const totalPayments = calculateTotalPayments(term);
	const paymentAmt = calculateMonthlyPayment(principle, monthlyRate, totalPayments);

	const payments: MortgageFormResponseIn = [];

	let remainingAmt = principle;
	let paymentNo = 1;
	while (remainingAmt > 0) {
		const interestAmt = calculateInterest(remainingAmt, monthlyRate);

		let principleAmt = paymentAmt - interestAmt + additional;
		principleAmt *= 1 + principleMultiplier;

		const date = addMonths(startDate, paymentNo - 1);

		if (remainingAmt < paymentAmt + additional) {
			payments.push({
				paymentNo,
				interestAmt,
				principleAmt: remainingAmt,
				remainingAmt: 0,
				paymentAmt: interestAmt + remainingAmt,
				date
			});
			break;
		}

		remainingAmt -= principleAmt;

		payments.push({ paymentNo, interestAmt, principleAmt, paymentAmt, remainingAmt, date });

		paymentNo += 1;
	}

	return payments;
}

// export class Payment {
// 	n: number;
// 	_interest: number;
// 	_principle: number;
// 	_remaining: number;
// 	month: Date;

// 	constructor(
// 		paymentNo: number,
// 		interest: number,
// 		principle: number,
// 		remaining: number,
// 		month: Date
// 	) {
// 		this.n = paymentNo;
// 		this._interest = interest;
// 		this._principle = principle;
// 		this._remaining = remaining;
// 		this.month = month;
// 	}

// 	public get principle(): string {
// 		return Payment.toCurrency(this._principle);
// 	}

// 	public get interest(): string {
// 		return Payment.toCurrency(this._interest);
// 	}

// 	public get remaining(): string {
// 		return Payment.toCurrency(this._remaining);
// 	}

// 	public get monthString(): string {
// 		return format(this.month, 'MMM, yyyy');
// 	}

// 	public get payment(): string {
// 		const { _principle, _interest } = this;
// 		return Payment.toCurrency(_principle + _interest);
// 	}

// 	static toCurrency(value: number) {
// 		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// 	}
// }
