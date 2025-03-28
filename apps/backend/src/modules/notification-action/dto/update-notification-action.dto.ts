import { PartialType } from '@nestjs/swagger';
import { CreateNotificationActionDto } from './create-notification-action.dto';

export class UpdateNotificationActionDto extends PartialType(CreateNotificationActionDto) { } 