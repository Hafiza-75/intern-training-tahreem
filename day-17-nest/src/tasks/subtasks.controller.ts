
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { SubtasksService } from './subtasks.service.js';
import { CreateSubtaskDto } from './dto/create-subtask.dto.js';
import { UpdateSubtaskDto } from './dto/update-subtask.dto.js';

interface AuthenticatedRequest {
  user: {
    userId: number;
    email: string;
    role: string;
  };
}

@Controller('tasks/:taskId/subtasks')
@UseGuards(JwtAuthGuard)
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Get()
  findAll(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.subtasksService.findAll(taskId, req.user.userId);
  }

  @Post()
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() dto: CreateSubtaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.subtasksService.create(taskId, req.user.userId, dto);
  }

  @Patch(':id')
  update(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubtaskDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.subtasksService.update(
      taskId,
      id,
      req.user.userId,
      dto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.subtasksService.remove(taskId, id, req.user.userId);
  }
}
