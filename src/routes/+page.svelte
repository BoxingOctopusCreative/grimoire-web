<script lang="ts">
	import type { Component } from 'svelte';
	import Library from '@lucide/svelte/icons/library';
	import FolderOpen from '@lucide/svelte/icons/folder-open';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import RefreshCw from '@lucide/svelte/icons/refresh-cw';
	import TabletSmartphone from '@lucide/svelte/icons/tablet-smartphone';
	import Apple from '@lucide/svelte/icons/apple';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Laptop from '@lucide/svelte/icons/laptop';

	const repoUrl = 'https://github.com/BoxingOctopusCreative/grimoire';
	const latestUrl = `${repoUrl}/releases/latest`;
	const releasesUrl = `${repoUrl}/releases`;
	const version = 'v0.1.4';

	const features: {
		title: string;
		body: string;
		icon: Component;
	}[] = [
		{
			title: 'Own your library',
			body: 'Calibre-style on-disk layout with a local metadata.db and Author/Title folders you control.',
			icon: Library
		},
		{
			title: 'Import what you have',
			body: 'Bring in EPUB, PDF, AZW3, MOBI, TXT, and CBZ/CBR without fighting your existing collection.',
			icon: FolderOpen
		},
		{
			title: 'Read in place',
			body: 'Open books in the built-in reader and pick up where you left off with saved progress.',
			icon: BookOpen
		},
		{
			title: 'Convert natively',
			body: 'EPUB to MOBI or AZW3, TXT to EPUB, and more. No Calibre install required.',
			icon: RefreshCw
		},
		{
			title: 'Send to Kindle',
			body: 'USB and MTP sync including Colorsoft. Also detects Kobo, BOOX, and similar devices.',
			icon: TabletSmartphone
		}
	];

	const platforms: {
		title: string;
		detail: string;
		icon: Component;
	}[] = [
		{
			title: 'macOS',
			detail: 'Apple Silicon & Intel',
			icon: Apple
		},
		{
			title: 'Windows',
			detail: 'Installer & MSI',
			icon: Monitor
		},
		{
			title: 'Linux',
			detail: 'x64 builds',
			icon: Laptop
		}
	];
</script>

<svelte:head>
	<title>Grimoire. Own your ebook library.</title>
	<meta
		name="description"
		content="Cross-platform desktop eBook library manager. Local SQLite catalog, Calibre-style folders, built-in reader, native conversion, and Kindle sync including Colorsoft."
	/>
	<meta property="og:title" content="Grimoire. Own your ebook library." />
	<meta
		property="og:description"
		content="Local catalog, native conversion, and Kindle sync without Calibre. Your library stays on your disk."
	/>
	<meta property="og:image" content="/app-icon.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Grimoire. Own your ebook library." />
	<meta
		name="twitter:description"
		content="Local catalog, native conversion, and Kindle sync without Calibre. Your library stays on your disk."
	/>
	<meta name="twitter:image" content="/app-icon.png" />
