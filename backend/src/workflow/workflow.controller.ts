import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common'

import { WorkflowsService }
from './workflow.service'

import { CreateWorkflowDto }
from './dto/create-workflow.dto'

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly workflowsService:
      WorkflowsService
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateWorkflowDto
  ) {
    return this.workflowsService.create(
      dto
    )
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string
  ) {
    return this.workflowsService.findOne(
      id
    )
  }
}
