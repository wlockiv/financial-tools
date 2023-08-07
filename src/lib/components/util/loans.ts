import { addMonths } from 'date-fns';
import { toCurrency } from './currency';
import { toMonthString } from './date';

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

export class LoanPayment {
	paymentNo: number;
	_date: Date;
	_interestAmt: number;
	_principleAmt: number;
	_paymentAmt: number;
	_remainingAmt: number;

	constructor(
		paymentNo: number,
		date: Date,
		interestAmt: number,
		principleAmt: number,
		paymentAmt: number,
		remainingAmt: number
	) {
		this.paymentNo = paymentNo;
		this._date = date;
		this._interestAmt = interestAmt;
		this._principleAmt = principleAmt;
		this._paymentAmt = paymentAmt;
		this._remainingAmt = remainingAmt;
	}

	public get date(): string {
		return toMonthString(this._date);
	}

	public get interestAmt(): string {
		return toCurrency(this._interestAmt);
	}

	public get principleAmt(): string {
		return toCurrency(this._principleAmt);
	}

	public get paymentAmt(): string {
		return toCurrency(this._paymentAmt);
	}

	public get remainingAmt(): string {
		return toCurrency(this._remainingAmt);
	}
}

export function makePaymentTable(
	principle: number,
	rate: number,
	term: number,
	additional: number,
	startDate: Date,
	principleMultiplier = 1
): LoanPayment[] {
	const monthlyRate = calculateMonthlyRate(rate);
	const totalPayments = calculateTotalPayments(term);
	const paymentAmt = calculateMonthlyPayment(principle, monthlyRate, totalPayments);

	const payments: LoanPayment[] = [];

	let remainingAmt = principle;
	let paymentNo = 1;
	while (remainingAmt > 0) {
		const interestAmt = calculateInterest(remainingAmt, monthlyRate);

		let principleAmt = paymentAmt - interestAmt + additional;
		principleAmt *= 1 + principleMultiplier;

		const date = addMonths(startDate, paymentNo - 1);

		if (remainingAmt < paymentAmt + additional) {
			payments.push(
				new LoanPayment(paymentNo, date, interestAmt, principleAmt, interestAmt + remainingAmt, 0)
			);

			break;
		}

		remainingAmt -= principleAmt;

		payments.push(
			new LoanPayment(paymentNo, date, interestAmt, principleAmt, paymentAmt, remainingAmt)
		);

		paymentNo += 1;
	}

	return payments;
}
