
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateSubtaskDto } from './dto/create-subtask.dto.js';
import { UpdateSubtaskDto } from './dto/update-subtask.dto.js';

@Injectable()
export class SubtasksService {
  constructor(private readonly prisma: PrismaService) {}

  // Verify that the parent task belongs to the logged-in user.
  private async verifyTaskOwnership(taskId: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  // Get all subtasks of a task owned by the user.
  async findAll(taskId: number, userId: number) {
    await this.verifyTaskOwnership(taskId, userId);

    return this.prisma.subtask.findMany({
      where: { taskId },
      orderBy: { id: 'asc' },
    });
  }

  // Create a subtask under an owned task.
  async create(
    taskId: number,
    userId: number,
    dto: CreateSubtaskDto,
  ) {
    await this.verifyTaskOwnership(taskId, userId);

    return this.prisma.subtask.create({
      data: {
        title: dto.title,
        completed: dto.completed ?? false,
        taskId,
      },
    });
  }

  // Verify both the parent task ownership and subtask membership.
  private async verifySubtaskOwnership(
    taskId: number,
    subtaskId: number,
    userId: number,
  ) {
    await this.verifyTaskOwnership(taskId, userId);

    const subtask = await this.prisma.subtask.findFirst({
      where: { id: subtaskId, taskId },
    });

    if (!subtask) {
      throw new NotFoundException('Subtask not found');
    }

    return subtask;
  }

  // Update a subtask's title or completion status.
  async update(
    taskId: number,
    subtaskId: number,
    userId: number,
    dto: UpdateSubtaskDto,
  ) {
    await this.verifySubtaskOwnership(taskId, subtaskId, userId);

    return this.prisma.subtask.update({
      where: { id: subtaskId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.completed !== undefined && {
          completed: dto.completed,
        }),
      },
    });
  }

  // Delete a subtask.
  async remove(taskId: number, subtaskId: number, userId: number) {
    await this.verifySubtaskOwnership(taskId, subtaskId, userId);

    return this.prisma.subtask.delete({
      where: { id: subtaskId },
    });
  }
}
