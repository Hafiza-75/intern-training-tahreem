# Intern Training

**Name:** H. Tahreem Arshad

## About

This repository contains my tasks, practice work, and mini projects completed during my internship training.

---

## Week 1 – Web Development Fundamentals

Focused on web fundamentals, JavaScript, development tools, and GitHub workflow.

| Day   | Focus             | Work Completed                                        |
| ----- | ----------------- | ----------------------------------------------------- |
| Day 1 | Environment Setup | VS Code, Node.js, npm, Git & GitHub setup             |
| Day 2 | HTML              | HTML fundamentals and Profile Page                    |
| Day 3 | CSS               | Responsive design using Flexbox, Grid & Media Queries |
| Day 4 | JavaScript        | JS fundamentals, DOM, events & form handling          |
| Day 5 | Git & GitHub      | Branching, PRs, merge conflicts & documentation       |

**Technologies:** `HTML5` `CSS3` `JavaScript` `Git` `GitHub`

---

## Week 2 – React Frontend Development

Focused on React fundamentals and building an interactive Task Management Dashboard.

| Day    | Focus              | Work Completed                                          |
| ------ | ------------------ | ------------------------------------------------------- |
| Day 6  | React Basics       | Vite setup, components, JSX, props & state              |
| Day 7  | Components & State | Reusable components, state management & task operations |
| Day 8  | Forms & Validation | Controlled forms, validation, add & edit tasks          |
| Day 9  | Lists & Filters    | Dynamic lists, search, filters & sorting                |
| Day 10 | Dashboard          | Completed responsive Task Management Dashboard          |

**Technologies:** `React` `JavaScript` `CSS3` `Vite`

---

## Week 3 – REST APIs & Frontend Integration

Focused on API concepts, Fetch API, CRUD operations, API states, and debugging.

| Day    | Focus            | Work Completed                                     |
| ------ | ---------------- | -------------------------------------------------- |
| Day 11 | HTTP & REST APIs | HTTP methods, REST, JSON, Fetch & API states       |
| Day 12 | API Integration  | Created reusable API service with GET & POST       |
| Day 13 | API States       | Loading, success, empty, error & retry states      |
| Day 14 | API CRUD         | Create, Read, Update & Delete task operations      |
| Day 15 | API Debugging    | Network inspection, payloads, headers & edge cases |

**Technologies:** `React` `JavaScript` `Fetch API` `REST API` `JSON`

---

## Week 4 – Backend Development with Node.js & NestJS

Focused on backend fundamentals, NestJS architecture, validation, CRUD APIs, error handling, and logging.

| Day    | Focus            | Work Completed                                                    |
| ------ | ---------------- | ----------------------------------------------------------------- |
| Day 16 | Node.js          | npm, modules, environment variables, async/await & error handling |
| Day 17 | NestJS           | Modules, controllers, services, DI & REST routes                  |
| Day 18 | DTO & Validation | DTOs, ValidationPipe, request validation & exceptions             |
| Day 19 | CRUD APIs        | Complete Task CRUD with route parameters & status codes           |
| Day 20 | Backend Review   | Error handling, validation, status codes & NestJS logging         |

**Technologies:** `Node.js` `NestJS` `TypeScript` `REST API` `class-validator`

---

## Overall Training

During the four-week training, I worked across **frontend and backend development**, progressing from web fundamentals and React to REST API integration and NestJS backend development.

**Key Areas:**
`Frontend Development` `React` `REST APIs` `Node.js` `NestJS` `CRUD` `Git & GitHub` `API Debugging` `Validation` `Error Handling`




## Week 5 – Database & ORM

This week focuses on understanding relational databases, SQL, ORM concepts, and connecting databases with backend APIs.

| Day    | Focus              | Work Planned                                                                 |
| ------ | ------------------ | ---------------------------------------------------------------------------- |
| Day 21 | Database Basics    | Databases, tables, rows, columns, primary keys, foreign keys & relationships |
| Day 22 | SQL                | SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY & JOIN basics                |

**Technologies:** `SQL` `Relational Database` `Prisma/ORM` `NestJS`

### Week 5 Goal

## Day 13 – API States

### Topics Covered

- Loading State
- Success State
- Empty State
- Error State
- Retry Handling
- API Response Handling

### Features Implemented

- Added a loading state while API data is being fetched.
- Implemented successful API data rendering.
- Added an empty state when no API tasks are available.
- Implemented error handling for failed API requests.
- Added a Retry button to reattempt failed API requests.
- Added loading feedback while creating API tasks.

