import { PartialType } from '@nestjs/swagger';
import { CreateNotificationGroupDto } from './create-notification-group.dto';

export class UpdateNotificationGroupDto extends PartialType(CreateNotificationGroupDto) { } 