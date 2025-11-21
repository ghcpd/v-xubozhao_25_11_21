# Demo Dashboard (Buggy vs Fixed)

This project reconstructs a buggy UI per `ui_test_spec.json` and provides an accessible, responsive fixed version with automated UI tests.

## Quick Start

```bash
# Install deps and Playwright browsers
./setup.sh
# or on Windows PowerShell
./setup.ps1

# Run dev server (default port 5173)
npm run dev
```

Visit http://localhost:5173 to switch between **Buggy** and **Fixed** views.

## Tests

```bash
./run_tests.sh
# or
./run_tests.ps1
```

- Playwright config auto-starts the dev server on port 3000.
- Accessibility audit via axe-core is included.
- Screenshot saved to `tests/screenshots/fixed-dashboard.png`.

## Files
- `src/components/BuggyDashboard.tsx` — simulated defects
- `src/components/FixedDashboard.tsx` — corrected UI with Tailwind
- `docs/issues.md` — issue list
- `docs/changelog.md` — change log
- `playwright.config.ts` — test configuration

## Notes
- Uses Vite + React + Tailwind CSS.
- Tailwind port set to 3000 via `vite.config.ts`.
