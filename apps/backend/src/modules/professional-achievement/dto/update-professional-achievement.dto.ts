import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalAchievementDto } from './create-professional-achievement.dto';

export class UpdateProfessionalAchievementDto extends PartialType(CreateProfessionalAchievementDto) { } 