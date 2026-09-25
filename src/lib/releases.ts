import type { ArchId, OsId } from './os';

const RELEASES_API =
	'https://api.github.com/repos/BoxingOctopusCreative/grimoire/releases/latest';

export type ReleaseAsset = {
	name: string;
	url: string;
	size: number;
	platform: OsId;
	arch: ArchId;
	label: string;
	format: string;
	priority: number;
};

export type LatestRelease = {
	tag: string;
	htmlUrl: string;
	assets: ReleaseAsset[];
};

type GithubAsset = {
	name: string;
	browser_download_url: string;
	size: number;
};

type GithubRelease = {
	tag_name: string;
	html_url: string;
	assets: GithubAsset[];
};

function classifyAsset(asset: GithubAsset): ReleaseAsset | null {
	const name = asset.name;
	const lower = name.toLowerCase();

	let platform: OsId = 'unknown';
	let arch: ArchId = 'unknown';
	let format = '';
	let label = name;
	let priority = 50;

	if (lower.endsWith('.dmg')) {
		platform = 'macos';
		format = 'DMG';
		arch = lower.includes('aarch64') ? 'arm64' : lower.includes('x64') ? 'x64' : 'unknown';
		label = arch === 'arm64' ? 'Apple Silicon (.dmg)' : arch === 'x64' ? 'Intel (.dmg)' : 'macOS (.dmg)';
		priority = arch === 'arm64' ? 10 : 20;
	} else if (lower.includes('.app.tar.gz')) {
		platform = 'macos';
		format = 'App archive';
		arch = lower.includes('aarch64') ? 'arm64' : lower.includes('x64') ? 'x64' : 'unknown';
		label =
			arch === 'arm64'
				? 'Apple Silicon (.app.tar.gz)'
				: arch === 'x64'
					? 'Intel (.app.tar.gz)'
					: 'macOS (.app.tar.gz)';
		priority = arch === 'arm64' ? 30 : 40;
	} else if (lower.endsWith('-setup.exe') || (lower.endsWith('.exe') && lower.includes('setup'))) {
		platform = 'windows';
		format = 'Installer';
		arch = 'x64';
		label = 'Installer (.exe)';
		priority = 10;
	} else if (lower.endsWith('.msi')) {
		platform = 'windows';
		format = 'MSI';
		arch = 'x64';
		label = 'MSI package';
		priority = 20;
	} else if (lower.endsWith('.exe')) {
		platform = 'windows';
		format = 'Executable';
		arch = 'x64';
		label = 'Windows (.exe)';
		priority = 30;
	} else if (lower.endsWith('.appimage')) {
		platform = 'linux';
		format = 'AppImage';
		arch = lower.includes('aarch64') || lower.includes('arm64') ? 'arm64' : 'x64';
		label = 'AppImage';
		priority = 10;
	} else if (lower.endsWith('.deb')) {
		platform = 'linux';
		format = 'DEB';
		arch = lower.includes('aarch64') || lower.includes('arm64') ? 'arm64' : 'x64';
		label = 'Debian / Ubuntu (.deb)';
		priority = 20;
	} else if (lower.endsWith('.rpm')) {
		platform = 'linux';
		format = 'RPM';
		arch = lower.includes('aarch64') || lower.includes('arm64') ? 'arm64' : 'x64';
		label = 'Fedora / RHEL (.rpm)';
		priority = 30;
	} else {
		return null;
	}

	return {
		name,
		url: asset.browser_download_url,
		size: asset.size,
		platform,
		arch,
		label,
		format,
		priority
	};
}

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	const units = ['KB', 'MB', 'GB'];
	let value = bytes / 1024;
	let unit = 0;
	while (value >= 1024 && unit < units.length - 1) {
		value /= 1024;
		unit += 1;
	}
	return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export async function fetchLatestRelease(): Promise<LatestRelease> {
	const response = await fetch(RELEASES_API, {
		headers: { Accept: 'application/vnd.github+json' }
	});

	if (!response.ok) {
		throw new Error(`GitHub releases request failed (${response.status})`);
	}

	const data = (await response.json()) as GithubRelease;
	const assets = data.assets
		.map(classifyAsset)
		.filter((asset): asset is ReleaseAsset => asset !== null)
		.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

	return {
		tag: data.tag_name,
		htmlUrl: data.html_url,
		assets
	};
}

export function assetsForPlatform(assets: ReleaseAsset[], platform: OsId): ReleaseAsset[] {
	return assets.filter((asset) => asset.platform === platform);
}

/** Pick the best asset for the detected client. */
export function preferredAsset(
	assets: ReleaseAsset[],
	os: OsId,
	arch: ArchId
): ReleaseAsset | null {
	if (os === 'unknown') return null;

	const platformAssets = assetsForPlatform(assets, os);
	if (platformAssets.length === 0) return null;

	if (os === 'macos') {
		const preferredArch = arch === 'x64' ? 'x64' : 'arm64';
		const dmg = platformAssets.find(
			(asset) => asset.format === 'DMG' && asset.arch === preferredArch
		);
		if (dmg) return dmg;
		const anyDmg = platformAssets.find((asset) => asset.format === 'DMG');
		if (anyDmg) return anyDmg;
	}

	return platformAssets[0] ?? null;
}
