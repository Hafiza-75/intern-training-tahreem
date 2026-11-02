
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { SubtasksController } from './subtasks.controller.js';
import { SubtasksService } from './subtasks.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    TasksController,
    SubtasksController,
  ],
  providers: [
    TasksService,
    SubtasksService,
    PrismaService,
  ],
})
export class TasksModule {}
