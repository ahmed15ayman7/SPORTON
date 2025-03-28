import { PartialType } from '@nestjs/swagger';
import { CreatePlayerStatisticsDto } from './create-player-statistics.dto';

export class UpdatePlayerStatisticsDto extends PartialType(CreatePlayerStatisticsDto) { } 