**Technologies:** React, JavaScript, Fetch API, REST API



## Day 14 – API Forms & CRUD

### Topics
- API Forms
- Create, Update and Delete operations
- POST, PUT and DELETE requests
- Frontend form validation
- API error handling
- Success and error messages
- Loading states
- CRUD integration

### Features
- Fetch tasks from REST API
- Create new tasks
- Edit existing tasks
- Delete tasks
- Form validation
- API error handling
- Success messages
- Error messages
- Loading feedback
- Confirmation before delete
- Reload tasks

### CRUD Flow

GET → Read tasks
POST → Create task
PUT → Update task
DELETE → Delete task

### Technologies
- React
- JavaScript
- Fetch API
- REST API
- JSON

## Day 15 – Integration Review & API Debugging

### Topics
- Browser Network Tab Inspection
- Request & Response Headers Analysis
- Request Payload Verification
- HTTP Status Codes (200, 201, 400, 404, 500)
- API Debugging & Edge-case Handling

### Features
- End-to-End API Integration Audit
- Inspecting Fetch/XHR Network Calls
- Validating Payload & Headers
- Handling Dummy API Constraints

### Debugging Flow
Trigger Action → Network Tab → Check Method & Status → Inspect Payload → Verify UI State


### Day 23 — Prisma ORM

- Set up Prisma ORM with Prisma 7 and SQLite.
- Created `User` and `Task` Prisma models.
- Implemented a one-to-many relationship between Users and Tasks.
- Created and applied the initial database migration.
- Generated Prisma Client.
- Practiced Prisma CRUD queries:
  - `create()`
  - `findMany()`
  - `findUnique()`
  - `update()`
  - `delete()`
- Practiced loading related tasks using `include`.
- Created `prisma/prisma-queries.ts` for Prisma query practice.
- Verified database operations successfully through the terminal.



### Day 24 — Backend + Database Integration

- Connected the NestJS backend with Prisma ORM and SQLite.
- Created a reusable `PrismaService` for database access.
- Replaced the in-memory task array with database operations.
- Connected Task CRUD APIs with Prisma.
- Implemented database operations using:
  - `findMany()`
  - `findUnique()`
  - `create()`
  - `update()`
  - `delete()`
- Connected Users and Tasks through a one-to-many relationship.
- Added `userId` validation when creating tasks.
- Tested task creation, retrieval, update, and deletion through the API.
- Tested User → Tasks relationship.
- Tested invalid user handling with 404 response.
- Verified database persistence after restarting the NestJS server.


http://localhost:3000/tasks




### Day 26 — Authentication

- Implemented user registration and login functionality.
- Added email and password fields to the User model.
- Added RegisterDto and LoginDto with validation.
- Implemented password hashing using bcrypt.
- Implemented password verification during login.
- Added duplicate email handling.
- Added invalid login handling with proper HTTP status codes.
- Tested registration and login APIs using Thunder Client.
- Tested negative cases including wrong password and duplicate email.
- Ensured passwords are not returned in API responses.
- Completed Day 26 Authentication practical work.


### Day 27 — JWT Authentication

* Installed and configured `@nestjs/jwt`, `@nestjs/passport`, `passport`, and `passport-jwt`.
* Configured JWT authentication using a secret stored in environment variables.
* Added JWT access token generation during user login.
* Configured JWT token expiration for 1 hour.
* Created `JwtStrategy` to validate JWT tokens.
* Created `JwtAuthGuard` to protect authenticated routes.
* Added a protected `/auth/profile` endpoint.
* Tested protected route access without a token.
* Tested protected route access with a valid JWT token.
* Tested invalid JWT token handling.
* Verified successful authentication and unauthorized access responses.
* Completed Day 27 JWT Authentication practical work.


### Day 28 — Authorization: Roles & Permissions

* Added role-based authorization to the authentication system.
* Added `USER` and `ADMIN` roles to the User model.
* Added a default `USER` role for newly registered users.
* Created and applied a database migration for user roles.
* Included the user's role in the JWT payload.
* Updated JWT strategy validation to include the authenticated user's role.
* Created a `Roles` decorator for defining required roles on routes.
* Created a `RolesGuard` to enforce role-based access control.
* Added an admin-only protected endpoint.
* Tested access to the admin endpoint without authentication and verified `401 Unauthorized`.
* Tested access with a normal USER account and verified `403 Forbidden`.
* Tested access with an ADMIN account and verified successful authorization.
* Completed Day 28 Authorization practical work.
