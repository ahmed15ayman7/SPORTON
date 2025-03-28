import { Module } from '@nestjs/common';
import { JobApplicationsController } from './job-applications.controller';
import { JobApplicationsService } from './job-applications.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [JobApplicationsController],
    providers: [JobApplicationsService],
    exports: [JobApplicationsService],
})
export class JobApplicationsModule { } 