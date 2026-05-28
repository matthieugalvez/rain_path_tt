import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
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
    return this.workflowsService.save(
      dto
    )
  }

	@Delete(':id')
	remove(
	  @Param('id')
	  id: string
	) {
	  return this.workflowsService.remove(
		id
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
