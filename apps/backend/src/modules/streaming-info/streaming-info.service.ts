import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StreamingInfo } from '@prisma/client';
import { BaseService } from '../../common/services/base.service';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UpdateStreamingInfoDto } from './dto/update-streaming-info.dto';

@Injectable()
export class StreamingInfoService extends BaseService<StreamingInfo> {
    constructor(prisma: PrismaService) {
        super(prisma, 'streamingInfo');
    }

    async create(createStreamingInfoDto: StreamingInfo): Promise<StreamingInfo> {
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

    async findAll(params: PaginationDto): Promise<PaginatedResponse<StreamingInfo>> {
        const { take, skip, search } = params;

        const streamingInfos = await this.prisma.streamingInfo.findMany({
            skip,
            take,
            include: {
                event: true
            }
        });

        return {
            data: streamingInfos,
            meta: {
                total: streamingInfos.length,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < streamingInfos.length
            }
        };
    }

    async findOne(id: number): Promise<StreamingInfo> {
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

    async findByEvent(eventId: number): Promise<StreamingInfo[]> {
        return this.prisma.streamingInfo.findMany({
            where: { eventId },
            include: {
                event: true
            }
        });
    }

    async update(id: number, updateStreamingInfoDto: UpdateStreamingInfoDto): Promise<StreamingInfo> {
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

    async remove(id: number): Promise<StreamingInfo> {
        try {
            return await this.prisma.streamingInfo.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`معلومات البث رقم ${id} غير موجودة`);
        }
    }

    async toggleLive(id: number): Promise<StreamingInfo> {
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