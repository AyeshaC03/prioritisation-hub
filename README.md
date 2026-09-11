# Prioritisation Hub

A polished React/Vite portfolio simulation that maps an end-to-end prioritisation workflow across Jira Product Discovery, Jira Software, Miro, Excel/Google Sheets, and Power BI.

**Important:** this is an illustrative portfolio simulation using sample data. It contains no live integrations and no client data.

## What it demonstrates
- Overview cockpit with portfolio health, signal-to-action, and recruiter-facing rationale
- Opportunity backlog inspired by Jira Product Discovery
- Editable RICE, WSJF, and value/effort scoring workspace
- Value/effort prioritisation matrix
- Sequenced roadmap recommendation with explicit trade-offs
- Tool ecosystem map showing intentional handoffs and feedback loops

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The app is configured for GitHub Pages at `/prioritisation-hub/`. A GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.
