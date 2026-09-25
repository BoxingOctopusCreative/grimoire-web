<script lang="ts">
	import type { Component } from 'svelte';
	import { onMount } from 'svelte';
	import Apple from '@lucide/svelte/icons/apple';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Laptop from '@lucide/svelte/icons/laptop';
	import Download from '@lucide/svelte/icons/download';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import {
		assetsForPlatform,
		fetchLatestRelease,
		formatBytes,
		preferredAsset,
		type LatestRelease,
		type ReleaseAsset
	} from '$lib/releases';
	import { detectClient, osLabel, refineArch, type OsId } from '$lib/os';

	type PlatformCard = {
		id: OsId;
		title: string;
		detail: string;
		icon: Component;
	};

	const platforms: PlatformCard[] = [
		{
			id: 'macos',
			title: 'macOS',
			detail: 'Apple Silicon & Intel',
			icon: Apple
		},
		{
			id: 'windows',
			title: 'Windows',
			detail: 'Installer & MSI',
			icon: Monitor
		},
		{
			id: 'linux',
			title: 'Linux',
			detail: 'AppImage, deb, rpm',
			icon: Laptop
		}
	];

	const releasesUrl = 'https://github.com/BoxingOctopusCreative/grimoire/releases';

	let release = $state<LatestRelease | null>(null);
	let loadError = $state<string | null>(null);
	let loading = $state(true);
	let detectedOs = $state<OsId>('unknown');
	let detectedArch = $state<'arm64' | 'x64' | 'unknown'>('unknown');
	let expanded = $state<OsId | null>(null);

	const recommended = $derived(
		release ? preferredAsset(release.assets, detectedOs, detectedArch) : null
	);

	function togglePlatform(id: OsId) {
		expanded = expanded === id ? null : id;
	}

	function platformAssets(id: OsId): ReleaseAsset[] {
		return release ? assetsForPlatform(release.assets, id) : [];
	}

	onMount(() => {
		const initial = detectClient();
		detectedOs = initial.os;
		detectedArch = initial.arch;
		if (initial.os !== 'unknown') {
			expanded = initial.os;
		}

		void (async () => {
			try {
				const refined = await refineArch(initial);
				detectedOs = refined.os;
				detectedArch = refined.arch;
				if (refined.os !== 'unknown') {
					expanded = refined.os;
				}

				release = await fetchLatestRelease();
			} catch {
				loadError = 'Could not load release assets from GitHub.';
			} finally {
				loading = false;
			}
		})();
	});
</script>

