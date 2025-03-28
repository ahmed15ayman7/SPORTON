import { PartialType } from '@nestjs/swagger';
import { CreateNotificationLogDto } from './create-notification-log.dto';

export class UpdateNotificationLogDto extends PartialType(CreateNotificationLogDto) { } 