<script lang="ts">
	const sections = [
		{ id: 'install', title: 'Install' },
		{ id: 'library', title: 'Set up your library' },
		{ id: 'import', title: 'Import books' },
		{ id: 'read', title: 'Read in Grimoire' },
		{ id: 'metadata', title: 'Metadata and covers' },
		{ id: 'convert', title: 'Convert formats' },
		{ id: 'devices', title: 'Devices and Kindle send' },
		{ id: 'troubleshoot', title: 'Troubleshooting' }
	] as const;
</script>

<svelte:head>
	<title>User manual. Grimoire.</title>
	<meta
		name="description"
		content="How to install Grimoire, manage your local ebook library, import and convert books, and sync with Kindle and other eReaders."
	/>
	<meta property="og:title" content="User manual. Grimoire." />
	<meta
		property="og:description"
		content="Install, library setup, import, reading, conversion, and eReader sync for Grimoire."
	/>
	<meta property="og:image" content="/app-icon.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="User manual. Grimoire." />
	<meta
		name="twitter:description"
		content="Install, library setup, import, reading, conversion, and eReader sync for Grimoire."
	/>
	<meta name="twitter:image" content="/app-icon.png" />
</svelte:head>

<section class="section manual" aria-labelledby="manual-title">
	<p class="section-kicker">Docs</p>
	<h1 id="manual-title" class="section-title">User manual</h1>
	<p class="section-lead muted">
		Grimoire keeps your ebook library on disk. This guide covers install, library setup, import,
		reading, conversion, and sending books to connected eReaders.
	</p>

	<nav class="toc" aria-label="Manual sections">
		<ol>
			{#each sections as section (section.id)}
				<li><a href={`#${section.id}`}>{section.title}</a></li>
			{/each}
		</ol>
	</nav>

	<article class="manual-body">
		<section id="install" class="manual-section" aria-labelledby="install-title">
			<h2 id="install-title">Install</h2>
			<p>
				Download the latest build for your OS from the
				<a href="/#download">download section</a>. Grimoire ships for macOS (Apple Silicon and
				Intel), Windows (installer and MSI), and Linux (AppImage, deb, rpm).
			</p>

			<h3>macOS</h3>
			<p>
				Release DMGs are not Apple-notarized yet. Gatekeeper may say the app is damaged. Open the
				DMG and double-click <strong>Install Grimoire.command</strong> (right-click, then Open if
				needed). That clears quarantine, installs to Applications, and launches the app.
			</p>

			<h3>Windows</h3>
			<ul>
				<li>
					<strong>NSIS</strong> (<code>*-setup.exe</code>): interactive installs ask for the ebook
					library folder (default <code>Documents\Grimoire</code>). Silent installs use that
					default, or <code>/LIBRARYPATH=D:\Books</code>.
				</li>
				<li>
					<strong>MSI</strong>: seeds the same default library path. Override with
					<code>msiexec /i Grimoire_*.msi LIBRARYPATH="D:\Books"</code>.
				</li>
			</ul>
			<p>
				Both write <code>%APPDATA%\grimoire\config.json</code> only when that file does not already
				exist, so upgrades keep an existing library path.
			</p>

			<h3>Linux</h3>
			<p>
				Prefer the AppImage for a portable install, or use the <code>.deb</code> /
				<code>.rpm</code> packages for your distribution. For Kindle MTP access you may need udev
				rules; see <a href="#troubleshoot">Troubleshooting</a>.
			</p>
		</section>

		<section id="library" class="manual-section" aria-labelledby="library-title">
			<h2 id="library-title">Set up your library</h2>
			<p>
				On first launch, choose a folder for your library. Grimoire creates a Calibre-style layout
				on disk and a local SQLite catalog:
			</p>
			<pre class="code-block"><code>MyLibrary/
  metadata.db
  Author Name/
    Book Title/
      Book Title - Author Name.epub
      cover.jpg</code></pre>
			<p>
				App preferences, including the saved library path, live in the OS config directory under
				<code>grimoire/config.json</code>. Change the path anytime in <strong>Settings</strong>.
				Grimoire opens that library automatically on startup.
			</p>
		</section>

		<section id="import" class="manual-section" aria-labelledby="import-title">
			<h2 id="import-title">Import books</h2>
			<p>Grimoire imports:</p>
			<ul>
				<li>EPUB, PDF, AZW3, MOBI, TXT</li>
				<li>Comics: CBZ / CBR</li>
			</ul>
			<p>
				On import it extracts title, authors, tags, series, description, identifiers, and cover when
				the format supports them (EPUB, PDF, MOBI/AZW3). Files land in Author/Title folders under
				your library root.
			</p>
			<p>
				Amazon store AZW3 is usually DRM-protected. Those files can still be imported and sent to
				Kindle, but they will not open in the built-in reader.
			</p>
		</section>

		<section id="read" class="manual-section" aria-labelledby="read-title">
			<h2 id="read-title">Read in Grimoire</h2>
			<p>
				Open a book from the library to read in a separate window. Supported for reading: EPUB, PDF,
				TXT, DRM-free MOBI, and comics (CBZ/CBR). MOBI is converted to EPUB for display. Reading
				progress is saved so you can pick up where you left off.
			</p>
			<p>Search the catalog with full-text search (FTS5). Edit metadata or delete books from the library UI.</p>
		</section>

		<section id="metadata" class="manual-section" aria-labelledby="metadata-title">
			<h2 id="metadata-title">Metadata and covers</h2>
			<p>
				Grimoire can fill missing fields and cover art from
				<a href="https://openlibrary.org/" target="_blank" rel="noopener noreferrer">Open Library</a
				>. No API key is required.
			</p>
			<ul>
				<li>Looks up ISBN when present; otherwise title + author</li>
				<li>Only fills empty values (unknown authors, blank tags/notes/ISBN, missing cover)</li>
				<li>
					Trigger from the book page (<strong>Fetch from Open Library</strong>), the library
					context menu (<strong>Fetch metadata</strong>), or automatically after import when
					cover/author looks incomplete
				</li>
				<li>
					Use <strong>Choose cover</strong> on the book page to pick among Open Library edition
					covers
				</li>
			</ul>
		</section>

		<section id="convert" class="manual-section" aria-labelledby="convert-title">
			<h2 id="convert-title">Convert formats</h2>
			<p>Conversion runs in-app. You do not need Calibre installed.</p>
			<ul>
				<li>EPUB to MOBI or AZW3</li>
				<li>TXT to EPUB</li>
			</ul>
			<p>
				Converted files are stored in your library alongside the original. Kindle USB send uses this
				path when a book is EPUB-only.
			</p>
		</section>

		<section id="devices" class="manual-section" aria-labelledby="devices-title">
			<h2 id="devices-title">Devices and Kindle send</h2>
			<p>
				Open <strong>Devices</strong> while an eReader is plugged in. Grimoire detects Kindles and
				other readers over USB MTP or mounted volumes. See the
				<a href="/hcl">hardware compatibility list</a> for supported families.
			</p>
			<p>
				USB send is Kindle MTP today. On other readers you can still browse and remove books from
				<strong>View books</strong> on the Devices page.
			</p>

			<h3>Sending to Kindle</h3>
			<ol>
				<li>Prefer an existing AZW3, then MOBI, then PDF</li>
				<li>
					If the book is EPUB-only, Grimoire converts natively to dual-format MOBI and stores it in
					the library
				</li>
				<li>Upload into the device <code>documents</code> folder</li>
			</ol>
			<p>
				Raw EPUB copied over USB often does not appear in the Kindle library. Native conversion
				handles that path for USB send. Transfer history is recorded per device.
			</p>

			<h3>Device library</h3>
			<p>
				From Devices, open <strong>View books</strong> on a connected reader. Grimoire scans for
				ebook files (EPUB, PDF, AZW3, MOBI, and similar) and shows them in a grid or list. You can
				multi-select and remove books. The view preference is remembered.
			</p>
		</section>

		<section id="troubleshoot" class="manual-section" aria-labelledby="troubleshoot-title">
			<h2 id="troubleshoot-title">Troubleshooting</h2>

			<h3>macOS cannot open the Kindle</h3>
			<p>
				macOS may lock the Kindle with <code>ptpcamerad</code> or Android File Transfer. If Grimoire
				cannot open the device:
			</p>
			<ol>
				<li>Quit Android File Transfer</li>
				<li>
					Run <code>pkill -9 ptpcamerad</code> (or disable it via <code>launchctl</code> if you
					accept Photos.app side effects)
				</li>
				<li>Retry from Devices or the book detail page</li>
			</ol>

			<h3>Linux MTP permissions</h3>
			<p>
				You may need udev rules so your user can access USB MTP devices without root. See the
				<a
					href="https://crates.io/crates/mtp-rs"
					target="_blank"
					rel="noopener noreferrer">mtp-rs</a
				>
				README for a sample rule.
			</p>

			<h3>Windows</h3>
			<p>
				Kindles usually appear through the Windows Portable Devices stack with no extra drivers.
			</p>

			<h3>More help</h3>
			<p>
				File issues and follow releases on
				<a
					href="https://github.com/BoxingOctopusCreative/grimoire"
					target="_blank"
					rel="noopener noreferrer">GitHub</a
				>.
			</p>
		</section>
	</article>

	<p class="manual-cta">
		<a class="btn" href="/#download">Download Grimoire</a>
		<a class="btn secondary" href="/hcl">Hardware list</a>
		<a class="btn secondary" href="/">Back to home</a>
	</p>
</section>

<style>
	.manual {
		padding-top: 3rem;
		padding-bottom: 5rem;
	}

	.toc {
		margin: 2.25rem 0 0;
		padding: 1.25rem 0 0;
		border-top: 1px solid var(--line);
	}

	.toc ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.55rem;
		font-family: var(--font-ui);
		font-size: 0.98rem;
		font-weight: 600;
	}

	.toc a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.manual-body {
		margin-top: 2.5rem;
	}

	.manual-section {
		padding: 2rem 0;
		border-top: 1px solid var(--line);
		scroll-margin-top: 5rem;
	}

	.manual-section:first-child {
		border-top: none;
		padding-top: 0;
	}

	.manual-section h2 {
		font-family: var(--font-display);
		font-size: clamp(1.45rem, 2.4vw, 1.85rem);
		font-weight: 650;
		letter-spacing: -0.02em;
		margin: 0 0 0.85rem;
	}

	.manual-section h3 {
		font-family: var(--font-display);
		font-size: 1.15rem;
		font-weight: 650;
		letter-spacing: -0.01em;
		margin: 1.5rem 0 0.55rem;
	}

	.manual-section p,
	.manual-section li {
		max-width: 42rem;
		line-height: 1.6;
		color: var(--ink-muted);
	}

	.manual-section p {
		margin: 0 0 0.85rem;
	}

	.manual-section ul,
	.manual-section ol {
		margin: 0 0 0.85rem;
		padding-left: 1.25rem;
	}

	.manual-section li + li {
		margin-top: 0.4rem;
	}

	.manual-section a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.manual-section strong {
		color: var(--ink);
		font-weight: 600;
	}

	.manual-section code {
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.9em;
		color: var(--ink);
		background: var(--control-bg);
		border: 1px solid var(--line);
		border-radius: 4px;
		padding: 0.08rem 0.35rem;
	}

	.code-block {
		margin: 0 0 1rem;
		padding: 1rem 1.1rem;
		overflow-x: auto;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--control-bg);
		color: var(--ink);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.88rem;
		line-height: 1.5;
	}

	.code-block code {
		background: none;
		border: none;
		padding: 0;
		font-size: inherit;
		color: inherit;
	}

	.manual-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 2.5rem 0 0;
		padding-top: 2rem;
		border-top: 1px solid var(--line);
	}

	@media (min-width: 720px) {
		.toc ol {
			grid-template-columns: 1fr 1fr;
			column-gap: 2rem;
		}
	}
</style>
