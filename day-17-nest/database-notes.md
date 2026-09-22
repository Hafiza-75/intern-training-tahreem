# Day 21 — Database Basics

## 1. Database

A database is used to store and organize application data in a structured way.

For the Task Management application, the database can contain tables such as:

* Users
* Tasks

---

## 2. Table

A table stores related data in rows and columns.

### Tasks Table

| Column      | Type    | Description                      |
| ----------- | ------- | -------------------------------- |
| id          | Integer | Unique task identifier           |
| title       | String  | Task title                       |
| description | String  | Task description                 |
| completed   | Boolean | Task completion status           |
| user_id     | Integer | ID of the user who owns the task |

---

## 3. Columns

Columns define the properties of the data stored in a table.

For the Tasks table:

* `id` stores the task identifier.
* `title` stores the task title.
* `description` stores the task description.
* `completed` stores whether the task is completed.
* `user_id` identifies the task owner.

---

## 4. Rows

A row represents one record in a table.

Example:

| id | title           | description        | completed | user_id |
| -- | --------------- | ------------------ | --------- | ------- |
| 1  | Learn NestJS    | Understand modules | true      | 1       |
| 2  | Build CRUD APIs | Implement CRUD     | false     | 1       |
| 3  | Learn SQL       | Practice queries   | false     | 2       |

Each row represents one task.

---

## 5. Primary Key

A primary key uniquely identifies each record in a table.

For the Tasks table:

`id` is the primary key.

Example:

```text
Task 1 → id = 1
Task 2 → id = 2
Task 3 → id = 3
```

The ID must be unique for each task.

---

## 6. Foreign Key

A foreign key connects one table with another table.

In the Tasks table:

`user_id` is a foreign key that references the `id` of the Users table.

Example:

```text
Users
---------
id
1 → Ali
2 → Sara

Tasks
---------
id | title | user_id
1  | Learn NestJS | 1
2  | Build CRUD   | 1
3  | Learn SQL    | 2
```

Tasks 1 and 2 belong to User 1, while Task 3 belongs to User 2.

---

## 7. Relationships

The relationship between Users and Tasks is:

**One-to-Many**

One user can have many tasks.

```text
User
  |
  | 1
  |
  |--------< Many
             Tasks
```

### Relationship Design

```text
USERS
---------
id PK
name

       1
       |
       |
       N
TASKS
---------
id PK
title
description
completed
user_id FK
```

---

## 8. Database Design Summary

```text
Database
│
├── Users
│   ├── id (Primary Key)
│   └── name
│
└── Tasks
    ├── id (Primary Key)
    ├── title
    ├── description
    ├── completed
    └── user_id (Foreign Key)
```

## Day 21 Learning Outcome

By completing Day 21, I understand:

* Databases
* Tables
* Rows
* Columns
* Primary keys
* Foreign keys
* One-to-many relationships
* How application entities can be represented in relational databases
