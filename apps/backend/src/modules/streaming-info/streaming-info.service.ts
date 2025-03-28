import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStreamingInfoDto } from './dto/create-streaming-info.dto';
import { UpdateStreamingInfoDto } from './dto/update-streaming-info.dto';

@Injectable()
export class StreamingInfoService {
    constructor(private prisma: PrismaService) { }

    async create(createStreamingInfoDto: CreateStreamingInfoDto) {
        return this.prisma.streamingInfo.create({
            data: {
                eventId: createStreamingInfoDto.eventId,
                platform: createStreamingInfoDto.platform,
                url: createStreamingInfoDto.url,
                startTime: createStreamingInfoDto.startTime,
                endTime: createStreamingInfoDto.endTime,
                isLive: createStreamingInfoDto.isLive
            },
            include: {
                event: true
            }
        });
    }

    async findAll() {
        return this.prisma.streamingInfo.findMany({
            include: {
                event: true
            }
        });
    }

    async findOne(id: number) {
        const streamingInfo = await this.prisma.streamingInfo.findUnique({
            where: { id },
            include: {
                event: true
            }
        });

        if (!streamingInfo) {
            throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
        }

        return streamingInfo;
    }

    async findByEvent(eventId: number) {
        return this.prisma.streamingInfo.findUnique({
            where: { eventId },
            include: {
                event: true
            }
        });
    }

    async update(id: number, updateStreamingInfoDto: UpdateStreamingInfoDto) {
        try {
            return await this.prisma.streamingInfo.update({
                where: { id },
                data: {
                    platform: updateStreamingInfoDto.platform,
                    url: updateStreamingInfoDto.url,
                    startTime: updateStreamingInfoDto.startTime,
                    endTime: updateStreamingInfoDto.endTime,
                    isLive: updateStreamingInfoDto.isLive
                },
                include: {
                    event: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.streamingInfo.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
        }
    }

    async toggleLive(id: number) {
        try {
            const streamingInfo = await this.prisma.streamingInfo.findUnique({
                where: { id }
            });

            if (!streamingInfo) {
                throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
            }

            return await this.prisma.streamingInfo.update({
                where: { id },
                data: {
                    isLive: !streamingInfo.isLive
                },
                include: {
                    event: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
        }
    }
} 