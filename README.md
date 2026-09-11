# Prioritisation Hub

A polished React/Vite portfolio simulation that maps an end-to-end prioritisation workflow across Jira Product Discovery, Jira Software, Miro, Excel/Google Sheets, and Power BI.

**Important:** this is an illustrative portfolio simulation using sample data. It contains no live integrations and no client or production data. The portfolio owner is **Ayesha C — Project Manager / Certified Scrum Master**.

## What it demonstrates
- Overview cockpit with portfolio health, signal-to-action, and recruiter-facing rationale
- Opportunity backlog inspired by Jira Product Discovery
- Editable RICE, WSJF, and value/effort scoring workspace
- Value/effort prioritisation matrix
- Sequenced roadmap recommendation with explicit trade-offs
- Tool ecosystem map showing intentional handoffs and feedback loops
- Working navigation, search, backlog filters, opportunity creation, editable scoring inputs, method switching, recalculated scores, and matrix movement
- Plain-English definitions of the scenario, objective, measurable goals, stakeholders, risks, consequences, assumptions, and displayed numbers

The scenario is intentionally fictional: a B2B product team is planning Q3 with more customer requests than delivery capacity. The sample demonstrates how evidence can move from Jira Product Discovery and Miro into an editable Excel/Google Sheets-style model, then into Jira Software delivery work and Power BI outcome feedback. These cards represent the workflow; they are not integrations.

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
