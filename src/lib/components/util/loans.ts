import type { Loan } from '@prisma/client';
import { addMonths } from 'date-fns';
import { subtractTzOffset } from './date';

export function calculateAverageAPR(loans: Loan[]): number {
	if (loans.length === 0) {
		return 0;
	}

	let totalInterest = 0;
	let totalAmount = 0;

	for (const loan of loans) {
		totalInterest += (loan.principle.toNumber() * loan.interestRate.toNumber()) / 100;
		totalAmount += loan.principle.toNumber();
	}

	const averageAPR = (totalInterest / totalAmount) * 100;
	return averageAPR;
}

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

export function calculateTotalInterest(loan: Loan) {
	let res = 0;

	for (const l of makePaymentSchedule(loan)) {
		res += l.interestAmt;
	}

	return res;
}

export function* makePaymentSchedule(loan: Loan): Generator<LoanPayment> {
	const additional = 0;
	const principleMultiplier = 0;

	const term = loan.term;
	const startDate = subtractTzOffset(loan.startDate);
	const interestRate = loan.interestRate.toNumber();
	const principle = loan.principle.toNumber();

	const monthlyRate = calculateMonthlyRate(interestRate);
	const totalPayments = calculateTotalPayments(term);
	const paymentAmt = calculateMonthlyPayment(principle, monthlyRate, totalPayments);

	let remainingAmt = principle;
	let paymentNo = 1;
	while (remainingAmt > 0) {
		const interestAmt = calculateInterest(remainingAmt, monthlyRate);

		let principleAmt = paymentAmt - interestAmt + additional;
		principleAmt *= 1 + principleMultiplier;

		const date = addMonths(startDate, paymentNo - 1);

		if (remainingAmt < paymentAmt + additional) {
			yield {
				paymentNo,
				date,
				interestAmt,
				principleAmt,
				paymentAmt: interestAmt + remainingAmt,
				remainingAmt: 0
			};
			break;
		}

		remainingAmt -= principleAmt;

		yield { paymentNo, date, interestAmt, principleAmt, paymentAmt, remainingAmt };

		paymentNo += 1;
	}
}

export type LoanPayment = {
	paymentNo: number;
	date: Date;
	interestAmt: number;
	principleAmt: number;
	paymentAmt: number;
	remainingAmt: number;
};
