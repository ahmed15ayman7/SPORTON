import { PartialType } from '@nestjs/swagger';
import { CreateStreamingInfoDto } from './create-streaming-info.dto';

export class UpdateStreamingInfoDto extends PartialType(CreateStreamingInfoDto) { } 