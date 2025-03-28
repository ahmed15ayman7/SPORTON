import { PartialType } from '@nestjs/swagger';
import { CreateUserBehaviorDto } from './create-user-behavior.dto';

export class UpdateUserBehaviorDto extends PartialType(CreateUserBehaviorDto) { } 