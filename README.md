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

## Week 5 – Database & ORM

Focused on relational databases, SQL, Prisma ORM, database relationships, and integrating persistent data with NestJS APIs.

| Day    | Focus              | Work Completed                                                      |
| ------ | ------------------ | ------------------------------------------------------------------- |
| Day 21 | Database Basics    | Relational databases, tables, keys, relationships & database design |
| Day 22 | SQL                | SQL CRUD, WHERE, ORDER BY, JOIN & query basics                      |
| Day 23 | Prisma ORM         | Prisma 7, SQLite, models, migrations, relationships & CRUD queries  |
| Day 24 | Backend + Database | Integrated Prisma with NestJS and implemented database-backed CRUD  |
| Day 25 | Database Review    | Reviewed CRUD, relationships, persistence & API-database flow       |

**Technologies:** `SQL` `SQLite` `Prisma` `ORM` `NestJS` `TypeScript`

---

## Week 6 – Authentication & Security

Focused on user authentication, JWT, role-based authorization, input validation, and backend security.

| Day    | Focus                            | Work Completed                                                       |
| ------ | -------------------------------- | -------------------------------------------------------------------- |
| Day 26 | Authentication                   | User registration, login, bcrypt password hashing & validation       |
| Day 27 | JWT Authentication               | JWT tokens, JwtStrategy, guards, protected routes & token validation |
| Day 28 | Authorization                    | USER/ADMIN roles, Roles decorator, RolesGuard & access control       |
| Day 29 | Security                         | Input validation, environment security, SQL injection & XSS review   |
| Day 30 | Authentication & Security Review | End-to-end authentication, authorization & security testing          |

**Technologies:** `NestJS` `JWT` `Passport` `bcrypt` `Prisma` `TypeScript` `ValidationPipe`

---

## WEEK 7 — Full-Stack Feature Development


## Day 31 — Full-Stack Flow

* Connected React Task Dashboard with NestJS backend.
* Integrated Create Task with `POST /tasks`.
* Connected frontend → API → NestJS → Prisma → SQLite.
* Verified task creation successfully from the frontend.
* Used a valid database user for task creation.
* Tested the complete full-stack flow locally.
* Pushed changes to `day-31-fullstack-flow`.



### Day 32 — User Profile

- Created `UpdateProfileDto` with name and email validation.
- Added protected GET `/auth/profile` endpoint.
- Added protected PATCH `/auth/profile` endpoint.
- Connected profile APIs with Prisma database.
- Created React `Profile` component.
- Integrated JWT token with frontend API requests.
- Added profile editing and update functionality.
- Tested profile retrieval, profile update, and invalid email validation.
