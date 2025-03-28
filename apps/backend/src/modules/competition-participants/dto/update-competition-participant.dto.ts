import { PartialType } from '@nestjs/swagger';
import { CreateCompetitionParticipantDto } from './create-competition-participant.dto';

export class UpdateCompetitionParticipantDto extends PartialType(CreateCompetitionParticipantDto) { } 