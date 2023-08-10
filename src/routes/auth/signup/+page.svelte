<script>
	import AuthFormErrorMessage from '../_AuthFormErrorMessage.svelte';
	import AuthFormWrapper from '../_AuthFormWrapper.svelte';
	import SubmitButton from '../_SubmitButton.svelte';
	import SignupForm from './_SignupForm.svelte';

	export let data;
</script>

<AuthFormWrapper title="Create an Account" data={data.form}>
	<svelte:fragment slot="body">
		<SignupForm />
		<AuthFormErrorMessage />
	</svelte:fragment>
	<SubmitButton slot="footer">Sign Up</SubmitButton>
</AuthFormWrapper>
