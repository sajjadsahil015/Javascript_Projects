---

description: "Task list for Weather Dashboard MVP"
---

# Tasks: Weather Dashboard MVP

**Input**: Design documents from `/specs/001-weather-dashboard-mvp/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual QA verification per Constitution v1.1.0

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan in Weather-Dashboard/
- [x] T002 Create index.html with semantic HTML5 boilerplate
- [x] T003 Create style.css with CSS reset and base variables
- [x] T004 Create script.js with strict mode enabled
- [x] T005 [P] Create placeholder for API Key configuration in script.js (using "YOUR_KEY_HERE")
- [x] T006 Human Approval: Review and approve Phase 1 completion.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Implement `fetchWeather(city)` stub in script.js with API URL construction
- [x] T008 Implement `debounce(func, wait)` utility in script.js per research.md
- [x] T009 [P] Define CSS Grid/Flexbox layout structure in style.css (header, main, footer)
- [x] T010 Implement error display container in index.html and rendering logic in script.js
- [x] T011 Human Approval: Review and approve Phase 2 completion.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Search & View Current Weather (Priority: P1) 🎯 MVP

**Goal**: User can search for a city and see current weather data (Temp, Humidity, Wind, Icon).

**Independent Test**: Enter "London" -> Verify current weather data appears. Enter "Invalid" -> Verify error message.

### Implementation for User Story 1

- [x] T012 [US1] Add Search Input and Button to index.html
- [x] T013 [US1] Implement `displayCurrentWeather(data)` function in script.js using `textContent`
- [x] T014 [US1] Connect Search Button click event to `fetchWeather` and `displayCurrentWeather` in script.js
- [x] T015 [US1] Add CSS styles for Current Weather card in style.css
- [x] T016 [US1] Implement API error handling (404/401) to show user-friendly messages in script.js
- [x] T017 [US1] Add responsive media queries for Current Weather card (mobile view) in style.css
- [x] T018 Human Approval: Review and approve User Story 1 completion.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Persist Last Search (Priority: P2)

**Goal**: Application remembers and auto-loads the last searched city on refresh.

**Independent Test**: Search "Paris", refresh page -> "Paris" weather loads automatically.

### Implementation for User Story 2

- [x] T019 [US2] Implement `saveCityToStorage(city)` using `localStorage` in script.js
- [x] T020 [US2] Implement `getCityFromStorage()` using `localStorage` in script.js
- [x] T021 [US2] Add initialization logic to load last city on page load in script.js
- [x] T022 [US2] Update search handler to call `saveCityToStorage` on successful fetch in script.js
- [x] T023 Human Approval: Review and approve User Story 2 completion.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 5-Day Forecast (Priority: P3)

**Goal**: User sees a 5-day forecast below the current weather.

**Independent Test**: Search "Tokyo" -> Verify 5-day forecast list appears.

### Implementation for User Story 3

- [x] T024 [US3] Add Forecast Container section to index.html
- [x] T025 [US3] Implement `fetchForecast(city)` function in script.js calling the forecast endpoint
- [x] T026 [US3] Implement `displayForecast(data)` function using `document.createElement` in script.js
- [x] T027 [US3] Add CSS styles for Forecast Grid/List in style.css
- [x] T028 [US3] Update search handler to trigger `fetchForecast` alongside current weather in script.js
- [x] T029 [US3] Add responsive media queries for Forecast Grid (stacking on mobile) in style.css
- [x] T030 Human Approval: Review and approve User Story 3 completion.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T031 Run manual accessibility check (Lighthouse) and fix semantic HTML issues
- [x] T032 Verify API Key placeholder is restored before commit (Security check)
- [x] T033 Final cross-browser testing (Chrome, Firefox, Edge)
- [x] T034 Verify debouncing works on rapid interactions
- [x] T035 Human Approval: Review and approve overall project completion.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Human Approval (Phase 1)**: Depends on Phase 1 tasks.
- **Foundational (Phase 2)**: Depends on Phase 1 Human Approval.
- **Human Approval (Phase 2)**: Depends on Phase 2 tasks.
- **User Stories (Phase 3+)**: Depend on Phase 2 Human Approval.
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on Phase 5 Human Approval.

### User Story Dependencies

- **US1 (Current Weather)**: Independent.
- **US2 (Persistence)**: Depends on US1 search logic.
- **US3 (Forecast)**: Independent (can be built after US1, logic parallels US1).

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. Validate: Can I search for a city and see weather?
4. **Ship MVP**.

### Incremental Delivery

1. Add Phase 4 (US2) -> Persistence.
2. Add Phase 5 (US3) -> Forecast.
3. Polish (Phase 6).