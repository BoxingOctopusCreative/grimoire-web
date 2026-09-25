export type OsId = 'macos' | 'windows' | 'linux' | 'unknown';
export type ArchId = 'arm64' | 'x64' | 'unknown';

export type DetectedClient = {
	os: OsId;
	arch: ArchId;
};

/**
 * Best-effort OS / arch detection for download recommendations.
 * Prefer Client Hints when available; fall back to userAgent / platform.
 */
export function detectClient(): DetectedClient {
	if (typeof navigator === 'undefined') {
		return { os: 'unknown', arch: 'unknown' };
	}

	const uaData = (
		navigator as Navigator & {
			userAgentData?: {
				platform?: string;
				mobile?: boolean;
				getHighEntropyValues?: (hints: string[]) => Promise<Record<string, string>>;
			};
		}
	).userAgentData;

	const platformHint = (uaData?.platform ?? navigator.platform ?? '').toLowerCase();
	const ua = navigator.userAgent.toLowerCase();

	let os: OsId = 'unknown';
	if (
		platformHint.includes('mac') ||
		ua.includes('macintosh') ||
		ua.includes('mac os')
	) {
		os = 'macos';
	} else if (platformHint.includes('win') || ua.includes('windows')) {
		os = 'windows';
	} else if (
		platformHint.includes('linux') ||
		platformHint.includes('chrome os') ||
		ua.includes('linux') ||
		ua.includes('x11') ||
		ua.includes('cros')
	) {
		os = 'linux';
	}

	let arch: ArchId = 'unknown';
	if (
		ua.includes('aarch64') ||
		ua.includes('arm64') ||
		ua.includes('apple silicon') ||
		platformHint.includes('arm')
	) {
		arch = 'arm64';
	} else if (
		ua.includes('x86_64') ||
		ua.includes('win64') ||
		ua.includes('wow64') ||
		ua.includes('amd64') ||
		platformHint.includes('x86_64') ||
		platformHint.includes('win64')
	) {
		arch = 'x64';
	}

	// Most shipping Macs are Apple Silicon; prefer arm64 when OS is mac and arch is unknown.
	if (os === 'macos' && arch === 'unknown') {
		arch = 'arm64';
	}

	return { os, arch };
}

export async function refineArch(detected: DetectedClient): Promise<DetectedClient> {
	if (typeof navigator === 'undefined') return detected;

	const uaData = (
		navigator as Navigator & {
			userAgentData?: {
				getHighEntropyValues?: (hints: string[]) => Promise<{
					architecture?: string;
					platform?: string;
				}>;
			};
		}
	).userAgentData;

	if (!uaData?.getHighEntropyValues) return detected;

	try {
		const hints = await uaData.getHighEntropyValues(['architecture', 'platform']);
		const architecture = (hints.architecture ?? '').toLowerCase();
		const platform = (hints.platform ?? '').toLowerCase();

		let os = detected.os;
		if (platform.includes('mac')) os = 'macos';
		else if (platform.includes('win')) os = 'windows';
		else if (platform.includes('linux') || platform.includes('chrome')) os = 'linux';

		let arch = detected.arch;
		if (architecture.includes('arm')) arch = 'arm64';
		else if (
			architecture.includes('x86') ||
			architecture === 'x64' ||
			architecture.includes('amd64')
		) {
			arch = 'x64';
		}

		return { os, arch };
	} catch {
		return detected;
	}
}

export function osLabel(os: OsId): string {
	switch (os) {
		case 'macos':
			return 'macOS';
		case 'windows':
			return 'Windows';
		case 'linux':
			return 'Linux';
		default:
			return 'desktop';
	}
}
