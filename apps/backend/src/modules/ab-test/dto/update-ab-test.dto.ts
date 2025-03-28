import { PartialType } from '@nestjs/swagger';
import { CreateABTestDto } from './create-ab-test.dto';

export class UpdateABTestDto extends PartialType(CreateABTestDto) { } 