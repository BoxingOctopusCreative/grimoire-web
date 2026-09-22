<script lang="ts">
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { themeStore, toggleTheme } from '$lib/theme.svelte';

	const label = $derived(
		themeStore.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
	);
</script>

<button
	class="theme-toggle"
	type="button"
	onclick={toggleTheme}
	aria-label={label}
	title={label}
>
	{#if themeStore.value === 'dark'}
		<Sun size={18} strokeWidth={1.75} aria-hidden="true" />
	{:else}
		<Moon size={18} strokeWidth={1.75} aria-hidden="true" />
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
		border-radius: 8px;
		border: 1px solid var(--line);
		background: var(--control-bg);
		color: var(--ink-muted);
		font-family: var(--font-ui);
		transition:
			background 160ms ease,
			color 160ms ease,
			border-color 160ms ease;
	}

	.theme-toggle:hover {
		color: var(--ink);
		background: var(--control-hover);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}
</style>
