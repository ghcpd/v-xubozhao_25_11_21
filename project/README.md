# UI Buggy Demo

This project demonstrates an intentionally buggy UI and the fixed version. It includes Playwright tests that detect accessibility, layout, contrast, grouping, and responsiveness issues.

Quick start:

1. Install dependencies:

```bash
./setup.sh
```

2. Start server:

```bash
npm start
```

Visit:
- http://localhost:3000/buggy.html  (buggy UI)
- http://localhost:3000/fixed.html  (fixed UI)

3. Run tests:

```bash
./run_tests.sh
```

Notes for Windows/pwsh users:
- Use `./setup.sh` and `./run_tests.sh` via Git Bash or WSL, or run the commands directly in PowerShell with `npm install` and `npx playwright install`.

