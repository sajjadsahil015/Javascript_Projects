<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- List of modified principles:
    - Principle III: Added debouncing requirement.
    - Principle IV: Added semantic HTML/accessibility requirement.
    - Principle V: Clarified API key trade-off.
- Added sections: None (modified existing).
- Templates requiring updates: None.
- Follow-up TODOs: None.
-->

# Weather Dashboard Constitution

## Core Principles

### I. Accuracy & Integrity
Accurate real-time weather retrieval is the primary function. Data displayed MUST match the response from the OpenWeather API exactly; manual alterations or "fudging" of data are strictly prohibited. The OpenWeather API is the single source of truth.

### II. Simplicity & Usability
The UI MUST be clean, minimal, and immediately understandable by general users. Essential data (temperature, humidity, weather description, icon, wind speed) MUST be clearly visible. Weather units MUST be metric (°C).

### III. Reliability & Resilience
The application MUST demonstrate predictable behavior and reliable functionality. It MUST NOT crash on invalid inputs or network errors. Error states (e.g., invalid city, network issues) MUST be handled gracefully with user-friendly messages. Network requests MUST be debounced (e.g., waiting 500ms after typing stops) or throttled to prevent hitting API rate limits. The application MUST automatically save and load the last searched city using `localStorage` to preserve user context.

### IV. Maintainability & Standards
Code MUST be maintainable, modular, and beginner-friendly. Use consistent naming, avoid unused variables, and strictly separate concerns (API logic, DOM updates, storage handling). HTML MUST be semantic (e.g., using `<button>` for actions, not `<div>`) to ensure basic accessibility. Inline scripts inside HTML are prohibited.

### V. Technological Constraints
Development is strictly limited to vanilla HTML, CSS, and JavaScript; frameworks are prohibited. The Fetch API MUST be used for all network requests. The API key MUST be stored in a separate JavaScript variable (not hardcoded inside the fetch URL string). It is acknowledged that client-side exposure of the key is an accepted trade-off for this architecture. The file structure is limited to three main files: `index.html`, `style.css`, and `script.js`. The UI MUST be responsive and functional on devices as small as 360px width. Icons MUST use OpenWeather-provided icon URLs.

## Governance

This constitution supersedes all other practices and preferences.

All Pull Requests and code reviews MUST verify compliance with these principles. Validation is performed via manual verification against the Success Criteria. Any deviation (e.g., adding a framework, hardcoding API keys in URLs) requires an immediate block until resolved. Complexity must be justified against the "Simplicity & Usability" and "Maintainability & Standards" principles. Amendments to this constitution require documentation, approval, and a clear migration plan for any non-compliant code.

**Version**: 1.1.0 | **Ratified**: 2025-12-02 | **Last Amended**: 2025-12-02