</svelte:head>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-wash" aria-hidden="true"></div>
	<div class="hero-inner">
		<div class="hero-copy">
			<div class="hero-brand fade-up">
				<img class="hero-brand-logo" src="/grimoire_icon.svg" alt="" width="48" height="48" />
				<span class="brand hero-wordmark">Grimoire<span class="brand-dot">.</span></span>
			</div>
			<h1 id="hero-heading" class="hero-title fade-up fade-up-delay-1">
				Your library, on your disk.
			</h1>
			<p class="hero-support muted fade-up fade-up-delay-2">
				A local SQLite catalog with Calibre-style folders, a built-in reader, and Kindle sync
				without installing Calibre.
			</p>
			<div class="hero-ctas fade-up fade-up-delay-3">
				<a class="btn" href="#download">Download for desktop</a>
				<a
					class="btn secondary"
					href={repoUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					View on GitHub
				</a>
			</div>
		</div>

		<div class="hero-visual fade-up fade-up-delay-2" aria-hidden="true">
			<div class="hero-orb"></div>
			<img class="hero-mark" src="/grimoire_icon.svg" alt="" width="448" height="448" />
		</div>
	</div>
</section>

<section id="features" class="section features" aria-labelledby="features-title">
	<p class="section-kicker">Features</p>
	<h2 id="features-title" class="section-title">Built for libraries you keep.</h2>
	<p class="section-lead muted">
		Grimoire manages ebooks the way a desktop tool should: files on disk, metadata you own, and
		devices that connect without a cloud middleman.
	</p>

	<ul class="feature-list">
		{#each features as feature (feature.title)}
			<li class="feature-row">
				<span class="feature-icon" aria-hidden="true">
					<feature.icon size={22} strokeWidth={1.75} />
				</span>
				<div>
					<h3 class="feature-title">{feature.title}</h3>
					<p class="feature-body muted">{feature.body}</p>
				</div>
			</li>
		{/each}
	</ul>
</section>

<section id="download" class="section download" aria-labelledby="download-title">
	<p class="section-kicker">Platforms</p>
	<h2 id="download-title" class="section-title">Get Grimoire</h2>
	<p class="section-lead muted">
		Desktop builds for macOS, Windows, and Linux. Grab the latest release and keep your library
		offline-first.
	</p>

	<div class="download-panel">
		<ul class="platform-list">
			{#each platforms as platform (platform.title)}
				<li>
					<a class="btn secondary platform-btn" href={latestUrl} target="_blank" rel="noopener noreferrer">
						<span class="platform-icon" aria-hidden="true">
							<platform.icon size={20} strokeWidth={1.75} />
						</span>
						<span class="platform-text">
							<span class="platform-name">{platform.title}</span>
							<span class="platform-detail muted">{platform.detail}</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>

		<p class="download-meta muted">
			Current version <strong>{version}</strong>.
			<a href={releasesUrl} target="_blank" rel="noopener noreferrer">View all releases</a>
			for changelogs and older builds.
		</p>
	</div>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		min-height: calc(100svh - 4.25rem);
		display: flex;
		align-items: center;
	}

	.hero-wash {
		position: absolute;
		inset: -18% -10% auto;
		height: min(70vh, 36rem);
		background:
			radial-gradient(ellipse at 30% 40%, rgba(127, 181, 164, 0.22), transparent 58%),
			radial-gradient(ellipse at 78% 20%, rgba(216, 132, 118, 0.12), transparent 48%);
		pointer-events: none;
		z-index: 0;
		animation: wash-drift 14s ease-in-out infinite;
	}

	:global([data-theme='light']) .hero-wash {
		background:
			radial-gradient(ellipse at 30% 40%, rgba(47, 93, 80, 0.16), transparent 58%),
			radial-gradient(ellipse at 78% 20%, rgba(139, 58, 47, 0.1), transparent 48%);
	}

	.hero-inner {
		position: relative;
		z-index: 1;
		width: min(1120px, calc(100% - 2.5rem));
		margin: 0 auto;
		padding: 3.5rem 0 4rem;
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	.hero-brand {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		margin-bottom: 1.35rem;
	}

	.hero-brand-logo {
		height: clamp(2.75rem, 5vw, 3.5rem);
		width: auto;
	}

	.hero-wordmark {
		font-size: clamp(2.6rem, 7vw, 4rem);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(1.45rem, 2.8vw, 1.85rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1.25;
		margin: 0 0 0.85rem;
		max-width: 22ch;
		color: var(--ink-muted);
	}

	.hero-support {
		font-size: 1.05rem;
		line-height: 1.55;
		max-width: 34rem;
		margin: 0 0 1.75rem;
	}

	.hero-ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.hero-visual {
		position: relative;
		display: grid;
		place-items: center;
		min-height: 16rem;
	}

	.hero-orb {
		position: absolute;
		width: min(70vw, 26rem);
		aspect-ratio: 1;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(127, 181, 164, 0.28) 0%,
			rgba(127, 181, 164, 0.08) 42%,
			transparent 70%
		);
		filter: blur(2px);
		animation: wash-drift 16s ease-in-out infinite;
	}

	:global([data-theme='light']) .hero-orb {
		background: radial-gradient(
			circle,
			rgba(47, 93, 80, 0.22) 0%,
			rgba(47, 93, 80, 0.06) 42%,
			transparent 70%
		);
	}

	.hero-mark {
		position: relative;
		width: min(52vw, 28rem);
		height: auto;
		filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.28));
		animation: float-soft 6.5s ease-in-out infinite;
	}

	.features {
		padding-top: 3rem;
	}

	.feature-list {
		list-style: none;
		margin: 2.75rem 0 0;
		padding: 0;
		display: grid;
		gap: 0;
	}

	.feature-row {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.1rem;
		align-items: start;
		padding: 1.35rem 0;
		border-top: 1px solid var(--line);
	}

	.feature-row:last-child {
		border-bottom: 1px solid var(--line);
	}

	.feature-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 8px;
		border: 1px solid var(--line);
		background: var(--control-bg);
		color: var(--accent);
		margin-top: 0.1rem;
	}

	.feature-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 650;
		letter-spacing: -0.02em;
		margin: 0 0 0.35rem;
	}

	.feature-body {
		margin: 0;
		max-width: 40rem;
		line-height: 1.55;
	}

	.download-panel {
		margin-top: 2.25rem;
		padding: 1.5rem 0 0;
		border-top: 1px solid var(--line);
	}

	.platform-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}

	.platform-btn {
		width: 100%;
		justify-content: flex-start;
		padding: 0.95rem 1.1rem;
		gap: 0.85rem;
		text-align: left;
	}

	.platform-icon {
		display: inline-flex;
		color: var(--accent);
		flex-shrink: 0;
	}

	.platform-text {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		align-items: flex-start;
	}

	.platform-name {
		font-size: 1rem;
	}

	.platform-detail {
		font-size: 0.88rem;
		font-weight: 400;
	}

	.download-meta {
		margin: 1.35rem 0 0;
		font-family: var(--font-ui);
		font-size: 0.95rem;
	}

	.download-meta strong {
		color: var(--ink);
		font-weight: 600;
	}

	.download-meta a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (min-width: 880px) {
		.hero-inner {
			grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
			gap: 2rem;
			padding: 4rem 0 5rem;
		}

		.feature-list {
			grid-template-columns: 1fr 1fr;
			column-gap: 2.5rem;
		}

		.feature-row:nth-last-child(2):nth-child(odd) {
			border-bottom: 1px solid var(--line);
		}

		.platform-list {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-wash,
		.hero-orb,
		.hero-mark {
			animation: none;
		}
	}
</style>
