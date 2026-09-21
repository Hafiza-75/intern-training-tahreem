# Intern Training

**Name:** H. Tahreem Arshad

## About

This repository contains my tasks, practice work, and mini projects completed during my internship training.

---

## Week 1 –  Development Environment & Fundamentals

This week focused on web development fundamentals, JavaScript, development tools, and GitHub workflow.

### Day 1 – Development Environment Setup
- VS Code, Node.js, npm, Git & GitHub setup
- Basic Git commands and first commit

### Day 2 – HTML Fundamentals
- HTML structure and semantic elements
- Links, images, lists, tables, and forms
- **Project:** Basic Profile Page

### Day 3 – Responsive CSS Design
- CSS selectors, Box Model, Flexbox, and Grid
- Positioning, spacing, typography, and media queries
- **Project:** Responsive Profile Page

### Day 4 – JavaScript Fundamentals
- Variables, functions, conditions, loops, arrays, and objects
- DOM manipulation, events, and form handling
- **Project:** Interactive Profile Page

### Day 5 – Git & GitHub Workflow
- Branching, commits, push/pull, and Pull Requests
- Merge conflict resolution and README documentation
- Practiced the complete GitHub workflow

---

### Technologies Used

`HTML5` `CSS3` `JavaScript` `Git` `GitHub`

## Week 2 – Modern Frontend Development

This week focused on learning React and building a reusable, interactive Task Management Dashboard.

### Day 6 – React Introduction
- React setup using Vite
- Components, JSX, props, state, and event handling
- **Project:** Started Task Management Dashboard

### Day 7 – Components & State
- Reusable components and props
- State management with `useState`
- Parent-child communication
- Conditional rendering
- Added, updated, and removed tasks

### Day 8 – Forms & Validation
- Controlled inputs and form state
- Form validation and error handling
- Add and edit task functionality
- Form reset and cancel handling

### Day 9 – Lists & Filters
- Dynamic lists and React keys
- Search and status filtering
- Priority filtering and sorting
- Loading and empty states

### Day 10 – Task Management Dashboard
- Combined React components, state, forms, validation, search, and filters
- Built a responsive Task Management Dashboard
- Implemented complete task management functionality

### Technologies Used

`React` `JavaScript` `CSS3` `Vite`

## Week 3 –  APIs & Frontend Integration


## Day 11 – HTTP & REST APIs

### Topics Covered

- HTTP Request and Response Cycle
- REST APIs
- JSON Data
- GET, POST, PUT, PATCH, and DELETE Methods
- HTTP Status Codes
- API Integration using Fetch
- Loading and Error States

### Practical Work

- Created an API component to fetch task data.
- Used the `fetch()` API to send a GET request.
- Converted the API response from JSON.
- Stored API data using React state.
- Implemented loading and error states.
- Displayed API data dynamically in the React application.
- Observed the API request and response using Browser DevTools.

**Technologies:** React, JavaScript, REST API, Fetch API

---

## Day 12 – API Integration

### Topics Covered

- Fetch API
- API Services
- GET Requests
- POST Requests
- Request Parameters
- Request Body
- JSON Data
- Response Handling
- Loading and Error States

### Practical Work

- Created a reusable API service for handling API requests.
- Separated API logic from React components.
- Used query parameters to control the number of tasks fetched.
- Implemented a GET request to retrieve tasks.
- Implemented a POST request to create a new task.
- Sent task data through the request body.
- Handled successful and failed API responses.
- Added loading, creating, and error states.

**Technologies Used:** React, JavaScript, Fetch API, REST API



---

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



# Internship Training — Backend Development

---

## Day 16 – Node.js Fundamentals & Asynchronous JavaScript

### Topics Covered
* **Runtime Environment:** Setting up Node.js runtime, `npm` initialization, and package management.
* **Module Architecture:** CommonJS module patterns (`module.exports` and `require()`) vs ES6 Modules (`import`/`export`).
* **Environment Configuration:** Secure handling of environment variables (`PORT`, `APP_NAME`) using `dotenv`.
* **Asynchronous Flow Control:** Managing non-blocking operations using ES6 Promises and `async/await`.
* **Error Handling:** Implementing `try/catch` blocks to gracefully handle runtime and simulated database errors.

