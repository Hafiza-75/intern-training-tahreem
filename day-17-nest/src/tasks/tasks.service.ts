
import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    this.logger.log(`Fetched ${tasks.length} tasks for user ${userId}`);
    return tasks;
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        completed: createTaskDto.completed ?? false,
        priority: createTaskDto.priority ?? 'Medium',
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    this.logger.log(`Task ${task.id} created for user ${userId}`);
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ) {
    await this.findOne(id, userId);

    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    this.logger.log(`Task ${id} updated by user ${userId}`);
    return task;
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    await this.prisma.task.delete({
      where: { id },
    });

    this.logger.log(`Task ${id} deleted by user ${userId}`);
  }
}
