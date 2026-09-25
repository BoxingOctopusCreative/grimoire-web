<script lang="ts">
	import ThemeToggle from '$lib/ThemeToggle.svelte';
</script>

<header class="site-header">
	<div class="header-inner">
		<a class="brand" href="/">
			<img class="brand-logo" src="/grimoire_icon.svg" alt="" width="36" height="36" />
			<span>Grimoire<span class="brand-dot">.</span></span>
		</a>

		<nav class="nav-desktop" aria-label="Primary">
			<a href="/#features">Features</a>
			<a href="/manual">Manual</a>
			<a href="/hcl">HCL</a>
			<a href="/#download">Download</a>
			<ThemeToggle />
			<a class="btn" href="/#download">Get Grimoire</a>
		</nav>

		<div class="nav-mobile">
			<ThemeToggle />
			<a class="btn" href="/#download">Get Grimoire</a>
		</div>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 40;
		border-bottom: 1px solid var(--line);
		background: var(--topbar-bg);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.header-inner {
		width: min(1120px, calc(100% - 2rem));
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.75rem 0;
	}

	.brand {
		font-size: 1.35rem;
		flex-shrink: 0;
	}

	.brand-logo {
		height: 1.65rem;
		width: auto;
	}

	.nav-desktop {
		display: none;
		align-items: center;
		gap: 1.35rem;
		font-family: var(--font-ui);
		font-size: 0.95rem;
		font-weight: 600;
	}

	.nav-desktop > a:not(.btn) {
		color: var(--ink-muted);
		transition: color 160ms ease;
	}

	.nav-desktop > a:not(.btn):hover {
		color: var(--ink);
	}

	.nav-desktop .btn {
		padding: 0.55rem 1rem;
		font-size: 0.9rem;
	}

	.nav-mobile {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.nav-mobile .btn {
		padding: 0.5rem 0.9rem;
		font-size: 0.88rem;
	}

	@media (min-width: 760px) {
		.nav-desktop {
			display: flex;
		}

		.nav-mobile {
			display: none;
		}
	}
</style>
