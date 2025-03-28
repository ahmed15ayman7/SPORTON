import { PartialType } from '@nestjs/swagger';
import { CreateTeamCategoryDto } from './create-team-category.dto';

export class UpdateTeamCategoryDto extends PartialType(CreateTeamCategoryDto) { } 