import { Module } from '@nestjs/common';
import { StreamingInfoService } from './streaming-info.service';
import { StreamingInfoController } from './streaming-info.controller';

@Module({
    controllers: [StreamingInfoController],
    providers: [StreamingInfoService],
    exports: [StreamingInfoService],
})
export class StreamingInfoModule { }
