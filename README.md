# UI/UX Improvement Demo

Demonstration project for detecting and fixing common UI/UX issues in web dashboards.

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Run tests
npm test
```

Visit: http://localhost:3000

## What's Included

- **Buggy Dashboard**: Contains 5 intentional UI/UX issues
- **Fixed Dashboard**: Implements best practices and fixes
- **Automated Tests**: 13 Playwright tests to verify issues and fixes
- **Full Documentation**: See [REPORT.md](REPORT.md) for detailed analysis

## Issues Demonstrated

1. Missing ARIA labels (Accessibility)
2. Low contrast text (Accessibility/Visual)
3. Inconsistent spacing (Layout)
4. Illogical button grouping (Usability)
5. Broken responsive layout (Mobile)

## Commands

- `npm start` - Start server on port 3000
- `npm test` - Run automated tests
- `npm run test:headed` - Run tests with browser visible
- `npm run test:debug` - Debug tests interactively

## Project Structure

```
├── public/
│   ├── demo_dashboard_buggy.html   # Buggy version
│   └── demo_dashboard_fixed.html   # Fixed version
├── tests/
│   └── ui-issues.spec.js           # Automated tests
├── server.js                        # Express server
├── REPORT.md                        # Detailed documentation
└── package.json                     # Dependencies
```

## Learn More

See [REPORT.md](REPORT.md) for:
- Detailed issue analysis
- Fix explanations
- Test results
- Screenshots
- Best practices
