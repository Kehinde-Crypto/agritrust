## Frontend conventions

- All components: TypeScript, no `any`
- Client components: mark with `'use client'` at the top
- Colors: use only design token classes (`bg-agri-surface`, `text-accent-green`, etc.) — no raw hex in JSX
- Icons: lucide-react only, sizes 16/20/24/48px
- Fonts: Outfit (headings), Inter (body), JetBrains Mono (hashes/IDs)
- Hardcoded demo data lives in `src/lib/mockData.ts` — don't scatter it in components