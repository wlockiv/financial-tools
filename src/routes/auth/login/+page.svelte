<script lang="ts">
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AuthFormErrorMessage from '../_AuthFormErrorMessage.svelte';
	import AuthFormWrapper from '../_AuthFormWrapper.svelte';
	import LoginForm from './_LoginForm.svelte';
	import SubmitButton from '../_SubmitButton.svelte';

	export let data;
</script>

<AuthFormWrapper title="Log In" data={data.form}>
	<svelte:fragment slot="body">
		<LoginForm />
		<AuthFormErrorMessage />
	</svelte:fragment>
	<SubmitButton slot="footer">Log In</SubmitButton>
</AuthFormWrapper>
