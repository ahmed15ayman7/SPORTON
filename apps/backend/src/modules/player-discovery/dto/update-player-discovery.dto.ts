import { PartialType } from '@nestjs/swagger';
import { CreatePlayerDiscoveryDto } from './create-player-discovery.dto';

export class UpdatePlayerDiscoveryDto extends PartialType(CreatePlayerDiscoveryDto) { } 