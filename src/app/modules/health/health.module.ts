import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

/** This is a module that imports the TerminusModule and includes a HealthController. */
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
