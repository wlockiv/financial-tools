import type { ModalComponent } from '@skeletonlabs/skeleton';
import CreateLoanModal from './CreateLoanModal.svelte';
import EditLoanModal from './EditLoanModal.svelte';

export const modalComponentRegistry = {
	createLoan: {
		ref: CreateLoanModal
	},
	editLoan: {
		ref: EditLoanModal
	}
} satisfies Record<string, ModalComponent>;

export type ModalComponentKeys = typeof modalComponentRegistry;
