---
id: 021
title: Explain Static Serving vs JS Execution
stage: explainer
date: 2026-09-20
surface: agent
model: gemini-3.8-flash
feature: 001-weather-dashboard-mvp
branch: feat/expense-tracker
user: sajjadsahil015
command: explain
labels: ["javascript", "python", "http-server", "browser", "serving"]
links:
  spec: specs/001-weather-dashboard-mvp/spec.md
  ticket: null
  adr: null
  pr: https://github.com/sajjadsahil015/Javascript_Projects/pull/3
files:
  - javascript_runtime_and_serving_guide.md
tests:
  null
---

## Prompt

yr ye javascript k project ko run karnay k lie tm mujay python ki command run karnay ko keh raha h aisa kyu?

## Response snapshot

Clarified that JavaScript executes inside the web browser, not in Python. Explained that `python -m http.server` was suggested merely as a 1-line tool to serve files over http:// to prevent file:// protocol security restrictions. Provided pure JavaScript/Node.js alternatives (npx serve, npx http-server) and direct browser launching without any commands.

## Outcome

- ✅ Impact: Clarified developer misconceptions regarding serving vs runtime execution.
- 🧪 Tests: N/A
- 📁 Files: Created javascript_runtime_and_serving_guide.md and PHR 021.
- 🔁 Next prompts: User chooses direct browser launch or Node.js serve.
- 🧠 Reflection: Direct double-click on index.html works fine for this application because modern browsers support fetch with public CORS endpoints.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
