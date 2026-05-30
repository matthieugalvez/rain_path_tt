import { Module } from '@nestjs/common';

import { HelloModule } from './hello/hello.module';

import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [HelloModule, WorkflowModule],
})
export class AppModule {}