### Features Implemented
* **Modular Configuration:** Decoupled math utilities and app configs into clean, reusable modules.
* **Environment Isolation:** Configured `.env` files with strict `.gitignore` rules to prevent credential leaks.
* **Simulated DB Operations:** Built asynchronous functions simulating database tasks with standard delay handling.

---

## Day 17 – NestJS Basics & Architecture

### Topics Covered
* **Framework Architecture:** Understanding NestJS modular architecture, Dependency Injection (DI), and Inversion of Control (IoC).
* **Decorators:** Core usage of `@Module`, `@Controller`, and `@Injectable` (Service) decorators.
* **Routing & Controllers:** Creating RESTful HTTP endpoints (`GET /tasks`, `GET /tasks/:id`).
* **Services & Providers:** Encapsulating business logic and data manipulation inside injected providers.

### Features Implemented
* **Tasks Module:** Built a dedicated `TasksModule` encapsulating task management operations.
* **Controller-Service Mapping:** Injected `TasksService` into `TasksController` to serve dynamic JSON payloads.
* **Path Parameter Resolution:** Implemented parametrized routes (`:id`) to query specific resource records.
* **TypeScript Import Cleanup:** Resolved file extension and module declaration mismatches for clean incremental compilation.

---

## Day 18 – DTOs & Request Validation

### Topics Covered
* **Data Transfer Objects (DTOs):** Defining explicit schema contracts for incoming HTTP request payloads.
* **Validation Pipe:** Configuring NestJS global `ValidationPipe` for automatic payload sanitization and transformation.
* **Schema Constraints:** Utilizing `class-validator` decorators (`@IsString`, `@IsNotEmpty`, `@IsBoolean`, `@IsOptional`).
* **Error Handling:** Returning standard HTTP `400 Bad Request` validation arrays and HTTP `404 Not Found` exceptions.

### Features Implemented
* **Global Pipe Setup:** Enforced strict payload checks (`whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`).
* **Data Contracts:** Created `CreateTaskDto` for required resource creation and `UpdateTaskDto` for partial updates (`PATCH`).
* **Validated CRUD Endpoints:** Connected `POST` and `PATCH` endpoints to service layer methods with auto-validation.
* **Exception Filters:** Integrated `NotFoundException` handling for unmapped task IDs.


## Day 19 – CRUD APIs & Route Parameters

### Topics Covered
* **RESTful CRUD Standards:** Implementing full Create, Read, Update, and Delete routing conventions.
* **Route Parameter Parsing:** Utilizing NestJS built-in `ParseIntPipe` for automatic string-to-number parameter transformation.
* **HTTP Response Codes:** Configuring standard status codes (`200 OK`, `201 Created`, `204 No Content`, `404 Not Found`).
* **In-Memory Data Persistence:** Managing state array operations (`push`, `find`, `splice`, `Object.assign`).

### Features Implemented
* **GET `/tasks`:** Fetch all registered tasks.
* **GET `/tasks/:id`:** Query single task by numeric route parameter with auto `404` handling.
* **POST `/tasks`:** Create new task record with DTO validation.
* **PATCH `/tasks/:id`:** Update specific task properties dynamically.
* **DELETE `/tasks/:id`:** Remove task record with `204 No Content` status response.





## Day 20 — Backend Review

### Objective

Review and stabilize the NestJS Task CRUD backend with error handling, validation, status codes, and logging.

### Completed Tasks

* Added NestJS Logger for CRUD operations.
* Tested `ParseIntPipe` and DTO validation.
* Handled missing tasks with `NotFoundException`.
* Tested invalid and unexpected request fields.
* Verified CRUD HTTP status codes (`200`, `201`, `204`, `400`, `404`).

### Result

Task CRUD APIs were successfully reviewed and tested for common success and error scenarios.
