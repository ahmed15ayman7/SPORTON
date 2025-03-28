import { PartialType } from '@nestjs/swagger';
import { CreateInjuryDto } from './create-injury.dto';

export class UpdateInjuryDto extends PartialType(CreateInjuryDto) { } 