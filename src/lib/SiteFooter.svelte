<script lang="ts">
	const repoUrl = 'https://github.com/BoxingOctopusCreative/grimoire';
	const releasesUrl = `${repoUrl}/releases`;
</script>

<footer class="site-footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<a class="brand" href="/">
				<img class="brand-logo" src="/grimoire_icon.svg" alt="" width="32" height="32" />
				<span>Grimoire<span class="brand-dot">.</span></span>
			</a>
			<p class="muted footer-tagline">
				Own your ebook library. Local catalog, native conversion, eReader sync.
			</p>
		</div>

		<div class="footer-meta">
			<nav class="footer-links" aria-label="Footer">
				<a href="/manual">Manual</a>
				<a href="/hcl">HCL</a>
				<a href={repoUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
				<a href={releasesUrl} target="_blank" rel="noopener noreferrer">Releases</a>
			</nav>
			<p class="muted footer-note">
				© 2026 Boxing Octopus Creative. Licensed under
				<a
					href="https://www.mozilla.org/en-US/MPL/2.0/"
					target="_blank"
					rel="noopener noreferrer">MPL-2.0</a
				>.
			</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--line);
		padding: 2.5rem 0 3rem;
		margin-top: auto;
	}

	.footer-inner {
		width: min(1120px, calc(100% - 2.5rem));
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.brand {
		font-size: 1.25rem;
	}

	.brand-logo {
		height: 1.45rem;
		width: auto;
	}

	.footer-tagline {
		margin: 0.75rem 0 0;
		max-width: 28rem;
		font-size: 0.98rem;
		line-height: 1.5;
	}

	.footer-links {
		display: flex;
		flex-wrap: wrap;
		gap: 1.25rem;
		font-family: var(--font-ui);
		font-weight: 600;
		font-size: 0.95rem;
		margin-bottom: 0.85rem;
	}

	.footer-links a {
		color: var(--ink);
		transition: color 160ms ease;
	}

	.footer-links a:hover {
		color: var(--accent);
	}

	.footer-note {
		margin: 0;
		font-family: var(--font-ui);
		font-size: 0.88rem;
	}

	.footer-note a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (min-width: 720px) {
		.footer-inner {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-end;
			gap: 2rem;
		}

		.footer-meta {
			text-align: right;
		}

		.footer-links {
			justify-content: flex-end;
		}
	}
</style>
