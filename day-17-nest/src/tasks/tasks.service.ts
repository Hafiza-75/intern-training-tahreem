import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, title: 'Learn NestJS Architecture', description: 'Understand Modules and Controllers', completed: true },
    { id: 2, title: 'Build CRUD APIs', description: 'Implement full CRUD in NestJS', completed: false },
  ];

  // READ ALL (GET /tasks)
  findAll(): Task[] {
    return this.tasks;
  }

  // READ ONE (GET /tasks/:id)
  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // CREATE (POST /tasks)
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: createTaskDto.completed ?? false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // UPDATE (PATCH /tasks/:id)
  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  // DELETE (DELETE /tasks/:id)
  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}