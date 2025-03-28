import { PartialType } from '@nestjs/swagger';
import { CreateAdTargetingDto } from './create-ad-targeting.dto';

export class UpdateAdTargetingDto extends PartialType(CreateAdTargetingDto) { } 