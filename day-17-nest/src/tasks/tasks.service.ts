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

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: {
        user: true,
      },
    });

    this.logger.log(`Fetched ${tasks.length} tasks from database`);

    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.logger.log(`Task with ID ${id} fetched successfully`);

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: createTaskDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createTaskDto.userId} not found`,
      );
    }

    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        completed: createTaskDto.completed ?? false,
        userId: createTaskDto.userId,
      },
      include: {
        user: true,
      },
    });

    this.logger.log(`Task created successfully with ID ${task.id}`);

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    const task = await this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
      include: {
        user: true,
      },
    });

    this.logger.log(`Task with ID ${id} updated successfully`);

    return task;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.task.delete({
      where: {
        id,
      },
    });

    this.logger.log(`Task with ID ${id} deleted successfully`);
  }
}