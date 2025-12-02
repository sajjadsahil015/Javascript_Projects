# Research: Weather Dashboard MVP

**Status**: Complete
**Date**: 2025-12-02

## Decision Log

### 1. API Integration Strategy
- **Decision**: Use OpenWeather Current Weather Data (2.5) and 5 Day / 3 Hour Forecast (2.5) endpoints.
- **Rationale**: Standard free tier endpoints that provide all required data (Temp, Humidity, Wind, Icon).
- **Alternatives**: One Call API 3.0 (Requires subscription/CC, rejected for simplicity).

### 2. Debouncing Implementation
- **Decision**: Custom debounce utility function in `script.js`.
- **Rationale**: No external libraries (Lodash) allowed. Simple closure-based implementation is sufficient (~10 lines of code).
- **Alternatives**: Throttling (rejected; debouncing better for search inputs).

### 3. DOM Manipulation
- **Decision**: `document.createElement` + `append` for dynamic lists (Forecast), `textContent` updates for static elements (Current Weather).
- **Rationale**: Safer than `innerHTML` (XSS prevention) and more performant for updates.
- **Alternatives**: Template strings with `innerHTML` (rejected for security best practices).

### 4. Storage Schema
- **Decision**: Store array of strings `['London', 'Paris']` in `localStorage` key `weather_search_history`.
- **Rationale**: Simple serialization/deserialization with `JSON.stringify/parse`.
- **Alternatives**: Complex object storage (rejected; unnecessary for MVP).