<div class="download-panel">
	{#if loading}
		<p class="download-status muted" role="status">Loading available downloads…</p>
	{:else if loadError}
		<p class="download-status muted" role="alert">
			{loadError}
			<a href={releasesUrl} target="_blank" rel="noopener noreferrer">Open releases on GitHub</a>
		</p>
	{:else if release}
		{#if recommended}
			<div class="recommended">
				<p class="recommended-kicker">
					Detected {osLabel(detectedOs)}
					{#if detectedOs === 'macos' && detectedArch === 'arm64'}
						· Apple Silicon
					{:else if detectedOs === 'macos' && detectedArch === 'x64'}
						· Intel
					{/if}
				</p>
				<a class="btn recommended-btn" href={recommended.url} download>
					<span class="platform-icon" aria-hidden="true">
						<Download size={20} strokeWidth={1.75} />
					</span>
					<span class="platform-text">
						<span class="platform-name">Download for {osLabel(detectedOs)}</span>
						<span class="recommended-detail"
							>{recommended.label} · {formatBytes(recommended.size)}</span
						>
					</span>
				</a>
			</div>
		{/if}

		<ul class="platform-list">
			{#each platforms as platform (platform.id)}
				{@const assets = platformAssets(platform.id)}
				{@const isOpen = expanded === platform.id}
				{@const isDetected = detectedOs === platform.id}
				<li class="platform-item" class:open={isOpen} class:detected={isDetected}>
					<button
						type="button"
						class="btn secondary platform-btn"
						aria-expanded={isOpen}
						aria-controls={`downloads-${platform.id}`}
						onclick={() => togglePlatform(platform.id)}
					>
						<span class="platform-icon" aria-hidden="true">
							<platform.icon size={20} strokeWidth={1.75} />
						</span>
						<span class="platform-text">
							<span class="platform-name">
								{platform.title}
								{#if isDetected}
									<span class="detected-badge">Recommended</span>
								{/if}
							</span>
							<span class="platform-detail muted">
								{#if assets.length > 0}
									{assets.length} download{assets.length === 1 ? '' : 's'} · {platform.detail}
								{:else}
									{platform.detail}
								{/if}
							</span>
						</span>
						<span class="chevron" class:rotated={isOpen} aria-hidden="true">
							<ChevronDown size={18} strokeWidth={1.75} />
						</span>
					</button>

					{#if isOpen}
						<ul class="asset-list" id={`downloads-${platform.id}`}>
							{#each assets as asset (asset.name)}
								<li>
									<a class="asset-link" href={asset.url} download>
										<span class="asset-label">{asset.label}</span>
										<span class="asset-meta muted">{formatBytes(asset.size)}</span>
									</a>
								</li>
							{:else}
								<li class="asset-empty muted">No builds listed for this platform yet.</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>

		<p class="download-meta muted">
			Current version <strong>{release.tag}</strong>.
			<a href={release.htmlUrl} target="_blank" rel="noopener noreferrer">View this release</a>
			or
			<a href={releasesUrl} target="_blank" rel="noopener noreferrer">all releases</a>
			for changelogs and older builds.
		</p>
	{/if}
</div>

<style>
	.download-panel {
		margin-top: 2.25rem;
		padding: 1.5rem 0 0;
		border-top: 1px solid var(--line);
	}

	.download-status {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.98rem;
	}

	.download-status a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.recommended {
		margin-bottom: 1.25rem;
	}

	.recommended-kicker {
		margin: 0 0 0.65rem;
		font-family: var(--font-ui);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.recommended-btn {
		width: 100%;
		justify-content: flex-start;
		padding: 1rem 1.15rem;
		gap: 0.85rem;
		text-align: left;
	}

	.recommended-btn .platform-icon {
		color: inherit;
	}

	.recommended-detail {
		font-size: 0.88rem;
		font-weight: 400;
		opacity: 0.82;
	}

	.platform-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}

	.platform-item {
		display: grid;
		gap: 0;
	}

	.platform-btn {
		width: 100%;
		justify-content: flex-start;
		padding: 0.95rem 1.1rem;
		gap: 0.85rem;
		text-align: left;
	}

	.platform-item.detected .platform-btn {
		border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
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
		flex: 1;
		min-width: 0;
	}

	.platform-name {
		font-size: 1rem;
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.45rem;
	}

	.platform-detail {
		font-size: 0.88rem;
		font-weight: 400;
	}

	.detected-badge {
		font-family: var(--font-ui);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--accent);
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		border-radius: 6px;
		padding: 0.12rem 0.45rem;
	}

	.chevron {
		display: inline-flex;
		color: var(--ink-muted);
		margin-left: auto;
		transition: transform 160ms ease;
		flex-shrink: 0;
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.asset-list {
		list-style: none;
		margin: 0.35rem 0 0;
		padding: 0.35rem 0 0.15rem 0.35rem;
		border-left: 2px solid var(--line);
		margin-left: 1.35rem;
		display: grid;
		gap: 0.25rem;
	}

	.asset-link {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.65rem 0.85rem;
		border-radius: 8px;
		font-family: var(--font-ui);
		font-weight: 600;
		font-size: 0.95rem;
		transition: background 160ms ease;
	}

	.asset-link:hover {
		background: var(--control-hover);
		color: var(--accent);
	}

	.asset-meta {
		font-weight: 400;
		font-size: 0.88rem;
		white-space: nowrap;
	}

	.asset-empty {
		padding: 0.65rem 0.85rem;
		font-family: var(--font-ui);
		font-size: 0.92rem;
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
		.platform-list {
			grid-template-columns: 1fr;
		}

		.recommended-btn {
			width: auto;
			min-width: min(100%, 28rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.chevron {
			transition: none;
		}
	}
</style>
