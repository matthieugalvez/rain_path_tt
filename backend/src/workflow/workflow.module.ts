import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflow.service';
import { WorkflowsController } from './workflow.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [WorkflowsController],

  providers: [WorkflowsService],
})
export class WorkflowModule {}
