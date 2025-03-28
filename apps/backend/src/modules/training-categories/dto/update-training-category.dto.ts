import { PartialType } from '@nestjs/swagger';
import { CreateTrainingCategoryDto } from './create-training-category.dto';

export class UpdateTrainingCategoryDto extends PartialType(CreateTrainingCategoryDto) { } 