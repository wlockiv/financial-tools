import type { ModalComponent } from '@skeletonlabs/skeleton';
import CreateLoanModal from './CreateLoanModal.svelte';

export const modalComponentRegistry = {
	createLoan: {
		ref: CreateLoanModal
	}
} satisfies Record<string, ModalComponent>;

export type ModalComponentKeys = keyof typeof modalComponentRegistry;
