import { PartialType } from '@nestjs/swagger';
import { CreateTrainingReviewDto } from './create-training-review.dto';

export class UpdateTrainingReviewDto extends PartialType(CreateTrainingReviewDto) { } 