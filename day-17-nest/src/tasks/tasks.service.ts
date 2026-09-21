import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  private readonly logger = new Logger(TasksService.name);

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Learn NestJS Architecture',
      description: 'Understand Modules and Controllers',
      completed: true,
    },
    {
      id: 2,
      title: 'Build CRUD APIs',
      description: 'Implement full CRUD in NestJS',
      completed: false,
    },
  ];

  // READ ALL
  findAll(): Task[] {
    this.logger.log(`Fetching all tasks. Total tasks: ${this.tasks.length}`);
    return this.tasks;
  }

  // READ ONE
  findOne(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.logger.log(`Task with ID ${id} fetched successfully`);
    return task;
  }

  // CREATE
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: createTaskDto.completed ?? false,
    };

    this.tasks.push(newTask);

    this.logger.log(`Task created successfully with ID ${newTask.id}`);

    return newTask;
  }

  // UPDATE
  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);

    this.logger.log(`Task with ID ${id} updated successfully`);

    return task;
  }

  // DELETE
  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      this.logger.warn(`Cannot delete task. ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.tasks.splice(index, 1);

    this.logger.log(`Task with ID ${id} deleted successfully`);
  }
}