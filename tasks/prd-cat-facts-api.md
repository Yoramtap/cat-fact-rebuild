# PRD: Cat Facts API

**Audience:** Junior developers / new contributors  
**Purpose:** Onboard developers and clearly describe how the current system works, end to end  
**Product framing:** Cat Facts API

---

## 1. Introduction / Overview

The Cat Facts API is a small Node.js service that provides random animal facts (defaulting to cats) via an HTTP API. It uses Express for routing, MongoDB for persistence, and Mongoose as the data access layer.

The system includes:
- A REST API for retrieving random facts
- A MongoDB-backed data model
- A seed script for populating the database from a static JSON file
- A minimal static HTML page for manual testing and demonstration

This PRD documents **current behavior and architecture**, with notes on known constraints and future improvement opportunities.

---

## 2. Goals

- Enable consumers to retrieve one or more random facts via HTTP
- Persist facts in MongoDB with a simple schema
- Support filtering facts by type (e.g. `cat`)
- Allow the database to be initialized via a seed script
- Keep the system simple enough for junior developers to understand quickly

---

## 3. User Stories

### US-001: Retrieve a random fact
**Description:**  
As an API consumer, I want to retrieve a random fact so that I can display it in my application.

**Acceptance Criteria:**
- [ ] `GET /facts/random` returns at least one fact
- [ ] Response is JSON
- [ ] Fact includes `text` and `type`
- [ ] HTTP status code is 200

---

### US-002: Retrieve multiple random facts
**Description:**  
As an API consumer, I want to request multiple random facts at once so that I can show a list.

**Acceptance Criteria:**
- [ ] `GET /facts/random?amount=N` returns `N` facts
- [ ] `amount` defaults to `1` if omitted
- [ ] Response is an array when `amount > 1`
- [ ] HTTP status code is 200

---

### US-003: Filter facts by type
**Description:**  
As an API consumer, I want to filter facts by type so that I can retrieve only relevant facts.

**Acceptance Criteria:**
- [ ] `GET /facts/random?type=cat` filters by `type`
- [ ] If no matching facts exist, response is an empty array
- [ ] No server error occurs when an unknown type is requested

---

### US-004: Verify service health
**Description:**  
As an operator or developer, I want a simple health endpoint so that I can verify the service is running.

**Acceptance Criteria:**
- [ ] `GET /health` returns JSON `{ "status": "ok" }`
- [ ] Endpoint does not require database access
- [ ] HTTP status code is 200

---

### US-005: Seed the database with initial data
**Description:**  
As a developer, I want to populate the database with facts so that the API can function locally.

**Acceptance Criteria:**
- [ ] Seed script reads from `data/facts.json`
- [ ] Script inserts facts into MongoDB
- [ ] Script does nothing if the collection already contains data
- [ ] Script exits with an error if DB connection fails

---

## 4. Functional Requirements

- **FR-1:** The system must expose an HTTP API using Express.
- **FR-2:** The system must connect to MongoDB using Mongoose.
- **FR-3:** The system must define a `Fact` model with:
  - `text` (String, required)
  - `type` (String, default: `"cat"`)
  - timestamps (`createdAt`, `updatedAt`)
- **FR-4:** The system must provide `GET /facts/random`.
- **FR-5:** The `/facts/random` endpoint must support `amount` and `type` query parameters.
- **FR-6:** The system must provide `GET /health`.
- **FR-7:** The system must include a seed script runnable via Node.js.
- **FR-8:** The system must load configuration via environment variables.

---

## 5. Non-Goals (Out of Scope)

- Authentication or authorization
- Write/update/delete APIs for facts
- Admin UI or management dashboard
- Pagination, sorting, or deterministic ordering
- Production-grade validation, rate limiting, or caching
- Support for non-random fact retrieval (e.g. by ID)

---

## 6. Design Considerations

- API responses are intentionally minimal (no wrapping metadata)
- The static `docs/index.html` page is for demonstration only
- Error handling is intentionally lightweight
- Code prioritizes readability over abstraction depth

---

## 7. Technical Considerations

- **Environment variables**
  - `MONGODB_URI` is required
  - `PORT` is optional (defaults to 3000)
- **Database**
  - MongoDB collection: `facts`
  - `type` field is indexed for filtering
- **Seeding**
  - Seed script currently contains its own DB connection logic
- **Architecture**
  - Routing, data access, and app startup are partially co-located

**Future improvement notes (non-binding):**
- Extract DB connection into a shared module
- Separate app creation from server startup
- Add basic input validation for query params
- Add automated tests for core endpoints

---

## 8. Success Metrics

- A new developer can:
  - Run the service locally in under 10 minutes
  - Understand the request flow in one reading session
- API responds successfully for valid requests
- No runtime errors during seed + fetch workflow

---

## 9. Open Questions

- Should the API return a consistent shape (always array vs sometimes object)?
- Should invalid query params return 400 errors instead of silently defaulting?
- Should facts be truly random or pseudo-random with better distribution?

## 10. Current Behavior
- GET /health returns { ok: true } (not { status: "ok" })

- GET /facts/random?amount=&type= returns { facts: [...] } (not a bare array / single object)

- amount is clamped 1–50

- default type is "cat"