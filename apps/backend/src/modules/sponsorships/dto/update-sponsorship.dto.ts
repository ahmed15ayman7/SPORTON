import { PartialType } from '@nestjs/swagger';
import { CreateSponsorshipDto } from './create-sponsorship.dto';

export class UpdateSponsorshipDto extends PartialType(CreateSponsorshipDto) { } 