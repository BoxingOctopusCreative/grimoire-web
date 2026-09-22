# Grimoire web

Marketing site for [Grimoire](https://github.com/BoxingOctopusCreative/grimoire), a cross-platform desktop eBook library manager.

Built with [SvelteKit](https://svelte.dev/docs/kit) and the same parchment + teal visual language as the desktop app.

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
- Custom CSS tokens shared with the Grimoire app
- `@lucide/svelte` icons

## License

MPL-2.0
