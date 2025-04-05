import { Module } from '@nestjs/common';
import { AgentClientService } from './agent-client.service';
import { AgentClientController } from './agent-client.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AgentClientController],
    providers: [AgentClientService],
    exports: [AgentClientService],
})
export class AgentClientModule { } 