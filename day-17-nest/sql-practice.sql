-- Day 22 — SQL Basics

-- 1. CREATE TABLES
-- Users table

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Tasks table

CREATE TABLE tasks (
    id INT PRIMARY KEY,
    title VARCHAR(200),
    description VARCHAR(255),
    completed BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- 2. INSERT
-- Add users

INSERT INTO users (id, name)
VALUES
(1, 'Ali'),
(2, 'Sara');

-- Add tasks

INSERT INTO tasks (id, title, description, completed, user_id)
VALUES
(1, 'Learn NestJS', 'Study modules and controllers', true, 1),
(2, 'Build CRUD APIs', 'Practice CRUD operations', false, 1),
(3, 'Learn SQL', 'Practice SQL queries', false, 2);


-- 3. SELECT
-- Get all tasks

SELECT * FROM tasks;

-- Get specific columns

SELECT title, completed
FROM tasks;


-- 4. WHERE
-- Get completed tasks

SELECT *
FROM tasks
WHERE completed = true;

-- Get tasks belonging to user 1

SELECT *
FROM tasks
WHERE user_id = 1;


-- 5. ORDER BY
-- Sort tasks by title (A-Z)

SELECT *
FROM tasks
ORDER BY title ASC;

-- Sort tasks by title (Z-A)

SELECT *
FROM tasks
ORDER BY title DESC;


-- 6. UPDATE
-- Mark task 2 as completed

UPDATE tasks
SET completed = true
WHERE id = 2;


-- 7. DELETE
-- Delete task 3

DELETE FROM tasks
WHERE id = 3;


-- 8. JOIN
-- Get tasks with their user's name

SELECT
    tasks.id,
    tasks.title,
    users.name
FROM tasks
JOIN users
ON tasks.user_id = users.id;