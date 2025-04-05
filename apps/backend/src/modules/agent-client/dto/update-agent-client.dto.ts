import { PartialType } from '@nestjs/swagger';
import { CreateAgentClientDto } from './create-agent-client.dto';

export class UpdateAgentClientDto extends PartialType(CreateAgentClientDto) { } 