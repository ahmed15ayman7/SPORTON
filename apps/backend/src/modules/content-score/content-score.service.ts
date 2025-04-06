import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ContentScore } from '@shared/prisma';

@Injectable()
export class ContentScoreService extends BaseService<ContentScore> {
    constructor(prisma: PrismaService) {
        super(prisma, 'contentScore');
    }

    protected getSearchFields(): string[] {
        return ['relevanceScore', 'freshness', 'quality', 'engagement', 'finalScore'];
    }

    async getScoreProfile(id: number): Promise<ContentScore> {
        const score = await this.prisma.contentScore.findUnique({
            where: { id },
        });
        if (!score) {
            throw new NotFoundException('درجة المحتوى غير موجودة');
        }
        return score;
    }

    async getContentScores(contentId: number): Promise<ContentScore[]> {
        const scores = await this.prisma.contentScore.findMany({
            where: { contentId },
            orderBy: {
                lastCalculated: 'desc',
            },
        });
        return scores;
    }

    async getSegmentScores(userSegment: string): Promise<ContentScore[]> {
        const scores = await this.prisma.contentScore.findMany({
            where: { userSegment },
            orderBy: {
                lastCalculated: 'desc',
            },
        });
        return scores;
    }

    async getScoreAnalytics(id: number): Promise<any> {
        const score = await this.prisma.contentScore.findUnique({
            where: { id },
        });

        if (!score) {
            throw new NotFoundException('درجة المحتوى غير موجودة');
        }

        const analytics = {
            contentId: score.contentId,
            contentType: score.contentType,
            userSegment: score.userSegment,
            relevanceScore: score.relevanceScore,
            freshness: score.freshness,
            quality: score.quality,
            engagement: score.engagement,
            finalScore: score.finalScore,
            lastCalculated: score.lastCalculated,
        };

        return analytics;
    }
} 