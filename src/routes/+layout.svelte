<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import SiteHeader from '$lib/SiteHeader.svelte';
	import SiteFooter from '$lib/SiteFooter.svelte';
	import { syncThemeFromDom } from '$lib/theme.svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		syncThemeFromDom();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Source+Sans+3:wght@400;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
		rel="stylesheet"
	/>
	<title>Grimoire. Own your ebook library.</title>
	<meta
		name="description"
		content="Grimoire is a cross-platform desktop eBook library manager with a local SQLite catalog, built-in reader, native format conversion, and Kindle sync."
	/>
</svelte:head>

<div class="site-shell">
	<SiteHeader />
	<main class="site-main">{@render children()}</main>
	<SiteFooter />
</div>
