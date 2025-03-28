import { PartialType } from '@nestjs/swagger';
import { CreateCompetitionRoundDto } from './create-competition-round.dto';

export class UpdateCompetitionRoundDto extends PartialType(CreateCompetitionRoundDto) { } 