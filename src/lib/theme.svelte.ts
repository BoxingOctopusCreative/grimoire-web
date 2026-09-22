export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'grimoire-web-theme';

function readStored(): Theme | null {
	if (typeof localStorage === 'undefined') return null;
	const value = localStorage.getItem(STORAGE_KEY);
	return value === 'light' || value === 'dark' ? value : null;
}

function applyTheme(theme: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
}

function initialTheme(): Theme {
	const stored = readStored();
	if (stored) return stored;
	if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') {
		return 'light';
	}
	return 'dark';
}

export const themeStore = $state({
	value: initialTheme() as Theme
});

export function setTheme(theme: Theme) {
	themeStore.value = theme;
	applyTheme(theme);
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		/* ignore quota / private mode */
	}
}

export function toggleTheme() {
	setTheme(themeStore.value === 'dark' ? 'light' : 'dark');
}

export function syncThemeFromDom() {
	const current = document.documentElement.dataset.theme;
	if (current === 'light' || current === 'dark') {
		themeStore.value = current;
	}
}
