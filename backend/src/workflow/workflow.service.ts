import { Injectable }
from '@nestjs/common'

import { PrismaService }
from '../prisma/prisma.service'

import { CreateWorkflowDto }
from './dto/create-workflow.dto'

@Injectable()
export class WorkflowsService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(
    dto: CreateWorkflowDto
  ) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,

        nodesJson: JSON.stringify(
          dto.nodes
        ),

        edgesJson: JSON.stringify(
          dto.edges
        ),
      },
    })
  }

  async findAll() {
    return this.prisma.workflow.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }

  async findOne(id: string) {
    const workflow =
      await this.prisma.workflow.findUnique({
        where: { id },
      })

    if (!workflow) {
      return null
    }

    return {
      ...workflow,

      nodes: JSON.parse(
        workflow.nodesJson
      ),

      edges: JSON.parse(
        workflow.edgesJson
      ),
    }
  }
}
