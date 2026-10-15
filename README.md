# Grimoire web

Marketing site for [Grimoire](https://github.com/BoxingOctopusCreative/grimoire), a cross-platform desktop eBook library manager.

Built with [SvelteKit](https://svelte.dev/docs/kit) and the same parchment and teal visual language as the native desktop app.

## Develop

```bash
pnpm install
pnpm dev
```

## Build

Static output lands in `build/`:

```bash
pnpm build
pnpm preview
```

## Stack

- SvelteKit 2 + Svelte 5
- `@sveltejs/adapter-static` (prerendered)
- Custom CSS in the same parchment and teal palette as the desktop app
- `@lucide/svelte` icons

## License

MPL-2.0
