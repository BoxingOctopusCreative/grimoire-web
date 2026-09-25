<script lang="ts">
	const readers: {
		family: string;
		formats: string;
		usbSend: string;
	}[] = [
		{
			family: 'Kindle (Paperwhite, Colorsoft, Oasis, Scribe, and similar)',
			formats: 'AZW3, MOBI, PDF',
			usbSend: 'Yes (MTP)'
		},
		{
			family: 'Kobo',
			formats: 'EPUB, KEPUB, PDF',
			usbSend: 'Detection only'
		},
		{
			family: 'PocketBook',
			formats: 'EPUB, PDF, FB2',
			usbSend: 'Detection only'
		},
		{
			family: 'reMarkable',
			formats: 'PDF, EPUB',
			usbSend: 'Detection only'
		},
		{
			family: 'BOOX / Onyx',
			formats: 'EPUB, PDF',
			usbSend: 'Detection only'
		},
		{
			family: 'Tolino',
			formats: 'EPUB, PDF',
			usbSend: 'Detection only'
		},
		{
			family: 'Nook',
			formats: 'EPUB, PDF',
			usbSend: 'Detection only'
		}
	];
</script>

<svelte:head>
	<title>Hardware compatibility list. Grimoire.</title>
	<meta
		name="description"
		content="Grimoire detects Kindle, Kobo, PocketBook, reMarkable, BOOX, Tolino, Nook, and similar eReaders over USB MTP or mounted volumes."
	/>
	<meta property="og:title" content="Hardware compatibility list. Grimoire." />
	<meta
		property="og:description"
		content="Compatible eReaders for Grimoire: Kindle USB send, plus detection for Kobo, PocketBook, reMarkable, BOOX, Tolino, Nook, and more."
	/>
	<meta property="og:image" content="/app-icon.png" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Hardware compatibility list. Grimoire." />
	<meta
		name="twitter:description"
		content="Compatible eReaders for Grimoire: Kindle USB send, plus detection for Kobo, PocketBook, reMarkable, BOOX, Tolino, Nook, and more."
	/>
	<meta name="twitter:image" content="/app-icon.png" />
</svelte:head>

<section class="section hcl" aria-labelledby="hcl-title">
	<p class="section-kicker">Devices</p>
	<h1 id="hcl-title" class="section-title">Hardware compatibility list</h1>
	<p class="section-lead muted">
		Grimoire detects these eReader families over USB MTP or mounted volumes. USB send is Kindle MTP
		today; on other readers you can still browse and remove books from Devices.
	</p>

	<div class="table-wrap">
		<table class="hcl-table">
			<thead>
				<tr>
					<th scope="col">Family</th>
					<th scope="col">Preferred formats</th>
					<th scope="col">USB send</th>
				</tr>
			</thead>
			<tbody>
				{#each readers as reader (reader.family)}
					<tr>
						<td data-label="Family">{reader.family}</td>
						<td data-label="Preferred formats">{reader.formats}</td>
						<td data-label="USB send">{reader.usbSend}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<p class="hcl-note muted">
		Other USB devices that identify as an eReader or ebook device may appear as a generic eReader
		(EPUB, PDF).
	</p>

	<p class="hcl-cta">
		<a class="btn" href="/#download">Download Grimoire</a>
		<a class="btn secondary" href="/">Back to home</a>
	</p>
</section>

<style>
	.hcl {
		padding-top: 3rem;
		padding-bottom: 5rem;
	}

	.table-wrap {
		margin-top: 2.5rem;
		overflow-x: auto;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}

	.hcl-table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--font-ui);
		font-size: 0.98rem;
	}

	.hcl-table th,
	.hcl-table td {
		padding: 1rem 1.1rem 1rem 0;
		text-align: left;
		vertical-align: top;
		line-height: 1.45;
	}

	.hcl-table th:last-child,
	.hcl-table td:last-child {
		padding-right: 0;
	}

	.hcl-table thead th {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--ink-muted);
		border-bottom: 1px solid var(--line);
		white-space: nowrap;
	}

	.hcl-table tbody tr {
		border-bottom: 1px solid var(--line);
	}

	.hcl-table tbody tr:last-child {
		border-bottom: none;
	}

	.hcl-table td:first-child {
		font-weight: 600;
		color: var(--ink);
		min-width: 14rem;
	}

	.hcl-note {
		margin: 1.5rem 0 0;
		max-width: 40rem;
		line-height: 1.55;
	}

	.hcl-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin: 2.5rem 0 0;
	}

	@media (max-width: 640px) {
		.hcl-table thead {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border: 0;
		}

		.hcl-table,
		.hcl-table tbody,
		.hcl-table tr,
		.hcl-table td {
			display: block;
			width: 100%;
		}

		.hcl-table tr {
			padding: 1.1rem 0;
		}

		.hcl-table td {
			padding: 0.2rem 0;
			min-width: 0;
		}

		.hcl-table td::before {
			content: attr(data-label);
			display: block;
			font-size: 0.75rem;
			font-weight: 600;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: var(--ink-muted);
			margin-bottom: 0.15rem;
		}

		.hcl-table td:first-child {
			margin-bottom: 0.55rem;
		}
	}
</style>
