# PRD: Search Facts

## Introduction / Overview

The Search Facts feature allows users to retrieve facts by keyword instead of relying solely on random selection. This enables basic exploration and discovery of facts while keeping the API simple, predictable, and lightweight.

The feature introduces a new read-only endpoint that searches fact text for a keyword, with optional filtering by fact type.

---

## Goals

- Allow users to find facts containing a specific keyword
- Support optional filtering by `type` (e.g. cat, dog)
- Keep search behavior simple and deterministic
- Reuse existing data model and architecture patterns
- Maintain consistency with existing API response conventions

---

## User Stories

### US-001: Search facts by keyword
**Description:**  
As a user, I want to search for facts by keyword so that I can find relevant facts instead of receiving random ones.

**Acceptance Criteria:**
- [ ] `GET /facts/search?q=keyword` returns matching facts
- [ ] Search matches against the `text` field
- [ ] Search is case-insensitive
- [ ] HTTP status code is 200

---

### US-002: Filter search results by type
**Description:**  
As a user, I want to filter search results by type so that I can narrow results to a specific category.

**Acceptance Criteria:**
- [ ] `GET /facts/search?q=keyword&type=cat` filters results by `type`
- [ ] Type filter behaves consistently with existing endpoints
- [ ] No error occurs if the type exists but no results match

---

### US-003: Receive metadata with search results
**Description:**  
As a user, I want to know how many results matched my search so that I can understand the scope of the results.

**Acceptance Criteria:**
- [ ] Response includes `count` of returned facts
- [ ] Response includes the original search query
- [ ] Response shape is consistent and predictable
- [ ] Typecheck/lint passes

---

## Functional Requirements

- **FR-1:** The system must expose `GET /facts/search`.
- **FR-2:** The endpoint must require a `q` query parameter.
- **FR-3:** Search must be performed against the `text` field of facts.
- **FR-4:** Search must be case-insensitive.
- **FR-5:** The endpoint must support optional `type` filtering.
- **FR-6:** The response must include:
  - `facts`: array of matching facts
  - `count`: number of facts returned
  - `query`: original search query string
- **FR-7:** The endpoint must not modify data.

---

## Non-Goals (Out of Scope)

- Pagination or result limiting
- Fuzzy matching or typo tolerance
- Ranking or relevance scoring
- Write, update, or delete operations
- Search across fields other than `text`

---

## Design Considerations

- The endpoint should follow the existing `/facts/*` URL structure.
- Response format should align visually with `/facts/random`.
- Empty results should return an empty array, not an error.
- Search logic should live in the service layer, not the route.

---

## Technical Considerations

- Implementation may use MongoDB `$regex` or text index.
- Existing `type` index should be reused when filtering.
- Search logic should be implemented in `factsService`.
- Routes should remain thin and delegate to the service.

---

## Success Metrics

- Users can retrieve relevant facts using a single keyword
- Search results are returned in under 200ms for typical datasets
- No regressions in existing `/facts/random` behavior
- Feature can be explained to a junior developer in under 5 minutes

---

## Open Questions

- Should the search endpoint enforce a minimum query length?
- Should search results be capped at a maximum number?
- Should search behavior change if no `q` parameter is provided?
