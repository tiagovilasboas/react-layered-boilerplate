## Summary

<!-- What changed and why. Link issues if any. -->

## Type

- [ ] Docs / templates / hygiene
- [ ] Bug fix
- [ ] Feature (module / page composition)
- [ ] Chore (tooling, CI scripts)

## Dependency Rule

- [ ] Pages stay composition-only
- [ ] Components do not import `service/` or call fetch/API
- [ ] Hooks may call `service/`; services do not import UI/pages
- [ ] Modules are exposed only via `index.ts`
- [ ] No new layers outside `pages/`, `modules/`, and shared (`src/components`, `src/hooks`)

## Checks

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm test`
- [ ] `npm run build` (if the change can affect the bundle)

## Notes

<!-- Screenshots, follow-ups, out-of-scope items. -->
